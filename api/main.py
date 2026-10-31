"""Lead capture for the Nujiang 26.5 portal — one endpoint, one table.

The site itself is static-first; this box only exists so a visitor's enquiry
does not disappear. Email notification is optional and never blocks the write.
"""

import logging
import smtplib
import ssl
from email.message import EmailMessage

from fastapi import BackgroundTasks, Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from config import CORS_ORIGINS, NOTIFY_EMAIL, SMTP
from database import Base, engine, get_db
from models import Lead
from schemas import LeadCreate, LeadOut

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")
log = logging.getLogger("nujiang.api")

# Convenience for a fresh clone; a real deployment should run migrations.
if engine is not None:
    Base.metadata.create_all(bind=engine)

app = FastAPI(title="Nujiang 26.5 — Lead API", version="0.3.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

# Fallback store when no DATABASE_URL is configured. Lost on restart, by design.
_memory: list[dict] = []


def _compose(name: str, email: str, message: str) -> EmailMessage:
    mail = EmailMessage()
    mail["Subject"] = f"[怒江 26.5] 新咨询 / new enquiry — {name}"
    mail["From"] = SMTP["from_addr"] or SMTP["user"] or NOTIFY_EMAIL
    mail["To"] = NOTIFY_EMAIL
    mail["Reply-To"] = email
    mail.set_content(
        "来自怒江 26.5 站点的留资表单 / from the Nujiang 26.5 lead form\n"
        "----------------------------------------\n"
        f"姓名 / Name : {name}\n"
        f"邮箱 / Email: {email}\n\n"
        f"{message}\n"
    )
    return mail


def _send(mail: EmailMessage) -> None:
    host, port = SMTP["host"], SMTP["port"]
    user, password = SMTP["user"], SMTP["password"]

    if port == 465:
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(host, port, context=context, timeout=20) as server:
            if user and password:
                server.login(user, password)
            server.send_message(mail)
        return

    with smtplib.SMTP(host, port, timeout=20) as server:
        server.ehlo()
        if SMTP["starttls"]:
            server.starttls(context=ssl.create_default_context())
            server.ehlo()
        if user and password:
            server.login(user, password)
        server.send_message(mail)


def notify_lead(name: str, email: str, message: str) -> None:
    """Mail the enquiry on, if SMTP is configured.

    Deliberately opt-in and deliberately forgiving: a broken relay logs a
    warning, it never turns a stored enquiry into a 500 for the visitor.
    """
    if not SMTP["host"] or not NOTIFY_EMAIL:
        log.info("lead stored; no SMTP configured, so no mail sent")
        return

    try:
        _send(_compose(name, email, message))
        log.info("lead notification sent to %s", NOTIFY_EMAIL)
    except Exception as exc:  # noqa: BLE001 — mail must never fail the request
        log.warning("lead notification failed: %s", exc)


@app.get("/health")
def health() -> dict:
    return {
        "status": "ok",
        "db": "postgres" if engine is not None else "memory",
        "mail": "on" if SMTP["host"] and NOTIFY_EMAIL else "off",
        "notify_to": NOTIFY_EMAIL or None,
    }


@app.post("/api/lead", response_model=LeadOut, status_code=201)
def create_lead(
    payload: LeadCreate,
    background: BackgroundTasks,
    db: Session | None = Depends(get_db),
) -> LeadOut:
    background.add_task(notify_lead, payload.name, payload.email, payload.message)

    if db is None:
        record = payload.model_dump()
        record["created_at"] = None
        _memory.append(record)
        return LeadOut(id=len(_memory), **record)

    lead = Lead(name=payload.name, email=payload.email, message=payload.message)
    db.add(lead)
    db.commit()
    db.refresh(lead)

    return LeadOut(
        id=lead.id,
        name=lead.name,
        email=lead.email,
        message=lead.message,
        created_at=str(lead.created_at),
    )

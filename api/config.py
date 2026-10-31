"""All environment reading in one place.

`load_dotenv()` has to run before anything else imports `database`, which reads
DATABASE_URL at import time — hence this module is imported first by both.
"""

import os

from dotenv import load_dotenv

load_dotenv()


def _env(name: str, default: str = "") -> str:
    return os.getenv(name) or default


DATABASE_URL = _env("DATABASE_URL")

CORS_ORIGINS = [
    origin.strip()
    for origin in _env("CORS_ORIGINS", "http://localhost:3000").split(",")
    if origin.strip()
]

# Lead notifications are opt-in: with no SMTP_HOST or LEAD_NOTIFY_EMAIL, mail
# is skipped entirely and the submission is still stored.
NOTIFY_EMAIL = _env("LEAD_NOTIFY_EMAIL")

SMTP = {
    "host": _env("SMTP_HOST"),
    "port": int(_env("SMTP_PORT", "587")),
    "user": _env("SMTP_USER"),
    "password": _env("SMTP_PASSWORD"),
    "from_addr": _env("SMTP_FROM"),
    "starttls": _env("SMTP_TLS", "1") != "0",
}

SMTP_ENABLED = bool(SMTP["host"] and NOTIFY_EMAIL)

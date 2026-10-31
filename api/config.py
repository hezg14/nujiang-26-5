"""All environment reading in one place.

`load_dotenv()` has to run before anything else imports `database`, which reads
DATABASE_URL at import time — hence this module is imported first by both.
"""

import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent

# The default store is a SQLite file next to this module: no server to provision,
# nothing to lose when the box restarts. Point DATABASE_URL at Postgres for real
# traffic (see requirements-postgres.txt); set it to an empty string to run the
# in-memory store used by tests.
DEFAULT_DATABASE_URL = f"sqlite:///{BASE_DIR / 'data' / 'leads.db'}"


def _env(name: str, default: str = "") -> str:
    return os.getenv(name) or default


_raw_database_url = os.getenv("DATABASE_URL")
DATABASE_URL = DEFAULT_DATABASE_URL if _raw_database_url is None else _raw_database_url.strip()

# The container runs `python -m bootstrap` before starting its workers and sets
# this to 0, so the schema is created once instead of once per worker.
BOOTSTRAP_SCHEMA = _env("BOOTSTRAP_SCHEMA", "1") != "0"

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

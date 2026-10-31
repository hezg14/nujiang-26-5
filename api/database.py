from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from config import DATABASE_URL


def _driver_url(url: str) -> str:
    """Managed Postgres hands out postgres:// URLs; SQLAlchemy wants the
    driver-qualified form. psycopg 3 rather than psycopg2 so the package
    installs as a wheel on macOS arm64 without a local libpq toolchain."""
    for prefix in ("postgres://", "postgresql://"):
        if url.startswith(prefix):
            return url.replace(prefix, "postgresql+psycopg://", 1)
    return url


# No DATABASE_URL → no engine, and the API degrades to an in-memory store so the
# frontend can be developed without a database.
engine = (
    create_engine(_driver_url(DATABASE_URL), pool_pre_ping=True)
    if DATABASE_URL
    else None
)

SessionLocal = (
    sessionmaker(bind=engine, autoflush=False, autocommit=False)
    if engine is not None
    else None
)

Base = declarative_base()


def get_db():
    """FastAPI dependency that yields a session (or None in memory mode)."""
    if SessionLocal is None:
        yield None
        return

    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

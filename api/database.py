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


def _connect_args(url: str) -> dict:
    """SQLite serialises writes per file, and FastAPI serves requests from a
    thread pool — without this the same connection cannot hop between threads."""
    return {"check_same_thread": False} if url.startswith("sqlite") else {}


def _ensure_sqlite_dir(url: str) -> None:
    """SQLite will not create a missing parent directory, and the default store
    lives in ./data — which a fresh clone or a fresh sandbox does not have."""
    if not url.startswith("sqlite:///"):
        return
    from pathlib import Path

    Path(url.removeprefix("sqlite:///")).parent.mkdir(parents=True, exist_ok=True)


# No DATABASE_URL → no engine, and the API degrades to an in-memory store so the
# frontend can be developed without a database.
if DATABASE_URL:
    _ensure_sqlite_dir(DATABASE_URL)
    engine = create_engine(
        _driver_url(DATABASE_URL),
        pool_pre_ping=True,
        connect_args=_connect_args(DATABASE_URL),
    )
else:
    engine = None

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

"""Create the schema once, before the workers start.

Deliberately not done at import time: uvicorn runs several workers, each imports
`main`, and each would race to create the same table on a cold start — the loser
crashes with "table leads already exists". The container entrypoint runs this
script first, then starts the workers with BOOTSTRAP_SCHEMA=0.

A real traffic deployment should replace this with `alembic upgrade head`.
"""

import sys

from database import Base, engine
import models  # noqa: F401 — importing registers Lead on Base.metadata


def main() -> int:
    if engine is None:
        print("no DATABASE_URL — in-memory mode, nothing to bootstrap")
        return 0

    Base.metadata.create_all(bind=engine)
    print(f"schema ready on {engine.url.get_backend_name()}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

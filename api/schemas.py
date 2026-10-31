from typing import Annotated, Optional

from pydantic import BaseModel, EmailStr, Field


class LeadCreate(BaseModel):
    """What the form posts. Lengths mirror the column widths in models.py."""

    name: Annotated[str, Field(min_length=1, max_length=120)]
    email: EmailStr
    message: Annotated[str, Field(min_length=1, max_length=4000)]


class LeadOut(BaseModel):
    id: int
    name: str
    email: str
    message: str
    created_at: Optional[str] = None

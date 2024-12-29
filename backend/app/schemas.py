from pydantic import BaseModel
from typing import Optional


class TermBase(BaseModel):
    title: str
    description: Optional[str] = None
    source: Optional[str] = None


class TermOut(TermBase):
    id: int

    class Config:
        orm_mode = True


class RelationshipBase(BaseModel):
    relation: Optional[str] = None


class RelationshipCreate(RelationshipBase):
    source_id: int
    target_id: int


class RelationshipOut(RelationshipBase):
    id: int
    source_id: int
    target_id: int

    class Config:
        orm_mode = True

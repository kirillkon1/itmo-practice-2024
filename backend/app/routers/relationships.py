from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from ..database import get_db
from .. import crud, schemas

router = APIRouter(prefix="/relationships", tags=["Relationship"])


@router.get("/", response_model=List[schemas.RelationshipOut])
async def read_terms(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    relations = await crud.get_relationships(db, skip, limit)
    return relations

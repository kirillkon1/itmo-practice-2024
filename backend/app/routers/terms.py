from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from ..database import get_db
from .. import crud, schemas

router = APIRouter(prefix="/terms", tags=["Terms"])


@router.get("/", response_model=List[schemas.TermOut])
async def read_terms(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    terms = await crud.get_terms(db, skip, limit)
    return terms
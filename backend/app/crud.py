from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from .models import Term, Relationship


async def get_terms(db: AsyncSession, skip: int = 0, limit: int = 100):
    query = select(Term).offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()


async def get_relationships(db: AsyncSession, skip: int = 0, limit: int = 100):
    result = await db.execute(select(Relationship).offset(skip).limit(limit))
    return result.scalars().all()

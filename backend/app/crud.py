from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from .models import Term, Relationship


async def get_terms(db: AsyncSession, skip: int = 0, limit: int = 100):
    query = select(Term).offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()


async def get_relationships(db: AsyncSession, skip: int = 0, limit: int = 100):
    result = await db.execute(select(Relationship).offset(skip).limit(limit))
    return result.scalars().all()


async def create_term_if_not_exists(db: AsyncSession, title: str, description: str = None, source: str = None):
    # Проверка на существование термина через select
    result = await db.execute(select(Term).where(Term.title == title))
    existing_term = result.scalars().first()  # Получаем первый результат или None

    if existing_term:
        return existing_term  # Если термин уже есть, возвращаем его

    # Если термина нет, добавляем
    new_term = Term(title=title, description=description, source=source)
    db.add(new_term)
    await db.commit()
    await db.refresh(new_term)
    return new_term


async def delete_all(db: AsyncSession):
    await db.execute(delete(Term))
    await db.execute(delete(Relationship))

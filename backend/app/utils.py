import json

from sqlalchemy.ext.asyncio import AsyncSession
from .crud import create_term_if_not_exists, delete_all
from .models import Term, Relationship
from sqlalchemy.future import select



async def import_data_from_json(db: AsyncSession, json_path: str):
    try:

        await delete_all(db)

        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        # Сначала импортируем термины
        terms = data.get("terms", [])
        term_map = {}  # Для сопоставления названий терминов с их объектами
        for term in terms:
            created_term = await create_term_if_not_exists(
                db=db,
                title=term["title"],
                description=term.get("description"),
                source=term.get("source"),
            )
            term_map[term["title"]] = created_term  # Сохраняем термин в словарь

        print(f"Импорт завершён: {len(terms)} терминов обработано.")

        # Затем обрабатываем связи
        relationships = data.get("relationships", [])
        for rel in relationships:
            source_title = rel["source"]
            target_title = rel["target"]
            relation = rel["relation"]

            # Получаем объекты source и target из term_map
            source_term = term_map.get(source_title)
            target_term = term_map.get(target_title)

            if source_term and target_term:
                # Проверяем, что связь ещё не существует
                existing_relationship = await db.execute(
                    select(Relationship)
                    .where(Relationship.source_id == source_term.id)
                    .where(Relationship.target_id == target_term.id)
                )
                if not existing_relationship.scalars().first():
                    # Создаём связь
                    new_relationship = Relationship(
                        source_id=source_term.id,
                        target_id=target_term.id,
                        relation=relation,
                    )
                    db.add(new_relationship)

        # Коммит после добавления всех связей
        await db.commit()
        print(f"Импорт завершён: {len(relationships)} связей обработано.")
    except Exception as e:
        print(f"Ошибка при импорте данных: {e}")
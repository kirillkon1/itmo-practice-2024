from fastapi import FastAPI
from .routers import terms, relationships
from .models import Base
from .database import engine
import logging

app = FastAPI(title="FastAPI + SQLite")

app.include_router(terms.router)
app.include_router(relationships.router)


# Настройка базового конфигуратора логирования
logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler()
    ]
)

# Создание логгера для текущего модуля
logger = logging.getLogger(__name__)

# Создание таблиц при запуске
@app.on_event("startup")
async def on_startup():
    logging.log(level=logging.INFO, msg="Создание таблиц - начало")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logging.log(level=logging.INFO, msg="Создание таблиц - конец")

# Команда запуска:
# uvicorn app.main:app --reload

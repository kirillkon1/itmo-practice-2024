from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import sessionmaker
import logging

from .routers import terms, relationships
from .models import Base
from .database import engine, AsyncSession
from .utils import import_data_from_json

# Инициализация FastAPI приложения
app = FastAPI(title="Глоссарий терминов ВКР")

# Подключение маршрутов
app.include_router(terms.router)
app.include_router(relationships.router)

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Разрешить все методы (GET, POST, PUT, DELETE...)
    allow_headers=["*"],  # Разрешить любые заголовки
)

# Настройка логирования
logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] %(name)s - %(levelname)s - %(message)s",
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger(__name__)

# Создание фабрики сессий
SessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

# Событие запуска приложения
@app.on_event("startup")
async def on_startup():
    # logger.info("Создание таблиц - начало")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    # logger.info("Создание таблиц - завершено")

    # logger.info("Заполнение таблиц данными - начало")
    async with SessionLocal() as session:
        await import_data_from_json(session, "./data.json")
    # logger.info("Заполнение таблиц данными - завершено")

# Команда запуска:
# uvicorn app.main:app --reload

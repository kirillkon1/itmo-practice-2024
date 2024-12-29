from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Term(Base):
    __tablename__ = "terms"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    source = Column(Text)


class Relationship(Base):
    __tablename__ = "relationships"

    # Вариант: составной ключ (source_id, target_id) или отдельная id-колонка.
    id = Column(Integer, primary_key=True, index=True)
    source_id = Column(Integer, ForeignKey("terms.id", ondelete="CASCADE"), nullable=False)
    target_id = Column(Integer, ForeignKey("terms.id", ondelete="CASCADE"), nullable=False)
    relation = Column(String(255))

from datetime import datetime, timezone
from typing import Optional
from sqlalchemy import create_engine, String, Text, select, ForeignKey
from sqlalchemy.orm import DeclarativeBase, Session, mapped_column, Mapped, relationship


class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(30), unique=True, nullable=False, index=True)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    first_name: Mapped[str] = mapped_column(String(30), nullable=False)
    last_name: Mapped[str] = mapped_column(String(30), nullable=False)
    date_created: Mapped[Optional[datetime]] = mapped_column()
    last_login: Mapped[Optional[datetime]] = mapped_column()

    workouts: Mapped[list["Workouts"]] = relationship(back_populates="user")

class Workouts(Base):
    __tablename__ = "workouts"
    workout_id: Mapped[int] = mapped_column(primary_key=True)
    category_name: Mapped[str] = mapped_column()
    workout_name: Mapped[str] = mapped_column()
    weight: Mapped[int] = mapped_column()
    reps: Mapped[int] = mapped_column()
    date_updated: Mapped[Optional[datetime]] = mapped_column()

    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)

    user: Mapped["User"] = relationship(back_populates="workouts")
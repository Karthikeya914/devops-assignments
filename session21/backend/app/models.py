from datetime import datetime, timezone
from sqlalchemy import DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column
from .db import Base

class Incident(Base):
    __tablename__ = "incidents"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    service_name: Mapped[str] = mapped_column(String(100), nullable=False, default="core-api")
    severity: Mapped[str] = mapped_column(String(20), nullable=False, default="P3-MEDIUM")
    status: Mapped[str] = mapped_column(String(30), nullable=False, default="OPEN")
    description: Mapped[str] = mapped_column(Text, default="", nullable=False)
    assignee: Mapped[str] = mapped_column(String(120), default="On-Call Engineer", nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

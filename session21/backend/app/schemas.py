from datetime import datetime
from typing import Literal
from pydantic import BaseModel, ConfigDict, Field

Severity = Literal["P1-CRITICAL", "P2-HIGH", "P3-MEDIUM", "P4-LOW"]
Status = Literal["OPEN", "INVESTIGATING", "MITIGATED", "RESOLVED"]

class IncidentBase(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    service_name: str = Field(default="core-api", min_length=1, max_length=100)
    severity: Severity = "P3-MEDIUM"
    status: Status = "OPEN"
    description: str = ""
    assignee: str = "On-Call Engineer"

class IncidentCreate(IncidentBase):
    pass

class IncidentUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=200)
    service_name: str | None = Field(default=None, min_length=1, max_length=100)
    severity: Severity | None = None
    status: Status | None = None
    description: str | None = None
    assignee: str | None = None

class IncidentOut(IncidentBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class StatsOut(BaseModel):
    total: int
    open: int
    investigating: int
    mitigated: int
    resolved: int
    critical: int

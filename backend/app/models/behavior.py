from pydantic import BaseModel


class Behavior(BaseModel):
    name: str
    severity: str
    description: str
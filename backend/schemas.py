from pydantic import BaseModel
from typing import List, Dict, Optional
from datetime import datetime

class UserData(BaseModel):
    id: str
    email: str
    skills: List[str]
    certifications: List[str]
    career_goals: Dict[str, List[str]]
    education: List[Dict]
    experience: List[Dict]
    progress: Optional[Dict[str, int]] = {}

class Roadmap(BaseModel):
    user_id: str
    title: str
    milestones: List[Dict]
    feedback: Optional[List[str]] = []
    status: str = "draft"
    created_at: datetime = datetime.now()

class AgentConfig(BaseModel):
    role: str
    goal: str
    backstory: str 
    tools: List[str]
    llm: str
    memory: bool = True
    verbose: bool = True

class TaskConfig(BaseModel):
    description: str
    expected_output: str
    agent: str
    context: List[str]
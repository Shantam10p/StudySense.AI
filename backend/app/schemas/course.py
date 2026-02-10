from pydantic import BaseModel
from datetime import date, datetime

class CourseResponse(BaseModel):
    id: int
    course_name: str
    exam_date: date
    daily_study_hours: int
    created_at: datetime

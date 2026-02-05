from fastapi import APIRouter
from datetime import date, timedelta    

from app.schemas.planner import (
    PlannerGenerateRequest,
    PlannerGenerateResponse,
    DailyPlan,
    StudyTask,
)

router = APIRouter()

@router.post("/generate", response_model = PlannerGenerateResponse)
def generate_study_plan(payload: PlannerGenerateRequest):
    "Mock study plan , I will replace this with agent + DB logic"

    today = date.today()

    topics_today = payload.topics[:3]

    total_minutes = int(payload.daily_study_hours * 60)
    minutes_per_task = total_minutes // len(topics_today)


    # Mock logic: just schedule first 3 topics for today
    tasks = []
    for topic in topics_today:
        tasks.append(
            StudyTask(
                title = topic,
                duration_minutes = minutes_per_task,
                task_type = "Study"
            )
        )

    daily_plan = DailyPlan(
        day = today,
        tasks = tasks,
    )

    return PlannerGenerateResponse(
        course_name = payload.course_name,
        exam_date = payload.exam_date,
        daily_plans = [daily_plan],
    )


   
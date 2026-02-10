from fastapi import FastAPI

from app.api.v1.endpoints.planner import router as planner_router
from app.api.v1.endpoints.courses import router as courses_router

app = FastAPI(title="StudySense API")

app.include_router(planner_router, prefix="/planner", tags=["Planner"])
app.include_router(courses_router, prefix="/courses", tags=["Courses"])

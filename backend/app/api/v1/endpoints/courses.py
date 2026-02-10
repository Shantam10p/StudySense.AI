from fastapi import APIRouter
from typing import List

from app.db.database import get_connection
from app.schemas.course import CourseResponse

router = APIRouter()


@router.get("", response_model=List[CourseResponse])
def get_courses():
   
    #Get all courses from the database
 
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM courses")
    courses = cursor.fetchall()

    cursor.close()
    conn.close()

    return courses

from fastapi import APIRouter, HTTPException, Response, status
from typing import List

from app.db.database import get_connection
from app.schemas.course import CourseResponse

router = APIRouter()


@router.get("", response_model=List[CourseResponse])
def get_courses():
   
    #Get all courses from the database
 
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM courses")
        courses = cursor.fetchall()
        return courses
    finally:
        cursor.close()
        conn.close()


@router.get("/{course_id}", response_model = CourseResponse)
def get_course(course_id: int):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("Select * FROM courses WHERE id = %s", (course_id,))
        course = cursor.fetchone()

        if course is None:
            raise HTTPException(status_code=404, detail="Course not found")

        return course
    finally:
        cursor.close()
        conn.close()


@router.delete("/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_course(course_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM courses WHERE id = %s", (course_id,))
        conn.commit()

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Course not found")

        return Response(status_code=status.HTTP_204_NO_CONTENT)
    finally:
        cursor.close()
        conn.close()
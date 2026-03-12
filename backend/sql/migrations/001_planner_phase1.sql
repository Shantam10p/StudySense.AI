ALTER TABLE courses
ADD COLUMN input_hash VARCHAR(64) NULL AFTER daily_study_hours;

ALTER TABLE courses
MODIFY COLUMN daily_study_hours DECIMAL(4,2) NOT NULL;

CREATE TABLE daily_plans (
    id INT NOT NULL AUTO_INCREMENT,
    course_id INT NOT NULL,
    plan_date DATE NOT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_daily_plans_course_id (course_id),
    UNIQUE KEY uq_daily_plans_course_date (course_id, plan_date),
    CONSTRAINT fk_daily_plans_course
        FOREIGN KEY (course_id)
        REFERENCES courses (id)
        ON DELETE CASCADE
);

CREATE TABLE study_tasks (
    id INT NOT NULL AUTO_INCREMENT,
    daily_plan_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    duration_minutes INT NOT NULL,
    task_type VARCHAR(50) NOT NULL,
    position INT NOT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_study_tasks_daily_plan_id (daily_plan_id),
    CONSTRAINT fk_study_tasks_daily_plan
        FOREIGN KEY (daily_plan_id)
        REFERENCES daily_plans (id)
        ON DELETE CASCADE
);

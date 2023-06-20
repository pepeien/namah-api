import { Router } from "express";

// Models
import { getConnection, execQuery } from "@models";

// Types
import { RawCourse, Course } from "@typing";

const router = Router();

const generateCourseList = (course: RawCourse[]): Course[] => {
    const coursesList: Course[] = [];

    course.forEach((element) => {
        coursesList.push({
            courseId: element.course_id,
            courseAuthor: element.course_author,
            courseTitle: element.course_title,
            courseDescription: element.course_description,
            courseImage: element.course_image.toString("base64"),
            courseDate: {
                startDate: new Date(element.course_start_date),
                endDate: new Date(element.course_end_date),
            },
        });
    });

    return coursesList;
};

router.get("/", (req, res) => {
    getConnection(async (error, connection) => {
        if (!error && connection) {
            await execQuery(connection, {
                request: req.query,
                table: "courses",
            })
                .then((result) => {
                    if (result.length === 0) {
                        res.status(200).json({
                            wasSuccessful: false,
                            description: "No courses found",
                        });
                    } else {
                        res.status(200).json({
                            wasSuccessful: true,
                            courses: generateCourseList(result),
                        });
                    }
                })
                .catch((error) => {
                    if (error.code === "ER_BAD_FIELD_ERROR") {
                        res.status(500).json({
                            wasSuccessful: false,
                            description: "Invalid query parameter",
                        });
                    } else {
                        res.status(500).json({
                            wasSuccessful: false,
                            description: "Server error, please try again",
                        });
                    }
                });

            connection.release();
        } else {
            res.status(500).json({
                wasSuccessful: false,
                description: "Server error, please try again",
            });
        }
    });
});

export default router;

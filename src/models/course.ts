import { Schema, model } from "mongoose";

// Types
import { Statics } from "@typing";

const validateId = async (id: Number) => {
    const foundCourse = await CourseModel.find({
        id: id,
    });

    if (foundCourse) {
        throw new Error("Course ID is duplicated");
    }
};

const CourseSchema = new Schema({
    id: {
        type: Number,
        validate: validateId,
    },
    author: String,
    title: String,
    description: String,
    image: String,
    startDate: String,
    endDate: String,
});

const CourseModel = model(Statics.COURSE_COLLECTION_NAME, CourseSchema);

export default CourseModel;

import { Schema, model } from "mongoose";

// Types
import { Statics } from "@typing";

const validateId = async (id: Number) => {
    const foundPost = await PostModel.find({
        id: id,
    });

    if (foundPost) {
        throw new Error("Post ID is duplicated");
    }
};

const PostSchema = new Schema({
    id: {
        type: Number,
        validate: validateId,
    },
    author: String,
    title: String,
    theme: String,
    image: String,
    markdown: String,
});

const PostModel = model(Statics.POST_COLLECTION_NAME, PostSchema);

export default PostModel;

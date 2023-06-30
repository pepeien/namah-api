import { Schema, model } from "mongoose";

// Types
import { Statics } from "@typing";

const validateId = async (id: Number) => {
    const foundPodcast = await PodcastModel.find({
        id: id,
    });

    if (foundPodcast) {
        throw new Error("Podcast ID is duplicated");
    }
};

const PodcastSchema = new Schema({
    id: {
        type: Number,
        validate: validateId,
    },
    author: String,
    title: String,
    description: String,
    image: String,
});

const PodcastModel = model(Statics.PODCAST_COLLECTION_NAME, PodcastSchema);

export default PodcastModel;

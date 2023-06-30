import { Schema, model } from "mongoose";

// Types
import { Statics } from "@typing";

const validateId = async (id: Number) => {
    const foundBanner = await BannerModel.find({
        id: id,
    });

    if (foundBanner) {
        throw new Error("Banner ID is duplicated");
    }
};

const BannerSchema = new Schema({
    id: {
        type: Number,
        validate: validateId,
    },
    title: String,
    description: String,
    image: String,
});

const BannerModel = model(Statics.BANNER_COLLECTION_NAME, BannerSchema);

export default BannerModel;

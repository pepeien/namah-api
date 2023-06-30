import { Schema, model } from "mongoose";

// Types
import { Statics } from "@typing";

const validateId = async (id: Number) => {
    const foundConcept = await ConceptModel.find({
        id: id,
    });

    if (foundConcept) {
        throw new Error("Concept ID is duplicated");
    }
};

const ConceptSchema = new Schema({
    id: {
        type: Number,
        validate: validateId,
    },
    likeCount: Number,
    image: String,
});

const ConceptModel = model(Statics.CONCEPT_COLLECTION_NAME, ConceptSchema);

export default ConceptModel;

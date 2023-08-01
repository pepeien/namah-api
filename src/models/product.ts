import { Schema, model } from 'mongoose';

// Types
import { Statics } from '@typing';

const validateId = async (id: Number) => {
    const foundProduct = await ProductModel.find({
        id: id,
    });

    if (foundProduct) {
        throw new Error('Product ID is duplicated');
    }
};

const ProductSchema = new Schema({
    id: {
        type: Number,
        validate: validateId,
    },
    name: String,
    description: String,
    price: Number,
    priceCurrency: String,
    image: String,
});

const ProductModel = model(Statics.PRODUCT_COLLECTION_NAME, ProductSchema);

export default ProductModel;

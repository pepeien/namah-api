import { Schema, model } from 'mongoose';

// Types
import { Statics } from '@typing';

const validateId = async (id: Number) => {
    const foundUser = await UserModel.find({
        id: id,
    });

    if (foundUser) {
        throw new Error('User ID is duplicated');
    }
};

const UserSchema = new Schema({
    id: {
        type: Number,
        validate: validateId,
    },
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean,
});

const UserModel = model(Statics.USER_COLLECTION_NAME, UserSchema);

export default UserModel;

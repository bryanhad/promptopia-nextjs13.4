import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [
            /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
            'Username invalid, it should contain 8-20 alphanumeric letters and be unique!',
        ],
    },
    image: {
        type: String,
    },
})

const User = models.User || model('User', UserSchema)

export default User

// "models" object, is given by Mongoose library.
// it stores all registered models.

// if a model named "User" already exists in the "models object",
// it assigns that existing model to the "User" variable.

// This prevents redefiinding the model and eensuered that the existing model is reused.


//
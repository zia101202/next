import mongoose, { Schema, Document, models, model } from 'mongoose';

// Define the interface for the user document
interface IUser extends Document {
  HashedPassword : string;
  email: string;
}

// Define the user schema
const userSchema = new Schema<IUser>({
  HashedPassword : {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
  },
});

// Prevent overwriting the model if it already exists
const User = models.User || model<IUser>('User', userSchema);

export default User;

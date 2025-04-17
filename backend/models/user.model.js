import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

// Define the user schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add your name"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/],
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
            minlength: [6, "Password must be at least 6 characters"],
            maxlength: [20, "Password must be at most 20 characters"],
            trim: true,
        },
    },
    { timestamps: true }
);


// Pre save hook to hash  the password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hashSync(this.password, salt);
    next();
});


// Method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compareSync(enteredPassword, this.password);
}


const User = mongoose.model('User', userSchema);

export default User;

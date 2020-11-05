import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    seller: {
        type: Boolean,
        default: false
    },
    address: String,
    created: {
        type: Date,
        default: Date
    }
});

UserSchema.pre('save', async function (next: mongoose.HookNextFunction) {
    try {
        if (!this.isModified('password')) { return next(); }
        const hashed = await bcrypt.hash(this['password'], 10);
        this['password'] = hashed;
        return next();
    } catch (e) {
        return next(e);
    }
})
import { Schema, model, Document } from 'mongoose';
import { hash, compare } from 'bcrypt';

export interface IUser extends Document {
    email: string;
    password: string;
    googleId?: string;
    githubId?: string;
    profile: { name?: string; picture?: string };
    isVerified: boolean;
    verify_password: (password: string) => Promise<boolean>;
}

export const userSchema: Schema<IUser> = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    googleId: String,
    githubId: String,

    profile: {
        name: String,
        picture: String
    },
    isVerified: Boolean
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    const passwordHash = await hash((this as IUser).password, 10);

    (this as IUser).password = passwordHash;
    next();
});

userSchema.methods.verify_password = function(password: string) {
    return compare(password, this.password);
};

export default model<IUser>('User', userSchema);

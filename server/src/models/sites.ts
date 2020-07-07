import { Schema, model, Document } from 'mongoose';
import { IUser } from './users';

export interface ISite extends Document {
    name: string;
    description?: string;
    owner: IUser | null;
    lastTokenReset: number;
    createdAt: string;
    updatedAt: string;
}

export const siteSchema: Schema<ISite> = new Schema(
    {
        name: {
            type: String,
            minlength: 3,
            required: true
        },
        description: {
            type: String
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        lastTokenReset: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

export default model<ISite>('Site', siteSchema);

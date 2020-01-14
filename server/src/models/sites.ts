import { Schema, model, Document } from 'mongoose';

export interface ISite extends Document {
    name: string;
    owner: Schema.Types.ObjectId;
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
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

export default model<ISite>('Site', siteSchema);

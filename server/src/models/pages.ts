import { Schema, model, Document } from 'mongoose';

export interface IPage extends Document {
    name: string;
    createdAt: string;
    updatedAt: string;
    owner: Schema.Types.ObjectId;
}

export const pageSchema: Schema<IPage> = new Schema(
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

export default model<IPage>('Page', pageSchema);

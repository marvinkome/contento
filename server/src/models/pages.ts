import { Schema, model, Document } from 'mongoose';
import { contentSchema, IContent } from './content';

export interface IPage extends Document {
    name: string;
    site: Schema.Types.ObjectId;
    contents: [IContent];
    createdAt: string;
    updatedAt: string;
}

export const pageSchema: Schema<IPage> = new Schema(
    {
        name: {
            type: String,
            minlength: 3,
            required: true
        },
        site: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        contents: [contentSchema]
    },
    {
        timestamps: true
    }
);

export default model<IPage>('Page', pageSchema);

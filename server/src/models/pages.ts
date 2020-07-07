import { Schema, model, Document } from 'mongoose';
import { contentSchema, IContent } from './content';

export interface IPage extends Document {
    name: string;
    slug: string;
    site: Schema.Types.ObjectId | string;
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
        slug: {
            type: String,
            minlength: 3,
            required: true
        },
        site: {
            type: Schema.Types.ObjectId,
            ref: 'Site'
        },
        contents: [contentSchema]
    },
    {
        timestamps: true
    }
);

pageSchema.index({ slug: 1, site: 1 }, { unique: true });

export default model<IPage>('Page', pageSchema);

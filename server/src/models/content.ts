import { Schema, Document } from 'mongoose';

export interface IContent extends Document {
    type: 'TEXT' | 'MEDIA';
    name: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export const contentSchema: Schema<IContent> = new Schema(
    {
        type: {
            type: String,
            required: true,
            enum: ['TEXT', 'MEDIA']
        },
        name: {
            type: String,
            minlength: 3,
            required: true
        },
        content: {
            type: String,
            minlength: 3,
            required: true
        }
    },
    {
        timestamps: true
    }
);

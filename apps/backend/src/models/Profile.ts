import { Schema, type Types, model } from "mongoose";

export interface Profile {
    _id: Types.UUID;
    username: string;
    displayName: string;
    picture?: string;
}

const profileSchema = new Schema<Profile>(
    {
        _id: Schema.Types.UUID,
        username: String,
        displayName: String,
        picture: { type: String, default: null }
    }
);

export const Profile = model<Profile>("Profile", profileSchema);

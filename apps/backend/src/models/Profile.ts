import { Schema, type Types, model } from "mongoose";

export interface Profile {
    _id: Types.UUID;
    name: string;
}

const profileSchema = new Schema<Profile>(
    {
        _id: Schema.Types.UUID,
        name: String
    }
);

export const Profile = model<Profile>("Profile", profileSchema);

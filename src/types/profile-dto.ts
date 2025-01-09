import { Gender } from "@prisma/client";

export interface ProfileDTO {
    fullName: string;
}
export interface UpdateProfileDTO extends ProfileDTO {
    id: number;
    gender: Gender;
    telephone: string;
    address: string;
    avatar: string;
}
import { ProfileDTO } from "./profile-dto";

export interface RegisterDTO {
    email: string;
    password: string;
    fullName: string;
}

export interface LoginDTO {
    email: string;
    password: string;
    profile: ProfileDTO
}
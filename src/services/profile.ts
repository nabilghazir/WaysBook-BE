import * as profileRepositories from "../repositories/profile";
import { UpdateProfileDTO } from "../types/profile-dto";

export const UpdateProfile = async (id: number, profile: UpdateProfileDTO) => {
    return profileRepositories.updateProfile(id, profile);
}

export const getProfile = async (id: number) => {
    return profileRepositories.getProfile(id);
}
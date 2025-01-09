import { prisma } from "../libs/prisma";
import { UpdateProfileDTO } from "../types/profile-dto";

export const updateProfile = async (id: number, profile: UpdateProfileDTO) => {
    return prisma.profile.update({
        where: {
            id: id
        },
        data: {
            ...profile,
            avatar: profile?.avatar ? profile?.avatar : null
        }
    })
}

export const getProfile = async (id: number) => {
    return prisma.profile.findUnique({
        where: {
            id: id
        }
    })
}
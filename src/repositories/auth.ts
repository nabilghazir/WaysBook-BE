import { prisma } from "../libs/prisma";
import { RegisterDTO } from "../types/auth-dto";



export const checkUser = async (email: string) => {
    return prisma.user.findFirst({
        where: {
            email: email,
        }
    })
}

export const createUser = async (user: RegisterDTO) => {
    return prisma.user.create({
        data: {
            email: user.email,
            password: user.password,
            Profile: {
                create: {
                    fullName: user.fullName
                }
            }
        }
    })
}

export const findUserAndProfile = async (email: string) => {
    return prisma.user.findFirst({
        where: {
            email
        },
        select: {
            id: true,
            email: true,
            role: true,
            Profile: true,
        }
    })
}

export const getAllUser = async () => {
    return prisma.user.findMany({
        select: {
            id: true,
            email: true,
            role: true,
            Profile: true
        }
    })
}
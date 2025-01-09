import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface PostProfileDTO {
    email: string,
    password: string
}

class profileTestService {
    async postProfile(data: PostProfileDTO) {

        const profile = await prisma.user.create({
            data: {
                email: data.email,
                password: data.password
            }
        })

        return profile

    }
}

export default new profileTestService
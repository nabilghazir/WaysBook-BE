import { Request, Response } from "express"
import profileTestService from "../services/profileTest"

class profileTestController {
    async postProfile(req: Request, res: Response) {
        const { email, password } = req.body

        const profile = await profileTestService.postProfile({ email, password })

        if (!profile) {
            res.status(400).json({ message: "Error creating profile" })
        }

        res.status(200).json(profile)
    }
}

export default new profileTestController
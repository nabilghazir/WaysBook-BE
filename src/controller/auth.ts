import { NextFunction, Request, Response } from 'express'
import * as authService from "../services/auth";
import { LoginDTO, RegisterDTO } from '../types/auth-dto';

export const register = async (req: Request, res: Response) => {
    try {
        const fetchingDataForRegister = req.body as RegisterDTO;

        console.log(fetchingDataForRegister);


        const user = await authService.register(fetchingDataForRegister);

        res.json({
            user
        });
    } catch (error) {
        console.error(error);

        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const fetchDataForLogin = req.body as LoginDTO

        const token = await authService.login(fetchDataForLogin)

        res.json({
            token
        })
    } catch (error) {
        console.log(error)

        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}

export const authCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const fetchingUser = res.locals.user

        const profile = await authService.getProfile(fetchingUser.email)

        res.json(profile)
    } catch (error) {
        console.log(error)

        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}

export const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await authService.getAllUser()

        res.json(users)
    } catch (error) {
        console.log(error)

        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}

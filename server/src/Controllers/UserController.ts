import { Request, Response } from 'express';
import * as User from '../BAL/bUser';

export async function LogInWeb(req: Request, res: Response): Promise<Response> {
    const user: { email: string; password: string } = {
        email: req.body.email,
        password: req.body.password,
    };
    const result = await User.LogInWeb(user);
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function GetAllUsers(req: Request, res: Response): Promise<Response> {
    const result = await User.GetAllUsers();
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function GetAllUsersByRole(req: Request, res: Response): Promise<Response> {
    const roleId = req.query.id;
    const result = await User.GetAllUsersByRole(roleId);
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function GetUserById(req: Request, res: Response): Promise<Response> {
    const userId = req.query.id;
    const result = await User.GetUserById(userId);
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function CreateUser(req: Request, res: Response): Promise<Response> {
    const user: { firstName: string; lastName: string; email: string } = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
    };
    const result = await User.CreateUser({ role: req.body.role, data: user });
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function EditUser(req: Request, res: Response): Promise<Response> {
    const request: { id: any; data: { firstName: string; lastName: string } } = {
        id: req.query.id,
        data: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        },
    };
    const result = await User.EditUser(request);
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function ChangePassword(req: Request, res: Response): Promise<Response> {
    const request: { id: any; currentPassword: string; newPassword: string; confirmPassword: string } = {
        id: req.query.id,
        currentPassword: req.body.currentPassword,
        newPassword: req.body.newPassword,
        confirmPassword: req.body.confirmPassword,
    };
    const result = await User.ChangePassword(request);
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function RecoverPassword(req: Request, res: Response): Promise<Response> {
    const userId = req.query.id;
    const result = await User.RecoverPassword(userId);
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function DeleteUser(req: Request, res: Response): Promise<Response> {
    const userId = req.query.id;
    const result = await User.DeleteUser(userId);
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

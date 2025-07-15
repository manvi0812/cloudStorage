import { Request, Response } from "express";
import prisma from "../prisma";

interface AuthRequest extends Request {
    user?: any;
}

export const uploadFile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ msg: 'No file upload' });
            return;
        }

        const newFile = await prisma.file.create({
            data: {
                filename: req.file.originalname,
                filepath: req.file.location,
                size: req.file.size,
                ownerId: req.user.id,
            },
        });

        res.status(201).json(newFile);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
}

export const getUserFiles = async (req: AuthRequest, res: Response) => {
    try {
        const files = await prisma.file.findMany({
            where: { ownerId: req.user.id }
        })
        res.json(files)
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
}
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';

interface AuthRequest extends Request {
    user?: any;
}

const protect = (req: AuthRequest, res: Response, next: NextFunction): void => {
    let token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        res.status(401).json({ msg: 'No token, authorization denied' });
        return;
    }

    token = token.split(' ')[1];

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

        prisma.user.findUnique({ where: { id: decoded.id } })
            .then((user) => {
                if (!user) {
                    res.status(401).json({ msg: 'User not found' });
                    return;
                }
                req.user = user;
                next();
            })
            .catch(() => {
                res.status(401).json({ msg: 'Token is not valid' });
            });
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

export default protect;

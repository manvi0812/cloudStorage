import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from "../prisma";


export const registerUser = async (req: Request, res: Response): Promise<void> => {

    const { username, email, password } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ msg: 'User already exists!' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                username, email, password: hashedPassword
            }
        });
        /*
        This line of code is generating` a JSON Web Token,` or JWT. It's using` a library,` likely` called 
        `jsonwebtoken`,` to create` a token that can` be used` for authentication. Let's break it down: `jwt.sign()`
         is` the function` that creates` the JWT. The first` argument,` `{ id: user.id }`,` is the 
         payload` of the token.` This is` the data` you want to embed` in the token,` in this case` the user's` ID.` 
         The second` argument,` `process.env.JWT_SECRET!`,` is the secret` key used` to sign` the token.` This 
         key is used` to ensure` the token's` integrity` and that it hasn't` been tampered` with.` The 
         exclamation mark` likely` indicates` that the secret` key` is guaranteed` to be present.` The 
         third` argument,` `{ expiresIn: '1d' }`,` specifies` the options` for the token,` in this 
         case` setting` an expiration` time of one` day (`'1d'`).` The entire` line` generates` a JWT,` signs` it 
         with the secret` key,` and sets` an expiration` date.` This token` can then` be used` to authenticate`
          the user` in subsequent` requests. typically` stored` on the client-side` (e.g., in local` storage 
          or cookies)` and sent` with future` requests` to verify` the user's` identity. to ensure` it's valid
        */
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
            expiresIn:
                '1d'
        });

        res.status(201).json({ token, user: { id: user.id, username, email } });

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Server error' });
    }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) { res.status(400).json({ msg: 'Invalid Creds!' }); return; }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { res.status(400).json({ msg: 'Invalid Creds!' }); return; }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

        res.status(200).json({ token, id: user.id, username: user.username, email });

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Server error' });
    }
}
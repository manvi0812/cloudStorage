import 'express';
import { File } from 'multer';

declare global {
    namespace Express {
        interface Request {
            file: File & {
                location?: string;
                key?: string;
            };
        }
    }
}

export { };

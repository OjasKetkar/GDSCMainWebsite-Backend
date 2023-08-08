import multer from "multer"

const storage = multer.memoryStorage()

export const upload = multer({ storage: storage })

export interface MulterRequestSingle extends Request {
    file: any;
    body:any
}

export interface MulterRequestMultiple extends Request {
    files: any[];
}
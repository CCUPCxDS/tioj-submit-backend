import { Request, Response } from "express";
import multer from 'multer';
import { dirname, join } from 'path';


export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join("./", 'tempFile/'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + '-' + Date.now());
  }
});



class testdataController {
  public async uploadHandler(request: Request, response: Response) : Promise<void>{
    console.log(request.body);
    console.log(request.file?.filename);
    response.type('text/plain');
    response.send(request.body);
  }
}

export default testdataController;

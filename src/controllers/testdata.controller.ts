import { Request, Response } from "express";
import multer from 'multer';
import { dirname, join } from 'path';
import AdmZip from 'adm-zip';
import { unzip } from "zlib";
import { mkdirSync, unlinkSync } from 'fs';
import * as dotenv from 'dotenv';
import axios from 'axios';
import cheerio from 'cheerio';

dotenv.config();

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join("./", 'tempFile/'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + '-' + Date.now());
  }
});



class testdataController {
  private unzipFile(filePath : string) : boolean{
    try{
      const zip = new AdmZip(filePath);
      unlinkSync(filePath);
      mkdirSync(filePath, { recursive: true });
      zip.extractAllTo(filePath, true);
      return true;
    }catch(error){
      console.log(error);
      return false;
    }
  };

  private async login(username: string, password: string) {
    const judgeSite = process.env.WEB_SITE // Replace with your actual judge site URL
    console.log('Judge site:', judgeSite, 'Username:', username, 'Password:', password);
    const TIOJusername = username;
    const TIOJpassword = password; // Note: This does not hide the input. Consider using another method for secure input.
    console.log('Logging in...');
  
    try {
      const { data: signInPage } = await axios.get(`${judgeSite}/users/sign_in`);
      const $ = cheerio.load(signInPage);
      const form = $('form');
      const authenticityToken = form.find('input[name="authenticity_token"]').val();
  
      const loginResponse = await axios.post(`${judgeSite}/users/sign_in`, {
        'authenticity_stoken': authenticityToken,
        'user[username]': TIOJusername,
        'user[password]': TIOJpassword,
        'user[remember_me]': '1',
        'commit': 'Sign in'
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
  
      console.log('Login successful!');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
  
    }
  }

  public async uploadHandler(request: Request, response: Response) : Promise<void>{
    const filePath = request.file?.path;
    this.unzipFile(filePath || "")
    await this.login(request.body.username, request.body.password);
    console.log(request.file?.path);
    
    response.type('text/plain');
    response.send(request.body);
  }
}

export default testdataController;

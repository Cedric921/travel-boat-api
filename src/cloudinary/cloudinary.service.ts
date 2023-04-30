import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { cloudinaryConfig } from '../config/cloudinary.config';

@Injectable()
export class CloudinaryService {
  constructor() {
    v2.config(cloudinaryConfig);
  }

  async upload(file: any): Promise<any> {
    return new Promise((resolve, reject) => {
      v2.uploader.upload(file.path, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  async delete(publicId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      v2.uploader.destroy(publicId, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}

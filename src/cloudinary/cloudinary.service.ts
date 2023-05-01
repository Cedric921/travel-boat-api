import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
  constructor(config: ConfigService) {
    v2.config({
      cloud_name: config.get('CLOUDINARY_CLOUD_NAME'),
      api_key: config.get('CLOUDINARY_API_KEY'),
      api_secret: config.get('CLOUDINARY_API_SECRET'),
    });
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

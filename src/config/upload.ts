import { resolve } from 'path';
import { randomBytes } from 'crypto';
import multer, { StorageEngine } from 'multer';

const tmpFolder = resolve(__dirname, '..', '..', 'temp');
const upFolder = resolve(tmpFolder, 'uploads');

interface IUploadConfig {
  driver: 's3' | 'disk';
  tempFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    disk: string;
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,
  tempFolder: tmpFolder,
  uploadsFolder: upFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (request, file, callback) => {
        const fileHash = randomBytes(10).toString('hex');
        const fileName = `${fileHash}_${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },
  config: {
    disk: {},
    aws: {
      bucket: 'app-gobarber',
    },
  },
} as IUploadConfig;

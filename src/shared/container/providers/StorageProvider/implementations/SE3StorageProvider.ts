import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';

import uploadConfig from '@config/upload';

import IStorageProvider from '../models/IStorageProvider';

class SE3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({ region: 'us-east-1' });
  }

  public async saveFile(filePath: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tempFolder, filePath);

    const fileContent = await fs.promises.readFile(originalPath);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) throw new Error('File not found');

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: filePath,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return filePath;
  }

  public async deleteFile(filePath: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: filePath,
      })
      .promise();
  }
}

export default SE3StorageProvider;

import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';

import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(filePath: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tempFolder, filePath),
      path.resolve(uploadConfig.uploadsFolder, filePath),
    );

    return filePath;
  }

  public async deleteFile(filePath: string): Promise<void> {
    const fileFullPath = path.resolve(uploadConfig.uploadsFolder, filePath);

    try {
      await fs.promises.stat(fileFullPath);
    } catch {
      return;
    }

    await fs.promises.unlink(fileFullPath);
  }
}

export default DiskStorageProvider;

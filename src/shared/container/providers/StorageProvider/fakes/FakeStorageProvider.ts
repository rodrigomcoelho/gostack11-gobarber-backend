import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(filePath: string): Promise<string> {
    this.storage.push(filePath);
    return filePath;
  }

  public async deleteFile(filePath: string): Promise<void> {
    const findIndex = this.storage.findIndex(file => file === filePath);

    this.storage.splice(findIndex, 1);
  }
}

export default FakeStorageProvider;

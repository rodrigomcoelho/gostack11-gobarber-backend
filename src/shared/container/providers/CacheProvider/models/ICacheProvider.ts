export default interface ICacheProvider {
  save(key: string, value: any): Promise<void>; //eslint-disable-line
  recover<T>(key: string): Promise<T | null>;
  invalidate(key: string): Promise<void>;
  invalidatePrefix(key: string): Promise<void>;
}

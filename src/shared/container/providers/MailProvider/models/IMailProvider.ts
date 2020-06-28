import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail(dataIn: ISendMailDTO): Promise<void>;
}

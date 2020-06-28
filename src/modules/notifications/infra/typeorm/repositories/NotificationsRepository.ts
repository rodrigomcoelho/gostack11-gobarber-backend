import { MongoRepository, getMongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create(dataIn: ICreateNotificationDTO): Promise<Notification> {
    const { content, recipientId } = dataIn;
    const notification = this.ormRepository.create({ content, recipientId });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;

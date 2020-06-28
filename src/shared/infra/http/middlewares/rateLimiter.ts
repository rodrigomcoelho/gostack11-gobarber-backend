import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';
import AppError from '@shared/errors/AppError';

const redisClient = redis.createClient({
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASS || undefined,
});

const limiter = new RateLimiterRedis({
  keyPrefix: 'rateLimt',
  points: 5,
  duration: 1,
  storeClient: redisClient,
});

const rateLimiter = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (error) {
    throw new AppError('Too many request', 429);
  }
};

export default rateLimiter;

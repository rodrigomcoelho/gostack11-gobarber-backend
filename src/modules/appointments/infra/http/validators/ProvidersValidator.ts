import { celebrate, Segments, Joi } from 'celebrate';

export const monthAvailability = celebrate({
  [Segments.PARAMS]: {
    providerId: Joi.string().uuid().required(),
  },
});

export const dayAvailability = celebrate({
  [Segments.PARAMS]: {
    providerId: Joi.string().uuid().required(),
  },
});

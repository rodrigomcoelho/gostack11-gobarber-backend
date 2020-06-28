import { celebrate, Segments, Joi } from 'celebrate';

const indexValidator = celebrate({
  [Segments.BODY]: {
    provider_id: Joi.string().uuid().required(),
    date: Joi.date().required(),
  },
});

export default indexValidator;

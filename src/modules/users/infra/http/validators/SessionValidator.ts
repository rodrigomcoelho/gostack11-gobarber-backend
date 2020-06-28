import { celebrate, Segments, Joi } from 'celebrate';

const sessionValidator = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
});

export default sessionValidator;

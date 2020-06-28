import { celebrate, Segments, Joi } from 'celebrate';

const userValidator = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
});

export default userValidator;

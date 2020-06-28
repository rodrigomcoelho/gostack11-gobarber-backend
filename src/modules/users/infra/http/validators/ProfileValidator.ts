import { celebrate, Segments, Joi } from 'celebrate';

const profileValidator = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    old_password: Joi.string(),
    password: Joi.string(),
    passwordConfirmation: Joi.string().valid(Joi.ref('password')),
  },
});

export default profileValidator;

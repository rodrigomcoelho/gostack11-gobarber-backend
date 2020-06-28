import { celebrate, Segments, Joi } from 'celebrate';

const resetPasswordValidator = celebrate({
  [Segments.BODY]: {
    token: Joi.string().uuid().required(),
    password: Joi.string().required(),
    passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
  },
});

export default resetPasswordValidator;

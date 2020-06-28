import { celebrate, Segments, Joi } from 'celebrate';

const forgotPasswordValidator = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
  },
});

export default forgotPasswordValidator;

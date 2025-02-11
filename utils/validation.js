const Joi = require("joi");

const schemaAddContact = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$/)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: [
          "com",
          "net",
          "pl",
          "eu",
          "io",
          "so",
          "org",
          "int",
          "edu",
          "gov",
          "dev",
        ],
      },
    })
    .required(),
  phone: Joi.string()
    .min(6)
    .max(12)
    .pattern(
      /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/
    )
    .required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$/)
    .optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: [
          "com",
          "net",
          "pl",
          "eu",
          "io",
          "so",
          "org",
          "int",
          "edu",
          "gov",
          "dev",
          "uk",
        ],
      },
    })
    .optional(),
  phone: Joi.string()
    .min(6)
    .max(12)
    .pattern(
      /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/
    )
    .optional(),
});

const validationAddContact = (object) => schemaAddContact.validate(object);
const validationUpdateContact = (object) =>
  schemaUpdateContact.validate(object);

module.exports = {
  validationAddContact,
  validationUpdateContact,
};

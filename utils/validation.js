const Joi = require("joi");

const schemaAddContact = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .pattern(
      new RegExp("^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$")
    )
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
      new RegExp(
        "+?d{1,4}?[-.s]?(?d{1,3}?)?[-.s]?d{1,4}[-.s]?d{1,4}[-.s]?d{1,9}"
      )
    )
    .required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
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
        ],
      },
    })
    .optional(),
  phone: Joi.string()
    .min(6)
    .max(12)
    .pattern(/+?d{1,4}?[-.s]?(?d{1,3}?)?[-.s]?d{1,4}[-.s]?d{1,4}[-.s]?d{1,9}/)
    .optional(),
});

const validationAddContact = (object) => schemaAddContact.validate(object);
const validationUpdateContact = (object) =>
  schemaUpdateContact.validate(object);

module.exports = {
  validationAddContact,
  validationUpdateContact,
};

const Joi = require('joi');

const userSchema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email({ minDomainAtoms: 2}),
        password: Joi.string().required()
    });

    const loginSchema = Joi.object({
        email: Joi.string().email({ minDomainAtoms: 2 }).optional(),
        password: Joi.string().required()
    });

const profileCreation = Joi.object({
    username: Joi.string().required(),
   // hobbies: Joi.string().required(),
    age: Joi.number().integer(),
    bio: Joi.string().required(),
    Nationality: Joi.string().required(),
    gender: Joi.string().required() 
});

module.exports = {
    '/register': userSchema,
    '/profile-creation': profileCreation,
    '/login': loginSchema
}
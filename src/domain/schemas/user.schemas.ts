import Joi from 'joi'

const id = Joi.number()
const name = Joi.string().min(3)
const email = Joi.string().email()
const password = Joi.string().min(8)
const role = Joi.string().valid('admin', 'seller', 'user')
const phoneNumber = Joi.string().length(10).pattern(/^[0-9]+$/)

export const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  role: role.required(),
  phoneNumber
})

export const updateRoleUserSchema = Joi.object({
  role: role.required()
})

export const credentialsSchema = Joi.object({
  email: email.required(),
  password: password.required()
})

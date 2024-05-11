import Joi from "joi";


//  joi validation 

const addressJoi = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }).lowercase().required().trim(),

  phoneNumber: Joi.number().required(),
  address: Joi.string().min(20).max(60).required()

});

export default addressJoi;

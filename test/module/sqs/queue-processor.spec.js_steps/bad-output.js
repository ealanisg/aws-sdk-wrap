const Joi = require('joi-strict');

module.exports.schema = Joi.object().keys({
  name: Joi.string().valid('bad-output')
});

module.exports.handler = async (payload, event) => [{ name: 'unknown-step' }];

module.exports.next = ['step2'];

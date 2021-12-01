const { validate: uuidValidate } = require("uuid");

const validateId = (id) => {
    const valid = uuidValidate(id);

    if (!valid) throw new Error('Not valid id');
};

module.exports = { validateId };
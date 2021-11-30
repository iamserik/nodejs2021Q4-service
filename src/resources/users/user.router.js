const {
  getAll,
  getSingle,
  addUser,
  deleteUser,
  updateUser,
} = require('./user.service');

const User = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
  },
};

const getAllUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: User,
      },
    },
  },
  handler: getAll,
};

const getSingleUserOpts = {
  schema: {
    response: {
      200: User,
    }
  },
  handler: getSingle,
};

const postUserOpts = {
  schema: {
    body: {
      required: ['name', 'login', 'password'],
      ...User,
    },
    response: {
      201: User,
    }
  },
  handler: addUser,
};

const deleteUserOpts = {
  schema: {
    response: {
      204: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    }
  },
  handler: deleteUser,
};

const updateUserOpts = {
  schema: {
    body: {
      required: ['name', 'login', 'password'],
      ...User,
    },
    response: {
      200: User,
    }
  },
  handler: updateUser,
};

function usersRoute(fastify, options, done) {
  fastify.get('/users', getAllUsersOpts);

  fastify.get('/users/:id', getSingleUserOpts);

  fastify.post('/users', postUserOpts);

  fastify.delete('/users/:id', deleteUserOpts);

  fastify.put('/users/:id', updateUserOpts);

  done();
}

module.exports = usersRoute;

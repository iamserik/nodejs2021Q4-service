import { FastifyInstance, RouteOptions } from 'fastify';

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

const notFound = {
  type: 'object',
  properties: {
    message: { type: 'string' },
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
      404: notFound,
    },
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
    },
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
      404: notFound,
    },
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
      404: notFound,
    },
  },
  handler: updateUser,
};

/**
 * User route plugin
 *
 * @param fastify - Fastify instance
 * @param options - Router options
 * @param done - callback function
 *
 * @return {void}
 */
export default function usersRoute(fastify: FastifyInstance, options: RouteOptions, done: () => void): void {
  fastify.get('/users', getAllUsersOpts);

  fastify.get('/users/:id', getSingleUserOpts);

  fastify.post('/users', postUserOpts);

  fastify.delete('/users/:id', deleteUserOpts);

  fastify.put('/users/:id', updateUserOpts);

  done();
}

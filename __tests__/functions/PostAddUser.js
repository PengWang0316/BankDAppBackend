import postAddUser from '../../src/routers/functions/PostAddUser';

jest.mock('../../src/MongoDB', () => ({ addUser: jest.fn().mockReturnValue(Promise.resolve('id')) }));
jest.mock('../../src/utils/Logger', () => ({ error: jest.fn() }));
jest.mock('../../src/utils/BlockChainHelper', () => ({ addUser: jest.fn() }));

describe('PostAddUser', () => {
  test('addUser without error', async () => {
    const MongoDB = require('../../src/MongoDB');
    const Logger = require('../../src/utils/Logger');
    const BlockChainHelper = require('../../src/utils/BlockChainHelper');

    const req = { body: { firstName: 'firstName', lastName: 'lastName', initialAmount: 1000 } };
    const res = { end: jest.fn() };

    await postAddUser(req, res);
    expect(MongoDB.addUser).toHaveBeenCalledTimes(1);
    expect(MongoDB.addUser).toHaveBeenLastCalledWith({ firstName: 'firstName', lastName: 'lastName' });
    expect(res.end).toHaveBeenCalledTimes(1);
    expect(BlockChainHelper.addUser).toHaveBeenCalledTimes(1);
    expect(BlockChainHelper.addUser).toHaveBeenLastCalledWith('id', req.body.initialAmount);
    expect(Logger.error).not.toHaveBeenCalled();
  });

  test('addUser with database error', async () => {
    const MongoDB = require('../../src/MongoDB');
    MongoDB.addUser.mockReturnValueOnce(Promise.reject());
    const Logger = require('../../src/utils/Logger');
    const BlockChainHelper = require('../../src/utils/BlockChainHelper');

    const req = { body: { firstName: 'firstName', lastName: 'lastName', initialAmount: 1000 } };
    const res = { end: jest.fn() };

    await postAddUser(req, res);
    expect(MongoDB.addUser).toHaveBeenCalledTimes(2);
    expect(MongoDB.addUser).toHaveBeenLastCalledWith({ firstName: 'firstName', lastName: 'lastName' });
    expect(res.end).toHaveBeenCalledTimes(1);
    expect(BlockChainHelper.addUser).toHaveBeenCalledTimes(1);
    expect(Logger.error).toHaveBeenCalledTimes(1);
  });
});

import putDeposit from '../../src/routers/functions/PutDeposit';

// jest.mock('../../src/MongoDB', () => ({ fetchBalance: jest.fn().mockReturnValue(Promise.resolve('100')) }));
jest.mock('../../src/utils/Logger', () => ({ error: jest.fn() }));
jest.mock('../../src/utils/BlockChainHelper', () => ({ deposit: jest.fn().mockReturnValue(Promise.resolve('100')) }));

describe('PutDeposit', () => {
  test('putDeposit without error', async () => {
    const Logger = require('../../src/utils/Logger');
    const BlockChainHelper = require('../../src/utils/BlockChainHelper');
    const req = { body: { userId: 'id', amount: 100 } };
    const res = { json: jest.fn(), end: jest.fn() };

    await putDeposit(req, res);
    expect(BlockChainHelper.deposit).toHaveBeenCalledTimes(1);
    expect(BlockChainHelper.deposit).toHaveBeenLastCalledWith(req.body.userId, req.body.amount);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenLastCalledWith('100');
    expect(res.end).not.toHaveBeenCalled();
    expect(Logger.error).not.toHaveBeenCalled();
  });

  test('putDeposit with BlockChainHelper error', async () => {
    const Logger = require('../../src/utils/Logger');
    const BlockChainHelper = require('../../src/utils/BlockChainHelper');
    BlockChainHelper.deposit.mockReturnValueOnce(Promise.reject());
    const req = { body: { userId: 'id', amount: 100 } };
    const res = { json: jest.fn(), end: jest.fn() };

    await putDeposit(req, res);
    expect(BlockChainHelper.deposit).toHaveBeenCalledTimes(2);
    expect(BlockChainHelper.deposit).toHaveBeenLastCalledWith(req.body.userId, req.body.amount);
    expect(res.json).not.toHaveBeenCalled();
    expect(res.end).toHaveBeenCalledTimes(1);
    expect(Logger.error).toHaveBeenCalledTimes(1);
  });
});

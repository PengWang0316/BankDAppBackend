import putWithdraw from '../../src/routers/functions/PutWithdraw';

// jest.mock('../../src/MongoDB', () => ({ fetchBalance: jest.fn().mockReturnValue(Promise.resolve('100')) }));
jest.mock('../../src/utils/Logger', () => ({ error: jest.fn() }));
jest.mock('../../src/utils/BlockChainHelper', () => ({ withdraw: jest.fn().mockReturnValue(Promise.resolve('100')) }));

describe('PutWithdraw', () => {
  test('putWithdraw without error', async () => {
    const Logger = require('../../src/utils/Logger');
    const BlockChainHelper = require('../../src/utils/BlockChainHelper');
    const req = { body: { userId: 'id', amount: 100 } };
    const res = { json: jest.fn(), end: jest.fn() };

    await putWithdraw(req, res);
    expect(BlockChainHelper.withdraw).toHaveBeenCalledTimes(1);
    expect(BlockChainHelper.withdraw).toHaveBeenLastCalledWith(req.body.userId, req.body.amount);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenLastCalledWith('100');
    expect(res.end).not.toHaveBeenCalled();
    expect(Logger.error).not.toHaveBeenCalled();
  });

  test('putWithdraw with BlockChainHelper error', async () => {
    const Logger = require('../../src/utils/Logger');
    const BlockChainHelper = require('../../src/utils/BlockChainHelper');
    BlockChainHelper.withdraw.mockReturnValueOnce(Promise.reject());
    const req = { body: { userId: 'id', amount: 100 } };
    const res = { json: jest.fn(), end: jest.fn() };

    await putWithdraw(req, res);
    expect(BlockChainHelper.withdraw).toHaveBeenCalledTimes(2);
    expect(BlockChainHelper.withdraw).toHaveBeenLastCalledWith(req.body.userId, req.body.amount);
    expect(res.json).not.toHaveBeenCalled();
    expect(res.end).toHaveBeenCalledTimes(1);
    expect(Logger.error).toHaveBeenCalledTimes(1);
  });
});

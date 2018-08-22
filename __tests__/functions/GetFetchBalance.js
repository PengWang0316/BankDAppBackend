import getFetchBalance from '../../src/routers/functions/GetFetchBalance';

// jest.mock('../../src/MongoDB', () => ({ fetchBalance: jest.fn().mockReturnValue(Promise.resolve('100')) }));
jest.mock('../../src/utils/Logger', () => ({ error: jest.fn() }));
jest.mock('../../src/utils/BlockChainHelper', () => ({ getBalance: jest.fn().mockReturnValue(Promise.resolve('100')) }));

describe('GetFetchBalance', () => {
  test('fetchBalance without error', async () => {
    const Logger = require('../../src/utils/Logger');
    const BlockChainHelper = require('../../src/utils/BlockChainHelper');
    const req = { params: { id: 'id' } };
    const res = { json: jest.fn(), end: jest.fn() };

    await getFetchBalance(req, res);
    expect(BlockChainHelper.getBalance).toHaveBeenCalledTimes(1);
    expect(BlockChainHelper.getBalance).toHaveBeenLastCalledWith('id');
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenLastCalledWith('100');
    expect(res.end).not.toHaveBeenCalled();
    expect(Logger.error).not.toHaveBeenCalled();
  });

  test('fetchBalance with BlockChain error', async () => {
    const Logger = require('../../src/utils/Logger');
    const BlockChainHelper = require('../../src/utils/BlockChainHelper');
    BlockChainHelper.getBalance.mockReturnValue(Promise.reject());
    const req = { params: { id: 'id' } };
    const res = { json: jest.fn(), end: jest.fn() };

    await getFetchBalance(req, res);
    expect(BlockChainHelper.getBalance).toHaveBeenCalledTimes(2);
    expect(BlockChainHelper.getBalance).toHaveBeenLastCalledWith('id');
    expect(res.json).not.toHaveBeenCalled();
    expect(Logger.error).toHaveBeenCalledTimes(1);
    expect(res.end).toHaveBeenCalledTimes(1);
  });
});

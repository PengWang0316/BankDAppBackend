import getFetchAllAccount from '../../src/routers/functions/GetFetchAllAccount';

jest.mock('../../src/MongoDB', () => ({ fetchAllAccount: jest.fn().mockReturnValue(Promise.resolve([{ _id: 1 }])) }));
jest.mock('../../src/utils/Logger', () => ({ error: jest.fn() }));

describe('GetFetchAllAccount', () => {
  test('fetchAllAccount without error', async () => {
    const MongoDB = require('../../src/MongoDB');
    const logger = require('../../src/utils/Logger');
    const req = null;
    const res = { json: jest.fn(), end: jest.fn() };

    await getFetchAllAccount(req, res);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenLastCalledWith([{ _id: 1 }]);
    expect(res.end).not.toHaveBeenCalled();
    expect(logger.error).not.toHaveBeenCalled();
  });

  test('fetchAllAcount with database error', async () => {
    const MongoDB = require('../../src/MongoDB');
    MongoDB.fetchAllAccount.mockReturnValueOnce(Promise.reject());
    const logger = require('../../src/utils/Logger');
    const req = null;
    const res = { json: jest.fn(), end: jest.fn() };

    await getFetchAllAccount(req, res);
    expect(res.json).not.toHaveBeenCalled();
    expect(res.end).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledTimes(1);
  });
});

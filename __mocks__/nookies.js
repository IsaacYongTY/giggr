module.exports = {
    parseCookies: jest.fn().mockResolvedValue({
        'x-auth-token': 'mock nookie token',
    }),
    setCookie: jest.fn(),
    fromMock: 'mock',
};

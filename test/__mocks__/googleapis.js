const googleapis = jest.createMockFromModule('googleapis');

googleapis.google.auth.OAuth2.mockImplementation(() => {
    return {
        setCredentials: () => true,
        generateAuthUrl: () => 'https://google.com/path/to/get/token',
        getToken: () => {
            return {
                tokens: {"access_token": "***********************"}
            }
        }
    }
});

googleapis.google.sheets.mockImplementation(() => {
    return {
        spreadsheets: {
            values: {
                update: jest.fn().mockImplementation(() => true)
            }
        }
    }
});

module.exports = googleapis;

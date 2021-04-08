export default {
  jira: {
    api: {
      endpoint: 'https://your-jira-cloud-tenant.atlassian.net',
      username: 'your@jira.api.username.net',
      password: 'your-jira-api-token',
    },
    project: {
      id: 'your-jira-project-id',
      pagesize: 25,
    },
  },
  google: {
    api: {
      client: {
        id: 'your-google-app-client-id',
        secret: 'your-google-app-client-secret',
      },
      redirect: {
        uris: ['urn:ietf:wg:oauth:2.0:oob', 'http://localhost'],
      },
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      token: {
        path: 'gtoken.json',
      },
    },
    sheets: {
      spreadsheet: {
        id: 'your-google-sheets-spreadsheet-id',
      },
    },
  },
};

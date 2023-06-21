let ACCESS_TOKEN = '';

export const setAccessToken = (key: string) => (ACCESS_TOKEN = key);

export const getAccessToken = () => ACCESS_TOKEN;

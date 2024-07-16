import { AxiosInstance } from "axios"

const AUTH_LOCAL_STORAGE_KEY = 'user'
const getAuth = (): any | undefined => {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }

  try {
    const auth: any = JSON.parse(lsValue)
    if (auth) {
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const setAuth = (auth: any) => {
  if (!localStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(auth)
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

const removeAuth = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

export function setupAxios(axios: AxiosInstance, token: any) {
  axios.defaults.headers.Accept = 'application/json';

  axios.interceptors.request.use(configuration => {
    const auth = getAuth();

    if (auth && auth?.user?.access_token) {
      configuration.headers['x-access-token'] = `${auth.user.access_token || token}`;
    } else {
      configuration.headers['x-access-token'] = '';
    }

    return configuration;
  }, error => Promise.reject(error));
}

export {getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY}

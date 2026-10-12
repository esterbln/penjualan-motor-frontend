import { Cookies } from 'quasar'

const storage = 'dataUser'

export const getProfile = () => {
  return Cookies.get(storage)
}

export const setProfile = (data) => {
  return Cookies.set(storage, JSON.stringify(data), {
    expires: 24 * 60 * 60
    // masa berlaku 24jam
  })
}

const devBaseURL = 'http://waterflowfit.top:3000'
const proBaseURL = 'http://waterflowfit.top:3000'
export const BASE_URL =
  process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL

export const TIMEOUT = 5000
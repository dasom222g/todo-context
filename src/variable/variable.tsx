export const header = {
  headers: {
    'Content-Type': 'application/json',
    'Accept' : 'application/json',
  }
}

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
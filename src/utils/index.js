export function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
  //The maximum is exclusive and the minimum is inclusive
}

export function getUniqId() {
  let id = ''
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < 32; i++) {
    id += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return id
}

export function debounce(func, timeout = 300) {
  console.log('debounce')
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      console.log('timer')
      func.apply(this, args)
    }, timeout)
  }
}

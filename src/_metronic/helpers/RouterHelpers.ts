export function getCurrentUrl(pathname: string) {
  return pathname.split(/[?#]/)[0]
}

export function checkIsActive(pathname: string, url: string) {
  const current = getCurrentUrl(pathname)
  if (!current || !url) {
    return false
  }

  if (current === url) {
    return true
  }

  if (current.indexOf(url) > -1) {
    return true
  }

  return false
}

export function isActiveMenuItem(pathname: string, url: string) {
  if (typeof pathname !== 'string' || typeof url !== 'string') {
    return false
  }
  const path_1 = pathname.split('/')[1]
  const url_1 = url.split('/')[1]

  if (!path_1 || !url_1) {
    return false
  }
  return path_1 === url_1
}

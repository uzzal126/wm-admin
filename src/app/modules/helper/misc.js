import moment from 'moment'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'

export const ToolTipLabel = ({label, tooltip, className}) => {
  return (
    <OverlayTrigger placement='top' overlay={<Tooltip>{tooltip}</Tooltip>}>
      {({ref, ...triggerHandler}) => (
        <label {...triggerHandler} className={`form-label ${className}`}>
          <span className='me-1'>{label}</span>
          <i ref={ref} className='fas fa-info-circle fs-6'></i>
        </label>
      )}
    </OverlayTrigger>
  )
}
export const OnlyTooltip = ({tooltip, className}) => {
  return (
    <OverlayTrigger placement='top' overlay={<Tooltip>{tooltip}</Tooltip>}>
      <span className={className}>
        <i className='fas fa-info-circle fs-6 ms-1'></i>
      </span>
    </OverlayTrigger>
  )
}

export const enumFormatter = (enumWord = '') => {
  try {
    let words = enumWord?.includes('_')
      ? enumWord?.toLowerCase()?.split('_')
      : enumWord?.toLowerCase()?.split(' ') //returns array
    for (let i = 0; i < words?.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1)
    }
    return words?.join(' ')
  } catch (e) {
    return enumWord
  }
}

export const camelToSnake = (str = '', lowercase = true) => {
  return str.replace(/[A-Z]/g, (c) => {
    return lowercase ? '_' + c.toLowerCase() : '_' + c
  })
}

export const prettyPrint = (word = '') => {
  console.log('ugly word', word)
  try {
    return word.match(/[A-Z][a-z]+|[0-9]+/g).join(' ')
  } catch (e) {
    return word
  }
}

export const check_date_expiry = (presentDate = Date.now(), compareDate) => {
  return moment(presentDate).isAfter(moment(compareDate))
}
export const TooltipComponent = ({tooltip, children}) => {
  return (
    <OverlayTrigger placement='top' overlay={<Tooltip>{tooltip}</Tooltip>}>
      {children}
    </OverlayTrigger>
  )
}
export const findUnique = (arr, predicate) => {
  var found = {}
  arr.forEach((d) => {
    found[predicate(d)] = d
  })
  return Object.keys(found).map((key) => found[key])
}

export const dateReadable = (date, format = 'MM/DD/YY HH:mm:ss') => {
  return moment(date).format(format)
}

export const dateUnixReadable = (date, format = 'DD/MM/YY HH:mm:ss') => {
  return moment.unix(date).format(format)
}

export const unique = (a) => [...new Set(a)]
export const uniqueBy = (x, f) => Object.values(x.reduce((a, b) => ((a[f(b)] = b), a), {}))
export const intersection = (a, b) => a.filter((v) => b.includes(v))
export const diff = (a, b) => a.filter((v) => !b.includes(v))
export const symDiff = (a, b) => diff(a, b).concat(diff(b, a))
export const union = (a, b) => diff(a, b).concat(b)
export const intersectionBy = (a, b, f) => a.filter((v) => b.some((u) => f(v, u)))

export function arrDiff(a1, a2) {
  // console.log(a1, a2)
  var a = [],
    diff = []

  for (var i = 0; i < a1.length; i++) {
    a[a1[i]] = true
  }

  for (var i = 0; i < a2.length; i++) {
    if (a[a2[i]]) {
      delete a[a2[i]]
    } else {
      a[a2[i]] = true
    }
  }

  for (var k in a) {
    diff.push(k)
  }

  return diff
}

export const linkify = (str = '') => {
  str = str.replace(/^\s+|\s+$/g, '') // trim
  str = str.toLowerCase()

  var from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;'
  var to = 'aaaaaeeeeeiiiiooooouuuunc------'
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

  return str
}

export function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(2) + ' K'
    : Math.sign(num) * Math.abs(num)
}

export const timeFormatter = (time) => {
  const avgSessionTime = moment.duration(time)
  //`${avgSessionTime.minutes()} m, ${avgSessionTime.seconds()} s`
  let formattedTime = ''
  formattedTime += avgSessionTime.minutes() > 0 ? `${avgSessionTime.minutes()} m, ` : ''
  formattedTime += avgSessionTime.seconds() > 0 ? `${avgSessionTime.seconds()} s` : ''
  return formattedTime
}

export function numberWithCommas(x, hideSign) {
  // return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
  if (hideSign) {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(Number(x))
  } else {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'BDT',
      currencyDisplay: 'narrowSymbol',
      maximumFractionDigits: 0,
    }).format(Number(x))
  }
}

export const reactSelectify = (list = [], key) => {
  if (Array.isArray(list)) {
    let newList = []
    for (let i = 0; i < list.length; i++) {
      newList.push({
        ...list[i],
        label: list[i][key],
        value: list[i][key],
      })
    }

    return newList
  } else {
    return []
  }
}

export const setLocal = (data, name) => {
  if (!localStorage) {
    return
  }

  try {
    const lsValue = typeof data === 'object' ? JSON.stringify(data) : data
    localStorage.setItem(name, lsValue)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}
export const getLocal = (name) => {
  if (!localStorage) {
    return
  }

  const lsValue = localStorage.getItem(name)
  if (!lsValue) {
    return
  }

  try {
    const auth = JSON.parse(lsValue)
    if (auth) {
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

export const deleteLocal = (name) => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(name)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

export const formatPrice = (price) => {
  return price ? new Intl.NumberFormat('en-IN').format(Number(price)) : 0
}

export const getAddedDay = (days_to_be_added) => {
  let formattedDate = ''
  try {
    // Get the current date
    const currentDate = moment()

    // Add 25 days to the current date
    const futureDate = currentDate.add(days_to_be_added, 'days')

    // Format the result as a string
    formattedDate = futureDate.format('LL')
  } catch (err) {
    formattedDate = 'Invalid Date'
  } finally {
    return formattedDate
  }
}

export const getLastValidDate = (package_) => {
  if (package_ === 'yearly') {
    return getAddedDay(365)
  } else if (package_ === 'half_yearly') {
    return getAddedDay(6 * 30)
  } else if (package_ === 'quarterly') {
    return getAddedDay(3 * 30)
  } else if (package_ === 'monthly') {
    return getAddedDay(30)
  }
}

export const validity = {
  yearly: 365,
  half_yearly: 6 * 30,
  quarterly: 3 * 30,
  monthly: 1 * 30,
}

export const getYearMonthDayof = (package_) => {
  const days = validity[package_]

  if (typeof days !== 'number' || days < 0) {
    return 'Invalid input'
  }

  const years = Math.floor(days / 365)
  const months = Math.floor((days % 365) / 30)
  const remainingDays = (days % 365) % 30

  const years_str = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : ''
  const months_str =
    months > 0 ? `${years > 0 ? ',' : ''} ${months} month${months > 1 ? 's' : ''}` : ''
  const remainingDays_str =
    remainingDays > 0
      ? `${months > 0 ? ',' : ''} ${remainingDays} day${remainingDays > 1 ? 's' : ''}.`
      : '.'

  return years_str + months_str + remainingDays_str
}

export function slugToTitle(slug, split_operator = '_') {
  if (!slug) {
    return ''
  }

  // Split the slug into words
  const words = slug.split(split_operator)

  // Capitalize each word
  const capitalizedWords = words.map((word) => {
    // Capitalize the first letter of each word and make the rest lowercase
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  })

  // Join the capitalized words with spaces
  const title = capitalizedWords.join(' ')

  return title
}

export function utf8ByteLength(value) {
  // Create a new TextEncoder instance to encode the string as UTF-8
  const encoder = new TextEncoder()
  // Encode the string and get the byte length
  const byteLength = encoder.encode(value).length
  return byteLength
}

export function hasProperties(obj, properties) {
  if (typeof obj !== 'object') return false
  return properties.every((prop) => obj.hasOwnProperty(prop))
}

export function formatNumber(number, toFixed) {
  const suffixes = ['', 'k', 'm', 'b', 't']
  const order = Math.min(Math.floor(Math.log10(Math.abs(number)) / 3), suffixes.length - 1)
  const rounded = (number / 1000 ** order).toFixed(toFixed)
  return `${isNaN(rounded) ? '0' : rounded}${suffixes[order] || ''}`
}

export const sumValuesByKey = (arrayOfObjects, key) =>
  arrayOfObjects.reduce((total, obj) => total + (obj[key] || 0), 0)

export const betterParse = (data) => {
  if (typeof data === 'object') {
    return data
  } else if (Array.isArray(data)) {
    return data
  } else if (typeof data === 'string') {
    try {
      return JSON.parse(data)
    } catch (e) {
      console.error('parse err')
      return {}
    }
  } else if (typeof data?.feature_list === 'string') {
    try {
      return JSON.parse(data)
    } catch (e) {
      console.error('parse err')
      return {}
    }
  } else {
    console.error('parse err')
    return {}
  }
}

export const omitByKeys = (obj, keysToOmit = []) => {
  try {
    const newObj = {...obj} // Create a copy of the original object

    if (!Array.isArray(keysToOmit)) {
      throw new Error('Keys to omit should be provided in an array')
    }

    keysToOmit.forEach((key) => {
      if (newObj.hasOwnProperty(key)) {
        delete newObj[key] // Delete the property if it exists
      }
    })

    return newObj // Return the modified object
  } catch (error) {
    console.error('Error:', error.message)
    return obj // Return the original object in case of an error
  }
}

export const matchRegex = (regex = /()/, string) => {
  return regex.test(string)
}

export const checkBdMobile = (mobileNo = '', includeCountryCode = true) => {
  const phoneRegExp = includeCountryCode
    ? /(^(\+88|0088|88)?(01){1}[3456789]{1}(\d){8})$/
    : /(^(\88|0088|88)?(01){1}[3456789]{1}(\d){8})$/
  try {
    return matchRegex(phoneRegExp, mobileNo)
  } catch (e) {
    console.log(e)
    return false
  }
}

export const checkEmail = (email = '') => {
  const emailRegExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
  try {
    return matchRegex(emailRegExp, email)
  } catch (e) {
    console.log(e)
    return false
  }
}

export const calculateUtf8Length = (text) => {
  const encoder = new TextEncoder()
  const utf8Bytes = encoder.encode(text)
  return utf8Bytes.length
}

export const formatLongString = (string = '', charsToKeep = 1) => {
  try {
    if (string?.length > charsToKeep) {
      return `${string?.slice(0, charsToKeep)}...`
    } else {
      return string
    }
  } catch (e) {
    return string
  }
}

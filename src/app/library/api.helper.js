import axios from 'axios'
// import { setupCache } from 'axios-cache-adapter'
import {
  ADD_CATEGORY,
  ADD_NEW_CATEGORY,
  ADD_NEW_PRODUCT,
  AREA_LIST,
  ATTRIBUTE_ADD,
  ATTRIBUTE_DELETE,
  BASE_URL,
  CATEGORY_DETAILS,
  CATEGORY_ICONS,
  CITY_LIST,
  CURRENT_STOCK_REPORT,
  CUSTOMER_LIST,
  DASHBOARD_DATA,
  DELETE_CATEGORY,
  GET_BRAND_LIST,
  GET_CATEGORY_LIST,
  GET_CATEGORY_TREE,
  GET_PRODUCT_LIST,
  GET_STSTUS_LIST,
  ORDER_ADD,
  ORDER_REPORT,
  ORDER_REQUEST_DETAILS,
  ORDER_REQUEST_STATUS_UPDATE,
  ORDER_STATUS_LIST,
  PRODUCT_ASSIGN_CATEGORY,
  PRODUCT_DETAILS,
  REGION_LIST,
  SALES_REPORT,
  SIGN_IN,
  STOCK_LIST,
  UPDATE_PRODUCT,
  UPLOAD_IMAGE_BASE64,
  UPLOAD_IMAGE_FILE,
  VISITORS_REPORT,
} from '../constants/api.constants'
import { getAuth, setAuth } from '../modules/auth'
const auth = getAuth()

function getLocalAccessToken() {
  return auth && auth.user ? auth.user.access_token : ''
}
function getLocalRefreshToken() {
  return auth && auth.user ? auth.user.refresh_token : ''
}

// export const cache = setupCache({
//   maxAge: 5000,
// })

axios.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken()
    // config.adapter = cache.adapter
    if (token) {
      config.headers['x-access-token'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  async (res) => {
    // // console.log("resdd", res)
    const originalConfig = res.config
    if (res?.data.status_code === 602 && !originalConfig._retry) {
      originalConfig._retry = true
      try {
        const rs = await refreshToken()
        // console.log('rs', rs)
        if (rs.data.status_code === 200) {
          const { access_token } = rs.data
          auth.user.access_token = access_token
          setAuth(auth)
          axios.defaults.headers['x-access-token'] = access_token
          return axios(originalConfig)
        }
      } catch (_error) {
        // console.log('_error', _error)
        if (_error.response && _error.response.data) {
          return Promise.reject(_error.response.data)
        }
        return Promise.reject(_error)
      }
    } else {
      return res
    }
    // return res;
  },
  async (err) => {
    // // console.log("err", err)
    const originalConfig = err.config
    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true
        try {
          const rs = await refreshToken()
          const { access_token } = rs.data

          auth.user.access_token = access_token
          setAuth(auth)

          axios.defaults.headers['x-access-token'] = access_token
          return axios(originalConfig)
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data)
          }
          return Promise.reject(_error)
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data)
      }
    }
    return Promise.reject(err)
  }
)

function refreshToken() {
  return axios.post(`${BASE_URL}/token/refresh`, {
    refresh_token: getLocalRefreshToken(),
  })
}

export const signIn = async (email, password) => {
  try {
    const { data: response } = await axios({
      method: 'POST',
      url: SIGN_IN,

      data: {
        email,
        password,
      },
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const getProductList = async (access_token, uId, storeId, page, items_per_page, search) => {
  try {
    const { data: response } = await axios({
      method: 'GET',
      url: STOCK_LIST,
      params: {
        page,
        items_per_page,
        search,
      },
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const getCategoryTree = async () => {
  try {
    const { data: response } = await axios({
      method: 'get',
      url: GET_CATEGORY_TREE,
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const addCategory = async (parent, title, slug, catid, description) => {
  try {
    const { data: response } = await axios({
      method: 'POST',
      url: ADD_CATEGORY,
      data: {
        parent,
        title,
        slug,
        catid: catid,
        description,
      },
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const deleteCategory = async (catid) => {
  try {
    const { data: response } = await axios({
      method: 'delete',
      url: `${DELETE_CATEGORY}/${catid}`,
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const updateCategoryDetails = async (
  access_token,
  uid,
  storeId,
  catid,
  parent,
  slug,
  formData,
  image_path,
  icon_path
) => {
  const form = new FormData()
  form.append('parent', parent)
  form.append('slug', slug)
  form.append('title', formData.title)
  form.append('description', formData.description)
  form.append('catid', catid)
  form.append('status', formData.status)
  form.append('meta_title', formData.meta_title)
  form.append('meta_keyword', formData.meta_keyword)
  form.append('meta_description', formData.meta_description)

  try {
    const { data: response } = await axios({
      method: 'POST',
      url: CATEGORY_DETAILS,

      data: {
        parent,
        slug,
        title: formData.title,
        description: formData.description,
        catid,
        image_path,
        icon_path: formData.icon_path,
        keyword: 'keyword',
        status: formData.status,
        meta_title: formData.meta_title,
        meta_description: formData.meta_description,
        meta_keyword: formData.meta_keyword,
      },
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const getCategoryList = async (access_token, uid, sid) => {
  try {
    const { data: response } = await axios({
      method: 'get',
      url: GET_CATEGORY_LIST,
      headers: {},
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const getBrandList = async (access_token, uid, sid) => {
  try {
    const { data: response } = await axios({
      method: 'get',
      url: GET_BRAND_LIST,
      headers: {},
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const getStatusList = async (access_token, uid, sid) => {
  try {
    const { data: response } = await axios({
      method: 'get',
      url: GET_STSTUS_LIST,
      headers: {},
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}
export const getOrderStatusList = async (access_token, uid, sid) => {
  try {
    const { data: response } = await axios({
      method: 'POST',
      url: ORDER_STATUS_LIST,
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const addProduct = async (access_token, uid, sid, values) => {
  try {
    const { data: response } = await axios({
      method: 'POST',
      url: ADD_NEW_PRODUCT,
      headers: {},
      data: {
        ...values,
      },
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const getProductDetails = async (access_token, uid, sid, pdId) => {
  try {
    const { data: response } = await axios({
      method: 'GET',
      url: `${PRODUCT_DETAILS}/${pdId}`,
      headers: {},
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const getCategoryIcons = async (access_token, uid, sid) => {
  try {
    const { data: response } = await axios({
      method: 'POST',
      url: CATEGORY_ICONS,
      headers: {},
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const updateProduct = async (access_token, uid, sid, values, id) => {
  try {
    const { data: response } = await axios({
      method: 'POST',
      url: UPDATE_PRODUCT,
      headers: {},
      data: {
        ...values,
        pd_id: id,
      },
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const addOrder = async (access_token, uid, data) => {
  try {
    const { data: response } = await axios({
      method: 'POST',
      url: ORDER_ADD,
      data,
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const getRegionList = async (uid, sid) => {
  try {
    const { data: response } = await axios({
      method: 'GET',
      url: REGION_LIST,
      headers: {},
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const getCityList = async (uid, sid, region) => {
  try {
    const { data: response } = await axios({
      method: 'GET',
      url: `${CITY_LIST}/${region}`,
      headers: {},
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const getAreaList = async (uid, sid, city) => {
  try {
    const { data: response } = await axios({
      method: 'GET',
      url: `${AREA_LIST}/${city}`,
      headers: {},
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const getCustomerList = async (parem) => {
  try {
    const { data: response } = await axios({
      method: 'GET',
      url: CUSTOMER_LIST + parem,
      headers: {},
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const addProductAttribute = async (access_token, uid, data) => {
  try {
    const { data: response } = await axios({
      method: 'POST',
      url: ATTRIBUTE_ADD,
      headers: {},
      data,
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const deleteProductAttribute = async (access_token, uid, data) => {
  try {
    const { data: response } = await axios({
      method: 'POST',
      url: ATTRIBUTE_DELETE,
      headers: {},
      data,
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const getOrderRequestDetails = async (uid, sid, order_id) => {
  try {
    const { data: response } = await axios({
      method: 'GET',
      url: `${ORDER_REQUEST_DETAILS}/${order_id}`,
      headers: {},
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const changeOrderRequestStatus = async (uid, sid, roid, rdid, status) => {
  try {
    const { data: response } = await axios({
      method: 'POST',
      url: ORDER_REQUEST_STATUS_UPDATE,
      headers: {},
      data: {
        rdid,
        roid,
        status,
      },
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const getProducts = async (search) => {
  // const user = JSON.parse(localStorage.getItem('user'))
  try {
    const { data: response } = await axios({
      method: 'GET',
      url: STOCK_LIST,
      params: {
        search,
      },
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const assignProductsToCategory = async (cat_id, data) => {
  const user = JSON.parse(localStorage.getItem('user'))
  try {
    const { data: response } = await axios({
      method: 'POST',
      url: PRODUCT_ASSIGN_CATEGORY,
      data: {
        cat_id,
        pd_id: data,
      },
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const addNewCategory = async (data) => {
  const user = JSON.parse(localStorage.getItem('user'))
  try {
    const { data: response } = await axios({
      method: 'POST',
      url: ADD_NEW_CATEGORY,
      data: {
        ...data,
      },
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const getProductListByCategory = async (cat_id, data) => {
  const user = JSON.parse(localStorage.getItem('user'))
  try {
    const { data: response } = await axios({
      method: 'POST',
      url: `${GET_PRODUCT_LIST}/${cat_id}`,
      data: {
        ...data,
      },
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const getCurrentStockReport = async (export_data_format, stock = 'low') => {
  try {
    const { data: response } = await axios({
      method: 'GET',
      url: `${CURRENT_STOCK_REPORT}?export_data_format=${export_data_format}&stock_type=${stock}`,
      headers: {
        'export-data-format': export_data_format,
        'stock-type': stock,
      },
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}
export const getCurrentOrderReport = async (export_data_format) => {
  const user = JSON.parse(localStorage.getItem('user'))
  try {
    const { data: response } = await axios({
      method: 'GET',
      url: `${ORDER_REPORT}?export_data_format=${export_data_format}`,
      headers: {
        'export-data-format': export_data_format,
      },
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const getCurrentSalesReport = async (export_data_format) => {
  const user = JSON.parse(localStorage.getItem('user'))
  try {
    const { data: response } = await axios({
      method: 'GET',
      url: `${SALES_REPORT}?export_data_format=${export_data_format}`,
      headers: {
        'export-data-format': export_data_format,
      },
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const getVisitorsReport = async (export_data_format, start_date, end_date) => {
  const user = JSON.parse(localStorage.getItem('user'))
  try {
    const { data: response } = await axios({
      method: 'GET',
      url: `${VISITORS_REPORT}?start_date=${start_date}&end_date=${end_date}&export_data_format=${export_data_format}`,
      headers: {
        'export-data-format': export_data_format,
      },
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const getDashboardData = async (start_date, end_date) => {
  const user = JSON.parse(localStorage.getItem('user'))
  try {
    const { data: response } = await axios({
      method: 'GET',
      url: `${DASHBOARD_DATA}?start_date=${start_date}&end_date=${end_date}`,
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const uploadImageBase64 = async (access_token, uid, image) => {
  try {
    const { data: response } = await axios({
      method: 'POST',
      url: UPLOAD_IMAGE_BASE64,
      headers: {},
      data: {
        field_name: 'product_gallery',
        image,
      },
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}
export const uploadImageFile = async (file) => {
  try {
    let formData = new FormData()
    formData.append('image', file)
    formData.append('field_name', `product_gallery`)
    const { data: response } = await axios({
      method: 'POST',
      url: UPLOAD_IMAGE_FILE,
      data: formData,
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const FileUploader = async (file) => {
  let result = null

  let formData = new FormData()
  formData.append('image', file)
  formData.append('field_name', `product_gallery`)

  await fetch(UPLOAD_IMAGE_FILE, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      result = data
    })
    .catch((error) => {
      console.error('Error:', error)
    })

  return result
}

export const FileUpload = async (file, name) => {
  let result = null
  await axios({
    method: 'POST',
    url: UPLOAD_IMAGE_BASE64,

    data: {
      field_name: name || 'product_gallery',
      image: file,
    },
  })
    .then((res) => {
      result = res.data
    })
    .catch((error) => {
      result = error
    })

  return result
}

export const uploadFile = async (file, name) => {
  let result = null
  await axios({
    method: 'POST',
    url: UPLOAD_IMAGE_BASE64,

    data: {
      field_name: name || 'product_gallery',
      image: file,
    },
  })
    .then((res) => {
      result = res.data
      console.log('🚀 ~ file: api.helper.js:896 ~ .then ~ result:', result)
    })
    .catch((error) => {
      result = error
    })

  return result
}

export const queryRequest = async (url, data, method = 'POST') => {
  try {
    const { data: response } = await axios({
      method: method,
      url: url,
      data: data,
    })

    return response
  } catch (err) {
    if (err.response?.data) { return err.response.data; }

    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}
export const getQueryRequest = async (url) => {
  try {
    const { data: response } = await axios({
      method: 'GET',
      url: url,
    })

    return response
  } catch (err) {
    if (err.response?.data) { return err.response.data; }

    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

export const queryRequestParallel = async (url, data) => {
  // con
  return await axios({
    method: 'POST',
    url: url,
    data: data,
  })
}

export const getQueryRequestParallel = async (url) => {
  return await axios({
    method: 'GET',
    url: url,
  })
}
export const ParallelApiCalling = async (promise) => {
  // promise = [getCompoents(), getMenuList(), getStoreInfo()]

  try {
    return await Promise.all(promise)
  } catch (err) {
    return err
  }
}

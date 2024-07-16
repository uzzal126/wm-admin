// let baseUrl = ''
// if (import.meta.env.NODE_ENV === 'production') {
//   baseUrl = import.meta.env.VITE_LIVE_API_URL
// } else {
//   baseUrl = import.meta.env.VITE_API_URL
// }

export const BASE_URL = import.meta.env.VITE_API_URL

// AUTH SERVICE
export const TOKEN_REFRESH = `${BASE_URL}/auth/token/refresh`
export const SIGN_IN = `${BASE_URL}/auth/user/sign-in`
export const REGISTER_URL = `${BASE_URL}/register`
export const FORGOT_PASSWORD_URL = `${BASE_URL}/auth/forgot_password`
export const POST_USER_UPDATE = `${BASE_URL}/auth/user/info/update`

// File Service
export const UPLOAD_IMAGE_BASE64 = `${BASE_URL}/file/upload/base64`
export const UPLOAD_IMAGE_FILE = `${BASE_URL}/file/upload/file`
export const CATEGORY_ICONS = `${BASE_URL}/file/common/files`

//store
export const STORE_CAT_LIST = `${BASE_URL}/onboard/store/open-category-list`

// PRODUCT SERVICE
export const GET_PRODUCT_LIST = `${BASE_URL}/product`
export const GET_PRODUCT_VARIANTS = `${BASE_URL}/product/variant/detail`
export const GET_PRODUCT_VARIANTS_DELETED = `${BASE_URL}/product/variant/deleted/detail`
export const GET_CATEGORY_TREE = `${BASE_URL}/product/category-tree`
export const ADD_CATEGORY = `${BASE_URL}/product/category/name`
export const DELETE_CATEGORY = `${BASE_URL}/product/category`
export const CATEGORY_DETAILS = `${BASE_URL}/product/category/detail`
export const GET_CATEGORY_LIST = `${BASE_URL}/product/category`
export const CATEGORY_SORT = `${BASE_URL}/product/category/sort`
export const GET_STSTUS_LIST = `${BASE_URL}/product/status`
export const ADD_NEW_PRODUCT = `${BASE_URL}/product/add`
export const PRODUCT_DETAILS = `${BASE_URL}/product/details`
export const PRODUCT_DETAILS_NEW = `${BASE_URL}/product/details`
export const UPDATE_PRODUCT = `${BASE_URL}/product/info/update`
export const STOCK_LIST = `${BASE_URL}/product/stock/list`
export const PRODUCT_STOCK_UPDATE = `${BASE_URL}/product/stock/update`
export const PRODUCT_STOCK_ALERT = `${BASE_URL}/product/low-stock/threshold-update`
export const PRODUCT_STOCK_HISTORY = `${BASE_URL}/product/stock/history`
export const ATTRIBUTE_ADD = `${BASE_URL}/product/attribute/add`
export const ATTRIBUTE_DELETE = `${BASE_URL}/product/attribute/delete`
export const ATTRIBUTE_EDIT = `${BASE_URL}/product/attribute/edit`
export const PRODUCT_ASSIGN_CATEGORY = `${BASE_URL}/product/assign/category`
export const ADD_NEW_CATEGORY = `${BASE_URL}/product/category/name`
export const GET_CAMPAIGN_PRODUCT = `${BASE_URL}/product/campaign`
export const POST_CAMPAIGN_PRODUCT = `${BASE_URL}/product/assign/campaign`
export const POST_CAMPAIGN_REMOVE_PRODUCT = `${BASE_URL}/product/resign/campaign`
export const POST_CATEGORY_REMOVE_PRODUCT = `${BASE_URL}/product/resign/category`
export const POST_ADD_TAG = `${BASE_URL}/product/tags`
export const POST_DELETE_TAG = `${BASE_URL}/product/tags`
export const POST_UPDATE_TAG = `${BASE_URL}/product/tags`
export const GET_TAG = `${BASE_URL}/product/tags`
export const GET_BRAND_LIST = `${BASE_URL}/product/brands`
export const POST_ADD_BRAND = `${BASE_URL}/product/brands`
export const POST_UPDATE_BRAND = `${BASE_URL}/product/brands`
export const POST_DELETE_BRAND = `${BASE_URL}/product/brands`
export const GET_WISHLIST = `${BASE_URL}/product/wishlist`
export const GET_ATTRIBUTES = `${BASE_URL}/product/attribute/list`
// ORDER API SERVICE
// NEW
export const REPORT_PROFIT_LOSS = `${BASE_URL}/report/profit-loss`
export const REPORT_SALES_BY_ITEM = `${BASE_URL}/report/sales-by-item`
export const REPORT_SALES_BY_CUSTOMER = `${BASE_URL}/report/sales-by-customer`
export const REPORT_SALES_BY_PERSON = `${BASE_URL}/report/sales-by-sales-person`
export const REPORT_SALES_BY_CHANNEL = `${BASE_URL}/report/sales-by-channel`
export const REPORT_SALES_RETURN = `${BASE_URL}/report/sales-return`
export const REPORT_INVENTORY = `${BASE_URL}/report/inventory/details`
export const REPORT_WISHLIST = `${BASE_URL}/report/wishlist-report`
export const REPORT_CUSTOMER = `${BASE_URL}/report/customer-list`
export const REPORT_REVIEW = `${BASE_URL}/report/customer-review`
export const REPORT_SALE_BY_ITEM = `${BASE_URL}/report/product-order-list`

export const DASHBOARD_ORDER_SUMMARY = `${BASE_URL}/report/order/summary`
export const DASHBOARD_INVENTORY_SUMMARY = `${BASE_URL}/report/inventory/summary`
export const DASHBOARD_STATUS_SUMMARY = `${BASE_URL}/report/order/by-status`
export const DASHBOARD_ORDER_GRAPH = `${BASE_URL}/report/order/graph`
export const DASHBOARD_TOP_SELLING = `${BASE_URL}/report/top-selling-product`
export const DASHBOARD_NOT_SELLING = `${BASE_URL}/report/not-selling-product`
export const DASHBOARD_LOW_STOCK = `${BASE_URL}/report/low-stock-product`

export const ORDER_DETAILS = `${BASE_URL}/order`
export const ORDER_SHIPPING = `${BASE_URL}/order/shipping`
export const REQUEST_ORDER = `${BASE_URL}/order/request/list`
export const ORDER_BULK_INVOICE = `${BASE_URL}/order/invoice/list`
export const ORDER_INVOICE_LEVEL = `${BASE_URL}/order/invoice/level/data`
export const ORDER_STATUS = `${BASE_URL}/order/status`
export const ORDER_STATUS_NEW = `${BASE_URL}/order/status`
export const ORDER_STATUS_LIST = `${BASE_URL}/order/status/list`
export const POST_PROGRESS_LIST = `${BASE_URL}/order/progress/list`
export const ORDER_PROGRESS_LIST = `${BASE_URL}/order/progress`

export const ADD_NOTE = `${BASE_URL}/order/note`

export const ORDER_LIST = `${BASE_URL}/order`
export const ORDER_DELETE = `${BASE_URL}/order`
export const ORDER_ADD = `${BASE_URL}/order`
export const ORDER_REQUEST_DETAILS = `${BASE_URL}/order/request/detail`
export const ORDER_REQUEST_STATUS_UPDATE = `${BASE_URL}/order/request/status/update`
export const POST_EXTRA_DISCOUNT = `${BASE_URL}/order/discount`
export const POST_ORDER_PRODUCT_DELETE = `${BASE_URL}/order/product`
export const POST_ORDER_PRODUCT_ADD = `${BASE_URL}/order/product`
export const POST_ORDER_MANUAL_PAYMENT = `${BASE_URL}/payment/manual`
export const ORDER_PRODUCT_DELETE = `${BASE_URL}/order/product`
export const ORDER_PAYMENT_METHODS = `${BASE_URL}/order/payment-methods`

// COURIER SERVICE OR PAYMENT SERVICE
export const SET_DEFAULT_COURIER = `${BASE_URL}/payment/make-default-courier-store`
export const GET_COURIER_PARTNER = `${BASE_URL}/payment/get-courier-partner`
export const GET_COURIER_FEE = `${BASE_URL}/payment/store-wise-admin-shipping-price-calculation-config`
export const POST_COURIER_FEE = `${BASE_URL}/payment/update-store-wise-shipping`
export const POST_COURIER_ACTIVE_REQUEST = `${BASE_URL}/payment/courier-activation-request`
export const POST_COURIER_ACTIVE = `${BASE_URL}/payment/activate-courier`
export const POST_COURIER_DEACTIVATE = `${BASE_URL}/payment/deactivate-courier`
export const GET_COURIER_STORE = `${BASE_URL}/payment/shop-courier-store-list`
export const POST_CREATE_COURIER_STORE = `${BASE_URL}/payment/create-courier-store`
export const POST_COURIER_FEE_HISTORY = `${BASE_URL}/payment/get_store_wise_courier_price`
export const GET_COURIER_STORE_NAME = `${BASE_URL}/payment/get-courier-store-name-preffix`
export const GET_PAYMENT_CHANNELS = `${BASE_URL}/payment/authorized-get-payment-partner`
export const POST_PAYMENT_CHANNELS_INSTALL = `${BASE_URL}/payment/client-payment-partner-activation-request`
export const GET_CHANNEL_CONFIGURE = `${BASE_URL}/payment/get-payment-partner-configuration`
export const POST_PAYMENT_CONFIGURE = `${BASE_URL}/payment/add-client-payment-partner-config`
export const POST_ACTIVE_CHANNEL = `${BASE_URL}/payment/activate-client-payment-partner`
export const POST_DEACTIVATE_CHANNEL = `${BASE_URL}/payment/deactivate-client-payment-partner`

// CUSTOMER API SERVICE
export const CUSTOMER_LIST = `${BASE_URL}/customer`
export const CUSTOMER_DELETE = `${BASE_URL}/customer`
export const CUSTOMER_ADD = `${BASE_URL}/customer`
export const CUSTOMER_DETAILS = `${BASE_URL}/customer`
export const UPDATE_CUSTOMER_INFO = `${BASE_URL}/customer/info`
export const ADD_CUSTOMER_ADDRESS = `${BASE_URL}/customer/address`
export const UPDATE_CUSTOMER_ADDRESS = `${BASE_URL}/customer/address`
export const ADD_UPDATE_CUSTOMER_ADDRESS = `${BASE_URL}/customer/address`
export const UPDATE_ORDER_ADDRESS = `${BASE_URL}/order/address-id`
export const DELETE_CUSTOMER_ADDRESS = `${BASE_URL}/customer/address/delete`
export const EXISTING_CUSTOMER_ADDRESS = `${BASE_URL}/customer/chk/existing`
export const REGION_LIST = `${BASE_URL}/customer/region/list`
export const CITY_LIST = `${BASE_URL}/customer/city/list`
export const ZONE_LIST = `${BASE_URL}/customer/zone/list`
export const AREA_LIST = `${BASE_URL}/customer/area/list`
export const COURIER_PRICE_LIST = `${BASE_URL}/customer/order/shipping-fee`

export const CURRENT_STOCK_REPORT = `${BASE_URL}/report/inventory`
export const ORDER_REPORT = `${BASE_URL}/report/order`
export const SALES_REPORT = `${BASE_URL}/report/sales`
export const VISITORS_REPORT = `${BASE_URL}/report/visitor-statistics`
export const DASHBOARD_DATA = `${BASE_URL}/dashboard/data`

// WEBMANZA PAYMENT SERVICE
export const GET_PACKAGE_LIST = `${BASE_URL}/webmanza-payment/get-package-list`
export const GET_CHARGE_URL = `${BASE_URL}/webmanza-payment/acquire-chargeUrl-webmanza`
export const CHECK_PAYMENT_STATUS = `${BASE_URL}/webmanza-payment/check-payment-webmanza`
export const GET_PAYMENT_HISTORIES = `${BASE_URL}/webmanza-payment/get-merchant-payment-histories`
export const TURN_OFF_RECURRING = `${BASE_URL}/webmanza-payment/user-unsubscription-webmanza`

// Blog
export const GET_BLOG_CATEGORY_LIST = `${BASE_URL}/appearance/blog/blog-category`
export const CREATE_BLOG_CATEGORY = `${BASE_URL}/appearance/blog/create-blog-category`
export const UPDATE_BLOG_CATEGORY = `${BASE_URL}/appearance/blog/update-blog-category`
export const DELETE_BLOG_CATEGORY = `${BASE_URL}/appearance/blog/delete-blog-category`
export const ADD_NEW_BLOG_POST = `${BASE_URL}/appearance/blog/create-blog-post`
export const UPDATE_BLOG_POST = `${BASE_URL}/appearance/blog/update-blog-post`
export const BLOG_POST_DETAILS = `${BASE_URL}/appearance/blog/get-blog-post-by-slug`

// ADDED BY FARID
// GET
export const GET_CAMPAIGN = `${BASE_URL}/campaign`

export const GET_MARKETING_TOOLS = `${BASE_URL}/marketing/tool/list`
export const GET_CAMPAIGN_GROUP = `${BASE_URL}/campaign/groups`

export const GET_COUPON = `${BASE_URL}/campaign/coupons`
export const GET_COUPON_DETAILS = `${BASE_URL}/campaign/coupon/detail`
export const GET_COUPON_DETAILS_NEW = `${BASE_URL}/campaign/coupons`

// POST

export const POST_INSTALL_TOOLS = `${BASE_URL}/marketing/tool/install`
export const POST_UNINSTALL_TOOLS = `${BASE_URL}/marketing/tool/un-install`
export const POST_DATA_UPDATE_TOOLS = `${BASE_URL}/marketing/tool/data-save`
export const POST_ADD_CAMPAIGN = `${BASE_URL}/campaign`
export const UPDATE_STATUS = `${BASE_URL}/campaign/status`
export const POST_CAMPAIGN_UPDATE = `${BASE_URL}/campaign`

export const POST_ADD_COUPON = `${BASE_URL}/campaign/coupons`
export const POST_ADD_COUPON_NEW = `${BASE_URL}/campaign/coupons`
export const POST_UPDATE_COUPON = `${BASE_URL}/campaign/coupons`
export const PUT_UPDATE_COUPON_NEW = `${BASE_URL}/campaign/coupons`
export const POST_UPDATE_STATUS_COUPON = `${BASE_URL}/campaign/coupons/status`
export const POST_DELETE_COUPON = `${BASE_URL}/campaign/coupon/delete`
export const POST_DELETE_COUPON_NEW = `${BASE_URL}/campaign/coupons`

// APPEARANCE
export const THEME_URL = BASE_URL + '/appearance/theme/list'
export const THEME_CAT_URL = BASE_URL + '/appearance/themes/category'
export const THEME_INTALL_URL = BASE_URL + '/appearance/theme/install'
export const THEME_ACTIVE_URL = BASE_URL + '/appearance/theme/active'
export const GET_SETTING = `${BASE_URL}/appearance/setting/list`
export const SETTING_UPDATE = BASE_URL + '/appearance/store/setting/add-update'
export const UPDATE_SETTING = `${BASE_URL}/appearance/setting/update`
export const PAGE_URL = BASE_URL + '/page/list'
export const PAGE_DETAILS_URL = BASE_URL + '/page/details'
export const ADD_PAGE_URL = BASE_URL + '/page/add'
export const UPDATE_PAGE_URL = BASE_URL + '/page/update'
export const UPDATE_STATUS_URL = BASE_URL + '/page/status/update'
export const GET_JOB_POST_BY_SLUG = BASE_URL + '/appearance/job'
export const GET_BLOG_POST_BY_SLUG = BASE_URL + '/appearance/blog/blog-post-by-slug'

//SMS
export const GET_SMS_SETTINGS = BASE_URL + '/sms/settings'
export const UPDATE_SMS_SETTINGS = BASE_URL + '/sms/settings'
export const SEND_SMS = BASE_URL + '/sms/send'
export const SMS_BALANCE = BASE_URL + '/sms/balance'
export const SMS_CUSTOMERS = BASE_URL + '/sms/customer-count'

// Customer Care
export const GET_STP_LIST = BASE_URL + '/appearance/store/setting/detail/stp_list'
export const GET_EO_LIST = BASE_URL + '/appearance/store/setting/detail/eo_list'
export const CUSTOMER_CARE_MUTATION = BASE_URL + '/appearance/store/setting/detail'

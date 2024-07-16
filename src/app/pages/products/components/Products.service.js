import * as yup from 'yup';

import { generateUniqueId, isArray, isNumber, isObject, isUndefinedNullOrWhiteSpaceString, findFromArrayOfObjectsByValue, cloneObject, } from '../../../../common';
import { ADD_NEW_PRODUCT, PRODUCT_DETAILS_NEW, UPDATE_PRODUCT, productTypes, } from '../../../constants';
import { getQueryRequest, queryRequest } from '../../../library/api.helper';

import { getCatData } from '../../../../_metronic/partials/content/forms/category/categoryQuery';
import { getVisibilityStatusList } from '../../../../_metronic/partials/content/forms/publish-status/StatusHelper';
import { getBrandData } from '../../../../_metronic/partials/content/forms/brand/BrandHelper';
import { getTagData } from '../../../../_metronic/partials/content/forms/tag/TagHelper';
import { productSchema } from './Product.schema';

// converting 1 day/24 hours to milliseconds 24 * 60 * 60 * 1000...
const ONE_DAY_IN_MILLISECONDS = 8_64_00_000;

// WARNING: NEVER USE THIS DATA DIRECTLY...!!!
const DEFAULT_PRODUCT_DATA = {
  originalVariantData: undefined,
  sidebar: {
    status: {
      status: {
        value: 1,
        label: 'Published',
      },
      scheduledAt: '',
    },
    configuration: {
      priceVisible: true,
      addableToCart: true,
    },
    thumbnail: {
      src: '',
      alt: '',
    },
    productDetails: {
      categories: [],
      brand: [],
      tags: [],
    },
  },
  inventory: {
    sku: '',
  },
  seo: {
    title: '',
    description: '',
    keywords: '',
  },
  general: {
    productName: '',
    productSlug: '',
    productShortDescription: '',
    additionalInfoList: [],
  },
  gallery: {
    images: [
      { src: '', alt: '' },
      { src: '', alt: '' },
      { src: '', alt: '' },
      { src: '', alt: '' },
      { src: '', alt: '' },
    ],
    videoUrl: ''
  },
  price: {
    variationType: 'Variant',
    variationValue: 'Default',
    purchasePrice: '',
    sellingPrice: '',
    quantity: '',
    discount: {
      discountType: 'no',
      hasDiscount: false,
      discountPercentage: '',
      discountAmount: '',
      discountStartDate: '',
      discountEndDate: '',
    },
  },
  dimensions: {
    weight: '0.5',
    length: '1',
    width: '1',
    height: '1',
    weightUnitId: '1',
    lengthUnitId: '1',
  },
  overview: {
    has: false,
    method: '',
    data: [],
    url: '',
  },
  variants: [],
};

export class ProductsService {

  static getDateFromISOFormat(date) {
    if (!(date instanceof Date)) { return ''; }

    return date.toISOString().split('T')[0];
  }

  static getDefaultProductData(generateId = false) {
    const defaultProductData = cloneObject(DEFAULT_PRODUCT_DATA);
    const daysToAdd = 30;
    // note: these are just default values...
    const defaultDiscountStartDate = new Date();
    defaultProductData.price.discount.discountStartDate = this.getDateFromISOFormat(defaultDiscountStartDate);
    const defaultDiscountEndDate = new Date(defaultDiscountStartDate.getTime() + (daysToAdd * ONE_DAY_IN_MILLISECONDS));
    defaultProductData.price.discount.discountEndDate = this.getDateFromISOFormat(defaultDiscountEndDate);

    if (!generateId) { return defaultProductData; }

    // otherwise, we shall generate a new unique ID...
    defaultProductData.inventory.sku = generateUniqueId();

    return defaultProductData;
  }

  static retrieveProductTypeBySlug(productTypeSlug) {
    for (const productType of productTypes) {
      if (productType.slug === productTypeSlug) {
        return productType;
      }
    }

    return Object.create(null);
  };

  static retrieveProductTypeByTitle(productTypeTitle) {
    for (const productType of productTypes) {
      if (productType.title === productTypeTitle) {
        return productType;
      }
    }

    return Object.create(null);
  };

  static filterDataByIds(ids, dataList) {
    if (!isArray(ids)) { return []; }

    const filteredData = [];

    for (const id of ids) {
      for (const data of dataList) {
        if (data.id !== id) { continue; }

        filteredData.push(data);
      }
    }

    return filteredData;
  }

  static convertLocalToISODateTime(localDateTime) {
    if (isUndefinedNullOrWhiteSpaceString(localDateTime)) { return ''; }

    const currentTime = new Date();
    // const dateTime = new Date(localDateTime + ':00.000Z');
    // dateTime.setMinutes(dateTime.getMinutes() - currentTime.getTimezoneOffset());

    return currentTime.toISOString();
  }

  static async validateFieldAsync({ pathToField, value, }) {
    yup.reach(productSchema, pathToField, value);
  }

  static async validateDataAsync(data, additionalData = undefined) {
    try {
      const schema = productSchema(additionalData);

      await schema.validate(data, {
        strict: false,
        abortEarly: false,
        recursive: true,
        stripUnknown: false,
      });
    } catch (error) {
      if (!isArray(error.inner) || !error.inner.length) { return {}; }

      const errorFieldNameSet = new Set();
      const errors = Object.create(null);
      const firstErrorMessage = error.inner[0].errors?.[0] ?? '';

      for (const internalError of error.inner) {
        // creating an object of erros...
        errors[internalError.path] = internalError.errors[0];
        // adding path to the set...
        errorFieldNameSet.add(internalError.path);
      }

      const errorFieldNames = Array.from(errorFieldNameSet);

      return { errors, firstErrorMessage, errorFieldNames, };
    }

    return {};
  }

  static createVariant({ quantity, purchasePrice, price, dimensions, variations, thumbnail, originalVariantData, }) {
    const variant = { ...originalVariantData, };
    variant.thumbnail = thumbnail;
    variant.qty = isNumber(quantity) ? Number(quantity) : 0;
    variant.download_url = '';                                                            // <-- need to set this value...
    variant.gift_coupons = [                                                              // <-- need to set this value...
      { code: '', expire_date: '', },
    ];
    variant.option = price?.variationType ?? 'Variant';
    variant.value = price?.variationValue ?? 'Default';
    variant.option2 = null;
    variant.value2 = null;
    variant.option3 = null;
    variant.value3 = null;

    // if we have variations, then we shall set options and values accordingly...
    if (isArray(variations)) {
      for (let i = 0; i < variations.length; ++i) {
        const variation = variations[i];
        variant[`option${i === 0 ? '' : i + 1}`] = variation.variationType;
        variant[`value${i === 0 ? '' : i + 1}`] = variation.variationValue;
      }
    }

    variant.shipping_attribute = {
      weight_class_id: isNumber(dimensions?.weightUnitId) ? Number(dimensions.weightUnitId) : 1,
      weight: isNumber(dimensions?.weight) ? Number(dimensions.weight) : 0,
      length_class_id: isNumber(dimensions?.lengthUnitId) ? Number(dimensions.lengthUnitId) : 1,
      length: isNumber(dimensions?.length) ? Number(dimensions.length) : 0,
      width: isNumber(dimensions?.width) ? Number(dimensions.width) : 0,
      height: isNumber(dimensions?.height) ? Number(dimensions.height) : 0,
    };

    variant.price = {
      cost_price: isNumber(purchasePrice) ? Number(purchasePrice) : 0,
      selling_price: isNumber(price?.sellingPrice) ? Number(price.sellingPrice) : 0,
      has_discount: price?.discount?.hasDiscount ?? false,
      discount_type: price?.discount?.discountType ?? 'no',
      discount_amount: isNumber(price?.discount?.discountAmount) ? Number(price.discount.discountAmount) : 0,
      discount_percentage: isNumber(price?.discount?.discountPercentage) ? Number(price.discount.discountPercentage) : 0,
      discount_start_date: isUndefinedNullOrWhiteSpaceString(price?.discount?.discountStartDate)
        ? undefined : price.discount.discountStartDate + ' 00:00:00',
      discount_end_date: isUndefinedNullOrWhiteSpaceString(price?.discount?.discountEndDate)
        ? undefined : price.discount.discountEndDate + ' 00:00:00',
    };

    return variant;
  }

  static toServerReadableData({ productTypeTitle, variationsEnabled, data, }) {
    const defaultProductData = this.getDefaultProductData(false);
    const serverReadableData = Object.create(null);

    // if product ID is present...
    // note: on update mode...
    if (isNumber(data.productId)) {
      // we shall set the product IDs to the server readable data...
      serverReadableData.prod_id = data.id;
      serverReadableData.pd_id = data.productId;
    }

    // miscellaneous...
    serverReadableData.bundle_unit = 1;
    serverReadableData.tax_id = 1;
    serverReadableData.product_type = productTypeTitle;

    // general data...
    serverReadableData.product_name = data?.general?.productName ?? '';
    serverReadableData.product_slug = data?.general?.productSlug ?? '';
    serverReadableData.product_s_description = data?.general?.productShortDescription ?? '';
    serverReadableData.additional_info = isArray(data?.general?.additionalInfoList)
      ? data.general.additionalInfoList : [];

    // inventory data...
    serverReadableData.sku = data?.inventory?.sku ?? '';

    // seo data...
    serverReadableData.seo = Object.create(null);
    serverReadableData.seo.meta_tag_title = data?.seo?.title ?? '';
    serverReadableData.seo.meta_tag_description = data?.seo?.description ?? '';
    serverReadableData.seo.meta_tag_keywords = data?.seo?.keywords ?? '';

    // status data...
    serverReadableData.product_status_id = data?.sidebar?.status?.status?.value ?? 1;
    serverReadableData.scheduled_at = this.convertLocalToISODateTime(data?.sidebar?.status?.scheduledAt);

    // product details data...
    // categories data...
    serverReadableData.cat_ids = [];

    const categories = isArray(data?.sidebar?.productDetails?.categories)
      ? data.sidebar.productDetails.categories : [];

    for (const category of categories) {
      serverReadableData.cat_ids.push(category.id);
    }

    // brand data...
    serverReadableData.brand_id = isArray(data?.sidebar?.productDetails?.brand)
      && isNumber(data.sidebar.productDetails.brand[0]?.value)
      ? Number(data.sidebar.productDetails.brand[0].value) : 0;

    // tags data...
    const tags = isArray(data?.sidebar?.productDetails?.tags)
      ? data.sidebar.productDetails.tags : [];

    serverReadableData.tag_ids = [];

    for (const tag of tags) {
      serverReadableData.tag_ids.push(tag.id);
    }

    // gallery data...
    serverReadableData.gallery = [];

    const images = isArray(data?.gallery?.images) ? data.gallery.images : [];

    for (const image of images) {
      if (isUndefinedNullOrWhiteSpaceString(image.src)) { continue; }

      serverReadableData.gallery.push(image);
    }

    serverReadableData.video = Object.create(null);
    serverReadableData.video.src = data?.gallery?.videoUrl ?? '';
    serverReadableData.video.alt = '';

    // thumbnail data...
    const thumbnail = data?.sidebar?.thumbnail ?? defaultProductData.sidebar.thumbnail;
    serverReadableData.thumbnail = thumbnail;

    // overview data...
    const overviewUrl = data?.overview?.url ?? '';
    const overviewData = isArray(data?.overview?.data) ? data.overview.data : [];

    serverReadableData.overview = Object.create(null);
    serverReadableData.overview.has = data?.overview?.has ?? false;

    // if the overview URL is undefined, null or empty string
    // and overview data array is empty as well...
    if (isUndefinedNullOrWhiteSpaceString(overviewUrl) && !overviewData.length) {
      // we shall assign false to the variable 'has'...
      serverReadableData.overview.has = false;
    }

    serverReadableData.overview.url = overviewUrl;
    serverReadableData.overview.data = overviewData;
    serverReadableData.overview.target = '';
    serverReadableData.overview.method = data?.overview?.method ?? '';

    // configuration data...
    serverReadableData.price_visibility = data?.sidebar?.configuration?.priceVisible ? 1 : 0;
    serverReadableData.cart_visibility = data?.sidebar?.configuration?.addableToCart ? 1 : 0;

    // price & variants data...
    serverReadableData.variants = [];

    if (variationsEnabled && isArray(data?.variants)) {
      for (const variant of data.variants) {
        const serverReadableVariant = this.createVariant({
          quantity: variant.quantity,
          purchasePrice: variant.purchasePrice,
          price: variant.price,
          dimensions: variant.dimensions,
          variations: variant.variations,
          thumbnail: variant.thumbnail,
        });

        serverReadableData.variants.push(serverReadableVariant);
      }
    } else {
      serverReadableData.selling_price = isNumber(data?.price?.sellingPrice) ? Number(data.price.sellingPrice) : 0;
      serverReadableData.cost_price = isNumber(data?.price?.purchasePrice) ? Number(data.price.purchasePrice) : 0;
      serverReadableData.qty = isNumber(data.price?.quantity) ? Number(data.price.quantity) : 0;

      const variant = this.createVariant({
        originalVariantData: data.originalVariantData,
        quantity: data.price?.quantity,
        purchasePrice: data.price?.purchasePrice,
        price: data.price,
        dimensions: data.dimensions,
        thumbnail: thumbnail,
        // variations: variant.variations,      <-- this option is valid only if variations/variants are enabled...
      });

      serverReadableData.variants[0] = variant;
    }

    return serverReadableData;
  }

  static fromServerReadableData({
    categoryDataList, brandDataList, statusDataList, tagDataList, serverReadableData,
  }) {
    const data = this.getDefaultProductData(true);
    data.id = serverReadableData.prod_id;
    data.productId = serverReadableData.pd_id;

    const productType = this.retrieveProductTypeByTitle(serverReadableData.product_type);

    // general data...
    data.general.productName = serverReadableData.product_name ?? '';
    data.general.productSlug = serverReadableData.product_slug ?? '';
    data.general.productShortDescription = serverReadableData.product_s_description ?? '';
    data.general.additionalInfoList = isArray(serverReadableData.additional_info)
      ? serverReadableData.additional_info : [];

    // inventory data...
    data.inventory.sku = serverReadableData.sku ?? '';

    // seo data...
    data.seo.title = serverReadableData.seo?.meta_tag_title ?? '';
    data.seo.description = serverReadableData.seo?.meta_tag_description ?? '';
    data.seo.keywords = serverReadableData.seo?.meta_tag_keywords ?? '';

    // status data...
    const statusId = serverReadableData.product_status_id ?? '';
    const status = findFromArrayOfObjectsByValue('value', statusId, statusDataList) ?? data.sidebar.status;
    data.sidebar.status.status = status;
    data.sidebar.status.scheduledAt = serverReadableData?.scheduled_at?.split('.')?.[0] ?? '';

    // product details data...
    // categories data...
    data.sidebar.productDetails.categories = this.filterDataByIds(serverReadableData.cat_ids, categoryDataList);
    data.sidebar.productDetails.brand = isNumber(serverReadableData.brand_id)
      ? this.filterDataByIds([serverReadableData.brand_id], brandDataList) : [];
    data.sidebar.productDetails.tags = this.filterDataByIds(serverReadableData.tag_ids, tagDataList);

    // gallery data...
    data.gallery.images = [...data.gallery.images];

    if (isArray(serverReadableData.gallery)) {
      for (let i = 0; i < serverReadableData.gallery.length && i < data.gallery.images.length; ++i) {
        const image = serverReadableData.gallery[i];

        if (isUndefinedNullOrWhiteSpaceString(image.src)) { continue; }

        data.gallery.images[i] = image;
      }
    }

    data.gallery.videoUrl = serverReadableData.video?.src ?? '';

    // thumbnail data...
    data.sidebar.thumbnail = isObject(serverReadableData.thumbnail) ? serverReadableData.thumbnail : data.sidebar.thumbnail;

    // overview data...
    data.overview.has = serverReadableData.overview?.has ?? false;
    data.overview.data = isArray(serverReadableData.overview?.data) ? serverReadableData.overview.data : [];
    data.overview.url = serverReadableData.overview?.url ?? '';
    data.overview.method = data.overview.data.length ? '2' : '1';

    if (['1', '2'].includes(serverReadableData.overview?.method)) {
      data.overview.method = serverReadableData.overview.method;
    }

    // configuration data...
    data.sidebar.configuration.priceVisible = serverReadableData.price_visibility === 1;
    data.sidebar.configuration.addableToCart = serverReadableData.cart_visibility === 1;

    // price & variants data...
    const variants = isArray(serverReadableData.variants) ? serverReadableData.variants : [];
    const variationsEnabled = variants.length > 1;    // checking if we have variants...

    // if we don't have variations enabled...
    if (!variationsEnabled) {
      const defaultVariant = variants[0] ?? {};         // taking the first variant because it might the default variant...
      // we shall read price, discount and dimensions data...
      data.originalVariantData = defaultVariant;
      data.price.variationType = defaultVariant.option ?? 'Variant';
      data.price.variationValue = defaultVariant.value ?? 'Default';
      data.price.quantity = defaultVariant.in_stock ?? '';
      data.price.purchasePrice = defaultVariant.price?.cost_price ?? '';
      data.price.sellingPrice = defaultVariant.price?.selling_price ?? '';
      data.price.discount.hasDiscount = defaultVariant.price?.has_discount ?? false;
      data.price.discount.discountType = defaultVariant.price?.discount_type ?? 'no';
      data.price.discount.discountAmount = defaultVariant.price?.discount_amount ?? '';
      data.price.discount.discountPercentage = defaultVariant.price?.discount_percentage ?? '';
      // need to format the date...
      data.price.discount.discountStartDate = defaultVariant.price?.discount_start_date?.split('T')?.[0] ?? '';
      data.price.discount.discountEndDate = defaultVariant.price?.discount_end_date?.split('T')?.[0] ?? '';

      // dimensions data...
      data.dimensions.weight = defaultVariant.shipping_attribute?.weight ?? '';
      data.dimensions.length = defaultVariant.shipping_attribute?.length ?? '';
      data.dimensions.width = defaultVariant.shipping_attribute?.width ?? '';
      data.dimensions.height = defaultVariant.shipping_attribute?.height ?? '';
      data.dimensions.weightUnitId = defaultVariant.shipping_attribute?.weight_class_id
        ? `${defaultVariant.shipping_attribute.weight_class_id}` : '1';
      data.dimensions.lengthUnitId = defaultVariant.shipping_attribute?.length_class_id
        ? `${defaultVariant.shipping_attribute.length_class_id}` : '1';
    }

    return { productType, data, variationsEnabled, };
  }

  static async retrieveProductByIdAsync(productId) {
    const response = await getQueryRequest(`${PRODUCT_DETAILS_NEW}/${productId}`);

    if (response.status_code !== 200) { return {}; }

    return response.data ?? {};
  }

  static async addProductAsync(serverReadableData) {
    const response = await queryRequest(ADD_NEW_PRODUCT, serverReadableData);
    const statusCode = response.status_code ?? -1;
    let message = response.message;

    // if message is not sent by the server...
    if (isUndefinedNullOrWhiteSpaceString(message)) {
      if (statusCode === 200) { message = `Product added successfully (${statusCode})`; }
      else if (statusCode === 400) { message = `Invalid product information provided (${statusCode})`; }
      else { message = `Failed to add new product (${statusCode})` }
    }

    return {
      ...response,
      statusCode: statusCode,
      message: message,
    };
  }

  static async updateProductAsync(serverReadableData) {
    const response = await queryRequest(UPDATE_PRODUCT, serverReadableData);
    const statusCode = response.status_code ?? -1;
    let message = response.message;

    // if message is not sent by the server...
    if (isUndefinedNullOrWhiteSpaceString(message)) {
      if (statusCode === 200) { message = `Product updated successfully (${statusCode})`; }
      else if (statusCode === 400) { message = `Invalid product information provided (${statusCode})`; }
      else { message = `Failed to update the product (${statusCode})` }
    }

    return {
      ...response,
      statusCode: statusCode,
      message: message,
    };
  }

  static async retrieveDataAsync({ productId, }) {
    const promises = [
      // asynchronously retrieving category data list...
      getCatData(),
      // asynchronously retrieving brand data list...
      getBrandData(),
      // asynchronously retrieving status data list...
      getVisibilityStatusList(),
      // asynchronously retrieving tag data list...
      getTagData(),
    ];

    // if product ID is not undefined, null nor empty/white space...
    if (!isUndefinedNullOrWhiteSpaceString(productId)) {
      // we shall asynchronously retrieve the product by ID...
      promises.push(this.retrieveProductByIdAsync(productId));
    }

    let results;

    try {
      // awaiting all promises...
      results = await Promise.all(promises);
    } catch (error) {
      return {
        statusCode: -1,
        error: error,
      };
    }

    return {
      statusCode: 200,
      categoryDataList: results[0],
      brandDataList: results[1],
      statusDataList: results[2],
      tagDataList: results[3],
      product: results[4],
    };
  }
}

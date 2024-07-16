import * as yup from 'yup';
import { isNumber, isUndefinedNullOrWhiteSpaceString } from '../../../../common';

export const discountSchema = additionalData => yup.object().shape({
  discountPercentage: yup.string()
    .test('discountPercentageRequired', 'Discount percentage must be provided', (discountPercentage, context) => {
      if (context.parent.discountType.toLowerCase() !== 'percentage') { return true; }

      return isNumber(discountPercentage) && Number(discountPercentage) > 0;
    }),
  discountAmount: yup.string()
    .test('discountAmountRequired', 'Fixed discount amount must be provided', (discountAmount, context) => {
      if (context.parent.discountType.toLowerCase() !== 'fixed') { return true; }

      return isNumber(discountAmount) && Number(discountAmount) > 0;
    }),
  discountStartDate: yup.string()
    .test('discountStartDateRequired', 'Discount start date must be provided', (discountStartDate, context) => {
      if (context.parent.discountType.toLowerCase() === 'no') { return true; }

      return !isUndefinedNullOrWhiteSpaceString(discountStartDate);
    })
    .test('discountStartDateLessThanEndDate', 'Discount start date must not exceed the end date', (discountStartDate, context) => {
      if (isUndefinedNullOrWhiteSpaceString(context.parent.discountEndDate)) { return true; }

      const discountStartDateInMilliseconds = new Date(discountStartDate + ' 00:00:00').getTime();
      const discountEndDateInMilliseconds = new Date(context.parent.discountEndDate + ' 00:00:00').getTime();

      return discountStartDateInMilliseconds < discountEndDateInMilliseconds;
    }),
  discountEndDate: yup.string()
    .test('discountEndDateRequired', 'Discount end date must be provided', (discountEndDate, context) => {
      if (context.parent.discountType.toLowerCase() === 'no') { return true; }

      return !isUndefinedNullOrWhiteSpaceString(discountEndDate);
    })
    .test('discountEndDateGreaterThanStartDate', 'Discount start date must not exceed the end date', (discountEndDate, context) => {
      if (isUndefinedNullOrWhiteSpaceString(context.parent.discountStartDate)) { return true; }

      const discountStartDateInMilliseconds = new Date(context.parent.discountStartDate + ' 00:00:00').getTime();
      const discountEndDateInMilliseconds = new Date(discountEndDate + ' 00:00:00').getTime();

      return discountStartDateInMilliseconds < discountEndDateInMilliseconds;
    }),
});

export const priceSchema = additionalData => yup.object().shape({
  purchasePrice: yup.string()
    .test('purchasePriceRequired', 'Purchase price must be provided', purchasePrice => {
      if (additionalData.variationsEnabled) { return true; }

      return isNumber(purchasePrice) && Number(purchasePrice) > 0;
    })
    .test('purchasePriceLessThanSellingPriceCheck', 'Purchase price must be less than price', (purchasePrice, context) => {
      if (additionalData.variationsEnabled) { return true; }
      if (isUndefinedNullOrWhiteSpaceString(context.parent.sellingPrice)) { return true; }

      const sellingPrice = Number(context.parent.sellingPrice);

      return isNumber(purchasePrice) && Number(purchasePrice) < sellingPrice;
    }),
  sellingPrice: yup.string()
    .test('sellingPriceRequired', 'Price must be provided', sellingPrice => {
      if (additionalData.variationsEnabled) { return true; }

      return isNumber(sellingPrice) && Number(sellingPrice) > 0;
    })
    .test('sellingPriceGreaterThanPurchasePriceCheck', 'Price must be greater than the purchase price', (sellingPrice, context) => {
      if (additionalData.variationsEnabled) { return true; }
      if (isUndefinedNullOrWhiteSpaceString(context.parent.purchasePrice)) { return true; }

      const purchasePrice = Number(context.parent.purchasePrice);

      return isNumber(sellingPrice) && purchasePrice < Number(sellingPrice);
    }),
  discount: discountSchema(additionalData),
});

export const dimensionsSchema = additionalData => yup.object().shape({
  weight: yup.string()
    .test('weightRequired', `${additionalData.variant ? 'Variant' : 'Product'} weight must be provided`, weight => {
      if (additionalData.ignore) { return true; }

      return isNumber(weight) && Number(weight) > 0;
    }),
  length: yup.string()
    .test('lengthRequired', `${additionalData.variant ? 'Variant' : 'Product'} length must be provided`, length => {
      if (additionalData.ignore) { return true; }

      return isNumber(length) && Number(length) > 0;
    }),
  width: yup.string()
    .test('widthRequired', `${additionalData.variant ? 'Variant' : 'Product'} width must be provided`, width => {
      if (additionalData.ignore) { return true; }

      return isNumber(width) && Number(width) > 0;
    }),
  height: yup.string()
    .test('heightRequired', `${additionalData.variant ? 'Variant' : 'Product'} height must be provided`, height => {
      if (additionalData.ignore) { return true; }

      return isNumber(height) && Number(height) > 0;
    }),
  weightUnitId: yup.string()
    .test('weightUnitIdRequired', `Please choose a unit of weight for the ${additionalData.variant ? 'variant' : 'product'}`, weightUnitId => {
      if (additionalData.ignore) { return true; }

      return !isUndefinedNullOrWhiteSpaceString(weightUnitId);
    }),
  lengthUnitId: yup.string()
    .test('lengthUnitIdRequired', `Please choose a unit of length for the ${additionalData.variant ? 'variant' : 'product'}`, lengthUnitId => {
      if (additionalData.ignore) { return true; }

      return !isUndefinedNullOrWhiteSpaceString(lengthUnitId);
    }),
});

export const variantPriceSchema = additionalData => yup.object().shape({
  sellingPrice: yup.string()
    .test('variantSellingPriceRequired', 'Price must be provided', sellingPrice => {
      if (!additionalData.variationsEnabled) { return true; }

      return isNumber(sellingPrice) && Number(sellingPrice) > 0;
    }),
    // .test('sellingPriceGreaterThanPurchasePriceCheck', 'Price must be greater than the purchase price', (sellingPrice, context) => {
    //   if (additionalData.variationsEnabled) { return true; }
    //   if (isUndefinedNullOrWhiteSpaceString(context.parent.purchasePrice)) { return true; }

    //   const purchasePrice = Number(context.parent.purchasePrice);

    //   return isNumber(sellingPrice) && purchasePrice < Number(sellingPrice);
    // }),
  discount: discountSchema(additionalData),
});

export const variantSchema = additionalData => yup.object().shape({
  purchasePrice: yup.string()
    .test('variantPurchasePriceRequired', 'Purchase price must be provided', purchasePrice => {
      if (!additionalData.variationsEnabled) { return true; }

      return isNumber(purchasePrice) && Number(purchasePrice) > 0;
    })
    .test('variantPurchasePriceLessThanSellingPriceCheck', 'Purchase price must be less than price', (purchasePrice, context) => {
      if (!additionalData.variationsEnabled) { return true; }
      if (isUndefinedNullOrWhiteSpaceString(context.parent.price?.sellingPrice)) { return true; }

      const sellingPrice = Number(context.parent.price.sellingPrice);

      return isNumber(purchasePrice) && Number(purchasePrice) < sellingPrice;
    }),
  price: variantPriceSchema(additionalData),
  dimensions: dimensionsSchema({
    ...additionalData,
    variant: true,
    ignore: additionalData.variationsEnabled === false,
  }),
  thumbnail: yup.object({
    src: yup.string()
      .max(250, 'Variant thumbnail URL shall not exceed 250 characters')
  }),
});

export const productSchema = (additionalData = {}) => yup.object({
  general: yup.object({
    productName: yup.string().trim()
      .required('Product name must be provided')
      .min(5, 'Product name must be atleast 5 characters long')
      .max(500, 'Product name shall not exceed 500 characters'),
    productSlug: yup.string().trim()
      .required('Product URL must be provided')
      .min(5, 'Product URL must be atleast 5 characters long')
      .max(500, 'Product URL shall not exceed 500 characters'),
    productShortDescription: yup.string().trim()
      .required('Product description must be provided')
      .min(1, 'Product description must be provided')
      .max(410000000, 'Product description shall not exceed 41,00,00,000 characters'),
  }),
  sidebar: yup.object({
    thumbnail: yup.object({
      src: yup.string()
        .required('Product thumbnail must be provided')
        .min(1, 'Product thumbnail must be provided')
        .max(250, 'Product thumbnail URL shall not exceed 250 characters')
    }),
  }),
  price: priceSchema(additionalData),
  dimensions: dimensionsSchema({
    ...additionalData,
    variant: false,
    ignore: additionalData.variationsEnabled === true,
  }),
  variants: yup.array().of(variantSchema(additionalData)),
});

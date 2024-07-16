import { useState } from 'react';
import swal from 'sweetalert';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Nav, Tab, } from 'react-bootstrap';
import { useEffectEnhanced, useStateEnhanced } from '../../../hooks';

import { GeneralCard } from './GeneralCard';
import LoaderComponent from '../../../modules/components/loader/LoaderComponent';
import { ProductFormSidebar } from './ProductFormSidebar';

import { PriceCard } from './PriceCard';
import { DimensionsCard } from './DimensionsCard';
import { VariationCard } from './VariationCard';
import { InventoryCard } from './InventoryCard';
import { SeoCard } from './SeoCard';
import { OverviewCard } from './OverviewCard';
import { GalleryCard } from './GalleryCard';
import { ProductThumbnail } from './ProductThumbnail';
import { isNumber, isObject, isUndefinedNullOrWhiteSpaceString, sleepAsync } from '../../../../common';
import { CardHeader } from './CardHeader';
import { ToggleSwitch } from './ToggleSwitch';
import { ProductsService } from './Products.service';
import { toast } from 'react-toastify';
import { useDispatch, } from 'react-redux';
import { productFormErrorsActions } from '../redux-slices';

const FORM_SUBMISSION_SLEEP_TIMEOUT_IN_MILLISECONDS = 410;
const TOAST_CLOSE_DELAY_IN_MILLISECONDS = 3000;
const DEFAULT_SELECTED_TAB = 'general';

export const ProductForm = () => {
  const { id, } = useParams();
  // const id = 'd2528c51-76ce-4fe0-8ff1-6ad949efc668';
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [buttonsEnabled, setButtonsEnabled] = useState(true);
  const [selectedTab, setSelectedTab] = useState(DEFAULT_SELECTED_TAB);
  const [productType, setProductType] = useState({});
  const [necessaryData, setNecessaryData, updateNecessaryData] = useStateEnhanced({
    initialValue: {
      categoryDataList: [],
      brandDataList: [],
      statusDataList: [],
      tagDataList: [],
    },
  });

  const [variationsEnabled, setVariationsEnabled] = useState(false);     // <-- default value shall be false...
  const [data, setData, _updateData, _setDataDebounced, updateDataDebounced,] = useStateEnhanced({
    initialValue: ProductsService.getDefaultProductData(true),
  });

  const onCancelButtonClicked = event => {
    navigate('/products/index');
  };

  const onTabSelected = selectedTab => {
    setSelectedTab(selectedTab);
  };

  const onVariationsEnableStatusChangedAsync = async event => {
    const variationsEnabled = event.target.checked;

    const shallSwitch = await swal({
      title: variationsEnabled === true
        ? 'Are you sure you want to have variants?'
        : 'Are you sure you don\'t want to have variants?',
      text: 'Any unsaved changes will be lost.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    });

    if (!shallSwitch) { return; }

    const defaultProductData = ProductsService.getDefaultProductData();

    updateDataDebounced({
      variants: [],
      price: defaultProductData.price,
      dimensions: defaultProductData.dimensions,
    });

    setVariationsEnabled(variationsEnabled);
  };

  const onNecessaryDataChanged = event => {
    updateNecessaryData({ [event.target.name]: event.target.value, });
  };

  const onProductThumbnailChanged = event => {
    const sidebar = {
      ...data.sidebar,
      [event.target.name]: event.target.value,
    };

    updateDataDebounced({ sidebar: sidebar, });
  };

  const onInputValueChanged = event => {
    if (event.target.type === 'checkbox') {
      return updateDataDebounced({ [event.target.name]: event.target.checked, });
    }

    updateDataDebounced({ [event.target.name]: event.target.value, });
  };

  const onFormSubmittedAsync = async event => {
    event.preventDefault();

    setButtonsEnabled(false);
    setSelectedTab(DEFAULT_SELECTED_TAB);

    const toastId = toast.info('Please wait...', { autoClose: false, });

    // WARNING: THIS SLEEP IS MANDATORY TO AVOID DATA LOSS BECAUSE,
    // WE HAVE IMPLEMENTED LAZY/DEBOUNCED STATE UPDATE...
    await sleepAsync(FORM_SUBMISSION_SLEEP_TIMEOUT_IN_MILLISECONDS);

    const { firstErrorMessage, errors, errorFieldNames, } = await ProductsService.validateDataAsync(data, {
      // we shall pass the value of 'variationsEnabled' so that we can test conditionally...
      variationsEnabled: variationsEnabled,
    });

    // note: 'setTouches()' method does not do anything if 'errorFieldNames' is not an array...
    dispatch(productFormErrorsActions.setTouches(errorFieldNames));
    dispatch(productFormErrorsActions.setErrors(errors));

    if (!isUndefinedNullOrWhiteSpaceString(firstErrorMessage)) {
      toast.update(toastId, {
        autoClose: TOAST_CLOSE_DELAY_IN_MILLISECONDS,
        type: toast.TYPE.ERROR,
        render: firstErrorMessage,
      });

      setButtonsEnabled(true);

      return;
    }

    // processes our form data to be readable by the backend server...
    const serverReadableData = ProductsService.toServerReadableData({
      data: data,
      productTypeTitle: productType.title,
      variationsEnabled: variationsEnabled,
    });

    const updateMode = isNumber(data.productId);

    // if we are in the update mode and we have multiple variants,
    // we must clear the variants array...
    // NOTE 1: THESE LINES ARE MANDATORY...
    // NOTE 2: DO NOT REPLACE THE 'variationsEnabled' VARIABLE WITH
    // SOMETHING LIKE 'variants.length > 1' BECAUSE, IN UPDATE MODE
    // 'variationsEnabled' VARIABLE IS CALCULATED RIGHT AFTER RECEIVING
    // PRODUCT DATA FROM THE BACKEND SERVER...
    if (updateMode && variationsEnabled) {
      serverReadableData.variants = [];
    }

    const { statusCode, message } = updateMode
      ? await ProductsService.updateProductAsync(serverReadableData)
      : await ProductsService.addProductAsync(serverReadableData);

    setButtonsEnabled(true);
    // setLoading(false);

    if (statusCode !== 200) {
      // return await swal('Sorry!', message, 'error');
      return toast.update(toastId, {
        autoClose: TOAST_CLOSE_DELAY_IN_MILLISECONDS,
        type: statusCode === 200 ? toast.TYPE.SUCCESS : toast.TYPE.ERROR,
        render: message,
      });
    }

    toast.dismiss(toastId);

    await swal('Success!', message, 'success');

    navigate('/products/index');
  };

  useEffectEnhanced(async () => {
    setLoading(true);

    // asynchronously retrieving all the data...
    const dataRetrievalPromise = ProductsService.retrieveDataAsync({
      productId: id,
    });
    const productTypeSlug = searchParams.get('type');
    const productType = ProductsService.retrieveProductTypeBySlug(productTypeSlug);

    setProductType(productType);

    // awaiting data...
    const { statusCode, product, ...necessaryData } = await dataRetrievalPromise;

    if (statusCode !== 200) {
      await swal('Sorry!', 'We were unable to retrieve data from the server.', 'error');

      return navigate('/products/index');
    }

    // if product is undefined, it means the form is in "add new product" mode...
    if (isObject(product)) {
      // if the product ID is not a number, it means there's an error while retrieving the product from the server...
      if (!isNumber(product.pd_id)) {
        await swal('Sorry!', 'We were unable to retrieve the product information.', 'error');

        return navigate('/products/index');
      }

      const { productType, data, variationsEnabled, } = ProductsService.fromServerReadableData({
        serverReadableData: product,
        statusDataList: necessaryData.statusDataList,
        categoryDataList: necessaryData.categoryDataList,
        brandDataList: necessaryData.brandDataList,
        tagDataList: necessaryData.tagDataList,
      });

      setVariationsEnabled(variationsEnabled);
      setProductType(productType);
      setData(data);
    }

    setNecessaryData(necessaryData);
    setLoading(false);
  }, [], () => {
    // note: this method gets called when the product form
    // gets unmounted (useEffect cleanup callback)...
    dispatch(productFormErrorsActions.clear())
  });

  useEffectEnhanced(async () => {
    const { errors, } = await ProductsService.validateDataAsync(data, {
      // we shall pass the value of 'variationsEnabled' so that we can test conditionally...
      variationsEnabled: variationsEnabled,
    });

    dispatch(productFormErrorsActions.setErrors(errors));
  }, [data]);

  return <>
    {(loading || !productType) && <LoaderComponent />}

    {!loading && !!productType && <form autoComplete='off' noValidate={true} onSubmit={onFormSubmittedAsync}>
      <div className='form d-flex flex-column flex-lg-row'>
        {/* form sidebar start */}
        <div className='d-none d-lg-flex flex-column gap-3 gap-lg-5 w-100 min-w-250px min-w-lg-275px mw-300px mb-7 me-lg-4'>
          <ProductFormSidebar
            name='sidebar'
            necessaryData={necessaryData}
            data={data.sidebar}
            onChange={onInputValueChanged}
            onNecessaryDataChange={onNecessaryDataChanged} />
        </div>
        {/* form sidebar end */}

        {/* form viewport start */}
        <div className='d-flex flex-column flex-row-fluid gap-3 gap-lg-5'>
          <Tab.Container id='product-form' activeKey={selectedTab} onSelect={onTabSelected}>
            <Nav className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-bold mb-n2'>
              <Nav.Item>
                <Nav.Link className='text-active-primary pb-1' eventKey='general'>General</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className='text-active-primary pb-1' eventKey='advance'>Advanced</Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              {/* general tab content */}
              <Tab.Pane eventKey='general'>
                <div className='d-flex flex-column gap-3 gap-lg-5'>
                  <GeneralCard
                    name='general'
                    data={data.general}
                    onChange={onInputValueChanged} />

                  <ProductThumbnail
                    className='d-block d-lg-none'
                    // className='d-none d-lg-block'
                    name='thumbnail'
                    errorFieldName='sidebar.thumbnail.src'
                    data={data.sidebar?.thumbnail}
                    onChange={onProductThumbnailChanged} />

                  {(!isNumber(data.productId) || (isNumber(data.productId) && !variationsEnabled)) && <>
                    <div className='card card-flush py-4'>
                      <CardHeader title={variationsEnabled ? 'Variations' : 'Pricing'}>
                        {!isNumber(data.productId) && <ToggleSwitch
                          name='variationsEnabled'
                          label='Variations'
                          checked={variationsEnabled ?? false}
                          onChange={onVariationsEnableStatusChangedAsync} />}
                      </CardHeader>

                      {variationsEnabled !== true && <PriceCard
                        showQuantityField={true}
                        name='price'
                        data={data.price}
                        onChange={onInputValueChanged} />}

                      {variationsEnabled === true && <VariationCard
                        name='variants'
                        dimensionsVisible={productType.id === 1}
                        defaultThumbnail={data.sidebar?.thumbnail}
                        variants={data.variants}
                        onChange={onInputValueChanged} />}
                    </div>

                    {variationsEnabled !== true && productType.id === 1 && <DimensionsCard
                      name='dimensions'
                      data={data.dimensions}
                      onChange={onInputValueChanged} />}
                  </>}

                  <GalleryCard name='gallery' data={data.gallery} onChange={onInputValueChanged} />

                  {/* form sidebar (responsive) start */}
                  <div className='d-block d-lg-none'>
                    <ProductFormSidebar
                      name='sidebar'
                      necessaryData={necessaryData}
                      data={data.sidebar}
                      onChange={onInputValueChanged} />
                  </div>
                  {/* form sidebar end */}
                </div>
              </Tab.Pane>
              {/* advanced tab content */}
              <Tab.Pane eventKey='advance'>
                <div className='d-flex flex-column gap-3 gap-lg-5'>
                  <InventoryCard name='inventory' data={data.inventory} onChange={onInputValueChanged} />
                  <OverviewCard maximumLabelLength={500} name='overview' data={data.overview} onChange={onInputValueChanged} />
                  <SeoCard name='seo' data={data.seo} productSlug={data.general?.productSlug} onChange={onInputValueChanged} />
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>

          <div className='d-flex justify-content-end mb-3'>
            {/* cancel button */}
            <button
              type='button'
              className='btn btn-light me-5'
              disabled={!buttonsEnabled}
              onClick={onCancelButtonClicked}>Cancel</button>

            {/* save changes button (submits the form) */}
            <button type='submit' id='kt_ecommerce_add_product_submit' className='btn btn-dark' disabled={!buttonsEnabled}>
              <span className='indicator-label'>Save Changes</span>
            </button>
          </div>
        </div>
        {/* form viewport end */}
      </div>
    </form>}
  </>;
};

import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useEffectEnhanced, useStateEnhanced } from '../../../hooks';
import { ProductThumbnail } from './ProductThumbnail';
import { StatusCard } from './StatusCard';
import { ConfigurationCard } from './ConfigurationCard';
import { ProductDetailsCard } from './ProductDetailsCard';
import { CategoryModalBody } from './CategoryModalBody';
import { CustomCrudModalBody } from './CustomCrudModalBody';
import {
  POST_ADD_BRAND, POST_UPDATE_BRAND, POST_DELETE_BRAND,
  POST_ADD_TAG, POST_DELETE_TAG, POST_UPDATE_TAG,
  ADD_NEW_CATEGORY,
} from "../../../constants";

export const ProductFormSidebar = ({ name, necessaryData, data, errors, onChange, onNecessaryDataChange, }) => {
  const [activeModal, setActiveModal] = useState('');
  const [_data, _setData, updateData,] = useStateEnhanced({
    initialValue: data ?? {},
  });

  const onInputValueChanged = event => {
    const { updatedData, } = updateData({ [event.target.name]: event.target.value, });

    typeof onChange === 'function' && onChange({
      target: {
        name: name,
        value: updatedData,
      },
    });
  };

  const onProductDetailsAddButtonClicked = event => {
    setActiveModal(event.target.name);
  };

  useEffectEnhanced(() => {
    updateData({ thumbnail: data?.thumbnail ?? {}, });
  }, [data?.thumbnail]);

  return <div>
    <ProductThumbnail
      className='d-none d-lg-block mb-5'
      name='thumbnail'
      errorFieldName='sidebar.thumbnail.src'
      data={_data.thumbnail}
      onChange={onInputValueChanged} />

    <StatusCard
      name='status'
      statusDataList={necessaryData?.statusDataList ?? []}
      data={_data.status}
      errors={errors}
      onChange={onInputValueChanged} />

    <ProductDetailsCard
      name='productDetails'
      necessaryData={necessaryData ?? {}}
      data={_data.productDetails}
      errors={errors}
      onChange={onInputValueChanged}
      onAdd={onProductDetailsAddButtonClicked} />

    <ConfigurationCard
      name='configuration'
      data={_data.configuration}
      errors={errors}
      onChange={onInputValueChanged} />

    <div>
      <Modal show={activeModal === 'categories'} onHide={() => setActiveModal('')}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryModalBody
            modalBodyFor='Category'    // <-- THIS IS IMPORTANT...
            label='Category name'
            placeholder='Enter category name'
            addAccess='Add Category'
            group='products'
            name='categoryDataList'
            attributeName='title'
            urlAdd={ADD_NEW_CATEGORY}
            dataList={necessaryData.categoryDataList}
            onChange={onNecessaryDataChange}
            additionalAttributes={{   // <-- these attributes are passed while processing received data...
              description: '',
            }} />
        </Modal.Body>
      </Modal>

      <Modal show={activeModal === 'brand'} onHide={() => setActiveModal('')}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomCrudModalBody
            modalBodyFor='Brand'    // <-- THIS IS IMPORTANT...
            label='Brand name'
            placeholder='Enter brand name'
            addAccess='Add Brand'
            updateAccess='Edit Brand'
            deleteAccess='Delete Brand'
            group='products'
            name='brandDataList'
            attributeName='name'
            urlAdd={POST_ADD_BRAND}
            urlPrefixUpdate={POST_UPDATE_BRAND}
            urlPrefixDelete={POST_DELETE_BRAND}
            dataList={necessaryData.brandDataList}
            onChange={onNecessaryDataChange}
            additionalAttributes={{   // <-- these attributes are passed while processing received data...
              image: '',
              msisdn: '',
              address: '',
            }} />
        </Modal.Body>
      </Modal>

      <Modal show={activeModal === 'tags'} onHide={() => setActiveModal('')}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomCrudModalBody
            upperCasedInput={true}
            modalBodyFor='Tag'    // <-- THIS IS IMPORTANT...
            label='Tag'
            placeholder='Enter a tag'
            addAccess='Add Tag'
            updateAccess='Edit Tag'
            deleteAccess='Delete Tag'
            group='products'
            name='tagDataList'
            attributeName='title'
            urlAdd={POST_ADD_TAG}
            urlPrefixUpdate={POST_UPDATE_TAG}
            urlPrefixDelete={POST_DELETE_TAG}
            dataList={necessaryData.tagDataList}
            onChange={onNecessaryDataChange} />
        </Modal.Body>
      </Modal>
    </div>
  </div>;
};

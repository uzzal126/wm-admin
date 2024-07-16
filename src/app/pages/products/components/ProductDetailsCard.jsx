import { Can } from '../../../../_metronic/redux/ability';
import { useStateEnhanced } from '../../../hooks';
import { ToolTipLabel } from '../../../modules/helper/misc';
import { CardHeader } from './CardHeader';
import { CustomTagify } from './CustomTagify';

const ProductDetailsField = ({
  name, value, placeholder, required, tooltip, tooltipLabel, options,
  onAdd, onChange, showAddButton, addButtonText, access, group,
  allowMultipleSelect, clearable, creatable,
}) => {
  const onAddButtonClicked = event => {
    typeof onAdd === 'function' && onAdd({
      target: {
        name: name,
      },
    });
  };

  return <div>
    <ToolTipLabel
      className={required ? 'required' : ''}
      label={tooltipLabel}
      tooltip={tooltip} />

    <CustomTagify
      allowMultipleSelect={allowMultipleSelect}
      clearable={clearable}
      name={name}
      placeholder={placeholder}
      suggestions={options}
      value={value ?? []}
      creatable={creatable}
      onChange={onChange} />

    {showAddButton && <Can access={access ?? 'false'} group={group ?? 'false'}>
      <div className='py-1' />
      <button
        type='button'
        className='btn btn-light-primary btn-sm mb-5'
        onClick={onAddButtonClicked}>
        <i className='fas fa-plus' />{addButtonText}
      </button>
    </Can>}
  </div>;
};

export const ProductDetailsCard = ({ name, necessaryData, data, errors, onChange, onAdd, }) => {
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

  return <div className='card card-flush py-4'>
    <CardHeader title='Details' />

    <div className='card-body py-0'>
      <ProductDetailsField
        allowMultipleSelect={true}
        clearable={true}
        creatable={false}
        showAddButton={true}
        name='categories'
        tooltipLabel='Categories'
        tooltip='Select categories or create new ones'
        placeholder='Select categories'
        // access is used for access control...
        access='Add Category'
        // group is used for access control...
        group='products'
        addButtonText='Create new category'
        options={necessaryData.categoryDataList}
        value={_data.categories}
        onAdd={onAdd}
        onChange={onInputValueChanged} />

      <div className='py-1' />

      <ProductDetailsField
        allowMultipleSelect={false}
        creatable={false}
        clearable={false}
        showAddButton={true}
        name='brand'
        tooltipLabel='Brand'
        placeholder='Select brand'
        tooltip='Select a brand or create a new one'
        addButtonText='Manage brands'
        options={necessaryData.brandDataList}
        value={_data.brand}
        onAdd={onAdd}
        onChange={onInputValueChanged} />

      <div className='py-1' />

      <ProductDetailsField
        allowMultipleSelect={true}
        creatable={false}
        clearable={true}
        showAddButton={true}
        name='tags'
        tooltipLabel='Tags'
        tooltip='Select or create your preferred tags'
        placeholder='Select tags'
        addButtonText='Manage tags'
        options={necessaryData.tagDataList}
        value={_data.tags}
        onAdd={onAdd}
        onChange={onInputValueChanged} />
    </div>
  </div>;
};

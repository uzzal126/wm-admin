import { useState } from "react";
import { Button } from "react-bootstrap";
import slugify from "react-url-slugify";
import { toast } from "react-toastify";
import { FormField } from './FormField';
import { isArray, isUndefinedNullOrWhiteSpaceString } from "../../../../common";
import { useEffectEnhanced, useStateEnhanced } from "../../../hooks";
import { Can } from "../../../../_metronic/redux/ability";
import { queryRequest } from "../../../library/api.helper";
import { CustomTagify } from './CustomTagify';
import { generateCatLabel } from '../../../../_metronic/partials/content/forms/category/generateCategory';

const DatumAdd = ({
  label, access, group, name, value, placeholder, readOnly, onChange, onAdd,
}) => {
  const onFormSubmitted = event => {
    event.preventDefault();
    event.stopPropagation();      // <-- this prevents parent form submit...

    if (isUndefinedNullOrWhiteSpaceString(value)) { return; }

    typeof onAdd === 'function' && onAdd(event);
  };

  return <Can access={access} group={group}>
    <form className='row' autoComplete='off' onSubmit={onFormSubmitted}>
      <div className='col'>
        <label className='fs-6 form-label fw-bolder text-dark'>{label}</label>
        <FormField
          type='text'
          autoFocus={true}
          name={name}
          label=''
          placeholder={placeholder}
          readOnly={readOnly}
          tooltip=''
          maximumLength={40}
          value={value ?? ''}
          onChange={onChange}
          allowEnterToSubmitForm={true}
          required={false} />
      </div>
      <div className='col-auto align-self-end text-end'>
        <Button type='submit' variant='dark' disabled={readOnly}>Add</Button>
      </div>
    </form>
  </Can>;
};

export const CategoryModalBody = ({
  modalBodyFor, name, urlAdd, urlPrefixUpdate, urlPrefixDelete,
  dataList, onChange, addAccess, updateAccess, deleteAccess, group,
  placeholder, label, attributeName, additionalAttributes, upperCasedInput,
}) => {
  const [loading, setLoading] = useState(false);
  const [parent, setParent] = useState({});
  const [datum, setDatum, updateDatum,] = useStateEnhanced();
  const [_dataList, setDataList] = useState(isArray(dataList) ? dataList : []);

  const onParentChanged = event => {
    const parent = event.target.value[0];

    updateDatum({ parent: parent.id, });
    setParent(parent);
  };

  const addAsync = async event => {
    setLoading(true);

    const response = await queryRequest(urlAdd, datum);

    setLoading(false);

    if (response.status_code !== 200) {
      return toast.error(response.message);
    }

    if (!isArray(response.tree)) {
      return toast.error(`Invalid response received from the server while adding ${modalBodyFor?.toLowerCase() ?? 'data'}.`);
    }

    const dataList = generateCatLabel(response.tree);

    setDataList(dataList);
    setDatum({});
    toast.success(`${modalBodyFor} added successfully.`);

    typeof onChange === 'function' && onChange({
      type: 'ADD',
      target: {
        name: name,
        value: dataList,
      },
    });
  };

  useEffectEnhanced(() => {
    setDataList(isArray(dataList) ? dataList : []);
  }, [dataList]);

  return <>
    <div className='mb-5'>
      <DatumAdd
        access={addAccess}
        group={group}
        label={label}
        placeholder={placeholder}
        readOnly={loading}
        name='ADD'
        value={datum[attributeName ?? 'name']}
        onChange={event => setDatum({
          ...datum,
          [attributeName ?? 'name']: upperCasedInput === true
            ? event.target.value.toUpperCase()
            : event.target.value,
          slug: slugify(event.target.name),
        })}
        onAdd={addAsync} />
    </div>

    <div className='mb-5'>
      <label className='fs-6 form-label fw-bolder text-dark'>Set Parent</label>
      <CustomTagify
        creatable={false}
        clearable={false}
        allowMultipleSelect={false}
        name='parent'
        placeholder='Select your product status'
        value={parent}
        suggestions={_dataList}
        onChange={onParentChanged} />
    </div>
  </>;
};

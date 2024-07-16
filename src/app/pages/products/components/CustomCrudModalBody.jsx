import { useState } from "react";
import { toast } from "react-toastify";
import slugify from "react-url-slugify";
import axios from 'axios';
import swal from "sweetalert";
import { FormField } from './FormField';
import { isArray, isUndefinedNullOrWhiteSpaceString } from "../../../../common";
import { useEffectEnhanced } from "../../../hooks";
import { Can } from "../../../../_metronic/redux/ability";
import { Button } from "react-bootstrap";
import { queryRequest } from "../../../library/api.helper";

const DatumAdd = ({
  label, access, group, name, value, placeholder, readOnly, onChange, onAdd,
}) => {
  const onFormSubmitted = event => {
    event.preventDefault();
    event.stopPropagation();  // <-- this prevents parent form submit...

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
          maximumLength={250}
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

export const CustomCrudModalBody = ({
  modalBodyFor, name, urlAdd, urlPrefixUpdate, urlPrefixDelete,
  dataList, onChange, addAccess, updateAccess, deleteAccess, group,
  placeholder, label, attributeName, additionalAttributes, upperCasedInput,
}) => {
  const [loading, setLoading] = useState(false);
  const [datum, setDatum] = useState({});
  const [datumBeingEdited, setDatumBeingEdited] = useState({});
  const [_dataList, setDataList] = useState(isArray(dataList) ? dataList : []);

  const addAsync = async event => {
    setLoading(true);

    const response = await queryRequest(urlAdd, datum);

    setLoading(false);

    if (response.status_code !== 200) {
      return toast.error(response.message);
    }

    if (!isArray(response.data)) {
      return toast.error(`Invalid response received from the server while adding ${modalBodyFor?.toLowerCase() ?? 'data'}.`);
    }

    const dataList = response.data.map(datum => {
      return {
        ...datum,
        ...additionalAttributes,
        label: datum[attributeName ?? 'name'],
        value: datum.id,
      };
    });

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

  const updateAsync = async event => {
    event.preventDefault();   // <-- this is required because this method gets called by a form...
    event.stopPropagation();  // <-- this prevents parent form submit...
    setLoading(true);

    const response = await queryRequest(`${urlPrefixUpdate}/${datumBeingEdited.id ?? ''}`, datumBeingEdited, 'PUT');

    setLoading(false);

    if (response.status_code !== 200) {
      return toast.error(response.message);
    }

    if (!isArray(response.data)) {
      return toast.error('Invalid response received from the server.');
    }

    const dataList = response.data.map(datum => {
      return {
        ...datum,
        ...additionalAttributes,
        label: datum[attributeName ?? 'name'],
        value: datum.id,
      };
    });

    setDataList(dataList);
    setDatumBeingEdited({});
    toast.success(`${modalBodyFor ?? 'Data'} updated successfully.`);

    typeof onChange === 'function' && onChange({
      type: 'UPDATE',
      target: {
        name: name,
        value: dataList,
      },
    });
  };

  const deleteAsync = async ({ index, datum, event, }) => {
    const shallDelete = await swal({
      title: `Are you sure you want to delete the ${modalBodyFor?.toLowerCase() ?? 'data'}, ${datum[attributeName ?? 'name']}?`,
      text: `Once deleted, you will not be able to recover this ${modalBodyFor?.toLowerCase() ?? 'data'}!`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    });

    if (!shallDelete) { return; }

    setLoading(true);

    const { data: response } = await axios.delete(`${urlPrefixDelete}/${datum.id ?? ''}`);

    setLoading(false);

    if (response.status_code !== 200) {
      return toast.error(response.message);
    }

    if (!isArray(response.data)) {
      return toast.error('Invalid response received from the server.');
    }

    const dataList = response.data.map(datum => {
      return {
        ...datum,
        ...additionalAttributes,
        label: datum[attributeName ?? 'name'],
        value: datum.id,
      };
    });

    setDataList(dataList);
    setDatumBeingEdited({});
    toast.success(`${modalBodyFor ?? 'Data'} deleted successfully.`);

    typeof onChange === 'function' && onChange({
      type: 'DELETE',
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

    <form autoComplete='off' className='table-responsive mt-4' onSubmit={updateAsync}>
      <table className='table table-row-bordered table-striped table-rounded border border-gray-300 px-2 g-2'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th className='text-end'>Action</th>
          </tr>
        </thead>
        <tbody>
          {isArray(_dataList) && !!_dataList.length && _dataList.map((_datum, index) => {
            return <tr key={index}>
              <td>{_datum.id}</td>
              <td>
                {_datum.id === datumBeingEdited.id ? <div className='col'>
                  <FormField
                    autoFocus={true}
                    readOnly={loading}
                    type='text'
                    name='EDIT'
                    label=''
                    maximumLength={250}
                    tooltip=''
                    placeholder={placeholder}
                    value={datumBeingEdited[attributeName ?? 'name']}
                    onChange={event => setDatumBeingEdited({
                      ...datumBeingEdited,
                      [attributeName ?? 'name']: upperCasedInput === true
                        ? event.target.value.toUpperCase()
                        : event.target.value,
                      index: index,
                      slug: slugify(event.target.name),
                    })}
                    allowEnterToSubmitForm={true}
                    required={false} />
                </div> : _datum[attributeName ?? 'name']}
              </td>
              <td className='text-end'>
                {_datum.id === datumBeingEdited.id ? <>
                  <button
                    type='submit'
                    className='btn btn-sm btn-icon btn-light-success w-30px h-30px'
                    disabled={loading}>
                    <i className='fas fa-check fs-3' />
                  </button>
                  <button
                    type='button'
                    className='btn btn-sm btn-icon btn-light-danger ms-2 w-30px h-30px'
                    disabled={loading}
                    onClick={event => setDatumBeingEdited({})}>
                    <i className='fas fa-times fs-3' />
                  </button>
                </> : <>
                  <Can access={updateAccess} group={group}>
                    <button
                      type='button'
                      className='btn btn-sm btn-icon btn-light-primary w-30px h-30px'
                      disabled={loading}
                      onClick={event => setDatumBeingEdited(_datum)}>
                      <i className='fas fa-pencil-alt fs-3' />
                    </button>
                  </Can>
                  <Can access={deleteAccess} group={group}>
                    <button
                      type='button'
                      className='btn btn-sm btn-icon btn-light-danger w-30px h-30px'
                      disabled={loading}
                      onClick={event => deleteAsync({ index, datum: _datum, event, })}>
                      <i className='la la-trash-o fs-3' />
                    </button>
                  </Can>
                </>}
              </td>
            </tr>;
          })}
        </tbody>
      </table>
    </form>
  </>;
};

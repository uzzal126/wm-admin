import { useState } from 'react';
import { Button, Col, Form, InputGroup, Modal } from 'react-bootstrap';
import { addToArray, isArray, removeFromArrayByIndex } from "../../../../common";
import EditorHelper from '../../../modules/components/pageBuilder';

const InfoField = ({
  placeholder, minimum, maximum, minimumLength, maximumLength,
  name, value, size, type, isValid, isInvalid, error, onChange,
}) => {
  const [_value, setValue] = useState(value ?? '');

  const onInputValueChanged = event => {
    setValue(event.target.value);

    typeof onChange === 'function' && onChange({
      target: {
        name: name,
        value: event.target.value,
      },
    });
  };

  return <Form.Group as={Col}>
    <InputGroup>
      <Form.Control
        type={type}
        as='input'
        min={minimum}
        max={maximum}
        minLength={minimumLength}
        maxLength={maximumLength}
        name={name}
        value={_value}
        size={size}
        list='data'
        isValid={isValid}
        isInvalid={isInvalid}
        placeholder={placeholder ?? ''}
        feedback={error}
        onChange={onInputValueChanged} />
      <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
    </InputGroup>
  </Form.Group>;
};

export const DynamicInfoCard = ({
  modalTitle, smallAddButtonText, largeAddButtonText, labelPlaceholder,
  maximumLabelLength, name, infoList, onChange,
}) => {
  const [activeInfoIndex, setActiveInfoIndex] = useState(-1);
  const [_infoList, setInfoList] = useState(
    isArray(infoList) ? infoList : []);

  const onModalVisibleButtonClicked = ({ index, event, }) => {
    setActiveInfoIndex(index);
  };

  const onAddButtonClicked = event => {
    const infoList = addToArray({
      label: '',
      body: [],
    }, _infoList);

    setInfoList(infoList);

    typeof onChange === 'function' && onChange({
      target: {
        name: name,
        value: infoList,
      },
    });
  };

  const onRemoveButtonClicked = ({ index, event, }) => {
    const infoList = removeFromArrayByIndex(index, _infoList);

    setInfoList(infoList);

    typeof onChange === 'function' && onChange({
      target: {
        name: name,
        value: infoList,
      },
    });
  };

  const onEditorHelperValueChanged = data => {
    if (activeInfoIndex === -1) { return; }

    const info = _infoList[activeInfoIndex];
    info.body = data;
    const infoList = [..._infoList];

    setInfoList(infoList);

    typeof onChange === 'function' && onChange({
      target: {
        name: name,
        value: infoList,
      },
    });
  };

  const onInfoFieldValueChanged = ({ index, event, }) => {
    const info = _infoList[index];
    info.label = event.target.value;
    const infoList = [..._infoList];

    // Note: We need to create a new copy of the list to make sure that
    // react re-renders the component...
    setInfoList(infoList);

    typeof onChange === 'function' && onChange({
      target: {
        name: name,
        value: infoList,
      },
    });
  };

  return <div className='mt-2 border border-dashed rounded p-4'>
    <div>
      {_infoList.length ? <>
        <table className='table align-middle table-row-dashed fs-6 gy-1'>
          <thead>
            <tr>
              <th className='text-center'>#</th>
              <th>Label</th>
              <th className='text-end w-100px'>Action</th>
            </tr>
          </thead>
          <tbody>{_infoList.map((info, index) => {
            return <tr key={index}>
              <td className='text-center'>{index + 1}</td>
              <td>
                <InfoField index={index} type='text' size='sm'
                  maximumLength={maximumLabelLength}
                  name='label' value={info.label}
                  placeholder={labelPlaceholder}
                  onChange={event => onInfoFieldValueChanged({ index: index, event: event, })} />
              </td>
              <td className='text-end'>
                <Button type='button' variant='danger' size='sm' className='btn-icon'
                  onClick={event => onRemoveButtonClicked({ index: index, event: event, })}>
                  <i className='fas fa-minus' />
                </Button>
                <Button type='button' variant='info' size='sm' className='btn-icon mx-2'
                  onClick={event => onModalVisibleButtonClicked({ index: index, event: event, })}>
                  <i className='fas fa-pen-alt' />
                </Button>
              </td>
            </tr>
          })}</tbody>
          <tfoot>
            <tr>
              <td className='text-end' colSpan={3}>
                <Button type='button' variant='light-success' size='sm' onClick={onAddButtonClicked} >
                  {smallAddButtonText ?? '+ Add'}
                </Button>
              </td>
            </tr>
          </tfoot>
        </table>
      </> : <>
        <Button type='button' variant='light-primary' size='sm' onClick={onAddButtonClicked}>
          <i className='fas fa-plus' />{largeAddButtonText ?? 'Add Information'}
        </Button>
      </>}
    </div>

    <Modal dialogClassName='modal-95w' scrollable fullscreen centered
      show={activeInfoIndex !== -1} onHide={() => setActiveInfoIndex(-1)}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle ?? ''}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditorHelper value={_infoList[activeInfoIndex]?.body ?? []} onChange={onEditorHelperValueChanged} />
      </Modal.Body>
    </Modal>
  </div>;
};

import {useState} from 'react'
import {Col, Form, InputGroup} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import TextEditor from '../../../../_metronic/partials/content/forms/editor'
import {
  computeByteLength,
  getDefaultIfNotNumber,
  isUndefinedNullOrWhiteSpaceString,
  truncateByByteLength,
} from '../../../../common'
import {useEffectEnhanced} from '../../../hooks'
import {ToolTipLabel} from '../../../modules/helper/misc'
import {productFormErrorsActions} from '../redux-slices'

export const FormField = ({
  allowEnterToSubmitForm,
  autoFocus,
  readOnly,
  type,
  pattern,
  name,
  label,
  tooltip,
  required,
  placeholder,
  inputGroupText,
  className,
  value,
  errorFieldName,
  minimum,
  maximum,
  minimumLength,
  maximumLength,
  childOrder,
  onBlur,
  onChange,
  children,
}) => {
  const [_value, setValue] = useState(value ?? '')
  const {touches, errors} = useSelector((state) => state.productFormErrors)
  const dispatch = useDispatch()
  const touched = touches[errorFieldName] === true
  const errorFieldNameProvided = !isUndefinedNullOrWhiteSpaceString(errorFieldName)
  const errorMessage = errorFieldNameProvided ? errors?.[errorFieldName] ?? '' : ''

  const onKeyDown = (event) => {
    event.key.toLowerCase() === 'enter' && allowEnterToSubmitForm !== true && event.preventDefault()
  }

  const onInputFocusLost = (event) => {
    errorFieldNameProvided && dispatch(productFormErrorsActions.setTouch(errorFieldName))

    typeof onBlur === 'function' &&
      onBlur({
        target: {
          name: name,
          value: _value,
        },
      })
  }

  const onInputValueChanged = (event) => {
    let value = event.target.value
    const _maximumLength = getDefaultIfNotNumber(maximumLength)

    if (typeof _maximumLength !== 'undefined') {
      if (value.length > _maximumLength) {
        value = value.substring(0, _maximumLength)
      }

      const byteLength = computeByteLength(value)

      if (byteLength > _maximumLength) {
        value = truncateByByteLength(value, _maximumLength)
      }
    }

    if (event.target.type === 'number') {
      const valueAsNumber = Number(value)
      const _minimum = getDefaultIfNotNumber(minimum)
      const _maximum = getDefaultIfNotNumber(maximum)

      if (typeof _minimum !== 'undefined' && valueAsNumber < _minimum) {
        value = ''
      } else if (typeof _maximum !== 'undefined' && valueAsNumber > _maximum) {
        value = _maximum
      }
    }

    dispatch(productFormErrorsActions.setTouch(errorFieldName))
    setValue(value)

    typeof onChange === 'function' &&
      onChange({
        target: {
          name: name,
          value: value,
        },
      })
  }

  const onTextEditorTextChanged = (event) => {
    const sanitizedValue = event.target.isEmpty
      ? event.target.extractedTextValue
      : event.target.value

    event.target.value = sanitizedValue

    dispatch(productFormErrorsActions.setTouch(errorFieldName))

    typeof onChange === 'function' && onChange(event)
  }

  useEffectEnhanced(() => {
    setValue(value ?? '')
  }, [value])

  return (
    <Form.Group as={Col} md='md'>
      {!isUndefinedNullOrWhiteSpaceString(label) && <Form.Label>{label}</Form.Label>}
      {!isUndefinedNullOrWhiteSpaceString(tooltip) && (
        <ToolTipLabel tooltip={tooltip} className={required !== false ? 'required' : ''} />
      )}

      <InputGroup>
        {!isUndefinedNullOrWhiteSpaceString(inputGroupText) ? (
          <InputGroup.Text>https://example.com/products/</InputGroup.Text>
        ) : (
          ''
        )}

        {childOrder === 'before' && children}

        {!['select', 'textEditor', 'textarea'].includes(type) ? (
          <Form.Control
            className={className}
            autoComplete='off'
            type={isUndefinedNullOrWhiteSpaceString(type) ? 'text' : type}
            name={name}
            value={_value}
            placeholder={placeholder}
            isValid={undefined /*touched && errorFieldNameProvided && !errorMessage.length*/}
            pattern={pattern}
            autoFocus={autoFocus}
            readOnly={readOnly}
            isInvalid={undefined /*touched && errorFieldNameProvided && !!errorMessage.length*/}
            min={minimum}
            max={maximum}
            minLength={minimumLength}
            maxLength={maximumLength}
            onBlur={onInputFocusLost}
            onChange={onInputValueChanged}
            onKeyDown={onKeyDown}
            required={required}
          />
        ) : (
          ''
        )}

        {type === 'textarea' ? (
          <Form.Control
            as='textarea'
            autoComplete='off'
            type={isUndefinedNullOrWhiteSpaceString(type) ? 'text' : type}
            name={name}
            value={_value}
            placeholder={placeholder}
            minLength={minimumLength}
            maxLength={maximumLength}
            isValid={undefined /*touched && errorFieldNameProvided && !errorMessage.length*/}
            isInvalid={undefined /*touched && errorFieldNameProvided && !!errorMessage.length*/}
            pattern={pattern}
            onBlur={onInputFocusLost}
            onChange={onInputValueChanged}
            required={required}
          />
        ) : (
          ''
        )}

        {type === 'textEditor' ? (
          <TextEditor
            limitChars={maximumLength}
            name={name}
            placeholder={placeholder}
            defaultValue={_value}
            onBlur={onInputFocusLost}
            onChange={onTextEditorTextChanged}
          />
        ) : (
          ''
        )}

        {childOrder === 'after' && children}

        {type === 'select' ? (
          <Form.Select
            name={name}
            value={_value}
            isValid={undefined}
            isInvalid={undefined}
            feedback={undefined}
            onChange={onChange}
            required={required}
          >
            {children}
          </Form.Select>
        ) : (
          ''
        )}
      </InputGroup>

      {touched && !!errorMessage.length && <div className='text-danger mt-2'>{errorMessage}</div>}
    </Form.Group>
  )
}

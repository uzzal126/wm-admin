import {ErrorMessage, Field} from 'formik'
import {Form, InputGroup} from 'react-bootstrap'
import {ToolTipLabel} from '../../../helper/misc'
import { computeByteLength, getDefaultIfNotNumber, truncateByByteLength } from '../../../../../common'

const FormTextField = ({
  as,
  md,
  controlId,
  label,
  name,
  type,
  inputGroupPrepend,
  groupEnd,
  tooltip,
  onChange,
  inputType,
  size,
  placeholder,
  className,
  onBlur,
  min,
  max,
  maxLength,
  value,
}) => {
  const onInputValueChanged = (event, field) => {
    let value = event.target.value;
    const _maximumLength = getDefaultIfNotNumber(maxLength);

    if (typeof _maximumLength !== 'undefined') {
      if (value.length > _maximumLength) {
        value = value.substring(0, _maximumLength);
      }
  
      const byteLength = computeByteLength(value);
  
      if (byteLength > _maximumLength) {
        value = truncateByByteLength(value, _maximumLength);
      }
    }

    if (event.target.type === 'number') {
      const valueAsNumber = Number(value);
      const _minimum = getDefaultIfNotNumber(min);
      const _maximum = getDefaultIfNotNumber(max);

      if (typeof _minimum !== 'undefined' && valueAsNumber < _minimum) {
        value = '';
      } else if (typeof _maximum !== 'undefined' && valueAsNumber > _maximum) {
        value = _maximum;
      }
    }

    event.target.value = value;

    if (typeof onChange === 'function') { onChange(event); }
    else if (typeof field?.onChange === 'function') { field.onChange(event); }
  };

  return (
    <Field
      name={name}
      render={({field, form: {errors, touched}}) => {
        let isValid = !errors[field.name]
        let isInvalid = touched[field.name] && !isValid

        return (
          <Form.Group as={as} md={md} controlId={controlId}>
            {tooltip !== undefined && tooltip !== '' ? (
              <ToolTipLabel label={label} tooltip={tooltip} className={className} />
            ) : (
              label && <Form.Label>{label}</Form.Label>
            )}
            {inputGroupPrepend ? (
              <InputGroup>
                {(groupEnd === undefined || groupEnd === false) && inputGroupPrepend}
                <Form.Control
                  {...field}
                  className={className}
                  size={size}
                  onChange={event => onInputValueChanged(event, field)}
                  onBlur={(e) => onBlur && onBlur(e)}
                  type={type}
                  min={min}
                  max={max}
                  placeholder={placeholder}
                  isValid={touched[field.name] && isValid}
                  isInvalid={isInvalid}
                  feedback={errors[field.name]}
                  as={inputType}
                />
                {groupEnd && inputGroupPrepend}
                {/* <Form.Control.Feedback type='invalid'>{errors[field.name]}</Form.Control.Feedback> */}
              </InputGroup>
            ) : (
              <>
                <Form.Control
                  {...field}
                  size={size}
                  className={className}
                  onChange={event => onInputValueChanged(event, field)}
                  onBlur={(e) => onBlur && onBlur(e)}
                  type={type}
                  min={min}
                  max={max}
                  placeholder={placeholder}
                  isValid={touched[field.name] && isValid}
                  isInvalid={isInvalid}
                  feedback={errors[field.name]}
                  as={inputType}
                />
                {/* <Form.Control.Feedback type='invalid'>{errors[field.name]}</Form.Control.Feedback> */}
              </>
            )}
            <ErrorMessage
              name={field.name || name}
              render={(msg) => <div className='text-danger mt-2'>{msg}</div>}
            />
          </Form.Group>
        )
      }}
    />
  )
}

FormTextField.defaultProps = {
  type: 'text',
  inputGroupPrepend: null,
}

export default FormTextField

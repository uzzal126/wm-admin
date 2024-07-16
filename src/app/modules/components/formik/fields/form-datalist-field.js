import React from 'react'
import {Form, InputGroup} from 'react-bootstrap'
import {Field} from 'formik'
import {ToolTipLabel} from '../../../helper/misc'

const FormDatalistField = ({
  as,
  md,
  controlId,
  label,
  name,
  type,
  inputGroupPrepend,
  tooltip,
  onChange,
  inputType,
  size,
  datalist,
}) => {
  return (
    <Field
      name={name}
      render={({field, form}) => {
        const isValid = !form.errors[field.name]
        const isInvalid = form.touched[field.name] && !isValid
        return (
          <Form.Group as={as} md={md} controlId={controlId}>
            {tooltip !== undefined && tooltip !== '' ? (
              <ToolTipLabel label={label} tooltip={tooltip} className='required' />
            ) : (
              label && <Form.Label>{label}</Form.Label>
            )}
            <InputGroup>
              {inputGroupPrepend}
              <Form.Control
                {...field}
                size={size}
                onChange={onChange || field.onChange}
                type={type}
                list='data'
                isValid={form.touched[field.name] && isValid}
                isInvalid={isInvalid}
                feedback={form.errors[field.name]}
                as={inputType}
              />
              <datalist id='data'>
                {datalist.map((item, key) => (
                  <option key={key} value={item} />
                ))}
              </datalist>

              <Form.Control.Feedback type='invalid'>
                {form.errors[field.name]}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        )
      }}
    />
  )
}

FormDatalistField.defaultProps = {
  type: 'text',
  inputGroupPrepend: null,
}

export default FormDatalistField

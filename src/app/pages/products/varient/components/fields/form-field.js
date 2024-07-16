import React from 'react'
import {Form, InputGroup} from 'react-bootstrap'
import {ErrorMessage, Field} from 'formik'
import {ToolTipLabel} from '../../../../../modules/helper/misc'

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
  readOnly,
  className,
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
            {inputGroupPrepend ? (
              <InputGroup>
                {(groupEnd === undefined || groupEnd === false) && inputGroupPrepend}
                <Form.Control
                  {...field}
                  className={className}
                  size={size}
                  onChange={onChange || field.onChange}
                  type={type}
                  readOnly={readOnly}
                  isValid={form.touched[field.name] && isValid}
                  isInvalid={isInvalid}
                  feedback={form.errors[field.name]}
                  as={inputType}
                />
                {groupEnd && inputGroupPrepend}
                <Form.Control.Feedback type='invalid'>
                  {form.errors[field.name]}
                </Form.Control.Feedback>
              </InputGroup>
            ) : (
              <>
                <Form.Control
                  {...field}
                  className={className}
                  size={size}
                  onChange={onChange || field.onChange}
                  type={type}
                  readOnly={readOnly}
                  isValid={form.touched[field.name] && isValid}
                  isInvalid={isInvalid}
                  feedback={form.errors[field.name]}
                  as={inputType}
                />
                <Form.Control.Feedback type='invalid'>
                  {form.errors[field.name]}
                </Form.Control.Feedback>
              </>
            )}
            {!isInvalid && (
              <div className='text-danger mt-2'>
                <ErrorMessage name={field.name} />
              </div>
            )}
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

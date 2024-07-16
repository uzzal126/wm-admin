import React from 'react'
import {Form, InputGroup} from 'react-bootstrap'
import {Field} from 'formik'

const FormSelectField = ({
  as,
  md,
  size,
  controlId,
  label,
  name,
  type,
  inputGroupPrepend,
  children,
  onChange,
  onBlur,
}) => {
  return (
    <Field
      name={name}
      render={({field, form}) => {
        const isValid = !form.errors[field.name]
        const isInvalid = form.touched[field.name] && !isValid
        return (
          <Form.Group as={as} md={md} controlId={controlId}>
            {label && <Form.Label>{label}</Form.Label>}
            {inputGroupPrepend ? (
              <InputGroup>
                {inputGroupPrepend}
                <Form.Select
                  {...field}
                  onChange={onChange || field.onChange}
                  onBlur={(e) => onBlur && onBlur(e)}
                  isValid={form.touched[field.name] && isValid}
                  isInvalid={isInvalid}
                  feedback={form.errors[field.name]}
                  size={size}
                >
                  {children}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>
                  {form.errors[field.name]}
                </Form.Control.Feedback>
              </InputGroup>
            ) : (
              <>
                <Form.Select
                  {...field}
                  onChange={onChange || field.onChange}
                  onBlur={(e) => onBlur && onBlur(e)}
                  isValid={form.touched[field.name] && isValid}
                  isInvalid={isInvalid}
                  feedback={form.errors[field.name]}
                  size={size}
                >
                  {children}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>
                  {form.errors[field.name]}
                </Form.Control.Feedback>
              </>
            )}
          </Form.Group>
        )
      }}
    />
  )
}

FormSelectField.defaultProps = {
  type: 'select',
  inputGroupPrepend: null,
}

export default FormSelectField

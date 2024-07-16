import React from 'react'
import {Form, InputGroup} from 'react-bootstrap'
import {Field} from 'formik'
import Select from 'react-select'

const ReactSelectField = ({
  as,
  md,
  controlId,
  label,
  name,
  inputGroupPrepend,
  searchAble,
  defaultValue,
  options,
  multi,
  placeholder,
  groupEnd,
}) => {
  return (
    <Field
      name={name}
      render={({field, form}) => {
        return (
          <Form.Group as={as} md={md} controlId={controlId}>
            {label && <Form.Label>{label}</Form.Label>}
            {inputGroupPrepend ? (
              <InputGroup>
                {groupEnd === undefined && inputGroupPrepend}

                <Select
                  {...field}
                  value={defaultValue}
                  name={name}
                  options={options}
                  isMulti={multi}
                  isSearchable={searchAble}
                  className='multi-select flex-grow-1'
                  placeholder={placeholder}
                />
                {groupEnd && inputGroupPrepend}

                <Form.Control.Feedback type='invalid'>
                  {form.errors[field.name]}
                </Form.Control.Feedback>
              </InputGroup>
            ) : (
              <>
                <Select
                  {...field}
                  value={defaultValue}
                  name={name}
                  options={options}
                  isMulti={multi}
                  isSearchable={searchAble}
                  className='multi-select mb-2'
                  placeholder={placeholder}
                />
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

ReactSelectField.defaultProps = {
  type: 'select',
  inputGroupPrepend: null,
}

export default ReactSelectField

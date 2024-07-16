import {ErrorMessage, Field} from 'formik'
import {Form} from 'react-bootstrap'

const FormCheckboxField = ({
  controlId,
  label,
  name,
  onChange,
  size,
  placeholder,
  className,
  check,
}) => {
  return (
    <Field
      name={name}
      render={({field, form: {errors, touched}}) => {
        let isValid = !errors[field.name]
        let isInvalid = touched[field.name] && !isValid
        // // console.log(errors)
        return (
          <>
            <Form.Check
              {...field}
              type='switch'
              id={controlId}
              label={label}
              className={className}
              size={size}
              checked={check || false}
              onChange={onChange || field.onChange}
              placeholder={placeholder}
              isValid={touched[field.name] && isValid}
              isInvalid={isInvalid}
              feedback={errors[field.name]}
            />
            <ErrorMessage
              name={field.name}
              render={(msg) => <div className='text-danger mt-2'>{msg}</div>}
            />
          </>
        )
      }}
    />
  )
}

FormCheckboxField.defaultProps = {
  type: 'text',
  inputGroupPrepend: null,
}

export default FormCheckboxField

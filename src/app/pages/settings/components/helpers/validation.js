import * as yup from 'yup'

export const schema = yup.object({
  data: yup
    .array()
    .of(
      yup.object().shape({
        location: yup.string().required('Location Required'),
        price_for_merchants_per_kg: yup.number().required('Fee per KG required'),
        price_for_webmanza_per_kg: yup.number().required('Fee per KG required'),
        additional_charge_per_kg: yup
          .number()
          .min(0, 'Amount should be greater than or equal to zero!')
          .required('Additional Fee per KG required'),
        cash_on_delivery_percentage: yup
          .number()
          .min(0, 'Amount should be greater than or equal to zero!')
          .required('COD Fee required'),
        return_charge_percentage: yup
          .number()
          .min(0, 'Amount should be greater than or equal to zero!')
          .required('Additional Fee per KG required'),
      })
    )
    .min(4, 'Minimum of 4 Config')
    .required('Must have Config'),
})

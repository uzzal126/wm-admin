import * as yup from 'yup'

export const schema = yup.object({
  title: yup
    .string()
    .test('utf8Length', 'Job post title must not exceed 500 Unicode characters', function (value) {
      if (!value) {
        // Allow empty values
        return true
      }

      const encoder = new TextEncoder()
      const utf8Bytes = encoder.encode(value)

      return utf8Bytes.length <= 500
    })
    .required('Job name is Required'),
  age: yup
    .string()
    .matches(/^(\d{1,2}-\d{1,2})?$/, 'Please provide a valid age range')
    .test('utf8Length', 'Age must not exceed 500Unicode characters', function (value) {
      if (!value) {
        // Allow empty values
        return true
      }

      const encoder = new TextEncoder()
      const utf8Bytes = encoder.encode(value)

      return utf8Bytes.length <= 500
    })
    .required(),
  slug: yup
    .string()
    .test('utf8Length', 'Job post slug must not exceed 500 Unicode characters', function (value) {
      if (!value) {
        // Allow empty values
        return true
      }

      const encoder = new TextEncoder()
      const utf8Bytes = encoder.encode(value)

      return utf8Bytes.length <= 500
    })
    .required('Job slug Required'),
  description: yup
    .string()
    .test('utf8Length', 'Description must not exceed 65500 Unicode characters', function (value) {
      if (!value) {
        // Allow empty values
        return true
      }

      const encoder = new TextEncoder()
      const utf8Bytes = encoder.encode(value)

      return utf8Bytes.length <= 65500
    })
    .required('Description Required'),
  jobType: yup.string().required('jobType is Required'),
  location: yup.string().required('location is Required'),
  salary: yup
    .string()
    .test('utf8Length', 'Salary must not exceed 250 Unicode characters', function (value) {
      if (!value) {
        // Allow empty values
        return true
      }

      const encoder = new TextEncoder()
      const utf8Bytes = encoder.encode(value)

      return utf8Bytes.length <= 250
    })
    .required('salary is Required'),
  deadline: yup.string().required('deadline is Required'),
  experience: yup
    .string()
    .test('utf8Length', 'Experience must not exceed 250 Unicode characters', function (value) {
      if (!value) {
        // Allow empty values
        return true
      }

      const encoder = new TextEncoder()
      const utf8Bytes = encoder.encode(value)

      return utf8Bytes.length <= 250
    })
    .required('experience is Required'),
  // product_status_id: yup.number().required().integer(),
  image: yup
    .object()
    .shape({
      src: yup
        .string()
        .test('utf8Length', 'Image path must not exceed 250 Unicode characters', function (value) {
          if (!value) {
            // Allow empty values
            return true
          }

          const encoder = new TextEncoder()
          const utf8Bytes = encoder.encode(value)

          return utf8Bytes.length <= 250
        }),
      alt: yup.string(),
    })
    .required('Thumbnail Required'),
  banner: yup
    .object()
    .shape({
      src: yup
        .string()
        .test(
          'utf8Length',
          'Banner image must not exceed 250 Unicode characters',
          function (value) {
            if (!value) {
              // Allow empty values
              return true
            }

            const encoder = new TextEncoder()
            const utf8Bytes = encoder.encode(value)

            return utf8Bytes.length <= 250
          }
        ),
      alt: yup.string(),
      caption: yup.string(),
    })
    .required('Banner Required'),
  seo: yup.object().shape({
    title: yup.string(),
    description: yup.string(),
    keywords: yup.string(),
  }),
  cat_ids: yup.array(),
})

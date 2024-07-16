import * as yup from 'yup'

export const schema = yup.object({
  title: yup
    .string()
    .test('utf8Length', 'Title must not exceed 500 Unicode characters', function (value) {
      if (!value) {
        // Allow empty values
        return true
      }

      const encoder = new TextEncoder()
      const utf8Bytes = encoder.encode(value)

      return utf8Bytes.length <= 500
    })
    .required('Blog name is required'),
  slug: yup
    .string()
    .test('utf8Length', 'Slug must not exceed 500 Unicode characters', function (value) {
      if (!value) {
        // Allow empty values
        return true
      }

      const encoder = new TextEncoder()
      const utf8Bytes = encoder.encode(value)

      return utf8Bytes.length <= 500
    })
    .required('Blog slug is required'),
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
  status_id: yup.number().required().integer(),
  thumbnail: yup
    .object()
    .shape({
      src: yup
        .string()
        .test(
          'utf8Length',
          'Thumbnail image path must not exceed 500 Unicode characters',
          function (value) {
            if (!value) {
              // Allow empty values
              return true
            }

            const encoder = new TextEncoder()
            const utf8Bytes = encoder.encode(value)

            return utf8Bytes.length <= 500
          }
        )
        .required('Thumbnail URL is Required'),
      alt: yup.string(),
    })
    .required('Thumbnail is Required'),
  banner: yup
    .object()
    .shape({
      src: yup
        .string()
        .test(
          'utf8Length',
          'Banner image path must not exceed 500 Unicode characters',
          function (value) {
            if (!value) {
              // Allow empty values
              return true
            }

            const encoder = new TextEncoder()
            const utf8Bytes = encoder.encode(value)

            return utf8Bytes.length <= 500
          }
        )
        .required('Banner URL is Required'),
      alt: yup.string(),
      caption: yup
        .string()
        .test(
          'utf8Length',
          'Banner caption must not exceed 500 Unicode characters',
          function (value) {
            if (!value) {
              // Allow empty values
              return true
            }

            const encoder = new TextEncoder()
            const utf8Bytes = encoder.encode(value)

            return utf8Bytes.length <= 500
          }
        ),
    })
    .required('Banner is Required'),
  seo: yup
    .object()
    .shape({
      title: yup
        .string()
        .test('utf8Length', 'Meta title must not exceed 500 Unicode characters', function (value) {
          if (!value) {
            // Allow empty values
            return true
          }

          const encoder = new TextEncoder()
          const utf8Bytes = encoder.encode(value)

          return utf8Bytes.length <= 500
        })
        .required('SEO Title is required'),
      description: yup
        .string()
        .test(
          'utf8Length',
          'Meta description must not exceed 500 Unicode characters',
          function (value) {
            if (!value) {
              // Allow empty values
              return true
            }

            const encoder = new TextEncoder()
            const utf8Bytes = encoder.encode(value)

            return utf8Bytes.length <= 500
          }
        ),
      keywords: yup
        .string()
        .test(
          'utf8Length',
          'Meta keyword must not exceed 500 Unicode characters',
          function (value) {
            if (!value) {
              // Allow empty values
              return true
            }

            const encoder = new TextEncoder()
            const utf8Bytes = encoder.encode(value)

            return utf8Bytes.length <= 500
          }
        ),
    })
    .required('SEO is Required'),
  cat_ids: yup.array().min(1, 'Please, select or add a category').required('Category is Required'),
})

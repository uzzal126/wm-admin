import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import TextEditor from '../../../../../_metronic/partials/content/forms/editor'

const LeftForm = ({data, onChange}) => {
  const linkify = (str = '') => {
    str = str.replace(/^\s+|\s+$/g, '') // trim
    str = str.toLowerCase()

    var from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;'
    var to = 'aaaaaeeeeeiiiiooooouuuunc------'
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
    }

    str = str
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

    return '/' + str
  }
  return (
    <>
      <KTCard>
        <KTCardBody>
          <div className='mb-5'>
            <label className='fs-6 form-label fw-bolder text-dark'>Page Title</label>
            <input
              type='text'
              className='form-control'
              value={data?.page_name}
              placeholder='Enter your page name'
              onChange={(e) =>
                onChange({
                  ...data,
                  page_name: e.target.value,
                  page_route: linkify(e.target.value),
                  data: {
                    ...data?.data,
                    seo: {
                      ...data?.data?.seo,
                      title: e.target.value,
                    },
                  },
                })
              }
            />
            <div className='input-group mt-5'>
              <span className='input-group-text'>https://example.com/</span>
              <input
                type='text'
                className='form-control'
                value={data?.page_route}
                placeholder='slug'
              />
            </div>
          </div>
          <div className='mb-5'>
            <label className='fs-6 form-label fw-bolder text-dark'>Long Description</label>
            <TextEditor
              longDesc={data?.data?.contents}
              setLongDesc={(value) =>
                onChange({
                  ...data,
                  data: {
                    ...data?.data,
                    contents: value,
                  },
                })
              }
            />
          </div>
        </KTCardBody>
      </KTCard>
      <KTCard className='mt-5'>
        <div className='card-header'>
          <div className='card-title'>SEO Configuration</div>
        </div>
        <KTCardBody>
          <div className='row'>
            <div className='col'>
              <div className='mb-5'>
                <label className='fs-6 form-label fw-bolder text-dark'>Meta Title</label>
                <input
                  type='text'
                  className='form-control form-control'
                  value={data?.data?.seo?.title || ''}
                  onChange={(e) => {
                    onChange({
                      ...data,
                      data: {
                        ...data?.data,
                        seo: {
                          ...data?.data?.seo,
                          title: e.target.value,
                        },
                      },
                    })
                  }}
                  placeholder='Enter meta title'
                />
              </div>
            </div>
            <div className='col'>
              <div className='mb-5'>
                <label className='fs-6 form-label fw-bolder text-dark'>Meta Keywords</label>
                <input
                  type='text'
                  className='form-control form-control'
                  value={data?.data?.seo?.keyword || ''}
                  onChange={(e) => {
                    onChange({
                      ...data,
                      data: {
                        ...data?.data,
                        seo: {
                          ...data?.data?.seo,
                          keyword: e.target.value,
                        },
                      },
                    })
                  }}
                  placeholder='Webmanza, Shopping'
                />
              </div>
            </div>
          </div>
          <div className='mb-5'>
            <label className='fs-6 form-label fw-bolder text-dark'>Meta Description</label>
            <textarea
              value={data?.data?.seo?.desc || ''}
              onChange={(e) => {
                onChange({
                  ...data,
                  data: {
                    ...data?.data,
                    seo: {
                      ...data?.data?.seo,
                      desc: e.target.value,
                    },
                  },
                })
              }}
              className='form-control'
              placeholder='Enter description'
            />
          </div>
        </KTCardBody>
      </KTCard>
    </>
  )
}

export default LeftForm

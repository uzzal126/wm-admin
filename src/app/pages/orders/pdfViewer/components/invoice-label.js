import {betterParse} from '../../../../modules/helper/misc'

const InvoiceLabel = ({data, merchant}) => {
  let logo = betterParse(merchant?.logo)
  return (
    <div className='row d-flex justify-content-center mb-2'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-body p-lg-20'>
            <div className='d-flex flex-column flex-xl-row'>
              <div className='flex-lg-row-fluid'>
                <div className='mt-n1'>
                  <div className='d-flex flex-stack pb-10'>
                    <img alt='Logo' src={logo?.light_logo || ''} width='200' />

                    <div className='company text-end'>
                      <div className='fw-bolder fs-6 text-gray-800'>
                        {merchant.business_name || merchant.site_title}
                      </div>
                      <div className='fw-bold fs-7 text-gray-600'>
                        {merchant?.msisdn || ''},<br />
                        {merchant?.email || ''},
                        <br />
                        {merchant?.office_address || ''}
                      </div>
                    </div>
                  </div>
                  <div className='m-0'>
                    <div className='row g-5'>
                      <div className='col-sm-6'>
                        <div className='fw-bold fs-7 text-gray-600 mb-1'>Billing To:</div>
                        <div className='fw-bolder fs-6 text-gray-800'>{data?.name || ''}</div>
                        <div className='fw-bolder fs-6 text-gray-600'>{data?.msisdn || ''}</div>
                        <div className='fw-bold fs-7 text-gray-600'>
                          {`${data && data?.street_address}${data && ', ' + data?.area}${
                            data && ', ' + data?.city
                          }${data && ', ' + data?.region}.`}
                        </div>
                      </div>
                      <div className='col-sm-6 text-end'>
                        <div className='fw-bold fs-7 text-gray-600 mb-1'>Shipping To:</div>
                        <div className='fw-bolder fs-6 text-gray-800'>{data?.name || ''}</div>
                        <div className='fw-bolder fs-6 text-gray-600'>{data?.msisdn || ''}</div>
                        <div className='fw-bold fs-7 text-gray-600'>
                          {`${data && data?.street_address}${data && ', ' + data?.area}${
                            data && ', ' + data?.city
                          }${data && ', ' + data?.region}.`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoiceLabel

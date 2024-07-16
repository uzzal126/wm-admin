import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import ProductVariantForm from './form'

const Variant = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;'
  document.body.setAttribute('style', bodyStyles)
  return (
    <KTCard className='mb-5'>
      <div className='card-header min-h-auto'>
        <h2 className='card-title py-2'>Variant options</h2>
      </div>
      <KTCardBody>
        <ProductVariantForm />
      </KTCardBody>
    </KTCard>
  )
}

const ManageVariant = () => <Variant />

export {ManageVariant}

import CreateOrder from './CreateOrder'

const OrderForm = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;'
  document.body.setAttribute('style', bodyStyles)
  return <CreateOrder />
}

const CustomOrder = () => <OrderForm />

export {CustomOrder}

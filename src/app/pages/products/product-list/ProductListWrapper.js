import {useState} from 'react'
import {Modal, Row} from 'react-bootstrap'
import {KTCard} from '../../../../_metronic/helpers'
import PageToolbar from '../../../../_metronic/layout/components/toolbar/PageToolbar'
import {productTypes} from '../../../constants/products.constants'
import {Link} from '../../../modules/helper/linkHandler'
import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {ProdutDataTable} from './table/DataTable'
import {TableHeader} from './table/TableHeader'

const profileBreadCrumbs = [
  {
    title: 'Manage Categories',
    path: '/products/category',
    activeClasses: '',
    classes: 'btn-light-info',
    icon: '',
    modal: false,
    isActive: false,
    access: 'products/category',
    group: 'products',
  },
  {
    title: 'Add Product',
    path: null,
    activeClasses: '',
    classes: 'btn-light-primary',
    icon: 'fas fa-plus',
    modal: true,
    isActive: false,
    access: 'products/add',
    group: 'products',
  },
]

const ProductList = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 105px;'
  document.body.setAttribute('style', bodyStyles)
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <PageToolbar breadcrumbs={profileBreadCrumbs} onChange={(e) => setShowModal(!showModal)}>
        <TableHeader />
      </PageToolbar>
      <KTCard>
        <ProdutDataTable />
      </KTCard>

      <Modal show={showModal} size={'lg'} onHide={() => setShowModal(!showModal)}>
        <Modal.Header closeButton className='pb-2'>
          <Modal.Title>
            What do you want to sell? <br />{' '}
            <small className='text-muted fs-6'>
              Your product type determines certain product settings and features.{' '}
            </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row lg={'2'}>
            {productTypes?.map((item, indx) => (
              <div data-kt-buttons='true' key={indx}>
                <Link
                  to={`/products/add?type=${item?.slug}`}
                  className='btn btn-outline btn-outline-dashed btn-active-light-primary d-flex flex-stack text-start p-6 mb-5'
                >
                  <div className='me-5'>
                    <i className='fas fa-shopping-cart fs-2x' />
                  </div>
                  <div className='d-flex align-items-center ms-2 flex-grow-1'>
                    <div className='flex-grow-1'>
                      <h2 className='d-flex align-items-center fs-3 fw-bold flex-wrap'>
                        {item?.title}
                      </h2>
                      <div className='fw-semibold opacity-50'>{item?.description}</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Row>
        </Modal.Body>
      </Modal>
    </>
  )
}

const ProductListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <ProductList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {ProductListWrapper}

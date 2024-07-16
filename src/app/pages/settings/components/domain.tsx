import {Form} from 'react-bootstrap'

const DomainManagement = ({data}: {data: any}) => {
  return (
    <div className='row row-cols-1 row-cols-lg-2 g-5'>
      <div className='col'>
        <div className='card'>
          <div className='card-body'>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Domain</Form.Label>
              <Form.Control
                type='text'
                placeholder='https://example.com'
                value={data?.store_info?.domain}
              />
            </Form.Group>
            {/* <Link to={'/support'}>
              <button className='btn btn-primary' disabled>
                Migrate Now
              </button>
            </Link> */}
          </div>
        </div>
      </div>
      <div className='col'>
        <div className='card'>
          <div className='card-header'>
            <div className='card-title'>Required information</div>
          </div>
          <div className='card-body'>
            <p>
              There are two ways to connect a domain you purchased any domain host (Like, Namecheap,
              GoDaddy etc). Depending on where you want to store your DNS (Domain Name Systems)
              records, choose the method that suits you:
            </p>
            <ul>
              <li>
                Name servers (recommended): Webmanza provides name server to hosts your DNS (Domain
                Name Systems) records, so you can manage them directly from your account.
              </li>
              <li>Pointing: Your domain host stores your DNS records on their platform.</li>
            </ul>
            <h5>Name servers</h5>
            <div className='alert bg-light-info d-flex align-items-center justify-content-between'>
              <ul className='list-style-none mb-0 d-flex flex-column gap-3'>
                <li>ns1.webmanja.com</li>
                <li>ns2.webmanja.com</li>
              </ul>
            </div>
            <h5>DNS (A) Records</h5>
            <div className='alert bg-light-info d-flex align-items-center justify-content-between'>
              <p className='mb-0'>103.23.31.37</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DomainManagement

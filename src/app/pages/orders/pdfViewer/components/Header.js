import React from 'react'
import ReactToPrint from 'react-to-print'
import {useAuth} from '../../../../modules/auth'
import {Link} from '../../../../modules/helper/linkHandler'
import {dateReadable, linkify} from '../../../../modules/helper/misc'

const Header = React.forwardRef(({data}, ref) => {
  const {currentUser} = useAuth()
  const goToViolation = (id) => {
    const violation = document.getElementById(id)
    window.scrollTo({
      top: violation.offsetTop,
      behavior: 'smooth',
    })
  }
  // console.log(data)
  return (
    <div className='fixed-top d-print-none'>
      <nav className='navbar navbar-expand-lg text-white bg-dark'>
        <div className='container-fluid'>
          <div className='d-flex justify-content-between align-items-center'>
            <Link className='btn btn-sm me-2 px-3 py-1 btn-light-info' to='/orders/index'>
              <i className='fas fa-arrow-left'></i>
              <span className='d-none d-lg-inline'>Back</span>
            </Link>
            <div className='d-flex align-items-center'>
              <select
                className='w-70px me-2'
                onChange={(e) => goToViolation(`prt-${e.target.value}`)}
              >
                {data && data.length > 0 ? (
                  data.map((it, i) => (
                    <option value={i} key={i} selected={i === 0 ? true : false}>
                      {i + 1}
                    </option>
                  ))
                ) : (
                  <option value='1' selected>
                    1
                  </option>
                )}
              </select>
              <span>of {data.length || 1}</span>
            </div>
          </div>
          <ReactToPrint
            content={() => ref.current}
            documentTitle={`${
              data.length > 0 &&
              data
                .slice(0, 2)
                .map((f) => f.invoice_id)
                .toString()
            }-${linkify(dateReadable(Date()))}.pdf`}
            bodyClass='bg-dark'
          >
            {/* <PrintContextConsumer>
              {({handlePrint}) => (
                <button className='btn px-3 py-1 btn-light-primary' onClick={() => handlePrint()}>
                  <i className='fas fa-print'></i> Print
                </button>
              )}
            </PrintContextConsumer> */}

            <button className='btn px-3 py-1 btn-light-primary' onClick={() => window.print()}>
              <i className='fas fa-print'></i> Print
            </button>
          </ReactToPrint>
        </div>
      </nav>
    </div>
  )
})

export default Header

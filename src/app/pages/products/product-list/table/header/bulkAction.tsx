import {DatableGrouping} from './DatatableGrouping'

const BulkAction = () => {
  return (
    <div className='border-bottom mb-2 pb-2'>
      <div className='row '>
        <div className='col-auto d-flex gap-2 align-items-center'>
          {/* <label className='form-label'>Bulk Action</label> */}
          <DatableGrouping />
        </div>

        {/* <div className='col-3 col-lg-2 d-flex gap-2 align-items-center'>
          <StatusSelect
            className={'form-select-sm'}
            callBack={(e: any) => console.log(parseInt(e.id))}
          />
          <Button variant='dark' size='sm'>
            Apply
          </Button>
        </div> */}

        {/* <div className='col-3 col-lg-2'>
          <label className='form-label'>Status</label>
          <Form.Select aria-label='Delete action' size='sm'>
            <option>Choose Status</option>
            <option value='1'>Delete</option>
            <option value='2'>Two</option>
            <option value='3'>Three</option>
          </Form.Select>
        </div> */}
      </div>
    </div>
  )
}

export default BulkAction

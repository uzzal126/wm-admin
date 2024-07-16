import {useState} from 'react'
import {Accordion, Form} from 'react-bootstrap'

const SingleSection = ({
  section,
  values,
  setFieldValue,
}: {
  section: any
  setFieldValue: any
  values: any
}) => {
  const [defaultSelected, setDefaultSelected] = useState('custom')

  const addItems = (itemsToAdd: any) => {
    let newSubsections = values.permission_ids
    const uniqueItems = new Set([...newSubsections, ...itemsToAdd])
    const newSubsectionsValues = Array.from(uniqueItems)
    setFieldValue('permission_ids', newSubsectionsValues)
  }

  const removeItems = (itemsToRemove: any) => {
    let newSubsections = values.permission_ids
    const newSubsectionsValues = newSubsections.filter((item: any) => !itemsToRemove.includes(item))
    setFieldValue('permission_ids', newSubsectionsValues)
  }

  const handleCheckboxChange = (event: any) => {
    const {value, checked} = event.target
    if (checked) {
      addItems([parseInt(value)])
    } else {
      removeItems([parseInt(value)])
    }
  }

  return (
    <Accordion.Body>
      <div className='mb-4 d-flex align-items-center gap-4'>
        <Form.Check
          type='radio'
          name={`check-${section?.group_id}`}
          id={`def-${section?.group_id}`}
          label={<h4>Select All</h4>}
          checked={defaultSelected === 'all'}
          onChange={(e) => {
            addItems(section?.permissions?.length > 0 && section?.permissions.map((f: any) => f.id))
            setDefaultSelected('all')
          }}
        />
        <Form.Check
          type='radio'
          name={`check-${section?.group_id}`}
          id={`cus-${section?.group_id}`}
          label={<h4>Custom</h4>}
          checked={defaultSelected === 'custom'}
          onChange={(e) => {
            addItems(section?.permissions?.length > 0 && section?.permissions.map((f: any) => f.id))
            setDefaultSelected('custom')
          }}
        />
        <Form.Check
          type='radio'
          name={`check-${section?.group_id}`}
          id={`clear-${section?.group_id}`}
          label={<h4>Clear All</h4>}
          checked={defaultSelected === 'clear'}
          onChange={(e) => {
            removeItems(
              section?.permissions?.length > 0 && section?.permissions.map((f: any) => f.id)
            )
            setDefaultSelected('clear')
          }}
        />
      </div>

      <div className='row row-cols-3 row-cols-lg-5 py-4 g-5'>
        {section?.permissions &&
          section?.permissions?.length > 0 &&
          section?.permissions.map((subsection: any, i: number) => (
            <div className='col' key={i}>
              <div className='rounded shadow p-xl-3'>
                <h4 className='pb-3'>{subsection?.name}</h4>
                <Form.Check
                  type='switch'
                  inline
                  reverse
                  id={`${subsection?.name}-${subsection?.id}`}
                  disabled={defaultSelected === 'all'}
                  title={subsection?.name}
                  value={subsection?.id}
                  onChange={handleCheckboxChange}
                  checked={values.permission_ids.includes(subsection?.id)}
                  label={values.permission_ids.includes(subsection?.id) ? 'On' : 'Off'}
                />
              </div>
            </div>
          ))}
      </div>
    </Accordion.Body>
  )
}

export default SingleSection

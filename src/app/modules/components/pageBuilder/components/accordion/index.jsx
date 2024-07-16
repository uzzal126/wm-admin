import Accordion from 'react-bootstrap/Accordion'
const AccordionComp = ({data}) => {
  return (
    <div className={`d-flex flex-column align-items-${data?.setting?.position}`}>
      <Accordion defaultActiveKey='0' style={{width: 400, maxWidth: '90vw'}}>
        {data?.content?.accordions?.filter((f) => f?.title !== '')?.length > 0 ? (
          data?.content?.accordions
            ?.filter((f) => f?.title !== '')
            .map((item) => (
              <Accordion.Item eventKey={item?.id}>
                <Accordion.Header>{item?.title}</Accordion.Header>
                <Accordion.Body>{item?.body}</Accordion.Body>
              </Accordion.Item>
            ))
        ) : (
          <Accordion.Item eventKey={1}>
            <Accordion.Header>{'Title 1'}</Accordion.Header>
            <Accordion.Body>{'Accordion Body'}</Accordion.Body>
          </Accordion.Item>
        )}
      </Accordion>
    </div>
  )
}

export default AccordionComp

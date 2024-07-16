import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoaderComponent from '../../../../modules/components/loader/LoaderComponent';
import { ErrorMessagesInPage } from '../../../../modules/errors/ErrorMessage';
import { getRequestById } from '../core/_requests';
import EditForm from './form/EditForm';

const Edit = () => {
    let bodyStyles = '';
    bodyStyles += '--kt-toolbar-height: 5px;';
    bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;';
    document.body.setAttribute('style', bodyStyles);


    return (
        <>
            <EditForm
            />
        </>
    )
}

const RequestOrderEdit = () => {
    const { id } = useParams();
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchData();
    }, [id]);

    async function fetchData() {
        setLoading(true)
        const response = await getRequestById(id);
        if (response.success) {
            setLoading(false)
            setData(response.data)
        } else {
            setError(response.message)
            setLoading(false)
        }
    }

    const refatch = (e) => {
        if (e)
            fetchData()
    }

    if (loading) return <LoaderComponent />
    if (error) return <ErrorMessagesInPage errors={error} />
    return (
        <Edit data={data} refatch={refatch} />
    );
};

export default RequestOrderEdit;
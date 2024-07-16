import RightForm from './RightForm';
import LeftForm from './LeftForm';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { queryRequestGet } from '../../services/request';
import { PAGE_DETAILS_URL } from '../../services/api';
import LoaderComponent from '../../../../modules/components/loader/LoaderComponent';
import { ErrorMessagesInPage } from '../../../../modules/errors/ErrorMessage';

const EditPage = () => {
    let bodyStyles = '';
    bodyStyles += '--kt-toolbar-height: 5px;';
    bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;';
    document.body.setAttribute('style', bodyStyles)

    const [postData, setPostData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const { id } = useParams();

    useEffect(() => {
        getData(id)
    }, [id])

    const getData = async (id) => {
        const data = await queryRequestGet(`${PAGE_DETAILS_URL}/${id}`);
        if (data.success && data.status_code === 200) {
            setPostData({
                "pid": data.data.id,
                "status": data.data.status,
                "page_type": data.data.page_type,
                "page_name": data.data.page_name,
                "page_route": data.data.page_route,
                "data": data.data.data
            })
        } else {
            setError(data.message)
        }
        setLoading(false)
    }

    if (loading) return <LoaderComponent />;
    if (error) return <ErrorMessagesInPage errors={error} />

    return (
        <div className='row'>
            <div className="col-lg-8">
                <LeftForm data={postData} onChange={setPostData} />
            </div>
            <div className="col-lg-4">
                <RightForm data={postData} onChange={setPostData} />
            </div>
        </div>
    );
};

export default EditPage;
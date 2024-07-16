import { toast } from 'react-toastify';
import { KTCard, KTCardBody } from '../../../../../_metronic/helpers';
import { ADD_PAGE_URL } from '../../services/api';
import { queryRequestPost } from '../../services/request';

const RightForm = ({ data, onChange }) => {
    const updatePage = async (post) => {
        const res = await queryRequestPost(ADD_PAGE_URL, post);
        if (res.success && res.status_code === 200) {
            toast(res.message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error(res.message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    return (
        <KTCard>
            <div className="card-header min-h-50px">
                <h1 className="card-title">Publish</h1>
            </div>
            <KTCardBody>
                <div className="form-check form-check-custom form-check-solid mb-5">
                    <select className='form-select' onChange={(e) => onChange({
                        ...data,
                        status: e.target.value,
                    })}>
                        <option value="1">Publish</option>
                        <option value="2">Draft</option>
                    </select>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-10">
                    <button className="btn btn-dark" onClick={() => updatePage(data)}>Update</button>
                </div>
            </KTCardBody>
        </KTCard>
    );
};

export default RightForm;
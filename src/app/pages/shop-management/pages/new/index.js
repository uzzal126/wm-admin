import RightForm from './RightForm';
import LeftForm from './LeftForm';
import { useState } from 'react';

const NewPage = () => {
    let bodyStyles = '';
    bodyStyles += '--kt-toolbar-height: 5px;';
    bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;';
    document.body.setAttribute('style', bodyStyles);

    const [postData, setPostData] = useState({
        "status": 1,
        "page_type": "normal",
        "page_name": "",
        "page_route": "",
        "data": {
            "seo": {
                "desc": "",
                "title": "",
                "keyword": ""
            },
            "contents": ""
        }
    })

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

export default NewPage;
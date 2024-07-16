import { useParams } from "react-router-dom";
import JobForm from "./form";

const PostAddEdit = () => {
    let bodyStyles = '';
    bodyStyles += '--kt-toolbar-height: 5px;';
    bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;';
    document.body.setAttribute('style', bodyStyles)

    return (
        <div>
            <JobForm />
        </div>
    );
};

export default PostAddEdit;
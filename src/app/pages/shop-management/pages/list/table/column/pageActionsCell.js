import { Link } from "react-router-dom"

const PageActionsCell = ({ data }) => {

    const handlePageEdit = (event, data) => {
        localStorage.setItem("theme", JSON.stringify({
            id: data.id,
            data_set: data.data,
            type: "page",
            page_type: data.page_type,
            isActive: data.status
        }));
        window.location.href = import.meta.env.VITE_THEME_GUEST_URL;
    }

    return (
        data.page_type === 'normal' ?
            <Link to={`/appearance/pages/edit/${data.id}`}>
                {data.page_name}
            </Link>
            : <Link to="" onClick={(e) => handlePageEdit(e, data)}>
                {data.page_name}
            </Link>
    )
}

export { PageActionsCell }

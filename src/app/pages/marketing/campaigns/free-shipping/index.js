
const FreeShipping = ({ active, setActive }) => {
    return (
        <div className="col mb-6" >
            <button onClick={() => setActive('freeship')}
                className={`btn d-flex align-items-center min-h-150px w-100 shadow btn-light btn-active-success justify-content-center flex-column ${active === 'freeship' && 'active'}`}>
                <span className="svg-icon-5x">
                    <img src="/media/icons/custom/free-delivery.svg" width="64" alt="" />
                </span>
                <span className="fs-4 text-uppercase mt-2">Free Shipping</span>
            </button>
        </div >
    );
};

export default FreeShipping;
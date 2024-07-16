import React from 'react';

const ExpressDelivery = ({ active, setActive }) => {
    return (
        <div className="col mb-6" >
            <button onClick={() => setActive('express')}
                className={`btn d-flex align-items-center min-h-150px w-100 shadow btn-light btn-active-success justify-content-center flex-column ${active === 'express' && 'active'}`}>
                <span className="svg-icon-5x">
                    <img src="/media/icons/custom/express-delivery.svg" width="64" alt="" />
                </span>
                <span className="fs-4 text-uppercase mt-2">Express Delivery</span>
            </button>
        </div >
    );
};

export default ExpressDelivery;
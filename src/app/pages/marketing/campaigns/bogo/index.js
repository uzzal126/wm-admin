import React from 'react';

const BuyOneGetOne = ({ active, setActive }) => {
    return (
        <div className="col mb-6" >
            <button onClick={() => setActive('bogo')}
                className={`btn d-flex align-items-center min-h-150px w-100 shadow btn-light btn-active-success justify-content-center flex-column ${active === 'bogo' && 'active'}`}>
                <span className="svg-icon-5x">
                    <img src="/media/icons/custom/promotional-items.svg" width="64" alt="" />
                </span>
                <span className="fs-4 text-uppercase mt-2">Buy One Get One</span>
            </button>
        </div >
    );
};

export default BuyOneGetOne;
import React from "react";
import PropTypes from "prop-types";

const DropperPlaceholder = ({ error, touched }) => (
    <div className={`dz-message needsclick ${error && touched ? "has-error" : ""}`}>
        <i
            className="bi bi-file-earmark-arrow-up text-primary fs-3x"></i>
        <div className="ms-4">
            <h3 className="fs-5 fw-bolder text-gray-900 mb-1">
                Drop files here or click to upload.</h3>
            <span className="fs-7 fw-bold text-gray-400">Upload
                up to 10 files</span>
        </div>
    </div>
);

DropperPlaceholder.propTypes = {
    error: PropTypes.string,
    touched: PropTypes.bool
};

export default DropperPlaceholder;

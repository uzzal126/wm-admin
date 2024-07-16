import React from "react";
import PropTypes from "prop-types";

const ShowError = ({ error }) => (
    <div className="error">
        {error}
    </div>
);

ShowError.propTypes = {
    error: PropTypes.string.isRequired
};

export default ShowError;

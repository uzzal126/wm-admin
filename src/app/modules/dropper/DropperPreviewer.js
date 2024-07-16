import React from "react";
import PropTypes from "prop-types";

const DropperPreviewer = ({ imagefile, removeImage }) =>
  <div className="d-flex gap-4 render-preview">
    {imagefile.map(({ img }, i) => (
      <div className="bg-white symbol symbol-125px" key={i}>
        <img src={img} alt="" />
        <div onClick={()=> removeImage(i)} className="btn btn-icon w-25px h-25px btn-light-danger position-absolute top-0 end-0">
          <i className="fas fa-times"></i>
        </div>
      </div>
    ))}
  </div>

DropperPreviewer.propTypes = {
  imagefile: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
};

export default DropperPreviewer;

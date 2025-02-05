import React from 'react';
import { Cropper } from 'react-cropper';

const ImageCropping = ({image, cropRatio, cropWidth, cropHeight, setCropper}) => {
    return (
        <Cropper
            style={{ height: 400, width: "100%" }}
            // initialAspectRatio={cropRatio}
            aspectRatio={cropRatio}
            preview=".img-preview"
            dragMode="move"
            src={image}
            viewMode={1}
            responsive={true}
            center={true}
            cropBoxMovable={false}
            cropBoxResizable={false}
            toggleDragModeOnDblclick={false}
            data={{
                width: cropWidth,
                height: cropHeight,
            }}
            // autoCropArea={cropRatio}
            checkOrientation={false}
            onInitialized={(instance) => {
                setCropper(instance);
            }}
            guides={true}
        />
    );
};

export default ImageCropping;
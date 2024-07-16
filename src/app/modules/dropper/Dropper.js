import React, { Component } from 'react';
import { uploadImageFile } from '../../library/api.helper';
import DropZoneField from './DropperField';

class Dropper extends Component {
    state = { imageFile: this.props.gallery };

    handleOnDrop = async (files) => {
        if (files.length > 0) {
            files.map(async (file, i) => {
                const res = await uploadImageFile(file);
                const uloadedFiles = this.state.imageFile;
                if (res && res.status_code === 200) {
                    this.setState({
                        imageFile: [
                            ...uloadedFiles,
                            {
                                img: res.uploaded_files[0]
                            }
                        ]
                    })
                    this.props.setGallery(
                        [
                            ...uloadedFiles,
                            {
                                img: res.uploaded_files[0]
                            }
                            // res.uploaded_files[0]
                        ]
                    )
                }
            })
        }
    };

    removeImageHandler = (file) => {
        const uloadedFiles = this.state.imageFile;
        const newArray = uloadedFiles.filter((elm, i) => i !== file)
        this.setState({
            imageFile: newArray
        })
    }

    resetForm = () => this.setState({ imageFile: [] }, () => this.props.reset());

    render = () => (
        <div className="app-container">
            <DropZoneField
                imagefile={this.state.imageFile}
                removeImage={(e) => this.removeImageHandler(e)}
                handleOnDrop={this.handleOnDrop}
            />
        </div>
    );
}

export default Dropper;
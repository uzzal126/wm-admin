import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { getCategoryIcons } from '../../../../../library/api.helper';
import CropperComponents from '../../../../../modules/components/cropper/CropperComponents';
import './imagePicker.css';

const defaultImage = '/media/products/dummy-product.jpg';
const ImageIconPicker = ({ date, icon, setIcon, formData, setFormData }) => {
    const [icons, setIcons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const resp = await getCategoryIcons('', 1, 101);
        if (resp.success || resp.status_code == 200) setIcons(resp.fileInfos);
        setLoading(false);
    }

    if (loading) return <h1>loading...</h1>;
    // // console.log('icons: ', icons, icon);

    return (
        <div className="formline" data-upload="1">
            <div className="choose-wrapper align-items-center">
                <div className="test-emoji">
                    <img className="mini_thumbnail img-fluid"
                        src={icon ? icon.url : "https://fakeimg.pl/60x50/"} />
                    <span className='fs-7'>{icon ? icon.name : "No Icon"}</span>
                </div>
                <div className="emoji-panel ">
                    <Dropdown>
                        <Dropdown.Toggle size='sm' variant="info" id="dropdown-basic">
                            Icon
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <div
                                className={` active `}>
                                <div
                                    className="intercom-emoji-picker">
                                    <div
                                        className="intercom-composer-popover-header">
                                        <input
                                            className="intercom-composer-popover-input form-control bg-transparent mt-2"
                                            placeholder="Search"
                                            value="" />
                                    </div>
                                    <div
                                        className="intercom-composer-popover-body-container">
                                        <div
                                            className="intercom-composer-popover-body">
                                            <div
                                                className="intercom-emoji-picker-groups">
                                                <div
                                                    className="intercom-emoji-picker-group">
                                                    <div className='d-flex'>
                                                        <div className="intercom-emoji-picker-group-title"> Choose Icon </div>
                                                        <CropperComponents onCroped={{/*url =>  console.log(url) */}} width={48} height={48} src={defaultImage} />
                                                    </div>
                                                    {
                                                        icons.length > 0 ?
                                                            icons.map((d, i) => (
                                                                <span key={i}
                                                                    className="intercom-emoji-picker-emoji"
                                                                    title={d.title}
                                                                    onClick={() => { setIcon(d); setFormData({ ...formData, icon_path: d.url }) }}
                                                                >
                                                                    <img className="mini_thumbnail img-fluid"
                                                                        src={d.url} />
                                                                    <span>{d.title}</span>
                                                                </span>
                                                            ))
                                                            : null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};

export default ImageIconPicker;
import React, { useEffect, useState } from 'react';
import { getTagData } from './TagHelper';

const BrandSelect = ({ callBack }) => {

    const [brandList, setBrandList] = useState([]);

    useEffect(() => {
        getCat()
    }, [])

    const getCat = async () => {
        const resp = await getTagData();
        setBrandList(resp);
    }
    
    return (
        <select
            data-kt-select2='true'
            data-placeholder='Select option'
            data-allow-clear='true'
            data-kt-user-table-filter='status'
            data-hide-search='true'
            className='form-select fw-bolder'
            onChange={(event) => callBack(brandList.filter(e => e.name == event.target.value)[0])}
        >
            <option value="">Select Tag</option>
            {brandList?.map((item, indx) => (
                <option value={item.name} key={indx}>{item.name}</option>
            ))}
        </select>
    );
};

export default BrandSelect;
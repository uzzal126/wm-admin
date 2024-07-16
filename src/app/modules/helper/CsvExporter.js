import React, { useState, useEffect, useRef, Fragment } from 'react';
import { CSVLink } from 'react-csv';
import { getQueryRequest } from '../../library/api.helper';

const CsvExport = ({ url, view, keys, filename }) => {
    const [csvData, setCsvData] = useState([]);
    const csvInstance = useRef();
    useEffect(() => {
        if (csvData && csvInstance.current && csvInstance.current.link) {
            setTimeout(() => {
                csvInstance.current.link.click();
                setCsvData([]);
            });
        }
    }, [csvData]);

    const getCSVdata = async () => {
        const res = await getQueryRequest(url);
        if (res.success && res.status_code === 200) {
            let csvdt = []
            res.data &&
                res.data.length > 0 &&
                res.data.map((item) => {
                    let kts = {}
                    view.length > 0 &&
                        view.map((k, i) => {
                            kts[k] = item[keys[i]]
                        })
                    csvdt.push(kts)
                })

            const fname = filename || ['export', Date.now()].join('_') + '.csv';
            setCsvData({
                data: csvdt,
                filename: fname
            });
        }
    }

    return (
        <Fragment>
            <a
                onClick={async () => getCSVdata()}
                type="button"
                className='menu-link px-3'
            >
                CSV
            </a>
            {csvData && Object.keys(csvData).length > 0 ?
                <CSVLink
                    data={csvData.data}
                    filename={csvData.filename}
                    ref={csvInstance}
                />
                : undefined}
        </Fragment>

    );
};

export default CsvExport;
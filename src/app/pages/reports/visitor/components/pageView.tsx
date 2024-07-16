import { useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { KTCard, KTCardBody } from '../../../../../_metronic/helpers';
import { useByPageQuery } from '../../../../../_metronic/redux/slices/visitor';
import { getAuth } from '../../../../modules/auth';
import { kFormatter, timeFormatter } from '../../../../modules/helper/misc';

const PageView = ({ date, fullPage = false }: { date: any, fullPage?: boolean }) => {
    const { data: pageData } = useByPageQuery(`?start_date=${date.start_date}&end_date=${date.end_date}`)
    const auth = getAuth()

    const [page, setPage] = useState(10)

    const url = auth?.shop_info?.domain ? `https://${auth?.shop_info?.domain}` : ''

    return (
        <KTCard className='mt-5'>
            {
                !fullPage &&
                <div className='card-header'>
                    <div className='card-title flex-column'>
                        <h3 className='fw-bolder mb-1'>Top Performing Pages</h3>
                        <h5 className='text-muted'>User most visited</h5>
                    </div>
                </div>
            }
            <KTCardBody>
                <div className='table-responsive m-0'>
                    <table className='table table-row-dashed g-4'>
                        <thead>
                            <tr className='fs-7 fw-bold border-0 text-gray-400 text-uppercase'>
                                <th className=''>Page URL</th>
                                <th className=''>CLICKS</th>
                                {
                                    fullPage && <>
                                        <th className='text-center'>Total Country</th>
                                        <th className='text-center'>Total City</th>
                                    </>
                                }
                                <th className='text-end'>Avg. Session</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pageData && pageData?.data && pageData?.data?.length > 0 &&
                                pageData?.data?.slice(0, page)?.map((item: any, i: any) => (
                                    <tr key={i}>
                                        <td>
                                            <a href={`${url}${item.url}`} target='_blank' className='text-gray-600 fw-bold text-hover-primary mb-1 fs-6' rel="noreferrer">
                                                {item.url === '/' ? '/home' : item.url}
                                            </a>
                                        </td>
                                        <td className='d-flex align-items-center border-0'>
                                            <span className='fw-bold text-gray-800 fs-6 me-3 text-truncate'>{kFormatter(item?.total_click)}</span>

                                            <div className='flex-grow-1 w-60px'>
                                                <ProgressBar now={Number(item?.click_percentage)} label={`${parseFloat(item?.click_percentage).toFixed(1)}%`} className='rounded-start-0' />
                                            </div>
                                        </td>
                                        {
                                            fullPage && <>
                                                <td className='text-center'>{item?.total_unique_country}</td>
                                                <td className='text-center'>{item?.total_unique_city}</td>
                                            </>
                                        }
                                        <td className='text-end'>{timeFormatter(item?.avg_session_time_per_user)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {
                        pageData?.data.length > page &&
                        <div className="text-center">
                            <button className="btn btn-sm btn-light-primary" onClick={() => setPage(pageData?.data.length < (page + 20) ? pageData?.data.length : page + 20)}>Load More</button>
                        </div>
                    }
                </div>
            </KTCardBody>
        </KTCard>
    );
};

export default PageView;
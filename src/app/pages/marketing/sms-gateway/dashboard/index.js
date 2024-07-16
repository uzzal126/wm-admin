import PageToolbar from '../../../../../_metronic/layout/components/toolbar/PageToolbar';
import { breadcrumbs } from '../components/helpers';
import DashboardContents from './contents';

const SMSDashboard = () => {
    let bodyStyles = '';
    bodyStyles += '--kt-toolbar-height: 55px;';
    bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 105px;';
    document.body.setAttribute('style', bodyStyles)
    return (
        <>
            <PageToolbar breadcrumbs={breadcrumbs('dash')}></PageToolbar>
            <DashboardContents />
        </>
    );
};

export default SMSDashboard;
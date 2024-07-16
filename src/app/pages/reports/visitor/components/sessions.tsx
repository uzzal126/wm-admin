import { useSelector } from 'react-redux';
import { VerticalLineWidget } from '../../../../../_metronic/partials/widgets/mixed/VerticleLineWidget';
import { RootState } from '../../../../../_metronic/redux/store';

const OrganicSessions = ({ date }: { date: any }) => {

    const getCountries: any = useSelector(
        (state: RootState) =>
            state.api.queries[`countryWise("?start_date=${date.start_date}&end_date=${date.end_date}")`]
    )

    const values = getCountries && getCountries?.data && getCountries?.data?.data && getCountries?.data?.data?.length > 0 ? getCountries?.data?.data?.slice(0, 5).map((item: any) => item.total_session) : ['0']
    const labels = getCountries && getCountries?.data && getCountries?.data?.data && getCountries?.data?.data?.length > 0 ? getCountries?.data?.data?.slice(0, 5).map((item: any) => item.country) : ['Bangladesh']

    return (
        <VerticalLineWidget title='Organic Sessions' chartCategory={labels} chartData={values} />
    );
};

export default OrganicSessions;
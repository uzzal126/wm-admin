import ShowTable from "../components/ShowTable";

const CampaignRoot = ({ camp, data, setEdit }) => {

    return (
        <div className="card card-flush">
            <div className="card-header">
                <h1 className="card-title">All {camp.title}</h1>
            </div>
            <div className="card-body pt-0 pb-0">
                {data && <ShowTable setEdit={setEdit} camp={camp} data={data} key={1} />}
            </div>
        </div>
    );
};

export default CampaignRoot;
import { DynamicInfoCard } from './DynamicInfoCard';

export const AdditionalInfo = ({ name, maximumLabelLength, additionalInfoList, onChange, }) => {
  return <>
    <div className='d-flex flex-column'>
      <h5>Additional Info</h5>
      <span>You may share more details about your product</span>

      <DynamicInfoCard
        modalTitle='Add an info section'
        name={name}
        smallAddButtonText='Add'
        maximumLabelLength={maximumLabelLength}
        largeAddButtonText='Add information'
        labelPlaceholder='Enter a label for additional product details'
        infoList={additionalInfoList}
        onChange={onChange} />
    </div>
  </>;
};

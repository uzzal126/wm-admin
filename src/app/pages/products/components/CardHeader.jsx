import { isUndefinedNullOrWhiteSpaceString } from '../../../../common';
import { OnlyTooltip } from '../../../modules/helper/misc';

export const CardHeader = ({
  title, tooltip, tooltipRequired, children, showGreenDot,
}) => {
  return <div className='card-header min-h-auto'>
    <div className='card-title pb-2'>
      <h2>
        {title ?? ''}
        {!isUndefinedNullOrWhiteSpaceString(tooltip) &&
          <OnlyTooltip tooltip={tooltip} className={tooltipRequired === true ? 'required' : ''} />}
      </h2>
    </div>
    {children ?? ''}
    {showGreenDot === true && <div className='card-toolbar'>
      <div className='rounded-circle bg-success w-15px h-15px' />
    </div>}
  </div>;
};

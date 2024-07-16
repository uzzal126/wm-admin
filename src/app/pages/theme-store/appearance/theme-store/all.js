import BannerTheme from './BannerTheme'
import Single from './single'

const All = ({
  data,
  themeChange,
  installTheme,
  btnLoading,
  themeType,
  catLabel,
  themeTypeFilterResetHandler,
  installationStatus,
  installationStatusHandler,
  themeFilterResetHandler,
}) => {
  return (
    <>
      <div className='card-body'>
        {themeType || catLabel || installationStatus ? (
          <div className='theme-type-tag mb-5'>
            <span className=''>Filtered by:</span>
            {themeType && (
              <button
                type='button'
                className='border-0 btn btn-light-primary rounded-1 pt-1 pb-1 px-2 ms-2 lh-1'
                onClick={() => themeTypeFilterResetHandler()}
              >
                {themeType} <i className='bi bi-x'></i>
              </button>
            )}
            {catLabel && (
              <button
                type='button'
                className='border-0 btn btn-light-primary rounded-1 pt-1 pb-1 px-2 ms-2 lh-1'
                onClick={() => themeFilterResetHandler()}
              >
                {catLabel} <i className='bi bi-x'></i>
              </button>
            )}
            {installationStatus && (
              <button
                type='button'
                className='border-0 btn btn-light-primary rounded-1 pt-1 pb-1 px-2 ms-2 lh-1'
                onClick={() => installationStatusHandler()}
              >
                {installationStatus === '1' ? 'Installed' : ''} <i className='bi bi-x'></i>
              </button>
            )}
          </div>
        ) : (
          <></>
        )}

        <div className='row row-cols-1 row-cols-md-2 g-5'>
          {data &&
            data.length > 0 &&
            data.map((item, i) =>
              item.installation_status === 1 ? (
                <BannerTheme
                  text='Installed'
                  key={i}
                  data={item}
                  btnLoading={btnLoading}
                  themeChange={(id) => themeChange(id)}
                  installTheme={(id) => installTheme(id)}
                />
              ) : (
                <Single
                  key={i}
                  item={item}
                  btnLoading={btnLoading}
                  themeChange={(id) => themeChange(id)}
                  installTheme={(id) => installTheme(id)}
                />
              )
            )}
        </div>
      </div>
    </>
  )
}

export default All

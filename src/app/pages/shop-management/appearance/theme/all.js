import ComingSoon from './comingSoon'
import Single from './single'

const All = ({data, themeChange, installTheme, btnLoading}) => {
  return (
    <>
      <div className='card-body'>
        <div className='row row-cols-1 row-cols-lg-2 row-cols-xl-3 gy-6'>
          {data &&
            data.length > 0 &&
            data.map((item, i) =>
              item.coming_soon === 1 ? (
                <ComingSoon
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

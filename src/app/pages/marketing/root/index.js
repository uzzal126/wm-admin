import InstallBtn from './InstallBtn'
import LinkHandler from './LinkHandler'
import PopupHandler from './PopupHandler'

const Marketing = ({campTools, handleOnInstall, refatch}) => {
  return (
    <div className='row row-cols-3 row-cols-xl-5 row-cols-xxl-6'>
      {campTools &&
        campTools.length > 0 &&
        campTools.map((camp, i) => {
          if(camp.installation_status && !camp.popup)
            return <LinkHandler refatch={refatch} key={i} item={camp} />
          else if (camp.installation_status && camp.popup)
            return <PopupHandler refatch={refatch} key={i} item={camp} />
          else
            return (
              <InstallBtn
                refatch={refatch}
                key={i}
                item={camp}
                handleOnInstall={(e) => handleOnInstall(e)}
              />
            )
        })}
    </div>
  )
}

export default Marketing

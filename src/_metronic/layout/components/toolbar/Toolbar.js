import {useLayout} from '../../core/LayoutProvider'
import {Toolbar1} from './Toolbar1'

const Toolbar = ({breadcrumbs}) => {
  const {config} = useLayout()
  switch (config.toolbar.layout) {
    case 'toolbar1':
      return <Toolbar1 breadcrumbs={breadcrumbs} />

    default:
      return <Toolbar1 />
  }
}

export {Toolbar}

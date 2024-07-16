import {Component} from 'react'
import {Error500} from './components/Error500'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {hasError: false}
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    // console.log(error, info)
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true}
  }
  render() {
    // // console.log("yes")
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Error500 />
    }
    return this.props.children
  }
}

export default ErrorBoundary

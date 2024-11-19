import { emitter, THREE_EVENTS } from '@/utils/events';
import { Component } from 'react';

class ErrorGLTFBoundary extends Component {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.log('Error caught in ErrorBoundary: ', error, errorInfo);

    const errorMsg = '3D Model not found!';
    emitter.emit(THREE_EVENTS.onModelDidLoad, { error: errorMsg });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <></>;
    }

    return this.props.children;
  }
}

export default ErrorGLTFBoundary;

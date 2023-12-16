import { Component, ErrorInfo, ReactNode } from 'react';
import { CustomError } from '../Model/CustomError';
import { Navigate } from 'react-router-dom';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  disconnect: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, disconnect: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState | null {
    console.log(error);

    if (error instanceof CustomError) {
      if (error.httpStatus === 401) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('externalId');
        return { hasError: true, disconnect: true };
      }
    }

    // Update state so the next render will show the fallback UI.
    return { hasError: true, disconnect: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error);

    if (error instanceof CustomError) {
      if (error.httpStatus === 401) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('externalId');
        this.setState({ disconnect: true });
      }
    }
    // You can also log the error to an error reporting service
  }

  render() {
    const { children } = this.props;

    if (this.state.disconnect) {
      return <Navigate to="/login" replace={false} />;
    }

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return children;
  }
}

export default ErrorBoundary;

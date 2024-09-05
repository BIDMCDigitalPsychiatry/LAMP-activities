import * as React from "react";

interface ErrorProps {
    errorFn: any,
    children: React.ReactNode
  }
  interface ErrorState {
    error:any;
    errorInfo: any
  }

class ErrorBoundary extends React.Component<ErrorProps, ErrorState> {
    constructor(props:ErrorProps, ) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }
    
    componentDidCatch(error:any, errorInfo:any) {
      // Catch errors in any components below and re-render with error message
      this.setState({
        error,
        errorInfo
      })
      // You can also log error messages to an error reporting service here
    }
    
    render() {
      if (this.state.errorInfo) {
        return (
          <div>
            <div><h2>Some unexpected error occured.</h2>, please
             <button onClick={this.props.errorFn}>restart</button> the trial</div>

            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
  
          </div>
        );
      }
      // Normally, just render children
      return this.props.children;
    }  
  }
export default ErrorBoundary  
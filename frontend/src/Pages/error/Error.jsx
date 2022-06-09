import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      //log the error to an error reporting service
      console.log({ error, errorInfo });
    }
  
    render() {
      if (this.state.hasError) {
        return <>
            <h1>Hmm.</h1>
            <p>Something went wrong.</p>
        </>
      }
      return this.props.children; 
    }
  }

  export default ErrorBoundary;

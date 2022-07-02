import React from 'react';
import Meta from '../../components/Meta';
import { withTranslation } from 'react-i18next';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      console.log({ error, errorInfo });
    }
  
    render() {
      if (this.state.hasError) {
        const { t } = this.props;
        return <>
            <Meta title={t('error_page_title')}/>
            <h1>Hmm.</h1>
            <p>Something went wrong.</p>
        </>
      }
      return this.props.children; 
    }
  }

  export default withTranslation()(ErrorBoundary);

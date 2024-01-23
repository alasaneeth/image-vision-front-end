import PropTypes from 'prop-types';
import React from 'react';
import TitumLandingOverlay from '@titum/core/TitumLoading';

/**
 * React Suspense defaults
 * For to Avoid Repetition
 */ function TitumSuspense(props) {
  return <React.Suspense fallback={<TitumLandingOverlay {...props.loadingProps} />}>{props.children}</React.Suspense>;
}

TitumSuspense.propTypes = {
  loadingProps: PropTypes.object
};

TitumSuspense.defaultProps = {
  loadingProps: {
    delay: 0
  }
};

export default TitumSuspense;

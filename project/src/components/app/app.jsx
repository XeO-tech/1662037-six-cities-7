import React from 'react';
import PropTypes from 'prop-types';
import MainPage from '../main-page/main-page';

function App(props) {
  const {offersNumber} = props;

  return <MainPage offersNumber = {offersNumber}/>;
}

App.propTypes = {
  offersNumber: PropTypes.number.isRequired,
};

export default App;

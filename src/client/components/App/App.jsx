import React, { Component } from 'react';
// import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import './App.scss';

const propTypes = {
  children: PropTypes.node
};

class App extends Component {
  render() {
    return (
      <div>
        <nav className='navbar navbar-expand-sm bg-dark navbar-dark justify-content-center mb-3'>
          <ul className='navbar-nav'>
            <li className='nav-item active'>
              <Link className='nav-link' to='/'>Главная</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/messages'>Все сообщения</Link>
            </li>
          </ul>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = propTypes;

/* if (module.hot) {
  module.hot.accept();
}
export default hot(module)(App); */

export default App;

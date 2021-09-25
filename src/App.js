import React from 'react';
import './App.css';

class App extends React.Component {

  signInOrUp(route) {
    this.props.history.push({
      pathname: route,
    });
  }
  render() {

    return <div className="App">
      <header className="App-header">
        <p>Click here to <u style={{cursor: 'pointer'}} onClick={() => this.signInOrUp('/login')}>Login</u></p>
        <p>Click here to <u style={{cursor: 'pointer'}} onClick={() => this.signInOrUp('/register')}>Register</u></p>
      </header>
    </div>
  }
}

export default App;

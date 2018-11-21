import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
    }
  }

  componentDidMount() {
    debugger
    fetch('https://m1m6pc92qi.execute-api.ap-southeast-2.amazonaws.com/Prod/roster/xxx')
     .then(response => {
       const x = response.json()
       debugger
       return x
     })
     .then(data => this.setState({ data }))
     .catch(err=>{
       debugger
     })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.state.data && this.state.data.id}
          </p>
        </header>
      </div>
    );
  }
}

export default App;

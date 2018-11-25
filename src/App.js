import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      url: null,
    }
  }

  componentDidMount() {
  }

  handleselectedFile = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    })
  }

  handleUpload = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile, this.state.selectedFile.name)

    fetch('https://m1m6pc92qi.execute-api.ap-southeast-2.amazonaws.com/Prod/roster',{
      method:'POST',
      body:data
    })
    .then(response => {
      return response.json()
    }).then(data => {
      const id = data.id
      this.setState({ data })
      return fetch(`https://m1m6pc92qi.execute-api.ap-southeast-2.amazonaws.com/Prod/roster/${id}/download`)
    }).then(response => {
      return response.json()
    }).then(data => {
      this.setState({ url:data.url })
    }).catch(err=>{
      console.log(err)
      alert(err)
    })
  }

  renderDownloadLink(id,url) {
    if(url === undefined) return null
    if(url === null) return null

    return(
      <p>
        <a href={url}>{id}</a>
      </p>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {this.renderDownloadLink(this.state.data.id,this.state.url)}
          <div className="App">
            <input type="file" name="" id="" onChange={this.handleselectedFile} />
            <button onClick={this.handleUpload}>Upload</button>
          </div>
        </header>
      </div>
    )
  }
}

export default App

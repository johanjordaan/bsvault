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
    fetch('https://m1m6pc92qi.execute-api.ap-southeast-2.amazonaws.com/Prod/roster/xxx')
     .then(response => response.json())
     .then(data => this.setState({ data }))
  }


  handleselectedFile = event => {
      this.setState({
        selectedFile: event.target.files[0],
        loaded: 0,
      })
    }

    handleUpload = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile, this.state.selectedFile.name)

        fetch('https://m1m6pc92qi.execute-api.ap-southeast-2.amazonaws.com/Prod/roster',{
          method:'POST',
          body:data
        })
          .then(response => response.json())
          .then(data => this.setState({ data }))
          .catch(err=>{
            console.log(err)
            alert(err)
          })


        console.log(this.state.selectedFile)
        alert(this.state.selectedFile,this.state.selectedFile.name)
        //axios
        //  .post(endpoint, data, {
        //    onUploadProgress: ProgressEvent => {
        //      this.setState({
        //        loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
        //      })
        //    },
        //  })
        //  .then(res => {
        //    console.log(res.statusText)
        //  })

      }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.state.data && this.state.data.id}
          </p>
          <div className="App">
            <input type="file" name="" id="" onChange={this.handleselectedFile} />
            <button onClick={this.handleUpload}>Upload</button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;

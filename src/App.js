import React, { Component } from 'react';
import './App.css';
import MainWindow from './js/MainWindow'
import store from './store/configStore'

class App extends Component {
  componentWillMount() {
    // this.loadProjects()   
  }

  componentDidMount(){
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const state = store.getState();
    return (
      <div className="App"> 
        <MainWindow stateAll={state}/>
      </div>
    );
  }
}

export default App;

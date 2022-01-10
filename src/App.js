import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      mode: 'light',
      progress: 0
    }
  }
  pageSize = 15;

  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }
  darkMode = () => {
    if (this.state.mode === 'light') {
      this.setState({ mode: 'dark' });
      document.body.style.backgroundColor = 'rgb(72,75,78)';
    }
    else {
      this.setState({ mode: 'light' });
      document.body.style.backgroundColor = 'white';
    }
  }

  render() {
    return (
      <div>
        <Router>
          <LoadingBar
            color='rgb(13,110,253)'
            progress={this.state.progress}
            height={3}
          />
          <Navbar mode={this.state.mode} darkMode={this.darkMode} />
          <Switch>
            <Route exact path="/">
              <News setProgress={this.setProgress} key='general' pageSize={this.pageSize} mode={this.state.mode} country='in' category='general' />
            </Route>
            <Route exact path="/business">
              <News setProgress={this.setProgress} key='business' pageSize={this.pageSize} mode={this.state.mode} country='in' category='business' />
            </Route>
            <Route exact path="/entertainment">
              <News setProgress={this.setProgress} key='entertainment' pageSize={this.pageSize} mode={this.state.mode} country='in' category='entertainment' />
            </Route>
            <Route exact path="/health">
              <News setProgress={this.setProgress} key='health' pageSize={this.pageSize} mode={this.state.mode} country='in' category='health' />
            </Route>
            <Route exact path="/science">
              <News setProgress={this.setProgress} key='science' pageSize={this.pageSize} mode={this.state.mode} country='in' category='science' />
            </Route>
            <Route exact path="/sports">
              <News setProgress={this.setProgress} key='sports' pageSize={this.pageSize} mode={this.state.mode} country='in' category='sports' />
            </Route>
            <Route exact path="/technology">
              <News setProgress={this.setProgress} key='technology' pageSize={this.pageSize} mode={this.state.mode} country='in' category='technology' />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}
import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default class App extends Component {

  pageSize = 15;

  constructor() {
    super();
    this.state = {
      mode: 'light'
    }
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
          <Navbar mode={this.state.mode} darkMode={this.darkMode} />
          <Switch>
            <Route exact path="/">
              <News key='general' pageSize={this.pageSize} mode={this.state.mode} country='in' category='general' />
            </Route>
            <Route exact path="/business">
              <News key='business' pageSize={this.pageSize} mode={this.state.mode} country='in' category='business' />
            </Route>
            <Route exact path="/entertainment">
              <News key='entertainment' pageSize={this.pageSize} mode={this.state.mode} country='in' category='entertainment' />
            </Route>
            <Route exact path="/health">
              <News key='health' pageSize={this.pageSize} mode={this.state.mode} country='in' category='health' />
            </Route>
            <Route exact path="/science">
              <News key='science' pageSize={this.pageSize} mode={this.state.mode} country='in' category='science' />
            </Route>
            <Route exact path="/sports">
              <News key='sports' pageSize={this.pageSize} mode={this.state.mode} country='in' category='sports' />
            </Route>
            <Route exact path="/technology">
              <News key='technology' pageSize={this.pageSize} mode={this.state.mode} country='in' category='technology' />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}
import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {

  const [mode, setMode] = useState('light');
  const [progress, setProgress] = useState(0);
  const pageSize = 15;
  const apiKey = process.env.REACT_APP_NEWS_API2;

  const setProgressOfLoadingBar = (progress) => {
    setProgress(progress);
  }

  const darkMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(72,75,78)';
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  }

  return (
    <div>
      <Router>
        <LoadingBar
          color='rgb(13,110,253)'
          progress={progress}
          height={3}
        />
        <Navbar mode={mode} darkMode={darkMode} />
        <Switch>
          <Route exact path="/">
            <News setProgress={setProgressOfLoadingBar} apiKey={apiKey} key='general' pageSize={pageSize} mode={mode} country='in' category='general' />
          </Route>
          <Route exact path="/business">
            <News setProgress={setProgressOfLoadingBar} apiKey={apiKey} key='business' pageSize={pageSize} mode={mode} country='in' category='business' />
          </Route>
          <Route exact path="/entertainment">
            <News setProgress={setProgressOfLoadingBar} apiKey={apiKey} key='entertainment' pageSize={pageSize} mode={mode} country='in' category='entertainment' />
          </Route>
          <Route exact path="/health">
            <News setProgress={setProgressOfLoadingBar} apiKey={apiKey} key='health' pageSize={pageSize} mode={mode} country='in' category='health' />
          </Route>
          <Route exact path="/science">
            <News setProgress={setProgressOfLoadingBar} apiKey={apiKey} key='science' pageSize={pageSize} mode={mode} country='in' category='science' />
          </Route>
          <Route exact path="/sports">
            <News setProgress={setProgressOfLoadingBar} apiKey={apiKey} key='sports' pageSize={pageSize} mode={mode} country='in' category='sports' />
          </Route>
          <Route exact path="/technology">
            <News setProgress={setProgressOfLoadingBar} apiKey={apiKey} key='technology' pageSize={pageSize} mode={mode} country='in' category='technology' />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
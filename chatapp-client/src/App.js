import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Join from './components/Join/Join.js';
import Chat from './components/Chat/Chat.js';
import Context from './context/index.js';

const App = () => {
  const [errorInformation, setErrorInformation] = useState("");

  return (
    <Context.Provider value={{ errorInformation, setErrorInformation }}>
      <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" exact component={Chat} />
      </Router>
    </Context.Provider>
  )
}


export default App;
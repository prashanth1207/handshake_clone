import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PreLoginMain from './components/Prelogin/PreLoginMain'

function App() {
  return (
    <Router>
      <div className="App">
        <PreLoginMain />
      </div>
    </Router>
  );
}

export default App;

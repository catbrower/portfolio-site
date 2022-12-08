import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { useEffect, useState } from 'react';

import Title from './pages/Title';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Complexity from './pages/projects/Complexity';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Title />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/complexity" element={<Complexity />} />
          </Routes>
          
        </header>
      </div>
    </Router>
  );
}

export default App;

import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import { Card, Container, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import Title from './pages/Title';
import Projects from './pages/Projects';
import Resume from './pages/Resume';

function App() {
  const [scroll, setScroll] = useState(0);
  const [aniStage, setAniStage] = useState(0);

  useEffect(() => {
    // window.addEventListener('scroll', handleScroll);
  })

  const handleScroll = function(event) {
    event.preventDefault();
    setScroll(window.scrollY);
  }

  let wh = window.innerHeight;
  let scroll_heights = [wh, 5 * wh];
  let scroll_mins = [0.0, 0.0];

  let scroll_sum = 0;
  for(let i = 0; i < scroll_heights.length; i++) {
    scroll_mins[i] = scroll_sum;
    scroll_sum += scroll_heights[i];
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Title />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
          
        </header>
      </div>
    </Router>
  );
}

export default App;

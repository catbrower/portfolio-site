import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Projects from './pages/Projects';
import Resume from './pages/Resume';
import PageItem from './components/PageItem';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <PageItem>
            <Routes>
              <Route path="/" element={<Resume />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/resume" element={<Resume />} />
            </Routes>
          </PageItem>
        </header>
      </div>
    </Router>
  );
}

export default App;

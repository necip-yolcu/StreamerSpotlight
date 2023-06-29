import './App.css';
import Page1 from './pages/Page1';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page2 from './pages/Page2';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Page1 />} />
        <Route path='/record/:streamID' element={<Page2 />} />
      </Routes>
    </Router>
  );
}

export default App;

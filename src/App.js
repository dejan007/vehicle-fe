
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import VehicleModels from './pages/VehicleModels';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={Homepage} />
        <Route path='/vehicle-models' Component={VehicleModels} />
      </Routes>
        
    </Router>
  );
}

export default App;

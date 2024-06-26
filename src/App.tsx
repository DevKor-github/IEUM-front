import './App.css';
import Main from './components/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:userId" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

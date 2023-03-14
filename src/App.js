import { React } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TopbarComponent from './component/TopbarComponent';
// import FooterComponent from './component/FooterComponent';

import Home from './pages/Home';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <TopbarComponent />
      <div className="App">
        <Routes>
          <Route path='/' exact element={<Home />} />
        </Routes>
      </div>
      {/* <FooterComponent /> */}
    </BrowserRouter>
  );
}

export default App;

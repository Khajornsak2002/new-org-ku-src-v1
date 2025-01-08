import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './App.css';
import IdCheck from './id-check/id-check'; // นำเข้าคอมโพเนนต์ที่ใช้สำหรับ /check-id
// import Home from '../src/Home.jsx' ;
import Home from './Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* เส้นทางไปยังหน้าหลัก */}
          <Route path="/" element={<Home />} />
          {/* เส้นทางไปยัง /check-id */}
          <Route path="/check-id" element={<IdCheck />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

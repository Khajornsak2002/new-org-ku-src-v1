import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './App.css';
import IdCheck from './id-check/id-check'; // นำเข้าคอมโพเนนต์ที่ใช้สำหรับ /check-id
import Organizationstructure from './organization-structure/organizationstructure'; 
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
          {/* เส้นทางไปยัง /organization-structure */}
          <Route path="/organization-structure" element={<Organizationstructure />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

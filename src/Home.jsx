import { useNavigate } from 'react-router-dom';
import { HiArrowCircleRight } from 'react-icons/hi';
import '../src/asset/Home.css';

function Home() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/check-id'); // ไปยัง /check-id
  };

  const handleNavigate1 = () => {
    navigate('/organization-structure'); // ไปยัง /organization-structure
  };

  const handleNavigate2 = () => {
    navigate('/organization-structure'); // ไปยัง /organization-structure
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ระบบองค์กรนิสิต</h1>
        <h3>มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา</h3>
        
        {/* ปุ่มไปหน้าตรวจสอบรหัสนิสิต */}
        <button onClick={handleNavigate}>
          ไปที่หน้าตรวจสอบรหัสนิสิต <HiArrowCircleRight />
        </button>

        {/* ปุ่มสำหรับเมนูโครงสร้างองค์กร */}
        <button onClick={handleNavigate1} className="org-structure-button" disabled>
          ดูโครงสร้างองค์กร <HiArrowCircleRight />
        </button>
      </header>
    </div>
  );
}

export default Home;

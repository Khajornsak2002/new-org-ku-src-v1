import { useNavigate } from 'react-router-dom';
import { HiArrowCircleRight } from 'react-icons/hi';
import '../src/asset/Home.css';

function Home() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/check-id'); // ไปยัง /check-id
  };

  const handleNavigate1 = () => {
    window.open('https://eduserv.src.ku.ac.th/projectnisit/', '_blank');
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

        {/* ปุ่มสำหรับเมนูระบบบันทึกโครงการ */}
        <button onClick={handleNavigate1} className="org-structure-button" >
          ระบบบันทึกโครงการและกิจกรรมนิสิต KUSRC <HiArrowCircleRight />
        </button>

        {/* ปุ่มสำหรับเมนูโครงสร้างองค์กร */}
        <button onClick={handleNavigate2} className="org-structure-button" >
          โครงสร้างองค์กรนิสิต <HiArrowCircleRight />
        </button>
      </header>
    </div>
  );
}

export default Home;

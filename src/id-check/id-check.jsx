import { useState } from 'react';
import * as XLSX from 'xlsx'; // นำเข้าไลบรารี xlsx
import { FaDownload } from 'react-icons/fa';
import { IoReturnDownBackSharp } from 'react-icons/io5'; // นำเข้าไอคอน
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate
import '../asset/id-check.css';

function IdCheck() {
  const navigate = useNavigate(); // สร้างตัวแปร navigate
  const [studentIds, setStudentIds] = useState('');
  const [errorList, setErrorList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const studentIdList = studentIds.split('\n').map(id => id.trim());

    let newErrorList = [];
    for (let id of studentIdList) {
      if (id.length !== 10) {
        newErrorList.push({ id, error: 'รหัสนิสิตต้องมี 10 หลัก' });
      } else if (id.length > 10) {
        newErrorList.push({ id, error: 'รหัสนิสิตไม่สามารถเกิน 10 หลักได้' });
      }
    }

    const duplicateIds = studentIdList.filter((id, index, self) => self.indexOf(id) !== index);
    duplicateIds.forEach(id => {
      newErrorList.push({ id, error: 'รหัสนิสิตซ้ำ' });
    });

    setErrorList(newErrorList);

    if (newErrorList.length > 0) {
      return;
    }
  };

  // ฟังก์ชันสำหรับดาวน์โหลดไฟล์ Excel
  const downloadExcel = () => {
    if (errorList.length === 0) {
      alert('ไม่มีข้อมูลผิดพลาดเพื่อส่งออก');
      return;
    }

    const ws = XLSX.utils.json_to_sheet(errorList); // แปลงข้อมูลเป็น sheet
    const wb = XLSX.utils.book_new(); // สร้าง workbook ใหม่
    XLSX.utils.book_append_sheet(wb, ws, 'Error List'); // เพิ่ม sheet ลงใน workbook
    XLSX.writeFile(wb, 'error-list.xlsx'); // ดาวน์โหลดไฟล์
  };

  // คำนวณจำนวนข้อมูลทั้งหมด, ผิดพลาด, และถูกต้อง
  const studentIdList = studentIds.split('\n').map(id => id.trim());
  const totalCount = studentIdList.length;
  const errorCount = errorList.length;
  const correctCount = totalCount - errorCount;

  return (
    <div className="App">
      <header className="App-header">
        {/* ปุ่มกลับไปหน้า Home พร้อมไอคอน */}
        <button onClick={() => navigate('/')} className="home-button">
          <IoReturnDownBackSharp style={{ marginRight: '8px' }} /> {/* ไอคอนกลับ */}
          Home
        </button>

        <h2>ระบบตรวจสอบรหัสนิสิต</h2>

        <form onSubmit={handleSubmit}>
            <label htmlFor="student_ids">กรอกรหัสนิสิต (10 หลักต่อ 1 บรรทัด):</label>
            <textarea
                id="student_ids"
                name="student_ids"
                value={studentIds}
                onChange={(e) => setStudentIds(e.target.value)}
                rows="5"
                cols="30"
                placeholder="กรอกรหัสนิสิต"
                required
            />
            <div>
                <button type="submit">ตรวจสอบ</button>
                <button type="button" onClick={() => { setStudentIds(''); setErrorList([]); }}>Reset</button>
            </div>
        </form>

        <div className="summary-container">
          {studentIds && (
            <div className="summary">
              <p>จำนวนข้อมูลทั้งหมด: {totalCount} ชุด</p>
              <p>ข้อมูลผิดพลาด: {errorCount} ชุด</p>
              <p>ข้อมูลถูกต้อง: {correctCount} ชุด</p>
            </div>
          )}

          {errorList.length > 0 && (
            <button className="download-button" onClick={downloadExcel}>
              <FaDownload style={{ marginRight: '8px' }} /> ดาวน์โหลด Excel
            </button>
          )}
        </div>

        <div id="">
          {errorList.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>รหัสนิสิต</th>
                  <th>ข้อผิดพลาด</th>
                </tr>
              </thead>
              <tbody>
                {errorList.map((errorItem, index) => (
                  <tr key={index}>
                    <td>{errorItem.id}</td>
                    <td>{errorItem.error}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="success-message">ไม่มีข้อมูลผิดพลาด</div>
          )}
        </div>
      </header>
    </div>
  );
}

export default IdCheck;

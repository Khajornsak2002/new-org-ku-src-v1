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

  const downloadExcel = () => {
    if (errorList.length === 0) {
      alert('ไม่มีข้อมูลผิดพลาดเพื่อส่งออก');
      return;
    }

    const ws = XLSX.utils.json_to_sheet(errorList);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Error List');
    XLSX.writeFile(wb, 'error-list.xlsx');
  };

  const studentIdList = studentIds.split('\n').map(id => id.trim());
  const totalCount = studentIdList.length;
  const errorCount = errorList.length;
  const correctCount = totalCount - errorCount;

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => navigate('/')} className="home-button">
          <IoReturnDownBackSharp style={{ marginRight: '8px' }} />
          Home
        </button>

        <h2>ระบบตรวจสอบรหัสนิสิต</h2>
        <h5>***สำหรับองค์กรนิสิตที่ต้องการตรวจสอบรหัสนิสิตซ้ำหรือรหัสนิสิตไม่ครบ 10 หลัก ของระบบชั่วโมงกิจกรรม***</h5>
        <div className="container">
          {/* ฝั่งซ้าย */}
          <div className="form-section">
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
                <button className="button" type="submit">ตรวจสอบ</button>
                <button
                  className="button-reset"
                  type="button"
                  onClick={() => { setStudentIds(''); setErrorList([]); }}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* ฝั่งขวา */}
          <div className="error-section">
            {errorList.length > 0 && (
              <button className="download-button" onClick={downloadExcel}>
                <FaDownload style={{ marginRight: '8px' }} /> ดาวน์โหลด Excel
              </button>
            )}

            <div>
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
          </div>
        </div>
      </header>
    </div>
  );
}

export default IdCheck;

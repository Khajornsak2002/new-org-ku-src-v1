import React, { useState } from 'react';
import '../asset/organizationstructure.css';
import { IoReturnDownBackSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function OrganizationStructure() {
  const [selectedOrg, setSelectedOrg] = useState('องค์การบริการ');
  const [showDropdown, setShowDropdown] = useState(null);
  const navigate = useNavigate();

  const organizations = [
    { name: 'องค์การบริการ', type: 'button' },
    { name: 'สภาผู้แทนนิสิต', type: 'button' },
    {
      name: 'สโมสรนิสิต',
      type: 'dropdown',
      items: ['สโมสรนิสิตคณะวิทยาการจัดการ','สโมสรนิสิตคณะวิศวกรรมศาสตร์', 'สโมสรนิสิตคณะวิทยาศาสตร์','สโมสรนิสิตคณะพาณิชยนาวีนานาชาติ','สโมสรนิสิตคณะเศรษฐศาสตร์'],
    },
    {
      name: 'ชมรม',
      type: 'dropdown',
      items: ['ชมรมดนตรีไทย'],
    },
  ];

  const renderOrganizationDetails = (org) => {
    switch (org) {
      case 'องค์การบริการ':
        return <p>รายละเอียดเกี่ยวกับโครงสร้างขององค์การบริหาร...</p>;
      case 'สภาผู้แทนนิสิต':
        return <p>รายละเอียดเกี่ยวกับโครงสร้างของสภาผู้แทนนิสิต...</p>;
      case 'สโมสรนิสิตคณะวิทยาการจัดการ':
        return <p>รายละเอียดเกี่ยวกับโครงสร้างของสโมสรนิสิตคณะวิทยาการจัดการ...</p>;
      case 'สโมสรนิสิตคณะวิศวกรรมศาสตร์':
        return <p>รายละเอียดเกี่ยวกับโครงสร้างของสโมสรนิสิตคณะวิศวกรรมศาสตร์...</p>;
      case 'สโมสรนิสิตคณะวิทยาศาสตร์':
        return <p>รายละเอียดเกี่ยวกับโครงสร้างของสโมสรนิสิตคณะวิทยาศาสตร์...</p>;
      case 'สโมสรนิสิตคณะพาณิชยนาวีนานาชาติ':
        return <p>รายละเอียดเกี่ยวกับโครงสร้างของสโมสรนิสิตคณะพาณิชยนาวีนานาชาติ...</p>;
      case 'สโมสรนิสิตคณะเศรษฐศาสตร์':
        return <p>รายละเอียดเกี่ยวกับโครงสร้างของสโมสรนิสิตคณะเศรษฐศาสตร์...</p>;
      case 'ชมรมดนตรีไทย':
        return <p>รายละเอียดเกี่ยวกับโครงสร้างของชมรมดนตรีไทย...</p>;
      default:
        return <p>กรุณาเลือกองค์กรเพื่อดูข้อมูล</p>;
    }
  };

  
  return (
    <div className="organization-structure">
      <button onClick={() => navigate('/')} className="home-button">
                <IoReturnDownBackSharp style={{ marginRight: '8px' }} /> {/* ไอคอนกลับ */}
                Home
      </button>
      <h1>โครงสร้างองค์กรนิสิต</h1>
      <h1>มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา</h1>
      <div className="organization-tabs">
        {organizations.map((org) =>
          org.type === 'button' ? (
            <button
              key={org.name}
              className={`tab-button ${selectedOrg === org.name ? 'active' : ''}`}
              onClick={() => setSelectedOrg(org.name)}
            >
              {org.name}
            </button>
          ) : (
            <div
              key={org.name}
              className="dropdown"
              onMouseEnter={() => setShowDropdown(org.name)}
              onMouseLeave={() => setShowDropdown(null)}
            >
              <button className="tab-button">
                {org.name}
              </button>
              {showDropdown === org.name && (
                <div className="dropdown-menu">
                  {org.items.map((item) => (
                    <button
                      key={item}
                      className={`dropdown-item ${
                        selectedOrg === item ? 'active' : ''
                      }`}
                      onClick={() => setSelectedOrg(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        )}
      </div>
      <div className="organization-details">
        {renderOrganizationDetails(selectedOrg)}
      </div>
    </div>
  );
}

export default OrganizationStructure;

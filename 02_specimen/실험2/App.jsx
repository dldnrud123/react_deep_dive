import React, { useState } from 'react';

// 자식 컴포넌트 (입력 폼)
function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div style={{ border: '2px solid #333', padding: '15px', margin: '10px 0' }}>
      <div>
        이름: <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름 입력" />
      </div>
      <div style={{ marginTop: '8px' }}>
        이메일: <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일 입력" />
      </div>
    </div>
  );
}

// 부모 컴포넌트
export default function FormResetExperiment() {
  const [userId, setUserId] = useState(1);

  // 버튼 클릭 시 key로 사용할 식별자(ID)만 변경
  const handleNextUser = () => {
    setUserId((prev) => prev + 1);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>실험 2. Key 변경을 통한 상태 리셋</h2>
      <p>현재 작업 대상 유저 ID: <strong>{userId}</strong></p>

      {/* 💥 핵심: key={userId} 부여 */}
      <UserForm key={userId} />

      <button onClick={handleNextUser}>
        다음 유저로 변경 (ID: {userId + 1}) - 폼 자동 리셋
      </button>
    </div>
  );
}
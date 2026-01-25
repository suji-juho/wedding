import { useState } from 'react';
import { weddingConfig } from '../config/wedding';

function Account() {
  const { groom, bride } = weddingConfig;
  const [openSection, setOpenSection] = useState(null);

  const copyAccount = (number) => {
    const cleanNumber = number.replace(/-/g, '');
    navigator.clipboard.writeText(cleanNumber);
    alert('계좌번호가 복사되었습니다.');
  };

  const AccountCard = ({ accounts, label, bgColor }) => (
    <div className="mb-4">
      <button
        className={`w-full py-4 px-6 ${bgColor} rounded-lg text-left flex justify-between items-center`}
        onClick={() => setOpenSection(openSection === label ? null : label)}
      >
        <span className="font-medium text-gray-800">{label}측 계좌번호</span>
        <svg
          className={`w-5 h-5 text-gray-600 transition-transform ${
            openSection === label ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {openSection === label && (
        <div className="mt-2 bg-white rounded-lg p-4 space-y-4">
          {accounts.map((account, index) => (
            <div
              key={index}
              className={`flex justify-between items-center py-2 ${
                index < accounts.length - 1 ? 'border-b' : ''
              }`}
            >
              <div>
                <p className="font-medium">{account.holder}</p>
                <p className="text-sm text-gray-500">{account.bank} {account.number}</p>
              </div>
              <button
                onClick={() => copyAccount(account.number)}
                className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition"
              >
                복사
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-md mx-auto">
        <h2 className="font-serif text-2xl text-primary text-center mb-4">마음 전하실 곳</h2>
        <p className="text-center text-gray-600 text-sm whitespace-pre-line">
          {`직접 오시기 어려운 분들을 위해
계좌번호를 안내드립니다.`}
        </p>
        <p className="text-center text-gray-500 text-sm mt-4 mb-8 whitespace-pre-line">
          {`마음 담아 전해주시는 축하에
진심으로 감사드립니다.`}
        </p>

        <AccountCard accounts={groom.accounts} label="신랑" bgColor="bg-blue-50" />
        <AccountCard accounts={bride.accounts} label="신부" bgColor="bg-pink-50" />
      </div>
    </section>
  );
}

export default Account;

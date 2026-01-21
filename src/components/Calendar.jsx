import { weddingConfig } from '../config/wedding';
import { useState, useEffect } from 'react';

function Calendar() {
  const { wedding } = weddingConfig;
  const [dDay, setDDay] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateDDay = () => {
      const now = new Date();
      const diff = wedding.dDay - now;

      if (diff <= 0) {
        setDDay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setDDay({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    calculateDDay();
    const timer = setInterval(calculateDDay, 1000);
    return () => clearInterval(timer);
  }, [wedding.dDay]);

  // 2026년 4월 달력 생성
  const year = 2026;
  const month = 4;
  const weddingDay = 11;

  const firstDay = new Date(year, month - 1, 1).getDay();
  const lastDate = new Date(year, month, 0).getDate();
  const days = [];

  // 빈 칸 채우기
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  // 날짜 채우기
  for (let i = 1; i <= lastDate; i++) {
    days.push(i);
  }

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="max-w-md mx-auto text-center">
        <h2 className="font-serif text-2xl text-primary mb-2">예식 일시</h2>
        <p className="text-gray-600 mb-8">{wedding.date} {wedding.dayOfWeek} {wedding.time}</p>

        {/* 달력 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-primary mb-4">2026년 4월</h3>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day, index) => (
              <div
                key={day}
                className={`text-xs font-medium py-2 ${
                  index === 0 ? 'text-red-400' : index === 6 ? 'text-blue-400' : 'text-gray-500'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <div
                key={index}
                className={`py-2 text-sm ${
                  day === weddingDay
                    ? 'bg-primary text-white rounded-full font-bold'
                    : day
                    ? index % 7 === 0
                      ? 'text-red-400'
                      : index % 7 === 6
                      ? 'text-blue-400'
                      : 'text-gray-700'
                    : ''
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* D-Day 카운터 */}
        <div className="mt-8">
          <p className="text-sm text-gray-500 mb-3">결혼식까지</p>
          <div className="flex justify-center gap-4">
            {[
              { label: '일', value: dDay.days },
              { label: '시간', value: dDay.hours },
              { label: '분', value: dDay.minutes },
              { label: '초', value: dDay.seconds },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center">
                  <span className="text-2xl font-light text-primary">{item.value}</span>
                </div>
                <span className="text-xs text-gray-500 mt-1">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Calendar;

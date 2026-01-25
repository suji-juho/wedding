import { useState, useEffect } from 'react';
import { weddingConfig } from '../config/wedding';

function Gallery() {
  const { gallery } = weddingConfig;
  const [selectedIndex, setSelectedIndex] = useState(null);

  // 팝업 열릴 때 배경 스크롤 방지
  useEffect(() => {
    if (selectedIndex !== null) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [selectedIndex]);

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="max-w-md mx-auto">
        <h2 className="font-serif text-2xl text-primary text-center mb-8">갤러리</h2>

        {/* 이미지 그리드 */}
        <div className="grid grid-cols-3 gap-2">
          {gallery.map((image, index) => (
            <div
              key={index}
              className="aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition"
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={image}
                alt={`갤러리 ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-gray-400 text-xs">사진 ${index + 1}</div>`;
                }}
              />
            </div>
          ))}
        </div>

        {/* 이미지 모달 */}
        {selectedIndex !== null && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)}
          >
            {/* 이전 버튼 */}
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/50 rounded-full transition"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div
              className="relative max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={gallery[selectedIndex]}
                alt="갤러리 상세"
                className="w-full rounded-lg"
              />
              <button
                className="absolute top-4 right-4 text-white text-2xl"
                onClick={() => setSelectedIndex(null)}
              >
                ✕
              </button>
              {/* 인디케이터 */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                {selectedIndex + 1} / {gallery.length}
              </div>
            </div>

            {/* 다음 버튼 */}
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/50 rounded-full transition"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Gallery;

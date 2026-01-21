import { useState } from 'react';
import { weddingConfig } from '../config/wedding';

function Gallery() {
  const { gallery } = weddingConfig;
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="max-w-md mx-auto">
        <h2 className="font-serif text-2xl text-primary text-center mb-8">갤러리</h2>

        {/* 이미지 그리드 */}
        <div className="grid grid-cols-3 gap-2">
          {gallery.map((image, index) => (
            <div
              key={index}
              className="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image}
                alt={`갤러리 ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-gray-400 text-xs">사진 ${index + 1}</div>`;
                }}
              />
            </div>
          ))}
        </div>

        {/* 이미지 모달 */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-lg w-full">
              <img
                src={selectedImage}
                alt="갤러리 상세"
                className="w-full rounded-lg"
              />
              <button
                className="absolute top-4 right-4 text-white text-2xl"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Gallery;

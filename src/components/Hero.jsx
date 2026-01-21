import { weddingConfig } from '../config/wedding';

function Hero() {
  const { groom, bride, wedding, mainImage } = weddingConfig;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-secondary/30">
      {/* 메인 이미지 */}
      <div className="w-full max-w-md mx-auto px-4">
        <div className="relative aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden shadow-lg">
          <img
            src={mainImage}
            alt="웨딩 사진"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 이름 */}
      <div className="mt-8 text-center">
        <p className="text-sm text-primary/70 tracking-widest mb-2">WEDDING INVITATION</p>
        <h1 className="font-serif text-3xl text-primary">
          {groom.name} <span className="text-accent mx-2">&amp;</span> {bride.name}
        </h1>
        <p className="mt-4 text-gray-600">
          {wedding.date} {wedding.dayOfWeek} {wedding.time}
        </p>
      </div>

      {/* 스크롤 안내 */}
      <div className="absolute bottom-8 animate-bounce">
        <svg
          className="w-6 h-6 text-primary/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

export default Hero;

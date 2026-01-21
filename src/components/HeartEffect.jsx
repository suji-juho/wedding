import { useState, useCallback } from 'react';

function HeartEffect() {
  const [hearts, setHearts] = useState([]);

  const pinkShades = [
    'rgba(255, 182, 193, 0.7)',  // light pink
    'rgba(255, 192, 203, 0.6)',  // pink
    'rgba(255, 174, 185, 0.7)',  // baby pink
    'rgba(252, 200, 210, 0.6)',  // soft pink
    'rgba(255, 209, 220, 0.5)',  // pale pink
  ];

  const createHeart = useCallback((e) => {
    const x = e.clientX || (e.touches && e.touches[0]?.clientX);
    const y = e.clientY || (e.touches && e.touches[0]?.clientY);

    if (!x || !y) return;

    const newHearts = [];
    const heartCount = 6 + Math.floor(Math.random() * 5); // 6~10개

    for (let i = 0; i < heartCount; i++) {
      const angle = (Math.PI * 2 * i) / heartCount + Math.random() * 0.5;
      const distance = 20 + Math.random() * 40;

      newHearts.push({
        id: Date.now() + i,
        x: x,
        y: y,
        offsetX: Math.cos(angle) * distance,
        offsetY: Math.sin(angle) * distance,
        size: 10 + Math.random() * 14,
        color: pinkShades[Math.floor(Math.random() * pinkShades.length)],
        duration: 0.8 + Math.random() * 0.4,
        delay: i * 0.03,
      });
    }

    setHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.find((nh) => nh.id === h.id)));
    }, 2000);
  }, []);

  return (
    <div
      className="fixed inset-0 z-40 pointer-events-auto"
      onClick={createHeart}
      onTouchStart={createHeart}
      style={{ touchAction: 'manipulation' }}
    >
      {hearts.map((heart) => (
        <svg
          key={heart.id}
          className="fixed pointer-events-none animate-heart-spread"
          width={heart.size}
          height={heart.size}
          viewBox="0 0 24 24"
          style={{
            left: heart.x - heart.size / 2,
            top: heart.y - heart.size / 2,
            '--spread-x': `${heart.offsetX}px`,
            '--spread-y': `${heart.offsetY}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={heart.color}
          />
        </svg>
      ))}
    </div>
  );
}

export default HeartEffect;

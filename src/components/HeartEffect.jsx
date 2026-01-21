import { useState, useCallback } from 'react';

function HeartEffect() {
  const [hearts, setHearts] = useState([]);

  const createHeart = useCallback((e) => {
    const x = e.clientX || (e.touches && e.touches[0]?.clientX);
    const y = e.clientY || (e.touches && e.touches[0]?.clientY);

    if (!x || !y) return;

    const newHearts = [];
    const heartCount = 5 + Math.floor(Math.random() * 4); // 5~8개

    for (let i = 0; i < heartCount; i++) {
      newHearts.push({
        id: Date.now() + i,
        x: x + (Math.random() - 0.5) * 30,
        y: y + (Math.random() - 0.5) * 30,
        size: 16 + Math.random() * 16,
        rotation: Math.random() * 60 - 30,
        duration: 1 + Math.random() * 0.5,
      });
    }

    setHearts((prev) => [...prev, ...newHearts]);

    // 애니메이션 후 제거
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
        <span
          key={heart.id}
          className="fixed pointer-events-none animate-heart-float"
          style={{
            left: heart.x,
            top: heart.y,
            fontSize: heart.size,
            transform: `rotate(${heart.rotation}deg)`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          💕
        </span>
      ))}
    </div>
  );
}

export default HeartEffect;

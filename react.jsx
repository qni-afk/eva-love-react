import { useState, useEffect } from 'react';
import './Garden.css';

const Garden = () => {
  const [flowers, setFlowers] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [achievements, setAchievements] = useState([]);

  // Типы цветов и их требования
  const FLOWER_TYPES = {
    basic: { clicks: 0, emoji: '🌱', name: 'Росток' },
    tulip: { clicks: 3, emoji: '🌷', name: 'Тюльпан' },
    rose: { clicks: 10, emoji: '🌹', name: 'Роза' },
    sunflower: { clicks: 20, emoji: '🌻', name: 'Подсолнух' }
  };

  // Обработчик клика по саду
  const handleGardenClick = (e) => {
    const { clientX, clientY } = e;
    const flowerType =
      clicks >= FLOWER_TYPES.sunflower.clicks ? 'sunflower' :
      clicks >= FLOWER_TYPES.rose.clicks ? 'rose' :
      clicks >= FLOWER_TYPES.tulip.clicks ? 'tulip' : 'basic';

    setFlowers(prev => [
      ...prev,
      {
        id: Date.now(),
        x: clientX - 20,
        y: clientY - 20,
        type: flowerType
      }
    ]);

    setClicks(prev => prev + 1);
  };

  // Проверка достижений
  useEffect(() => {
    const newAchievements = Object.values(FLOWER_TYPES)
      .filter(f => f.clicks > 0 && clicks >= f.clicks)
      .map(f => f.name)
      .filter(name => !achievements.includes(name));

    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements]);
      setTimeout(() => {
        setAchievements(prev => prev.slice(1));
      }, 3000);
    }
  }, [clicks]);

  return (
    <div className="garden-container">
      <div className="garden-stats">
        <h2>🌿 Сад мечты 🌿</h2>
        <p>Кликов: {clicks}</p>
      </div>

      <div
        className="garden-area"
        onClick={handleGardenClick}
      >
        {flowers.map(flower => (
          <div
            key={flower.id}
            className={`flower ${flower.type}`}
            style={{
              left: flower.x,
              top: flower.y,
              animation: 'grow 1.5s ease-out'
            }}
          >
            {FLOWER_TYPES[flower.type].emoji}
          </div>
        ))}
      </div>

      <div className="achievements-container">
        {achievements.map((name, index) => (
          <div
            key={index}
            className="achievement-notification"
            style={{ top: `${index * 60}px` }}
          >
            🏆 Достижение: Вырастили {name}!
          </div>
        ))}
      </div>
    </div>
  );
};

export default Garden;
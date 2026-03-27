import React, { useEffect, useRef } from 'react';
import styles from './ButterflyCursor.module.css';

const ButterflyCursor = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // 蝶を生成するメイン関数
    const createButterflyAt = (x, y) => {
      // 発生頻度を調整
      if (Math.random() > 0.15) return;
      if (!containerRef.current) return;

      const butterfly = document.createElement('div');
      butterfly.classList.add(styles.butterfly);
      
      butterfly.style.left = `${x}px`;
      butterfly.style.top = `${y}px`;

      const hue = Math.random() * 360;
      const color = `hsl(${hue}, 80%, 70%)`;

      const leftWing = document.createElement('div');
      leftWing.classList.add(styles.wing, styles['wing-left']);
      leftWing.style.backgroundColor = color;

      const rightWing = document.createElement('div');
      rightWing.classList.add(styles.wing, styles['wing-right']);
      rightWing.style.backgroundColor = color;

      butterfly.appendChild(leftWing);
      butterfly.appendChild(rightWing);
      containerRef.current.appendChild(butterfly);

      const destinationX = (Math.random() - 0.5) * 150;
      const destinationY = (Math.random() - 0.5) * 150 - 50;
      const rotation = (Math.random() - 0.5) * 90;

      butterfly.style.setProperty('--tw-x', `${destinationX}px`);
      butterfly.style.setProperty('--tw-y', `${destinationY}px`);
      butterfly.style.setProperty('--tw-r', `${rotation}deg`);

      const duration = 1 + Math.random() * 1.5;
      butterfly.style.animation = `${styles['float-away']} ${duration}s forwards ease-out`;

      setTimeout(() => {
        butterfly.remove();
      }, duration * 1000);
    };

    // マウス移動時の処理
    const handleMouseMove = (e) => {
      createButterflyAt(e.clientX, e.clientY);
    };

    // スマホ・タブレットでのタッチ時の処理
    const handleTouchMove = (e) => {
      // 指が触れている最初の場所を取得
      if (e.touches && e.touches[0]) {
        createButterflyAt(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    // イベントの登録
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true }); // passiveでスクロール性能を維持
    window.addEventListener('touchstart', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
    };
  }, []);

  return <div ref={containerRef} className={styles['butterfly-container']} />;
};

export default ButterflyCursor;
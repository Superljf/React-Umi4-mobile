// 移动端适配工具
export const setRem = () => {
  const width = document.documentElement.clientWidth;
  const fontSize = (width / 375) * 16;
  document.documentElement.style.fontSize = fontSize + 'px';
};

// 禁止页面缩放
export const preventZoom = () => {
  document.addEventListener('touchstart', (event) => {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
};
/**
 * 拖拽模态框 @by fx
 * @param draggableEl
 * @param childrenSelectors
 */
export const useDragModal = (draggableEl: HTMLElement, childrenSelectors = '.n-card-header') => {
  const targetEl = draggableEl.querySelector(childrenSelectors) as HTMLElement;
  if (!targetEl) {
    return;
  }
  targetEl.style.cursor = 'move';
  targetEl.style.userSelect = 'none';
  mousedown(targetEl as HTMLElement, draggableEl);
  mouseup();
};

const mousedown = (targetEl: HTMLElement, draggableEl: HTMLElement) => {
  targetEl.onmousedown = (event: MouseEvent) => {
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const { width, height, x: minMoveX, y: minMoveY } = draggableEl.getBoundingClientRect();
    const maxMoveX = viewportWidth - width - minMoveX;
    const maxMoveY = viewportHeight - height - minMoveY;
    const { clientX: originX, clientY: originY } = event;
    const { left, top } = draggableEl.style;
    const styleLeft = left?.replace('px', '') ?? 0;
    const styleTop = top.replace('px', '') ?? 0;

    document.onmousemove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      let moveX = clientX - originX;
      let moveY = clientY - originY;
      if (moveX > maxMoveX) {
        moveX = maxMoveX;
      } else if (-moveX > minMoveX) {
        moveX = -minMoveX;
      }
      if (moveY > maxMoveY) {
        moveY = maxMoveY;
      } else if (-moveY > minMoveY) {
        moveY = -minMoveY;
      }
      draggableEl.style.cssText += `;left:${+styleLeft + moveX}px;top:${+styleTop + moveY}px`;
    };
  };
};

const mouseup = () => {
  document.onmouseup = () => {
    document.onmousemove = null;
  };
};

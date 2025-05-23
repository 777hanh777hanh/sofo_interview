/**
 * Smoothly scrolls to a target position using requestAnimationFrame
 * @param targetPosition - The Y position to scroll to (in pixels)
 * @param duration - Animation duration in milliseconds (default: 800)
 */
export const smoothScrollTo = (
  targetPosition: number,
  duration: number = 800,
) => {
  const currentPosition = window.scrollY;
  const startTime = performance.now();
  const distance = targetPosition - currentPosition;

  const animateScroll = (currentTime: number) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);

    // easeInOutQuad easing function
    const easing =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    window.scrollTo(0, currentPosition + distance * easing);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

/**
 * Smoothly scrolls to the top of the page
 * @param duration - Animation duration in milliseconds (default: 800)
 */
export const smoothScrollToTop = (duration?: number) => {
  smoothScrollTo(0, duration);
};

/**
 * Smoothly scrolls to a specific element
 * @param element - The element to scroll to
 * @param offset - Optional offset from the element (default: 0)
 * @param duration - Animation duration in milliseconds (default: 800)
 */
export const smoothScrollToElement = (
  element: HTMLElement | string,
  offset: number = 0,
  duration?: number,
) => {
  const targetElement =
    typeof element === "string"
      ? (document.querySelector(element) as HTMLElement)
      : element;

  if (targetElement) {
    const targetPosition = targetElement.offsetTop + offset;
    smoothScrollTo(targetPosition, duration);
  }
};

// INFO: In case of window is a Proxy and does not proxy Events correctly, use isTouchEvent & isMouseEvent to distinguish event type instead of `instanceof`.
const isTouchEvent = (event: MouseEvent | TouchEvent): event is TouchEvent => {
  return Boolean(
    (event as TouchEvent).touches && (event as TouchEvent).touches.length
  );
};

export default isTouchEvent;

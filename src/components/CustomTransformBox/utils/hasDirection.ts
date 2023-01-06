const hasDirection = (dir: 'top' | 'right' | 'bottom' | 'left', target: string): boolean =>
  new RegExp(dir, 'i').test(target);

export default hasDirection;
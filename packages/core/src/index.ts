const add = (a: number, b: number): number => a + b;
const minus = (a: number, b: number): number => a - b;

export const getDocumentScrollWidth = (): number => {
  if (!window || !document) {
    throw new Error('window or document is not defined.');
  }

  return window.innerWidth - document.documentElement.clientWidth;
}

export const getScrollWidth = (target: HTMLElement): number => {
  if (!window || !document) {
    throw new Error('window or document is not defined.');
  }

  const clone = target.cloneNode(true) as HTMLElement;
  const computedStyle = window.getComputedStyle(target)

  const borderRight = parseInt(computedStyle.borderRight) || 0
  const borderLeft = parseInt(computedStyle.borderLeft) || 0
  const borderWidth = add(borderRight, borderLeft)
  
  clone.style.visibility = 'hidden';
  clone.style.position = 'absolute';
  clone.style.top = '-9999px';
  clone.style.width = '100px';  
  clone.style.height = '100px'; 
  clone.style.overflow = 'scroll'; 
  
  document.body.appendChild(clone);

  const scrollBarWidth = clone.offsetWidth - clone.clientWidth - borderWidth;
  
  document.body.removeChild(clone);
  
  return scrollBarWidth;
};

export const getPaddingRight = (target: HTMLElement): number => {
  if (!window) {
    throw new Error('window is not defined.');
  }

  const paddingRight = window.getComputedStyle(target).paddingRight;

  return parseInt(paddingRight) || 0;
};

export const scrollWizard = (target: HTMLElement) => {
  const hold = () => {
    try {
      const computedPaddingRight = add(getScrollWidth(target), getPaddingRight(target))

      target.style.overflow = 'hidden'
      target.style.paddingRight = `${computedPaddingRight}px`

      return true
    } catch (e) {
      console.error('An error occurred in scrollKit.hold.:: ', e)

      return false
    }
  }

  const release = () => {
    try {
      const beforePaddingRight = minus(getPaddingRight(target), getScrollWidth(target))

      target.style.overflow = 'auto'
      target.style.paddingRight = `${beforePaddingRight}px`

      return true
    } catch (e) {
      console.error('An error occurred in scrollKit.release ::', e)

      return false
    }
  }

  return {
    hold, release
  }
}

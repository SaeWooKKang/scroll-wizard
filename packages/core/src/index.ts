const add = (a: number, b: number): number => a + b;
const minus = (a: number, b: number): number => a - b;

export const getDocumentScrollWidth = (): number => {
  if (!window || !document) {
    throw new Error('window or document is not defined.');
  }

  return window.innerWidth - document.documentElement.clientWidth;
}

export const getBorderWidth = (target: HTMLElement): number => {
  const {borderRightWidth, borderLeftWidth} = window.getComputedStyle(target)
  const borderWidth = parseInt(borderRightWidth, 10 || 0) + parseInt(borderLeftWidth, 10) || 0

  return borderWidth
}

export const getPaddingRight = (target: HTMLElement): number => {
  if (!window) {
    throw new Error('window is not defined.');
  }

  return parseInt(target.style.paddingRight) || 0;
};

export const hasScrollBar = (target: HTMLElement): boolean => {
  if (!window) {
    throw new Error('window is not defined.');
  }

  return (target.offsetWidth - getBorderWidth(target)) !== target.clientWidth
}

export const getScrollWidth = (target: HTMLElement): number => {
  if (!window || !document) {
    throw new Error('window or document is not defined.');
  }

  if (!hasScrollBar(target)) {
    return 0;
  }

  const clone = target.cloneNode(true) as HTMLElement;
  
  clone.style.visibility = 'hidden';
  clone.style.position = 'absolute';
  clone.style.top = '-9999px';
  clone.style.width = '100px';  
  clone.style.height = '100px'; 
  clone.style.overflow = 'scroll'; 
  
  document.body.appendChild(clone);

  const scrollBarWidth = clone.offsetWidth - clone.clientWidth - getBorderWidth(clone);
  
  document.body.removeChild(clone);
  
  return scrollBarWidth;
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

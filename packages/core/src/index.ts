const add = (a: number, b: number): number => a + b;
const minus = (a: number, b: number): number => a - b;

export const getScrollWidth = (target: HTMLElement, document: Document): number => {
  const clone = target.cloneNode(true) as HTMLElement;
  
  clone.style.visibility = 'hidden';
  clone.style.position = 'absolute';
  clone.style.top = '-9999px';
  clone.style.width = '100px';  
  clone.style.height = '100px'; 
  clone.style.overflow = 'scroll'; 
  
  document.body.appendChild(clone);
  const scrollBarWidth = clone.offsetWidth - clone.clientWidth;
  
  document.body.removeChild(clone);
  
  return scrollBarWidth;
};

export const getOriginalPaddingRight = (target: HTMLElement): number => {
  const paddingRight = window.getComputedStyle(target).paddingRight;

  return parseInt(paddingRight) || 0;
};

export const scrollWizard = (target: HTMLElement, document: Document) => {
  const hold = () => {
    try {
      const computedPaddingRight = add(getScrollWidth(target, document), getOriginalPaddingRight(target))

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
      const computedPaddingRight = minus(getOriginalPaddingRight(target), getScrollWidth(target, document))

      target.style.overflow = 'auto'
      target.style.paddingRight = `${computedPaddingRight}px`

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

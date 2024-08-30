const add = (a: number, b: number): number => a + b
const minus = (a: number, b: number): number => a - b

export const getDocumentScrollWidth = (): number => {
  return window.innerWidth - document.documentElement.clientWidth
}

export const getBorderWidth = (target: HTMLElement): number => {
  const { borderRightWidth, borderLeftWidth } = window.getComputedStyle(target)
  const borderWidth =
    (parseInt(borderRightWidth, 10) || 0) + (parseInt(borderLeftWidth, 10) || 0)

  return borderWidth
}

export const getPaddingRight = (target: HTMLElement): number => {
  return parseInt(target.style.paddingRight) || 0
}

export const hasScrollBar = (target: HTMLElement): boolean => {
  return target.offsetWidth - getBorderWidth(target) !== target.clientWidth
}

export const getScrollWidth = (target: HTMLElement): number => {
  if (!hasScrollBar(target)) {
    return 0
  }

  const clone = target.cloneNode(true) as HTMLElement

  clone.style.visibility = 'hidden'
  clone.style.position = 'absolute'
  clone.style.top = '-9999px'
  clone.style.width = '100px'
  clone.style.height = '100px'
  clone.style.overflow = 'scroll'

  document.body.appendChild(clone)

  const scrollBarWidth =
    clone.offsetWidth - clone.clientWidth - getBorderWidth(clone)

  document.body.removeChild(clone)

  return scrollBarWidth
}

const checkEnvironment = () => {
  if (typeof window === 'undefined') {
    throw new Error('scrollWizard requires a browser environment')
  }
}

/**
 * @summary Controls the top scroll of the document by default.
 * @param target - If you use target, the value of the box-sizing property should be border-box.
 */
export const scrollWizard = (target?: HTMLElement) => {
  const element = target ?? document.body
  const originalPaddingRight = getPaddingRight(element)

  const setStyle = (overflowY: string, paddingRight: string) => {
    element.style.overflowY = overflowY
    element.style.paddingRight = paddingRight
  }

  const hold = () => {
    checkEnvironment()

    const scrollWidth = target
      ? getScrollWidth(target)
      : getDocumentScrollWidth()
    const computedPaddingRight = `${add(scrollWidth, originalPaddingRight)}px`
    setStyle('hidden', computedPaddingRight)

    return true
  }

  const release = () => {
    checkEnvironment()

    setStyle('auto', originalPaddingRight + 'px')

    return true
  }

  return { hold, release }
}

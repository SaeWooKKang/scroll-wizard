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
export const checkEnvironment = () => {
  if (typeof window === 'undefined') {
    throw new Error('scrollWizard requires a browser environment')
  }
}

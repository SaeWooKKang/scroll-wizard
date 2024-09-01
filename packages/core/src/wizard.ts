import {
  getPaddingRight,
  checkEnvironment,
  getScrollWidth,
  getDocumentScrollWidth,
} from './utils'

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
    const computedPaddingRight = `${scrollWidth + originalPaddingRight}px`
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

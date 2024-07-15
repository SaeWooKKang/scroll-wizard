import { afterEach, beforeEach, describe, expect, it, test } from 'vitest'
import { getByText, screen } from '@testing-library/dom'
import {  getPaddingRight, getScrollWidth ,getDocumentScrollWidth, hasScrollBar} from '.';
import { VIEWPORT } from './const';

beforeEach(() => {
  document.body.innerHTML = '';
});

afterEach(() => {
  document.body.innerHTML = '';
});


describe('clientWidth', () => {
  test('inline element clientWidth is unconditionally zero.', async () => {
   // Given
   const container = document.createElement('span');
   container.setAttribute('data-testid', 'inlineElement');
   container.style.width = '100px';
   container.style.padding = '10px';
   document.body.appendChild(container);
 
   // When 
   const $root = screen.queryByTestId('inlineElement');
 
   // Then 
   expect($root).not.toBeNull();
   expect($root?.clientWidth).toBe(0);
  })
  
  test('block element clientWidth is contents + padding.', async () => {
    // Given
    const container = document.createElement('div');
    container.setAttribute('data-testid', 'blockElement');
    container.style.width = '100px';
    container.style.padding = '10px';
    document.body.appendChild(container);
    
    // When
    const $root = screen.queryByTestId('blockElement')
    
    // Then
    expect($root).not.toBeNull();
    expect($root?.clientWidth).toBe(120);
  })
  
  test("block element clientWidth with 'box-sizing: border-box' is same with width.", async () => {
    // Given
    const container = document.createElement('div');
    container.setAttribute('data-testid', 'blockElement');
    container.style.boxSizing = 'border-box';
    container.style.width = '100px';
    container.style.padding = '10px';
    document.body.appendChild(container);
    
     // When
    const $root = screen.queryByTestId('blockElement')
    
    // Then
    expect($root?.clientWidth).toBe(100);
  })

  test('If there is a scroll area, the scroll area should be excluded.', async () => {
    // Given
    const container = document.createElement('div');
    container.setAttribute('data-testid', 'container');
    container.style.width = '100px';
    container.style.overflow = 'scroll';
    container.style.padding = '10px';
    document.body.appendChild(container);
    
    // When
    const $container = screen.queryByTestId('container')
  
    // Then
    expect($container?.clientWidth).toBeLessThan(120)
  })
})

describe('offsetWidth', () => {
  test('block element offsetWidth is contents + padding + border.', async () => {
   // Given
   const container = document.createElement('div');
   container.setAttribute('data-testid', 'blockElement');
   container.style.width = '100px';
   container.style.padding = '10px';
   container.style.border = '10px solid black';
   document.body.appendChild(container);
   
   // When
   const $root = screen.queryByTestId('blockElement')
   
   // Then
   expect($root).not.toBeNull();
   expect($root?.offsetWidth).toBe(140);
  })

  test("block element offsetWidth with 'box-sizing: border-box' is same with width.", async () => {
    // Given
    const container = document.createElement('div');
    container.setAttribute('data-testid', 'blockElement');
    container.style.boxSizing = 'border-box';
    container.style.width = '100px';
    container.style.padding = '10px';
    container.style.border = '10px solid black';
    document.body.appendChild(container);
    
     // When
    const $root = screen.queryByTestId('blockElement')
    
    // Then
    expect($root?.offsetWidth).toBe(100);
  })

  test('If there is a scroll area, the scroll area should be included.', async () => {
    // Given
    const container = document.createElement('div');
    container.setAttribute('data-testid', 'container');
    container.style.width = '100px';
    container.style.padding = '10px';
    container.style.border = '10px solid black';
    container.style.overflow = 'scroll';
    document.body.appendChild(container);
    
    // When
    const $container = screen.queryByTestId('container')
  
    // Then
    expect($container?.offsetWidth).toBe(140)
  })
})

test('If there is a scroll area, offsetWidth !== clientWidth', async () => {
  // Given
  const container = document.createElement('div');
  container.setAttribute('data-testid', 'container');
  container.style.width = '100px';
  container.style.overflow = 'scroll';
  container.style.padding = '10px';
  document.body.appendChild(container);
  
  // When
  const $container = screen.queryByTestId('container')

  // Then
  expect($container?.offsetWidth).not.toBe($container?.clientWidth)
})

test('viewport width, height is same width vitest.config viewport size', async () => {
  expect(window.innerWidth).toBe(VIEWPORT.width);
  expect(window.innerHeight).toBe(VIEWPORT.height);
})

test('If the area of the padding is 10, the getPaddingRight function must return 10.', () => {
  const mockElement = document.createElement('div');
  mockElement.style.paddingRight = '10px';
  
  const originalPaddingRight = getPaddingRight(mockElement);

  expect(originalPaddingRight).toBe(10);
});

describe('hasScrollBar', () => {
  test('If there is no scroll area, hasScrollBar function must return false.', () => {
    // Given
    const container = document.createElement('div');
    container.setAttribute('data-testid', 'container');
    container.style.width = '100px';
    document.body.appendChild(container);
    
    // When
    const $container = screen.queryByTestId('container')
  
    // Then
    expect(hasScrollBar($container as HTMLElement)).toBe(false);
  })

  test('If there is no scroll area and has border, hasScrollBar function must return false.', () => {
    // Given
    const container = document.createElement('div');
    container.setAttribute('data-testid', 'container');
    container.style.width = '100px';
    container.style.border = '10px solid black';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);
    
    // When
    const $container = screen.queryByTestId('container')
  
    // Then
    expect(hasScrollBar($container as HTMLElement)).toBe(false);
  })

  test('If there is a scroll area, hasScrollBar function must return true.', () => {
    // Given
    const container = document.createElement('div');
    container.setAttribute('data-testid', 'container');
    container.style.width = '100px';
    container.style.overflow = 'scroll';
    container.style.padding = '10px';
    document.body.appendChild(container);
    
    // When
    const $container = screen.queryByTestId('container')
  
    // Then
    expect(hasScrollBar($container as HTMLElement)).toBe(true);
  })
})

test('If the document has a scroll area, the return value of the getDocumentScrollWidth function must be greater than 0.', async () => {
  // Given
  const container = document.createElement('div');
  container.setAttribute('data-testid', 'container');
  container.style.width = '100px';
  container.style.height = '2000px';
  document.body.appendChild(container);
  
  // When
  const documentScrollWidth = getDocumentScrollWidth();

  // Then
  expect(documentScrollWidth).toBeGreaterThan(0);
})

describe('getScrollWidth', () => { 
  test('getScrollWidth function must return 0 if there is no scroll area of the element', () => {
    // Given
    const container = document.createElement('div');
    container.setAttribute('data-testid', 'container');
    container.style.width = '100px';
    document.body.appendChild(container);
    
    // When
    const $container = screen.queryByTestId('container')
  
    // Then
    expect(getScrollWidth($container as HTMLElement)).toBe(0);
  })
  
  test('getScrollWidth function must return the scrollbar width if there is a scroll area of the element', () => {
    // Given
    const container = document.createElement('div');
    container.setAttribute('data-testid', 'container');
    container.style.width = '100px';
    container.style.height = '100px';
    container.style.overflow = 'scroll';
    container.style.padding = '10px';
    document.body.appendChild(container);
    
    // When
    const $container = screen.queryByTestId('container')
  
    // Then
    expect(getScrollWidth($container as HTMLElement)).toBeGreaterThan(0);
  })

  test('If the scroll width is 10px, the getScrollWidth function must return 10.', async () => {
    // Given
    const css = `
      body {
        background-color: #f0f0f0; /* 연한 회색 배경 */
      }
      ::-webkit-scrollbar {
        width: 10px;
      }
    `
    const blob = new Blob([css], { type: 'text/css' });
    const cssURL = URL.createObjectURL(blob);
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = cssURL;
    document.head.appendChild(linkElement);

    const container = document.createElement('div');
    container.style.width = '500px';
    container.style.height = '500px';
    container.style.overflow = 'scroll';
    container.setAttribute('data-testid', 'container');
    
    const child  = document.createElement('div');
    child.style.width = '1000px';
    child.style.height = '1000px';
    child.style.backgroundColor = 'skyblue';
    container.appendChild(child);

    document.body.appendChild(container);

    await new Promise((resolve) => setTimeout(resolve, 500));

    // When
    const $container = screen.queryByTestId('container')

    // Then
    expect(getScrollWidth($container!)).toBe(10);

    // Clean up
    document.head.removeChild(linkElement);
    URL.revokeObjectURL(cssURL);
  })
 })




import { describe, expect, it, test } from 'vitest'
import {  getPaddingRight, getScrollWidth ,getDocumentScrollWidth} from '.';

/**
 * @link https://github.com/jsdom/jsdom/issues/2310
 */

test('getOriginalPaddingRight should return the correct padding right value', () => {
  const mockElement = document.createElement('div');
  mockElement.style.paddingRight = '10px';
  
  const originalPaddingRight = getPaddingRight(mockElement);

  expect(originalPaddingRight).toBe(10);
});



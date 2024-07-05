import { test, expect, Page } from '@playwright/test';
import { getScrollWidth, getDocumentScrollWidth } from 'scroll-wizard'

test.describe('clientWidth', async() => {
  test('inline element clientWidth is unconditionally zero.', async ({page}) => {
    await page.setContent(`
      <style>
        .root {
          width: 400px;
        }
        .block {
          width: 200px;
          height: 100px;
          border: 1px solid black;
          padding: 20px;
        }
      </style>
      <div class='root'>
          <span id="inlineElement">inline element</span>
          <span id="emptyInlineElement"></span>
          <span id="withElement">
            <div class="block">abc</div>
          </span>
        </div>
    `);

    const obj = await page.evaluate(() => {
      function getClientWidth(id: string) {
        const element = document.getElementById(id);
    
        return element.clientWidth
      }
   
      return {
        inlineElement: getClientWidth('inlineElement'),
        emptyInlineElement: getClientWidth('emptyInlineElement'),
        withElement: getClientWidth('withElement'),   
      }
    })

    expect(obj.emptyInlineElement).toEqual(0);
    expect(obj.inlineElement).toEqual(0);
  })

  test('block element clientWidth is padding + contents.', async ({page}) => {
    await page.setContent(`
      <style>
        .root {
          width: 400px;
        }
        .only-width {
            width: 200px;
        }
        .width-with-padding {
          width: 200px;
          padding: 20px;
        }
        .block {
          width: 200px;
          height: 100px;
          border: 1px solid black;
          padding: 20px;
          margin: 50px;
        }
      </style>
      <div class='root'>
          <div id="emptyElement"></div>
          <div class="only-width"></div>
          <div class="width-with-padding"></div>
          <div class="block">블록 요소</div>
        </div>
    `);

    const obj = await page.evaluate(() => {
      function getClientWidth(selector: string) {
        const element = document.querySelector(selector);
    
        return element.clientWidth
      }
   
      return {
        emptyElement: getClientWidth('#emptyElement'),
        onlyWidth: getClientWidth('.only-width'),
        widthWithPadding: getClientWidth('.width-with-padding'),
        blockElement: getClientWidth('.block'),
      }
    })

    expect(obj.emptyElement).toEqual(400);
    expect(obj.onlyWidth).toEqual(200);
    expect(obj.widthWithPadding).toEqual(240);
    expect(obj.blockElement).toEqual(240);
  })

  /**
   * Below is a test that fails because the operation is different from that of the actual browser.
  */

  test('If there is a scroll area, the scroll area should be excluded.', async ({page}) => {
    await page.setContent(`
      <style>
        .scroll-container {
          width: 200px;
          height: 100px;
          overflow: auto;

          padding: 20px;
          border: 4px dashed black;
          margin: 50px;
        }
        .children {
          height: 300px;
          background-color: orange;
        }
      </style>
      <div class="scroll-container">
        <div class="children"></div>
      </div>
    `);

    const obj = await page.evaluate(() => {
      function getClientWidth(selector: string) {
        const element = document.querySelector(selector);
    
        return element.clientWidth
      }
   
      return {
        scrollContainer: getClientWidth('.scroll-container'),
      }
    })

    expect(obj.scrollContainer).toBeLessThan(240); 
  })

  test('If there is a scroll area, offsetWidth !== clientWidth', async ({page}) => {
    await page.setContent(`
      <style>
        .scroll-container {
          width: 200px;
          height: 100px;
          overflow: auto;

          padding: 20px;
          margin: 50px;
        }
        .children {
          height: 300px;
          background-color: orange;
        }
      </style>
      <div class="scroll-container">
        <div class="children"></div>
      </div>
    `);

    const obj = await page.evaluate(() => {
      function getElementWidth(selector: string) {
        const element: HTMLElement = document.querySelector(selector);
    
        return {
          offsetWidth: element.offsetWidth,
          clientWidth: element.clientWidth
        }
      }
   
      return getElementWidth('.scroll-container')
    })

    console.log(obj.clientWidth, obj.offsetWidth)

    expect(obj.clientWidth !== obj.offsetWidth).toBeTruthy();
  })
})

test('If the document has a scroll area, the return value of the getDocumentScrollWidth must be greater than 0.', async ({page}) => {
  await page.setContent(`
    <style>
      .trigger-scroll {
        width: 200px;
        height: 2000px;
        background-color: orange;
      }
    </style>
    <div class="trigger-scroll"></div>
  `);

  const documentScrollBarWidth = await page.evaluate(({getDocumentScrollWidth}) => {
    const recreatedFunction = new Function('return ' + getDocumentScrollWidth)();

    console.log({
      innerWidth: window.innerWidth,
      clientWidth: document.documentElement.clientWidth,
      
    })

    return recreatedFunction();
  }, {getDocumentScrollWidth: getDocumentScrollWidth.toString()})

  expect(documentScrollBarWidth).toBeGreaterThan(0);
})


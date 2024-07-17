![scroll-wizard-og]('og.webp)

# scroll-wizard

Handling scrolling in browsers can be tricky. Wouldn't it be nice if we could manage scrolling with simple function calls? That's how this project started.

## Installation

```sh [npm]
npm install scroll-wizard
```

```sh [yarn]
yarn add scroll-wizard
```

## Problem We're Solving

### Maintaining Scrollbar Area

When preventing scrolling in browsers, we often set the `overflow: hidden` property on the `document.body` (e.g., to prevent scrolling of lower layers when displaying a modal).

While this achieves the intended purpose, users experience unnecessary layout shift.

Let's improve the user experience! 🧙‍♂️

```ts
import { scrollWizard } from "scroll-wizard";

const scrollbar = scrollWizard();

document
  .querySelector("#opening-modal-button")
  .addEventListener("click", () => {
    scrollbar.hold(); // Calculate the scrollbar area and replace it with a padded area.

    modal.open(); // Whatever it is, a function that opens the modal
  });

document
  .querySelector("#closing-modal-button")
  .addEventListener("click", () => {
    scrollbar.release(); // Restore it to its original state.

    modal.close(); // Whatever it is, a function that closes the modal
  });
```

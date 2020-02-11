# Totality

Total from subtotals, automatically updating in your DOM with mutation observations.

## Installation

```bash
npm i totality
```

## Usage

Create a `[data-totality]` element, which will sum up all the items pointed to by its data attribute, e.g.

```html
<div class="subtotal">£1.99</div>
<div class="subtotal">£2.99</div>
<div class="subtotal">£3.99</div>
<div data-totality=".subtotal"></div>
```

```js
import Totality from "totality";

// Spin up instances for any [data-totality] elements
const totalityElements = document.querySelectorAll("[data-totality]");
if (totalityElements) {
  const totalities = [...totalityElements].map(
    element => new Totality({ element, currency: "£" })
  );
}
```

And it will populate the total with `£8.97`.

## Updating

It observes mutations within the given subtotal elements, so if you've got other scripts wrangling prices, we good.

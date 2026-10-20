---
title: "Selective Hydration"
description: "How to send zero JavaScript by default."
publishDate: 2026-10-03
---

## Selective Hydration

Partial or Selective Hydration renders static HTML on the server and defines certain placeholders or "slots".
Only these components are targeted by the browser for interactivity.

## Problem with Full Hydration

While the content is displayed immediately, the site needs to wait until the JavaScript has been fulled loaded and executed. 
This is especially an issue in large applications, and is called the "hydration gap".

**Selective Hydration fixes this issue.**

### Examples
- Comment Form
- Buttons
- Dropdown Menus
- etc.

Static content remains untouched and does not change.

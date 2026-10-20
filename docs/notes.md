# Notes

- Web framework for building content-driven websites
    - e.g. Documentation sites, blogs, portfolios...
- Reduces JS overhead
- For fast websites with great SEO

NOTE: Similar to:

- Jekyll SSG (Ruby)
- Hugo SSG (Go)

Not an SPA app, MPA (multi-page app) approach instead

## Highlights

- Islands: component-based web architecture
- UI-agnostic: supports React, Vue, Svelte, ...
- Server-first: SSR as default with selective CSR
- Zero JS by default: Less JS overhead
- Easy to use
- Developer focused

## Design Principles

- Content-driven
- Server-First
    - Laravel, Ruby on Rails, PHP, WordPress, ...

## Islands Architecture

- Majority of content is static HTML
- Only specific islands of JS are added where interactivity is needed

Term *component island* expanded:

This idea was then expanded on and documented in this post by Preact creator Jason Miller on August 11, 2020.

> The general idea of an “Islands” architecture is deceptively simple:
> render HTML pages on the server, and inject placeholders or slots
> around highly dynamic regions […] that can then be “hydrated” on the
> client into small self-contained widgets, reusing their
> server-rendered initial HTML.
> — Jason Miller, Creator of Preact

The technique the island component architectural pattern builds on
is called *Selective* or *Partial Hydration*

*Regular Hydration* as used by most other JS frameworks:

Websites are rendered as one large JS application, SPAs
provide simplicity and power but suffer from page-load
performance problems due to heavy client-side JS.

Instead, Astro is the first mainstream JS framework with
built-in selective hydration, using this island component
architecture.

## What are Islands?

- Client island -> JS UI component that's hydrated separately
- Server island -> UI component that server-renders separately

Slow processes are run independently from rest of page, thus
optimizing overall page loads

## Island Components

- Regular Astro components: Render static HTML
- Islands: 
    - run isolated from other page items
    - even though isolated, can still share state and communicate

## Hydration

- [What is Hydration?](https://angular.dev/guide/hydration)

- Hydration: process of restoring server-side rendered application
    on the client
- Includes:
    - Reusing server rendered DOM structures
    - Persisting app state
    - Transferring app data from server to client
    - ...
- Importance
    - Improves app performance by avoiding extra work to recreate the
      DOM on the client-side
    - Leads to improved performance as dictated by *Core Web Vitals (CWV)*
        - e.g. First Input Delay (FID)
        - e.g. Largest Contentful Paint (LCP)
        - e.g. Cumulative Layout Shift (CLS)

## Hydration
A static HTML page gets turned into a dynamic page from a cleint-side JavaScript application.
This is usually done by attaching event handlers to the nodes of the website.

```mermaid
sequenceDiagram
    autonumber
    participant B as Build
    participant S as Server / CDN
    participant C as Browser

    Note over B: Build time
    B->>B: Bundle ALL components into one JS bundle
    B->>S: Deploy bundle and (optionally) pre-rendered HTML

    Note over S,C: Request time
    C->>S: GET /page
    S->>S: Render full component tree to HTML (SSR or SSG)
    S-->>C: HTML + link to the full JS bundle

    Note over C: Page is visible but NOT interactive
    C->>C: Parse HTML, paint content (FCP)
    C->>S: Download full JS bundle
    S-->>C: JS bundle (every component)

    Note over C: Hydration
    C->>C: Execute the whole app, rebuild the full component tree
    C->>C: Walk entire DOM, attach event listeners and state
    Note over C: Page is now interactive (TTI)
```

### Problem:
While the content is displayed immediately, the site needs to wait until the JavaScript has
been fulled loaded and executed. This is especially an issue in large applications,
and is called the "hydration gap".

The solution is...

## Partial Hydration
Render static HTML on the server and define certain placeholders or "slots".
These are dynamic and can be "hydrated" on the client into self-contained widgets, at the same time reusing their
initial HTML code that's still on the server.

```mermaid
sequenceDiagram
    autonumber
    participant B as Build
    participant S as Server / CDN
    participant C as Browser

    Note over B: Build time
    B->>B: Analyze components, mark interactive ones as islands
    B->>B: Render static parts to plain HTML (no JS)
    B->>B: Emit one small JS chunk per island
    B->>S: Deploy HTML + island chunks

    Note over S,C: Request time
    C->>S: GET /page
    S-->>C: HTML (static parts + island placeholders), minimal or no JS

    Note over C: Page is visible, static parts are final
    C->>C: Parse HTML, paint content (FCP)

    Note over C: Selective hydration
    C->>C: Island trigger fires (on load, idle, visible or interaction)
    C->>S: Fetch only that island's JS chunk
    S-->>C: Small chunk (e.g. cart button)
    C->>C: Hydrate just that island, attach listeners
    Note over C: Static HTML is never hydrated, other islands wait for their trigger
```

This is the so-called "Island Infrastructure"

An Island is an enhanced UI component placed within the static HTML.
They can be split up into Client and Server Islands.
Client: interactive JavaScript component which is being hydrated
Server: a regular component that renders its content server-sided
Both islands are more expensive to run, slower to process and are separate from the rest of the page.
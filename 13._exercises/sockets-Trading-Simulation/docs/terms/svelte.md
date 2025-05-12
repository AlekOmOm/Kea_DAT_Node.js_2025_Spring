[back](index.md)

# Svelte Terms

## toc
- [Svelte Terms](#svelte-terms)
  - [toc](#toc)
  - [Core Concepts](#core-concepts)
    - [Component](#component)
    - [Props (Properties)](#props-properties)
    - [Runes (Svelte 5+)](#runes-svelte-5)
    - [Reactivity](#reactivity)
    - [Store](#store)
  - [Template Syntax](#template-syntax)
    - [Expressions](#expressions)
    - [Control Flow Blocks](#control-flow-blocks)
    - [Snippets (Svelte 5+)](#snippets-svelte-5)
    - [Attributes](#attributes)
    - [Event Handling](#event-handling)
    - [Binding (`bind:`)](#binding-bind)
    - [Action (`use:actionName`)](#action-useactionname)
    - [Transitions](#transitions)
  - [Special Elements (`<svelte:...>`)](#special-elements-svelte)
  - [Legacy Concepts (Primarily Svelte 3/4, some relevance for migration)](#legacy-concepts-primarily-svelte-34-some-relevance-for-migration)
    - [Slot](#slot)
  - [Styling](#styling)
    - [Scoped Styles](#scoped-styles)
    - [`:global()`](#global)
    - [Custom Properties (CSS Variables)](#custom-properties-css-variables)
  - [Compilation \& Build](#compilation--build)
    - [Svelte Compiler](#svelte-compiler)
    - [Preprocessing](#preprocessing)
  - [Other](#other)
    - [Custom Element](#custom-element)
    - [Accessibility (A11y)](#accessibility-a11y)

## Core Concepts

### Component
- **Definition:**
    - A self-contained, reusable unit of user interface (UI).
        - Encapsulated within a `.svelte` file.
        - Comprises:
          - logic (JavaScript) - `<script>`, `<script module>`,
          - markup (HTML) - `<template>`,
          - styles (CSS) - `<style>`.

- **Purpose:**
    - To structure Svelte applications into 
      - modular, 
      - maintainable, 
      - and composable pieces.
    - Facilitates code organization and reusability by isolating UI concerns.
- **Explanation:**
    - Components are the foundational elements of Svelte. Each `.svelte` file conventionally defines one component.
    - They can be imported and instantiated within other components to build complex UIs.
    - Key parts of a component file:
        - **`<script>` tag:** 
          - Contains instance-specific JavaScript logic, state, and lifecycle functions.
        - **`<script module>` tag (optional):** 
          - Executes JavaScript once when the module is first imported.
          - Used for module-level variables, functions, or logic shared among all instances of the component (e.g., utility functions, constants).
        - **Markup (HTML):** 
          - Defines the component's visual structure and layout.
        - **`<style>` tag (optional):** 
          - Contains CSS rules that are, by default, lexically scoped to the component, preventing unintended global style side effects.
- **Example:**
    ```javascript
    <!-- MyButton.svelte -->
    <script>
      export let label = 'Click me';
    </script>
    <button>{label}</button>
    <style>button { padding: 8px; background: #eee; }</style>
    ```

### Props (Properties)
- **Definition:**
    - Data inputs explicitly passed from a parent component to a child component.
- **Purpose:**
    - To enable parent components to configure and control the behavior and rendered output of their child components.
        - Facilitates one-way data flow and component customization.
- **Explanation:**
    - Props are the primary mechanism for inter-component communication in a top-down direction.
    - In Svelte 5, 
      - props are accessed as a reactive object via the `$props()` rune within the child component's script (e.g., `let { variant, disabled } = $props();`).
    - A shorthand syntax allows passing a variable as a prop when the prop name matches the variable name: `<Button {label} />` is equivalent to `<Button label={label} />`.

- **Example:**
    ```javascript
    <!-- Parent.svelte -->
    <script> 
      import UserProfile from './UserProfile.svelte'; 
    </script>
    
    <UserProfile name="Alice" age={30} />             <!-- input for Reactive props: name, age -->

    <!-- UserProfile.svelte -->
    <script> let { name, age } = $props(); </script>  <!-- declaration and assignment of Reactive props -->
    <p>{name} is {age} years old.</p>                 <!-- output of Reactive props -->
    ```

### Runes (Svelte 5+)
- **Definition:**
    - Special, compiler-recognized symbols (prefixed with `$`) that introduce a more explicit and fine-grained model for reactivity and state management.
- **Purpose:**
    - To provide developers with clearer control over reactive dependencies and updates, aiming for improved performance and more predictable behavior, especially in complex scenarios.
        - Supersedes some implicit reactivity mechanisms of earlier Svelte versions.
- **Explanation:**
    - Runes are a **core feature** of Svelte 5's updated reactivity system.
    - Key runes include:
        - **`$state(initialValue)`:** Declares a reactive state variable. Changes to its value trigger updates in dependent parts of the component or derived values.
            - Example: `let count = $state(0);` 
              - `count` can now be used in the template and will automatically update when its value changes.
        - **`$derived(expression)`:** 
          - Creates a reactive, memoized value computed from other reactive sources (state, props, other derived values).
          - It recalculates only when its dependencies change.
            - Example: `let doubled = $derived(count * 2);`
              - `doubled` will automatically update whenever `count` changes.

        - **`$effect(() => { ... })`:** 
          - Defines a reactive side effect that executes after DOM updates and re-runs whenever its reactive dependencies change.
          - Suitable for operations like manual DOM manipulation, data fetching, or interacting with browser APIs.
            - Example: `$effect(() => console.log('Count is ', ${count}, 'doubled is ', ${doubled}))`
              - This will log the current values of `count` and `doubled` whenever either changes.

        - **`$props()`:** 
          - Provides access to the reactive object containing all properties passed to the current component instance.
          - Example: `let { name, age } = $props();`
            - `name` and `age` will be reactive and will update whenever the component receives new props.
- **Example:**
    ```javascript
    <script>
      let count = $state(0);                                                  // Reactive state variable
      let doubled = $derived(count * 2);                                      // Reactive derived value
      $effect(() => console.log(`Count is ${count}, doubled is ${doubled}`)); // Reactive side effect
    </script>

    <button on:click={() => count++}>Count: {count}</button>                  // Reactive event handler
    <p>Doubled: {doubled}</p>                                                 // Reactive output
    ```

### Reactivity
- **Definition:**
    - The intrinsic Svelte mechanism that automatically updates the Document Object Model (DOM) in response to changes in a component's state.
- **Purpose:**
    - To simplify UI development by abstracting away manual DOM manipulation, allowing developers to focus on state management.
- **Explanation:**
    - Svelte achieves reactivity at compile-time. The compiler analyzes component code, identifies reactive assignments (e.g., to `$state` variables or props), and generates optimized JavaScript code that directly updates the specific parts of the DOM affected by state changes.
    - This "surgical" update approach avoids the need for a virtual DOM and its associated runtime overhead.
- **Example:**
    ```javascript
    <script>
      let name = $state("World"); // `name` is reactive
    </script>
    <input bind:value={name} />
    <h1>Hello, {name}!</h1> <!-- Updates automatically when `name` changes -->
    ```

### Store
- **Definition:**
    - A reactive object that encapsulates a value and provides a `subscribe` method, enabling components or other modules to be notified of changes to that value.
- **Purpose:**
    - To manage and share state across different parts of an application, particularly when direct component prop drilling becomes cumbersome or inappropriate (e.g., for global UI state, user authentication status).
        - Provides a decoupled, centralized mechanism for state that multiple, potentially unrelated, components might need to access or modify.
- **Explanation:**
    - Stores facilitate state management outside the strict component hierarchy.
    - Core store types:
        - **`writable(initialValue, startFn?)`:**
            - Creates a store whose value can be modified externally via its `set(newValue)` method or its `update(updaterCallback)` method (which receives the current value and returns the new value).
            - The optional `startFn` is invoked when the store gets its first subscriber and can return a cleanup function that runs when the last subscriber unsubscribes. This is useful for setting up and tearing down resources like timers or event listeners tied to the store's activity.
        - **`readable(initialValue, startFn)`:**
            - Creates a store whose value is typically managed internally by the provided `startFn` and cannot be directly modified from outside.
            - The `startFn` receives a `set` function to update the store's value and an `update` function. It must return a cleanup function. Useful for representing values that change over time based on external sources (e.g., browser geolocation, timers, WebSocket messages).
        - **`derived(sourceStore(s), deriveFn, initialValue?)`:**
            - Creates a store whose value is computed based on the value(s) of one or more other (source) stores.
            - The `deriveFn` is a callback that receives the current value(s) of the source store(s) (and optionally a `set` function for asynchronous derivations) and returns the new derived value. It automatically re-evaluates and updates its own value whenever any of its source stores change.
    - **`$store_name` (Auto-subscription - Legacy/Convenience):**
        - In Svelte 3/4, prefixing a store variable with `$` within a component's script or template provided automatic subscription to the store and unsubscription when the component was destroyed.
        - While this syntax remains functional for backward compatibility, explicit subscription management or rune-based patterns are often encouraged in Svelte 5 for better clarity and control over reactivity.
- **Example:**
    ```javascript
    // store.js
    import { writable } from 'svelte/store';
    export const theme = writable('light'); // 'light' or 'dark'
    ```
    ```svelte
    <!-- Component.svelte -->
    <script>
      import { theme } from './store.js';
      function toggleTheme() {
        theme.update(current => (current === 'light' ? 'dark' : 'light'));
      }
    </script>
    <button on:click={toggleTheme}>Current theme: {$theme}</button>
    ```

## Template Syntax

### Expressions
- **Definition:**
    - JavaScript expressions embedded directly within HTML markup, delimited by curly braces (`{expression}`).
- **Purpose:**
    - To dynamically render data and computed values within the component's template.
- **Explanation:**
    - Svelte allows most valid JavaScript expressions inside curly braces to output dynamic content.
        - Example: `<p>User: {user.name.toUpperCase()}</p>`.
- **Example:**
    ```javascript
    <script> let price = 10; let quantity = 2; </script>
    <p>Total cost: ${price * quantity}</p>
    <p>Message: {"Hello".toUpperCase() + " Svelte!"}</p>
    ```

### Control Flow Blocks
- **Definition:**
    - Svelte-specific template constructs for declarative conditional rendering and list iteration.
- **Purpose:**
    - To control the structure and content of the DOM based on reactive application state.
- **Explanation:**
    - These blocks enable dynamic template generation without manual DOM manipulation.
    - **`{#if condition} ... {:else if otherCondition} ... {:else} ... {/if}`:**
        - Renders different markup sections based on the evaluation of JavaScript conditions.
    - **`{#each list as item, index (key)} ... {:else} ... {/each}`:**
        - Iterates over an array or other iterable, rendering a template block for each element.
            - `item`: Represents the current element in the iteration.
            - `index` (optional): Provides the zero-based index of the current element.
            - `(key)` (optional): A unique identifier for each item, crucial for Svelte to perform efficient updates when the list changes (e.g., reordering, adding, removing items).
            - `{:else}`: A block rendered if the `list` is empty or null.
    - **`{#await promise} ... {:then value} ... {:catch error} ... {/await}`:**
        - Manages asynchronous operations within the template.
            - The initial block (before `:then` or `:catch`) is rendered while the `promise` is pending.
            - The `:then value` block is rendered when the `promise` resolves successfully, with `value` being the resolved value.
            - The `:catch error` block is rendered if the `promise` rejects, with `error` being the rejection reason.
- **Example:**
    ```javascript
    <script>
      let items = $state(['apple', 'banana']);
      let user = $state({ loggedIn: true });
    </script>
    {#if user.loggedIn}
      <ul> {#each items as item (item)} <li>{item}</li> {/each} </ul>
    {:else} <p>Please log in.</p> {/if}
    ```

### Snippets (Svelte 5+)
- **Definition:**
    - Reusable, parameterized blocks of markup defined within a component, rendered via the `{@render}` directive.
- **Purpose:**
    - To encapsulate and reuse template fragments, promoting code reuse and enabling complex component composition patterns, such as layouts or custom list item renderers.
        - Largely supersedes the "slot" mechanism from earlier Svelte versions for passing structured markup.
- **Explanation:**
    - Snippets allow for defining portions of UI that can be invoked multiple times with different parameters.
    - Definition syntax: `{#snippet snippetName(param1, param2)} ...markup... {/snippet}`.
    - Rendering syntax: `{@render snippetName(arg1, arg2)}`.
    - **Children Snippet:**
        - Markup placed directly between a component's opening and closing tags (and not part of another named snippet definition) is implicitly available as a snippet named `children`.
        - Accessed via `let { children } = $props();` and rendered with `{@render children()}`. This is the Svelte 5 equivalent of the default slot.
- **Example:**
    ```javascript
    <script> let user = $state({ name: "Alex", role: "Admin" }); </script>
    {#snippet userBadge(name, role)}
      <span>{name} ({role})</span>
    {/snippet}
    <p>Welcome, {@render userBadge(user.name, user.role)}!</p>
    ```

### Attributes
- **Definition:**
    - Standard HTML attributes whose values can be static or dynamically assigned using JavaScript expressions.
- **Purpose:**
    - To configure HTML elements and Svelte components with static or reactive data.
- **Explanation:**
    - Svelte enhances standard HTML attributes with reactive capabilities.
    - **Dynamic values:** `class="item {isActive ? 'active' : ''}"`.
    - **Boolean attributes:** The attribute is present if its bound expression is truthy; otherwise, it's omitted. `null` or `undefined` values also remove the attribute. Example: `<button disabled={!formIsValid}>Submit</button>`.
    - **Shorthand:** If the attribute name and the JavaScript variable name are identical: `<img {src} alt="Dynamic image" />` is equivalent to `<img src={src} alt="Dynamic image" />`.
    - **Spread attributes:** `<div {...allAttributesObject}></div>` or `<MyComponent {...propsObject} />`. This syntax expands an object's key-value pairs as attributes on an HTML element or as props on a Svelte component.
- **Example:**
    ```javascript
    <script>
      let imageUrl = $state("/logo.png");
      let isDisabled = $state(true);
      let linkAttrs = $state({ href: "/", title: "Homepage" });
    </script>
    <img src={imageUrl} alt="Logo" />
    <button disabled={isDisabled}>Submit</button>
    <a {...linkAttrs}>Home</a>
    ```

### Event Handling
- **Definition:**
    - The mechanism for responding to DOM events (e.g., clicks, input changes) or custom component events by executing JavaScript functions.
- **Purpose:**
    - To make UIs interactive by allowing components to react to user actions or other event occurrences.
- **Explanation:**
    - Svelte uses the `on:eventname` directive for event listeners.
    - Syntax: `on:eventname={handlerFunction}`. Example: `<button on:click={incrementCounter}>Increment</button>`.
    - **Event modifiers:** Can be chained to the event name to alter its behavior:
        - `preventDefault`: Calls `event.preventDefault()` before running the handler.
        - `stopPropagation`: Calls `event.stopPropagation()`.
        - `passive`: Improves scrolling performance for events like `touchmove` or `wheel` by indicating the handler won't call `preventDefault`.
        - `nonpassive`: Explicitly indicates the handler *might* call `preventDefault`.
        - `capture`: Registers the event listener on the capturing phase instead of the bubbling phase.
        - `once`: The handler is executed at most once; the listener is automatically removed after the first invocation.
        - `self`: The handler only triggers if `event.target` is the element itself, not a child element.
- **Example:**
    ```javascript
    <script>
      let count = $state(0);
      const handleClick = () => count++;
    </script>
    <button on:click={handleClick}>Clicked {count} times</button>
    <form on:submit|preventDefault={() => console.log('Form submitted!')}>
      <button type="submit">Submit</button>
    </form>
    ```

### Binding (`bind:`)
- **Definition:**
    - A directive that creates a two-way data binding, synchronizing a variable in the component's script with an element's property or a component's prop.
- **Purpose:**
    - To simplify the synchronization of state between the component's logic and its template, particularly for form inputs and component interactions.
- **Explanation:**
    - `bind:` ensures that if the variable changes, the element/prop updates, and if the user interacts with the element (or the child component modifies the bound prop), the variable also updates.
    - **Element property binding:** Most commonly used with form elements. Example: `bind:value={userName}` on an `<input>` field.
    - **Component prop binding:** `bind:childsProp={parentStateVariable}` allows a child component to effectively "write back" to a parent's state variable if the child treats that prop as bindable.
    - **Readonly bindings:** For element properties that are read-only but can change (e.g., an element's dimensions). Example: `bind:clientWidth={widthOfDiv}`.
    - **Function bindings:** Provides fine-grained control over the binding logic by specifying getter and setter functions: `bind:value={() => stateValue, (v) => stateValue = processInput(v)}`.
- **Example:**
    ```javascript
    <script>
      let name = $state('');
      let divWidth = $state(0);
    </script>
    <input bind:value={name} placeholder="Enter name" />
    <p>Hello, {name || 'stranger'}</p>
    <div bind:clientWidth={divWidth} style="width: 50%;">Width: {divWidth}px</div>
    ```

### Action (`use:actionName`)
- **Definition:**
    - A JavaScript function applied to an HTML element, which is executed when the element is mounted to the DOM. It can optionally return an object with `update` and `destroy` methods to manage the element's lifecycle.
- **Purpose:**
    - To encapsulate reusable DOM manipulation logic, integrate with third-party JavaScript libraries that require direct DOM access, or add custom behaviors to elements.
- **Explanation:**
    - Actions offer a clean way to extend element functionality beyond Svelte's built-in capabilities.
    - Syntax: `<div use:myCustomAction={parameters}></div>`.
    - The action function signature: `function myCustomAction(node, parameters) { /* Code to run on element creation */ return { update(newParameters) { /* Code to run if parameters change */ }, destroy() { /* Code to run on element removal (cleanup) */ } }; }`.
        - `node`: The HTML element the action is applied to.
        - `parameters`: Any parameters passed to the action.
- **Example:**
    ```javascript
    // actions.js
    export function clickOutside(node, callback) {
      const handleClick = event => !node.contains(event.target) && callback();
      document.addEventListener('click', handleClick, true);
      return { destroy() { document.removeEventListener('click', handleClick, true); } };
    }
    ```
    ```svelte
    <!-- Component.svelte -->
    <script>
      import { clickOutside } from './actions.js';
      let showModal = $state(false);
    </script>
    {#if showModal}
      <div use:clickOutside={() => showModal = false}>Click outside to close.</div>
    {/if}
    <button on:click={() => showModal = true}>Open Modal</button>
    ```

### Transitions
- **Definition:**
    - Functions that declaratively animate HTML elements as they are added to or removed from the DOM.
- **Purpose:**
    - To enhance user experience by providing smooth visual feedback for dynamic content changes, making UI updates feel more polished and intuitive.
- **Explanation:**
    - Svelte provides directives to apply transitions:
        - **`transition:fn`:** Applies the transition function `fn` for both the element's "intro" (entering) and "outro" (leaving) phases.
        - **`in:fn`:** Applies transition `fn` only when the element is entering the DOM.
        - **`out:fn`:** Applies transition `fn` only when the element is leaving the DOM.
    - Svelte includes several built-in transition functions (e.g., `fade`, `fly`, `slide`, `scale`, `blur`, `draw`), which can be customized with parameters.
    - Custom transition functions can be created. They must return an object specifying properties like `delay`, `duration`, `easing`, and either a `css: (t, u) => string` function (for CSS-based animations, where `t` is the eased time `0-1` and `u` is `1-t`) or a `tick: (t, u) => void` function (for JavaScript-driven animations).
- **Example:**
    ```javascript
    <script>
      import { fade, fly } from 'svelte/transition';
      let visible = $state(true);
    </script>
    <label><input type="checkbox" bind:checked={visible}> Visible</label>
    {#if visible}
      <p transition:fade={{ duration: 300 }}>Fades in and out.</p>
      <p in:fly={{ y: 50, duration: 500 }} out:fly={{ x: -50, duration: 200}}>Flies in and out.</p>
    {/if}
    ```

## Special Elements (`<svelte:...>`)
- **Definition:**
    - A suite of Svelte-specific HTML-like elements that provide mechanisms to interact with the document head, window, body, or to enable advanced component features and compiler options.
- **Purpose:**
    - To offer controlled access to global browser features or Svelte's compilation and runtime capabilities from within the component structure.
- **Explanation:**
    - These elements bridge the gap between component-scoped logic and broader document/browser interactions or Svelte-specific configurations.
    - **`<svelte:head>`:**
        - Allows injecting elements (e.g., `<title>`, `<meta>`, `<link>`, `<style>`) directly into the `<head>` of the HTML document. Particularly useful for SEO, setting page titles, and including page-specific stylesheets or scripts.
    - **`<svelte:body>`:**
        - Enables attaching event listeners directly to the `document.body` element.
    - **`<svelte:document>`:**
        - Enables attaching event listeners directly to the global `document` object.
    - **`<svelte:window>`:**
        - Allows binding to reactive properties of the global `window` object (e.g., `bind:innerWidth={width}`) or attaching event listeners to `window` events (e.g., `on:scroll={handleScroll}`, `on:resize={handleResize}`).
    - **`<svelte:component this={componentConstructorOrPromise} {...props} />`:**
        - Dynamically renders a Svelte component. The `this` attribute accepts a component constructor, a variable holding one, or even a Promise that resolves to one.
    - **`<svelte:element this={htmlTagNameString} {...attributes} />` (Svelte 5+):**
        - Dynamically renders a standard HTML element where the tag name itself is determined by the value of the `htmlTagNameString` variable.
    - **`<svelte:options optionName={value} />`:**
        - Specifies compiler options on a per-component basis, influencing how the Svelte compiler processes the file.
            - `tag="my-custom-tag"`: (Svelte 3/4) Compiles the component as a Web Component (Custom Element) with the specified tag name.
            - `customElement={{ tag: "my-ce", props: { ... }, shadow: 'open' | 'none' }}`: (Svelte 4+) Provides more detailed configuration for Custom Element compilation, including prop definitions, attribute reflection, and Shadow DOM mode.
            - `accessors=true`: (Svelte 3/4 Legacy) Makes the component's props programmatically accessible as getters and setters on the component instance. This is less idiomatic with Svelte 5's rune-based prop handling.
            - `immutable=true`: (Svelte 3/4 Legacy) Provided a hint to the Svelte compiler that props passed to this component would not be mutated internally, potentially enabling certain optimizations.
- **Example (`<svelte:head>`):**
    ```javascript
    <svelte:head>
      <title>My Dynamic Page Title</title>
      <meta name="description" content="This page is awesome.">
    </svelte:head>
    ```
- **Example (`<svelte:window>`):**
    ```javascript
    <script>
      let y = $state(0);
      function handleScroll() { console.log('Scrolled to:', y); }
    </script>
    <svelte:window bind:scrollY={y} on:scroll={handleScroll} />
    <p style="position: fixed; top: 10px;">Scroll Y: {y}px</p>
    ```
- **Example (`<svelte:component>`):**
    ```javascript
    <script>
      import MyButton from './MyButton.svelte';
      import MyLink from './MyLink.svelte';
      let dynamicComponent = $state(MyButton);
    </script>
    <svelte:component this={dynamicComponent} label="Dynamic Content" />
    <button on:click={() => dynamicComponent = (dynamicComponent === MyButton ? MyLink : MyButton)}>
      Toggle Component
    </button>
    ```

## Legacy Concepts (Primarily Svelte 3/4, some relevance for migration)

### Slot
- **Definition:**
    - Placeholders within a component's template that allow a parent component to inject arbitrary HTML markup and Svelte components.
- **Purpose:**
    - To enable content projection, allowing components to be more flexible and reusable by defining areas where parent components can supply custom content.
- **Explanation:**
    - Slots were the primary mechanism for passing content from parent to child in Svelte 3/4. In Svelte 5, "Snippets" provide a more powerful and often preferred alternative for structured content projection, though slots remain for backward compatibility and simpler use cases.
    - **Default Slot:**
        - Defined using `<slot />`. It captures any content passed directly between the opening and closing tags of the child component when instantiated by a parent.
    - **Named Slots:**
        - Defined using `<slot name="specificName" />`. This allows a component to have multiple, distinct areas for content injection. The parent component targets a named slot by using the `slot="specificName"` attribute on the content it wishes to inject.
    - **Scoped Slots / `let:` directive:**
        - Example: `<slot childData={internalValue} let:childData={parentAlias}>...</slot>`.
        - This powerful feature allows the child component (where the slot is defined) to pass data back to the parent component within the scope of the slotted content. The parent can then use this data to customize the rendering of the injected content.
- **Example:**
    ```javascript
    <!-- Card.svelte -->
    <div class="card">
      <div class="title"><slot name="title">Default Title</slot></div>
      <div class="content"><slot>Default content...</slot></div>
    </div>
    <style>.card { border: 1px solid #ccc; margin: 10px; } .title { font-weight: bold; }</style>
    ```
    ```javascript
    <!-- App.svelte -->
    <script> import Card from './Card.svelte'; </script>
    <Card>
      <span slot="title">My Card Title</span>
      <p>This is the main content of the card.</p>
    </Card>
    ```

## Styling

### Scoped Styles
- **Definition:**
    - CSS rules declared within a component's `<style>` tag are, by default, confined to affecting only the elements within that specific component.
- **Purpose:**
    - To prevent unintended style collisions between different components and to ensure that component styles are modular and self-contained.
- **Explanation:**
    - Svelte achieves style scoping at compile time by adding a unique class attribute (e.g., `s-UNIQUEHASH`) to the elements within a component and then rewriting the CSS selectors to target these unique classes (e.g., `p` becomes `p.s-UNIQUEHASH`). This effectively encapsulates styles without relying on Shadow DOM by default.
- **Example:**
    ```javascript
    <!-- MyComponent.svelte -->
    <p>This paragraph is styled by MyComponent.</p>
    <style>
      p { color: blue; /* This style only applies to <p> in MyComponent */ }
    </style>
    ```
    ```html
    <!-- Output (conceptual, hash varies): -->
    <!-- <p class="s-UVWXYZ123">This paragraph is styled by MyComponent.</p> -->
    <!-- <style> p.s-UVWXYZ123 { color: blue; } </style> -->
    ```

### `:global()`
- **Definition:**
    - A pseudo-selector function used within a component's `<style>` block to explicitly apply styles to elements outside the component's local scope or to target global CSS selectors.
- **Purpose:**
    - To allow components to style global elements (like `body` or `html`), elements rendered by third-party libraries, or to define genuinely global utility classes when necessary.
- **Explanation:**
    - When styles need to break out of the default scoping, `:global()` provides the escape hatch.
        - Example for a global tag: `<style> :global(body) { margin: 0; font-family: 'Inter', sans-serif; } </style>`
        - Example for a global class within a component's context: `<style> .my-component :global(.some-external-library-class) { border: 1px solid red; } </style>`
- **Example:**
    ```javascript
    <div class="container">Applies global styles to body.</div>
    <style>
      /* Affects <body> tag globally */
      :global(body) {
        background-color: #f0f0f0;
        font-family: sans-serif;
      }
      /* Affects .external-button class globally if it's inside .container */
      .container :global(.external-button) {
        padding: 1em;
      }
    </style>
    ```

### Custom Properties (CSS Variables)
- **Definition:**
    - CSS variables (formally known as "custom properties") that can be defined by a parent component (or globally) and then consumed by a child component's styles, or used within a component itself to create dynamic and themable designs.
- **Purpose:**
    - To provide a standardized method for components to expose styling "hooks" or for applications to implement design systems, theming, and dynamic style adjustments without direct JavaScript manipulation of styles.
- **Explanation:**
    - CSS Custom Properties allow for a reactive way to cascade style values.
    - Parent passing a variable: `<ChildComponent style="--highlight-color: purple; --base-font-size: 18px;" />`
    - Child consuming a variable with a fallback: `div { color: var(--highlight-color, steelblue); font-size: var(--base-font-size, 16px); }`
- **Example:**
    ```javascript
    <!-- ThemeableButton.svelte -->
    <button>Click Me</button>
    <style>
      button {
        background-color: var(--button-bg-color, blue); /* Fallback to blue */
        color: var(--button-text-color, white); /* Fallback to white */
        padding: 0.5em 1em;
        border: none;
      }
    </style>
    ```
    ```javascript
    <!-- App.svelte -->
    <script> import ThemeableButton from './ThemeableButton.svelte'; </script>
    <div style="--button-bg-color: green; --button-text-color: lightyellow;">
      <ThemeableButton /> <!-- This button will be green with light yellow text -->
    </div>
    <ThemeableButton /> <!-- This button uses default blue/white -->
    ```

## Compilation & Build

### Svelte Compiler
- **Definition:**
    - The core Svelte software that processes `.svelte` component files during the build phase, transforming them into highly optimized, imperative vanilla JavaScript code that directly manipulates the DOM.
- **Purpose:**
    - To shift the framework's workload from the browser (runtime) to the build step, resulting in smaller application bundle sizes and typically faster runtime performance.
- **Explanation:**
    - Svelte's philosophy is that of a "disappearing framework." Instead of shipping a large runtime library that interprets component definitions in the browser, the Svelte compiler analyzes the component structure, reactivity, and logic, then generates efficient JavaScript to manage the DOM updates. This approach minimizes the client-side footprint.
- **Example:**
    <p>The Svelte compiler takes declarative `.svelte` files and outputs efficient JavaScript. (Conceptual example - no direct code snippet for the compiler itself as it's a build tool.)</p>
    <p>Input `.svelte` file:</p>
    ```javascript
    <script> let name = $state("World"); </script>
    <h1>Hello {name}!</h1>
    ```
    <p>Leads to optimized JS that updates the h1 when `name` changes.</p>

### Preprocessing
- **Definition:**
    - An extensible build step that allows arbitrary code transformations to be applied to the content of `.svelte` files (within `<script>`, `<style>`, or markup sections) before the Svelte compiler processes them.
- **Purpose:**
    - To enable the use of other languages or tools within Svelte components, such as TypeScript for scripts, or SCSS/Less/PostCSS for styles, and to perform other custom transformations like Markdown processing or internationalization.
- **Explanation:**
    - Preprocessors (commonly configured via tools like `svelte-preprocess`) act as a pipeline. For instance, TypeScript code in a `<script lang="ts">` tag would be compiled to JavaScript, and SCSS in `<style lang="scss">` would be compiled to CSS, before Svelte's own compilation takes place.
- **Example:**
    ```javascript
    <!-- MyComponent.svelte -->
    <script lang="ts">
      let message: string = "Hello from TypeScript in Svelte!";
    </script>
    <p>{message}</p>
    <style lang="scss">
      $primary-color: #333;
      p {
        color: $primary-color;
        &:hover { color: lighten($primary-color, 20%); }
      }
    </style>
    ```
    <p>(Requires `svelte-preprocess` or similar configured in `svelte.config.js`)</p>

## Other

### Custom Element
- **Definition:**
    - A Svelte component that has been compiled to conform to the standard Web Components API, allowing it to be used as a native HTML element in any web page or JavaScript framework that supports Web Components.
- **Purpose:**
    - To enhance interoperability and reusability of Svelte components in diverse technology stacks or for creating shareable UI widgets.
- **Explanation:**
    - Svelte components can be packaged as custom elements through compiler options, typically specified using `<svelte:options customElement={{ tag: 'my-custom-widget', ... }} />`. This allows them to be consumed like any other HTML tag (e.g., `<my-custom-widget prop1="value"></my-custom-widget>`), complete with their own encapsulated logic and styling (often using Shadow DOM).
- **Example:**
    ```javascript
    <!-- MyCounter.svelte -->
    <svelte:options customElement={{ tag: 'my-counter' }} />
    <script>
      export let start = 0; // Prop exposed to the custom element
      let count = $state(start);
    </script>
    <button on:click={() => count++}>Count: {count}</button>
    ```
    <p>Usage in HTML: <code>&lt;my-counter start="5"&gt;&lt;/my-counter&gt;</code> (after script inclusion)</p>

### Accessibility (A11y)
- **Definition:**
    - The design and development practice of ensuring that web applications and websites are usable by people with a wide range of disabilities, including visual, auditory, motor, and cognitive impairments.
- **Purpose:**
    - To create inclusive digital experiences that can be accessed and operated by everyone, regardless of their abilities or the assistive technologies they may use.
- **Explanation:**
    - Svelte actively promotes accessibility by incorporating compile-time checks and warnings for common A11y issues. These checks can flag problems such as missing `alt` attributes on images, incorrect ARIA attribute usage, lack of keyboard navigability, or insufficient color contrast. This built-in feedback encourages developers to consider accessibility from the outset.
- **Example:**
    ```javascript
    <!-- Svelte provides warnings for A11y issues during development -->
    <!-- Good practice examples: -->
    <img src="image.png" alt="Descriptive text for screen readers" />
    <button
      aria-label="Close notification"
      on:click={() => console.log('Closed!')}
    >X</button>
    <input type="text" aria-label="Search term" placeholder="Search..." />
    ```

---

_This list provides an overview of common Svelte terms and concepts. For in-depth understanding, refer to the official Svelte documentation and tutorials._

---

[terms index](./index.md) | [back to top](#toc) | [svelte official docs](https://svelte.dev/docs)
- [express terms](./express.md)   |
- [sockets terms](./sockets.md)   |

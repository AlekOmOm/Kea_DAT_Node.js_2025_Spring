[back](index.md)


# Express.js Terms

## toc
- [Express.js Terms](#expressjs-terms)
  - [toc](#toc)
  - [Core Concepts](#core-concepts)
    - [Application (app)](#application-app)
    - [Middleware](#middleware)
    - [Routing](#routing)
    - [Request Object (req)](#request-object-req)
    - [Response Object (res)](#response-object-res)
  - [Advanced Concepts](#advanced-concepts)
    - [Router](#router)
    - [Error Handling](#error-handling)
    - [Template Engines](#template-engines)

## Core Concepts

### Application (app)
- **Definition:**
    - The main object in an Express.js application, conventionally named `app`.
        - Created by calling the top-level `express()` function.
        - Represents the Express application instance.
- **Purpose:**
    - To configure routing, middleware, template engines, and other application-level settings.
    - To start the server and listen for incoming HTTP requests.
- **Explanation:**
    - The `app` object has methods for:
        - Routing HTTP requests (e.g., `app.get()`, `app.post()`).
        - Configuring middleware (e.g., `app.use()`).
        - Setting application variables (e.g., `app.set()`).
        - Registering a template engine.
    - It is the central piece that orchestrates the handling of requests and responses.
- **Example:**
    ```javascript
    import express from 'express';
    const app = express(); // Create an Express application

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
    ```

### Middleware
- **Definition:**
    - Functions that have access to the request object (`req`), the response object (`res`), and the `next` middleware function in the application's request-response cycle.
- **Purpose:**
    - To execute code that can modify request and response objects.
    - To end the request-response cycle.
    - To call the next middleware function in the stack.
    - Used for tasks like logging, parsing request bodies, authentication, error handling, serving static files, etc.
- **Explanation:**
    - Middleware functions can be applied at the application level (`app.use()`, `app.METHOD()`) or at the router level (`router.use()`, `router.METHOD()`).
    - The order of middleware loading is important as they are executed sequentially.
    - If a middleware function does not end the request-response cycle, it must call `next()` to pass control to the next middleware function. Otherwise, the request will be left hanging.
    - Types of middleware:
        - Application-level middleware
        - Router-level middleware
        - Error-handling middleware (special signature: `(err, req, res, next)`)
        - Built-in middleware (e.g., `express.static`, `express.json`, `express.urlencoded`)
        - Third-party middleware (e.g., `morgan`, `cors`, `helmet`)
- **Example:**
    ```javascript
    import express from 'express';
    const app = express();

    // Simple logger middleware
    const requestLogger = (req, res, next) => {
      console.log(`${req.method} ${req.url}`);
      next(); // Pass control to the next middleware
    };

    app.use(requestLogger); // Apply logger to all requests

    app.get('/', (req, res) => {
      res.send('Homepage');
    });

    app.listen(3000);
    ```

### Routing
- **Definition:**
    - Refers to how an application's endpoints (URIs) respond to client requests. It defines how the application handles requests to specific paths and HTTP methods.
- **Purpose:**
    - To map incoming client requests (specified by a URL and HTTP method) to specific handler functions that will process the request and generate a response.
- **Explanation:**
    - Routing is defined using methods on the `app` object (or `router` object) that correspond to HTTP methods (e.g., `app.get()`, `app.post()`, `app.put()`, `app.delete()`).
    - Each route can have one or more handler functions that are executed when the route is matched.
    - Route paths can be strings or regular expressions.
    - Route parameters (e.g., `/users/:userId`) allow capturing values from the URL path.
    - Query strings are also available via `req.query`.
- **Example:**
    ```javascript
    import express from 'express';
    const app = express();

    // GET request to the root URL (/)
    app.get('/', (req, res) => {
      res.send('Hello from GET /');
    });

    // POST request to /submit-data
    app.post('/submit-data', (req, res) => {
      res.send('Data submitted via POST');
    });

    // Route with a parameter
    app.get('/users/:userId/books/:bookId', (req, res) => {
      res.send(req.params); // { "userId": "...", "bookId": "..." }
    });

    app.listen(3000);
    ```

### Request Object (req)
- **Definition:**
    - An object that represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
        - Conventionally named `req` (or `request`).
- **Purpose:**
    - To provide access to all information sent by the client in an HTTP request.
    - To allow middleware and route handlers to inspect and use this information to process the request.
- **Explanation:**
    - Express enhances the native Node.js HTTP request object by adding helpful properties and methods.
    - Common properties:
        - `req.params`: An object containing properties mapped to the named route "parameters". For example, if you have the route `/user/:name`, then the "name" property is available as `req.params.name`.
        - `req.query`: An object containing a property for each query string parameter in the route.
        - `req.body`: An object containing the parsed request body. Requires body-parsing middleware like `express.json()` or `express.urlencoded()`.
        - `req.headers`: An object containing the HTTP headers of the request.
        - `req.method`: Contains a string corresponding to the HTTP method of the request: GET, POST, PUT, DELETE, etc.
        - `req.url`: Contains the path part of the request URL.
        - `req.path`: Contains the path part of the request URL (similar to `req.url` but without query string).
        - `req.get(headerName)`: A method to get the value of a specific HTTP request header.
- **Example:**
    ```javascript
    import express from 'express'; // Assuming express is needed for express.json()
    const app = express(); // Assuming app is defined elsewhere or this is part of a larger example

    app.post('/data/:id', express.json(), (req, res) => {
      const id = req.params.id;
      const queryParam = req.query.sort;
      const requestBody = req.body;
      const contentType = req.get('Content-Type');
      
      console.log('ID:', id);
      console.log('Sort Query:', queryParam);
      console.log('Body:', requestBody);
      console.log('Content-Type:', contentType);
      
      res.send('Request data logged');
    });
    ```

### Response Object (res)
- **Definition:**
    - An object that represents the HTTP response that an Express app sends when it gets an HTTP request.
        - Conventionally named `res` (or `response`).
- **Purpose:**
    - To allow middleware and route handlers to construct and send an HTTP response back to the client.
- **Explanation:**
    - Express enhances the native Node.js HTTP response object by adding helpful properties and methods for sending various types of responses.
    - Common methods:
        - `res.send([body])`: Sends the HTTP response. The body parameter can be a Buffer object, a String, an object, Boolean, or an Array.
        - `res.json([body])`: Sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using `JSON.stringify()`.
        - `res.status(code)`: Sets the HTTP status for the response.
        - `res.sendStatus(statusCode)`: Sets the response HTTP status code and sends its string representation as the response body.
        - `res.render(view [, locals] [, callback])`: Renders a view template and sends the rendered HTML string to the client. Requires a template engine to be configured.
        - `res.redirect([status,] path)`: Redirects to the specified path with an optional status code (default is 302 "Found").
        - `res.set(field [, value])`: Sets the response's HTTP header `field` to `value`.
        - `res.cookie(name, value [, options])`: Sets cookie `name` to `value`.
        - `res.sendFile(path [, options] [, fn])`: Transfers the file at the given path.
        - `res.download(path [, filename] [, options] [, fn])`: Prompts a file to be downloaded.
- **Example:**
    ```javascript
    // Assuming app is defined elsewhere or this is part of a larger Express app setup
    // import express from 'express';
    // const app = express();

    app.get('/user/:id', (req, res) => {
      const userId = req.params.id;
      if (userId === '1') {
        res.json({ id: userId, name: 'Alice' });
      } else if (userId === '2') {
        res.status(404).send('User not found');
      } else {
        res.redirect('/');
      }
    });
    ```

## Advanced Concepts

### Router
- **Definition:**
    - A mini Express application, isolated instance of middleware and routes.
        - Obtained by calling `express.Router()`.
- **Purpose:**
    - To group route handlers for a particular part of a site and to keep related routes together, making the application more organized and modular.
    - To apply specific middleware to a subset of routes.
- **Explanation:**
    - A `Router` object is like a "mini-app" capable only of performing middleware and routing functions.
    - It can have its own `use()`, `get()`, `post()`, etc. methods.
    - Routers can be mounted at a specific path in the main application using `app.use('/path', routerInstance)`.
    - This allows for breaking down a complex application into smaller, manageable pieces.
- **Example:**
    ```javascript
    import express from 'express';
    const app = express();
    const userRouter = express.Router(); // Create a new router

    // Middleware specific to this router
    userRouter.use((req, res, next) => {
      console.log('Time:', Date.now(), ' (User Router)');
      next();
    });

    userRouter.get('/', (req, res) => {
      res.send('User homepage');
    });

    userRouter.get('/:id', (req, res) => {
      res.send(`Profile of user ${req.params.id}`);
    });

    // Mount the router on the /users path
    app.use('/users', userRouter);

    app.listen(3000);
    ```

### Error Handling
- **Definition:**
    - Middleware specifically designed to catch and process errors that occur during the request-response cycle.
- **Purpose:**
    - To provide a centralized way to manage errors, log them, and send appropriate error responses to the client.
- **Explanation:**
    - Error-handling middleware functions are defined in the same way as other middleware functions, but with an arity of four, specifically `(err, req, res, next)`.
    - They must be defined *last*, after all `app.use()` and routes calls.
    - If you pass an error to `next()` (e.g., `next(new Error('Something broke!'))`), Express skips all remaining non-error-handling middleware and route handlers and executes the first error-handling middleware.
    - Express has a built-in default error handler if no custom error-handling middleware is defined.
- **Example:**
    ```javascript
    import express from 'express';
    const app = express();

    app.get('/error', (req, res, next) => {
      // Simulate an error
      const err = new Error('This is a simulated error!');
      err.status = 500;
      next(err); // Pass error to error handler
    });
    
    // Custom error-handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack); // Log the error stack
      res.status(err.status || 500).send({
        error: {
          message: err.message || 'Something went wrong!',
        }
      });
    });

    app.listen(3000);
    ```

### Template Engines
- **Definition:**
    - Software that enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client.
- **Purpose:**
    - To dynamically generate HTML content on the server-side, making it easier to create complex web pages by separating presentation (HTML structure) from application logic.
- **Explanation:**
    - Express can integrate with various template engines like Pug (formerly Jade), EJS, Handlebars, Nunjucks, etc.
    - To use a template engine:
        1. Install the template engine's npm package (e.g., `npm install pug`).
        2. Set the `view engine` application setting: `app.set('view engine', 'pug');`.
        3. Specify the directory where the template files are located (default is `views` in the application root): `app.set('views', './my-views-folder');`.
        4. Use `res.render('templateName', { dataObject })` in a route handler to render a template and send it as the response. `templateName` is the name of the template file without the extension.
- **Example (using Pug):**
    ```javascript
    // server.js
    import express from 'express';
    const app = express();

    app.set('view engine', 'pug'); // Set Pug as the template engine
    app.set('views', './views');   // Specify the views directory

    app.get('/', (req, res) => {
      res.render('index', { title: 'Hey', message: 'Hello there!' });
    });

    app.listen(3000);
    ```
    ```pug
    // views/index.pug
    doctype html
    html
      head
        title= title
      body
        h1= message
    ```

---

_This list provides an overview of common Express.js terms and concepts. For in-depth understanding, refer to the official Express.js documentation._

---

[terms index](./index.md) | [back to top](#toc) | [express.js official docs](https://expressjs.com/)
- [svelte terms](./svelte.md)   |
- [sockets terms](./sockets.md)   | 
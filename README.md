# NodeSeedProject

Start Node.js, Express, Socket.IO development faster with extras!

<h2>Installation</h2>

<p><b>1.</b> Install Nodemon: <code>npm install nodemon -g</code></p>
<p><b>2.</b> Install Grunt: <code>npm install -g grunt-cli</code></p>
<p><b>3.</b> Install Node modules: <code>sudo npm install</code></p>

<h2>Usage</h2>

<p><b>1.</b> Start Nodemon: <code>nodemon app.js</code></p>
<p><b>2.</b> Start Grunt: <code>grunt watch</code></p>
<p><b>3.</b> Go to <code>localhost:3000</code> in browser</p>

<h2>Launcher script</h2>

<p>Script to start the Server, the Grunt Watch task, the Sublime Text<br/>editor and open the application in the default browser.</p>
<p>There are two versions of it: <a href="https://gist.github.com/tamasszoke/0293f7bff15e253dce15e84c259df8ff" target="_new">Linux</a>,
 <a href="https://gist.github.com/tamasszoke/a7ce53a6bc0cace4cb198d78ff2b4fbe" target="_new">Windows</a>.</p>

<h2>Map</h2>

- Server side -> /app_modules
- Client side -> /static and /views
<br/>
<p>Configuration -> /app_modules/config.js</p>
<p>Server -> /app.js</p>
<p>Routing -> /app_modules/index.js</p>
<p>Socket.IO -> /app_modules/socket.js</p>

<h2>Tips</h2>

<p>Create/modify JS in /static/js/dev, Grunt will create .min.js to /static/js</p>
<p>Create/modify CSS in /static/css/dev, Grunt will create .min.css to /static/css</p>

<h2>Modules (default versions)</h2>

- Express (4.15.2)
  - Body Parser (1.17.1)
  - Cookie Parser (1.4.3)
  - Express Session (1.15.2)
- EJS (2.5.6)
- MongoJS (2.4.0)
- Socket.IO (1.7.4)
- Passport (0.3.2)
  - Passport Facebook (2.1.1)
  - Passport Twitter (1.0.4)
  - Passport Google-oauth (1.0.0)
- Nodemailer (1.11.0)
  - Nodemailer SMTP Transport (2.7.4)
- Async (2.4.0)
- Grunt (0.4.5)
  - Grunt Contrib JSHint (1.1.0)
  - Grunt Contrib UglifyJS (2.3.0)
  - Grunt Contrib SASS (1.0.0)
  - Grunt Contrib Watch (0.6.1)
  - Grunt Notify (0.4.5)
- Request (2.81.0)
- Path (0.12.7)

<h2>Built-in extras (optional)</h2>

- JQuery (3.2.1)
- AngularJS (1.6.4)
- Bootstrap (3.3.7)
- Font awesome (4.7)
- Animate CSS (3.5.2)
- Prepared for <code>HTTPS</code>
- Custom logging function

<h2>License</h2>

<b>The MIT License (MIT)</b><br/>
Copyright (c) 2017 Tamas Szoke

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

https://opensource.org/licenses/MIT

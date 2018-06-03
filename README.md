# NodeSeedProject

Start Node.js, Express, Socket.IO development faster with extras!

## Installation

1. Install Nodemon: <code>npm install nodemon -g</code>
2. Install Grunt: <code>npm install -g grunt-cli</code>
3. Install Node modules: <code>npm install</code>

## Usage

1. Start Nodemon: <code>nodemon server</code>
2. Start Grunt: <code>grunt watch</code>
3. Go to <code>localhost:3000</code> in browser
4. Test: <code>npm test</code>

Note: don't forget to start mongoDB.

## Launcher script

<p>Script to start the Server, the Grunt Watch task, the Sublime Text<br/>editor and open the application in the default browser.</p>
<p>There are two versions of it: <a href="https://gist.github.com/tamasszoke/0293f7bff15e253dce15e84c259df8ff" target="_new">Linux</a>,
 <a href="https://gist.github.com/tamasszoke/a7ce53a6bc0cace4cb198d78ff2b4fbe" target="_new">Windows</a>.</p>

## Basics

Server side: `/controllers` and `/models`<br/>
Client side: `/views` and `/static`<br/>
Tests: `/test`

Server: `/app.js`<br/>
Configuration: `/configuration/config.js`<br/>
Routing: `/controllers/routing.js`<br/>
Socket.IO: `/controllers/socket.js`<br/>

HTML (.EJS) components at `/views/components` and pages at `/views/pages`.

Create/modify JS files in `/static/js/dev`, Grunt will create `.min.js` to `/static/js`.<br/>
Create/modify SCSS files in `/static/css/dev`, Grunt will create `.min.css` to `/static/css`.

## Modules (default versions)

- Express (4.15.2)
  - Body Parser (1.17.1)
  - Cookie Parser (1.4.3)
  - Express Session (1.15.2)
- Helmet (3.12.1)
- EJS (2.5.6)
- Mongoose (5.1.3)
- Socket.IO (2.1.1)
- Passport (0.4.0)
  - Passport Facebook (2.1.1)
  - Passport Twitter (1.0.4)
  - Passport Google-oauth (1.0.0)
- Mocha (5.2.0)
- Chai (4.1.2)
- Nodemailer (4.6.5)
  - Nodemailer SMTP Transport (2.7.4)
- Grunt (1.0.2)
  - Grunt Contrib JSHint (1.1.0)
  - Grunt Contrib UglifyJS (2.3.0)
  - Grunt Contrib SASS (1.0.0)
  - Grunt Contrib Watch (1.1.0)
  - Grunt Notify (0.4.5)
- Request (2.81.0)
- Path (0.12.7)
- Winston (3.0.0-rc6)

## Built-in extras (optional)

- JQuery (3.2.1)
- AngularJS (1.6.4)
- Bootstrap (3.3.7)
- Font awesome (4.7)
- Animate CSS (3.5.2)<br/><br/>
- Prepared for <code>HTTPS</code>
- Custom logging function

## License

<b>The MIT License (MIT)</b><br/>
Copyright (c) 2017 Tamas Szoke

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

https://opensource.org/licenses/MIT

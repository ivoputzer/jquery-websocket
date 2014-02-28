# $.websocket

Allows you to send and receive json objects directly through the websocket's api. `$.websocket` will throw an exception if the browser doesn't has support for this implementation.

# Example

```javascript
// basic websocket initialisation
   try {
        var ws = $.websocket('ws://0.0.0.0:8080')
   } catch (err) {
       console.error(err) // websockets are not supported
   }

// advanced websocket initialisation
    var ws = $.websocket('ws://0.0.0.0:8080', {
        open: function() {},    // when the socket opens
        error: function() {},   // generic error event
        close: function() {},   // when the socket closes
        message: function() {}, // generic message event
        events: function() {
            'message': function () {}, // specific message event
            'welcome': function () {}  // specific message event
        },
        protocols : ['json', 'xmpp', 'wamp'], // optional websocket protocols to use
        info: {} // this object gets appended automatically using .send()
    })

// type only
  ws.send('login')  // json => {"type": "login"}

// type and json object
  ws.send('message', {name:'user', text:'lorem ipsum'}) // json => {"type":"message", "data":{"name": "user", "text":"lorem ipsum"}}
```

### .state –> int
```javascript
ws.state
```

### .data(string) –> void
Transmits data to the server over the WebSocket connection.
```javascript
ws.data('lorem ipsum')
```

### .json(object) –> void
Transmits json-data to the server over the WebSocket connection.
```javascript
ws.json(object)
```

### .send(type[,object]) –> void
Transmits structured json-data to the server over the WebSocket connection.
```javascript
ws.send(type[,object])
```

### .is(status) –> bool
Matches the readystate for a given string.
```javascript
ws.is('open')
```

### .exit([code]) –> void
Closes the connection to the WebSocket server.
```javascript
ws.exit()
```

# Browser support
- Chrome **+16**
- Firefox **+11**
- Internet Explorer **+10**
- Opera **+12**
- Safari **+6**

---

## The MIT License (MIT)

**Copyright © 2014 Ivo von Putzer Reibegg**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
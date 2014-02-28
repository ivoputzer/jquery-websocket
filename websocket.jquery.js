/* MIT License ~ Copyright © 2014 Ivo von Putzer Reibegg */

(function($) {

  $.websocket = function(url, o) {

    if (!$.isFunction(WebSocket)) throw 'websockets is not supported in this browser'

    var option = $.extend({ open: $.noop, close: $.noop, error: $.noop, message: $.noop, protocols: [], events: {}, info: {}}, o)
      , socket = WebSocket ? new WebSocket(url, option.protocols) : { send: function() { return false }, close: $.noop }

    $(window).unload(function() { socket.exit(1001) })

    $(socket).bind({
      open: option.open,
      close: option.close,
      error: option.error,
      message: function (e) {
        if ($.isFunction(option.message)) h.call(this, e)
        try {
          var m = $.parseJSON(e.originalEvent.data)
          if (m.type in option.events) h.call(this, m)
        } catch (err) {
          socket.trigger('error', err)
        }
      }
    })

    socket.data = socket.send

    socket.json = function(data) {
      try {
        var json = JSON.stringify(data)
        return socket.data(json)
      } catch (err) {
        socket.trigger('error', err)
      }
    }

    socket.send = function(type, data) {
      var data = $.extend({type: type, data: data}, option.info)
      return socket.json(data)
    }

    socket.exit = function(code) {
      socket.close(code || 1000)
      socket = null
    }

    socket.is = function(status) {
      return socket.readyState === parseInt($.map(['connecting|opening', 'open|opened', 'disconnecting|closing', 'close|closed'], function(regexp, i) {
        if (new RegExp(regexp, 'ig').test(status)) return i
      }), 10)
    }

    return socket

  }

})(jQuery)
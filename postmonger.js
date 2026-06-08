(function() {
    var Postmonger = window.Postmonger = window.Postmonger || {};
    Postmonger.Session = function() {
        var self = this;
        var callbacks = {};
        self.on = function(event, callback) {
            if (!callbacks[event]) callbacks[event] = [];
            callbacks[event].push(callback);
            return self;
        };
        self.trigger = function(event, data) {
            window.parent.postMessage(
                JSON.stringify({ eventName: event, value: data }), '*'
            );
            return self;
        };
        window.addEventListener('message', function(e) {
            var data;
            try { data = JSON.parse(e.data); } catch(err) { return; }
            if (!data || !data.eventName) return;
            var cbs = callbacks[data.eventName];
            if (cbs) { cbs.forEach(function(cb) { cb(data.value); }); }
        });
    };
})();

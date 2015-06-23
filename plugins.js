function fetchPlugin(name, config) {
    var plugin = require('./plugins/' + name);
    if (typeof plugin.config == "function") {
        plugin.config(config);
    }

    return plugin;
}

var plugins = [];

exports.init = function(config_plugins) {
	if (typeof config_plugins == "object") {
        for (name in config_plugins) {
            if (typeof config_plugins[name] == "object") {
                var plugin = config_plugins[name];

                if (plugin.on === true) {
                    delete plugin.on;
                    plugins.push(fetchPlugin(name, plugin));
                }
            } else if (config_plugins[name]) {
                plugins.push(fetchPlugin(name, plugin));
            }
        }
    }

    return exports;
}

exports.onMessage = function(msg) {
	plugins.forEach(function(item) {
		if (typeof item.onMessage == "function") {
			item.onMessage(msg);
		}
	})
}

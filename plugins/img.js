// img plugin for Dobby

var unirest = require('unirest');

exports.onMessage = function(msg, dobby) {
    var terms = msg.split(" ");
    var command = terms.shift();
    terms = terms.join(" ");

    if (command == '.img') {
        unirest.get("http://ajax.googleapis.com/ajax/services/search/images")
            .query({safe: "off", v: "1.0", q: terms})
            .end(function(response) {
                if (response.status == 200) {
                    var body = JSON.parse(response.body);
                    if (body){
                        var first = body.responseData.results[0];
                        if (typeof first != "undefined") {
                            dobby.respond("[URL]" + first.unescapedUrl + "[/URL]");
                        } else {
                            dobby.respond("No results.");
                        }
                    } else {
                        dobby.respond("No response.");
                    }
                } else {
                    dobby.respond("Failed!");
                }
            })
    }
}



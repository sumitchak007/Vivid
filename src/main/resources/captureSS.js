var page = require('webpage').create(),
    system = require('system'),
    address, 
    output,
    browser,
    size;
var requestsArray = [];

page.onResourceRequested = function(requestData, networkRequest) {
  requestsArray.push(requestData.id);
};

page.onResourceReceived = function(response) {
  var index = requestsArray.indexOf(response.id);
  requestsArray.splice(index, 1);
};


if (system.args.length < 4 || system.args.length > 5) {
	console.log("Please provide all the required parameter.....")
    phantom.exit(1);
} else {
	address = system.args[1];
    output = system.args[2];
    browser = system.args[4];
    size = system.args[3].split('*');
    
    	if (size.length === 2) {
            pageWidth = parseInt(size[0], 10);
            pageHeight = parseInt(size[1], 10);
            page.viewportSize = { width: pageWidth, height: pageHeight };
        }
    	
    	if(browser==="mobile")
    		page.settings.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_2_1 like Mac OS X) AppleWebKit/602.4.6 (KHTML, like Gecko) Version/10.0 Mobile/14D27 Safari/602.1 [Vivid/v1.0]';
    	else if(browser==="tablet")
    		page.settings.userAgent = 'Mozilla/5.0 (iPad; CPU OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1 [Vivid/v1.0]';
    	else if(browser==="desktop")
    		page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.94 Safari/537.36 [Vivid/v1.0]';
 
    console.log("********************************************************")
    console.log("Parmeters length:"+system.args.length);
    console.log("URL:"+address);
    console.log("File location and name:"+output)
    console.log("Browser:"+browser)
    console.log("User agent:"+page.settings.userAgent)
    console.log("********************************************************")
   page.open(address, function (status) {
        if (status !== 'success') {
            console.log('Unable to load the address:'+address);
            phantom.exit();
        } else {
            window.setTimeout(function () {
                page.render(output);
                phantom.exit();
            }, 10000);
        }
    });
}
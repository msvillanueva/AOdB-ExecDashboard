var requestAscnc = true;;
var requestContentType = "application/x-www-form-urlencoded";
function PostForm(url, postData, postDataType, requestTimeout, postProcessor) {
    if (postDataType == 'json') {
        requestContentType = "application/json; charset=utf-8";
        postDataType = 'json';
    }
    else {
        postDataType = 'script';
    }
    // CHrome  does not work well with async request.. Fires error handler.
    // If IE chrome than async is set to false. 
    //if (jQuery.browser.safari) {
    //    //IE
    //    requestAscnc = false;
    //} else {
    //    requestAscnc = true;
    //}
    $.ajaxSetup({ cache: false });

    $.ajax({
        type: "POST",
        url: url,
        data: postData,
        datatype: postDataType,
        contentType: requestContentType,
        timeout: requestTimeout,
        async: requestAscnc,
        success: function (data) {
            if (data) {
                try {
                    data = JSON.parse(data);
                } catch (e) { }
            }

            if (postProcessor == null || postProcessor == undefined) {
                processResponse(data);
            } else {
                // use user supplied handler
                postProcessor(data);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // hide rotator in case of failure.
            return;

            //if (!jQuery.browser.safari) {
            //    // FOR IE
            //    return;
            //}
            //if (XMLHttpRequest.statusText == 'timeout' && jQuery.browser.safari) {
            //    // For chrome .. chrome has Jquery post bug, it fires error event.
            //    return;
            //}
        }
    });
}
function ExecuteGetRequest(url, getData, getDataType, requestTimeout, postProcessor) {
    if (getDataType == 'json') {
        getDataType = 'json';
    }
    else if (getDataType.toLowerCase() == 'jsonp') {
        getDataType = "jsonp";
    }
    else {
        getDataType = "html";
    }
    // CHrome  does not work well with async request.. Fires error handler.
    // If IE chrome than async is set to false. 
    //$('#initialrotator').show();
    $.ajaxSetup({ cache: false });
    $.ajax({
        type: "GET",
        url: url,
        data: getData,
        datatype: getDataType,
        timeout: requestTimeout,
        async: requestAscnc,
        success: function (data) {
            //$('#initialrotator').hide();
            if (data != null) {
                try {
                    data = JSON.parse(data);
                } catch (e) { }
            }
            if (postProcessor == null || postProcessor == undefined) {
                // Use default handler ..
                processResponse(data);
            } else {
                // use user supplied handler
                postProcessor(data);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // hide rotator in case of failure.
            //            if (!$.browser.safari) {
            //                // FOR IE
            //                $('#initialrotator').hide();
            //                return;
            //            }
            if (XMLHttpRequest.statusText == 'timeout') {
                // For chrome .. chrome has Jquery post bug, it fires error event.
                //$('#initialrotator').hide();
                return;
            }
        }
    });
}
function processResponse(data) {
    // A chrome bug does not allow in line redirect..so setting up a timer based redirection.
    var urlToFollow
    if (data.Success) {
        urlToFollow = data.NextActionUrl;
        // remove the last #
        if (urlToFollow.indexOf('#') == (urlToFollow.length - 1)) {
            urlToFollow = urlToFollow.replace('#', '')
        }
    }
    else {
        urlToFollow = "" //TODO error URL.
    }
    window.location = urlToFollow;
}
function DoNothing(response) {

}
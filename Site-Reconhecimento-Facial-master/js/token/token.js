var escopo = "fullfaceteste";
var json = "";
var apenasToken = "";


// function gerandoToken() {

jQuery(document).ready(function($) {
    $.ajax({
        url: urlToken,
        type: "POST",
        dataType: "xml/html/script/json", // expected format for response
        contentType: "application/x-www-formurlencoded", // send as JSON
        data: `grant_type=password&username=App&password=G@1fu11f4c3&scope=${escopo}`,

        complete: function(data) {
            json = JSON.parse(data.responseText);
            apenasToken = json.access_token;
        },

        success: function(data) {
            json = JSON.parse(data.responseText);
            apenasToken = json.access_token;
        },
        error: function(data) {
            json = JSON.parse(data.responseText);
            apenasToken = json.access_token;
        },
    });
});

// }

// gerandoToken();
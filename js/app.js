function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 1,
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
       }); 
       // execute the request
       request.execute(function(response) {
          var results = response.result;
          $("#results").html("");
          $.each(results.items, function(index, item) {
            $.get("tpl/item.html", function(data) {
                $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
            });
          });
          resetVideoHeight();
       });
    });
    
    $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init() {
    gapi.client.setApiKey("AIzaSyBrTnWsxJkc3FQVGAcjmx35dAeP6BjyrSs");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}

$(document).ready(function() {
    //Fade in delay for the background overlay (control timing here)
    $("#bkgOverlay").delay(800).fadeIn(1800);
    //Fade in delay for the popup (control timing here)
    $("#delayedPopup").delay(800).fadeIn(1800);
  
    //Hide dialouge and background when the user clicks the close button
    $("#btnClose").click(function(e) {
      HideDialog();
      e.preventDefault();
    });
  });
  //Controls how the modal popup is closed with the close button
  function HideDialog() {
    $("#bkgOverlay").fadeOut(400);
    $("#delayedPopup").fadeOut(300);
  } 
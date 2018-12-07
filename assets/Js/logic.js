$(document).ready(function () {

    var soccerTeamArray = ["Juventus", "Real Madrid", "Barcelona", "Manchester United", "Arsenal FC"];

    $(document).on("click", "button", function (event) {
        event.preventDefault();
        var soccer = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            soccer + "&api_key=FxEAQFSNuaQKBQ8mJ1PBkcBtUqL5p5US";

        $.ajax({
            url: queryURL,
            method: "get"
        }).then(function (response) {
            console.log(response);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var soccerTeamDiv = $("<div>").addClass("col-sm-3");
                var p = $("<p>");
                p.text(results[i].rating);
                var soccerTeamImage = $("<img>");
                soccerTeamImage.addClass("pause");
                soccerTeamImage.attr({
                    "src": results[i].images.fixed_height.url,
                    "data-still": results[i].images.fixed_height_still.url,
                    "data-animate": results[i].images.fixed_height.url,
                    "data-state": "animate"
                });
                soccerTeamDiv.prepend(p, soccerTeamImage);
                $("#gifs-appear-here").prepend(soccerTeamDiv);
            }

        });

    });


    function renderButtons() {

        $("#button-container").empty();

        for (var i = 0; i < soccerTeamArray.length; i++) {

            var a = $("<button>");
            a.addClass("movie-btn");
            a.attr("data-name", soccerTeamArray[i]);
            a.text(soccerTeamArray[i]);
            $("#button-container").append(a);
        }
    }


    $("#add-SoccerTeam").on("click", function (event) {
        event.preventDefault();
    
        var newTeam = $("#soccer-input").val().trim();

        if (newTeam != "") {
        soccerTeamArray.push(newTeam);
        console.log(soccerTeamArray);
        $("#soccer-input").val("");
        renderButtons();
        }
    });

    $(document).on("click", ".pause", function () {
        var still = $(this).attr("data-still");
        var animate = $(this).attr("data-animate");
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr({
                "src": animate,
                "data-state": "animate"
            })
        }
        if (state === "animate") {
            $(this).attr({
                "src": still,
                "data-state": "still"
            })
        }
    });

    renderButtons();






});

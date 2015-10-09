$(document).ready(function () {

    var grid = '#js-grid-selection',
        numberOfShips = '',
        sizeOfGrid = '';



    function init() {
        initial_setup();

    }

    init();

    function initial_setup() {


        $(".js-grid-btn").click(function () {

            $('#js-start-game').addClass('disabled');
            $("#js-ships-count").html('');

            var matrixSize = $(this).attr('id'),
                chosenSize = matrixSize.replace("size", ""),
                gridX = parseInt(chosenSize),
                MaxOfShips = gridX;



            $("#js-box-size").html(MaxOfShips + "x" + MaxOfShips); //display grid size

            sizeOfGrid = MaxOfShips;

            choose_settings();

            function choose_settings() {
                for (var i = 1; i < MaxOfShips; i++) {
                    $('#js-ships-list').find("li:nth-child(" + i + ")").addClass('active');
                }

                for (var c = MaxOfShips; c < 10; c++) {
                    $('#js-ships-list').find("li:nth-child(" + c + ")").removeClass('active');
                }
            }


        });



        $(".js-ships-count").click(function () {
            $('#js-start-game').removeClass('disabled');
            var shipsCount = $(this).attr('id'),
                chosenShips = shipsCount.replace("ships", ""),
                shipsInt = parseInt(chosenShips);

            $("#js-ships-count").html(shipsInt + " ships");  // display ships count

            numberOfShips = shipsInt;

        });

        $("#js-expand-menu").click(function () {

            $(this).css("opacity", "0");
            $('#js-grid-selection').removeClass('lift-up');

            $('#board-left').empty();
            $('#board-right').empty();
        });

        //create grid
        $("#js-start-game").click(function () {


            $('#js-grid-selection').addClass('lift-up');
            $("#js-expand-menu").css("opacity", "1");

            var Rows = sizeOfGrid;
            var Cols = sizeOfGrid;

            for (var i = 0; i < Rows; ++i) {

                var string_tr = '<tr>';
                $(string_tr).appendTo('#board-left');

                for (var j = 0; j < Cols; ++j) {

                    var string_td = '<td id="Lcell-' + i + j + '" onclick="ClickCell(this)">';
                    $(string_td).appendTo('#board-left');

                    var string_span = '<span></span>';
                    $(string_span).appendTo('#board-left');

                    var string_td_end = '</td>';
                    $(string_td_end).appendTo('#board-left');


                    var str2 = j;
                    var str1 = i;
                    var res = str1 + str2;
                    var a = parseInt(res)
                    console.log(a)


                }

                //    document.getElementById("board").writeln("</tr>") ;
                var string_tr_end = '</tr>';
                $(string_tr_end).appendTo('#board-left');
            }

            for (var iR = 0; iR < Rows; ++iR) {

                var string_trR = '<tr>';
                $(string_trR).appendTo('#board-right');

                for (var jR = 0; jR < Cols; ++jR) {

                    var string_tdR = '<td id="Rcell-' + iR  + jR + '" onclick="ClickCell(this)">';
                    $(string_tdR).appendTo('#board-right');

                    var string_spanR = '<span></span>';
                    $(string_spanR).appendTo('#board-right');

                    var string_td_endR = '</td>';
                    $(string_td_endR).appendTo('#board-right');
                }

                //    document.getElementById("board").writeln("</tr>") ;
                var string_tr_endR = '</tr>';
                $(string_tr_endR).appendTo('#board-right');
            }
            ships_layout();

        });
    }

    function ships_layout() {

        var gridXY = sizeOfGrid * sizeOfGrid;
        //  console.log(gridXY)
        //     console.log(numberOfShips)

        for (var i = 0; i < numberOfShips; ++i) {
            var x =  Math.floor((Math.random() * gridXY) + 0);
            $("#Lcell-"+ x ).css("background-color","red");
            // $( this ).css( "color", "red" );
            //    console.log(x)
        }

        $('#board-left').click(function() {
            var cellId = $(this).attr("id");
        })


    }


})
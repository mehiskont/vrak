$(document).ready(function () {


    var grid = '#js-grid-selection',
        numberOfShips = '',
        sizeOfGrid = '',
        state;

    var oppshipsLocation = [];
    var oppshipsLocationRight = [];
    var playershipsLocation = [];
    var playershipsLocationRight = [];

    var x = [];
    var y = [];
    var xFirst = [];
    var yFirst = [];


    var xOpp = [];
    var yOpp = [];
    var xFirstOpp = [];
    var yFirstOpp = [];

    var countBoat = 0;
    var countBoatOpp = 0;


    var player_moves = 0;
    var player_points = 0;
    var opponents_moves = 0;
    var opponents_points = 0;



    function init() {
        initial_setup();
        gameplay();
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
            $("h1 span").html(shipsInt);  // display initialships count

            numberOfShips = shipsInt;

            console.log('numberOfShips' + numberOfShips)

        });
//restart game
        $("#js-expand-menu").click(function () {

            $(this).css("opacity", "0");
            $('#js-grid-selection').removeClass('lift-up');



            $('#board-left').empty();
            $('#board-right').empty();
            $('h1').addClass('transparent');
        });
        //create grid
        $("#js-start-game").click(function () {

            countBoat = 0;
            x = [];
            y = [];
            xFirst = [];
            yFirst = [];

            countBoatOpp = 0;
            xOpp = [];
            yOpp = [];
            xFirstOpp = [];
            yFirstOpp = [];

            oppshipsLocation = [];
            oppshipsLocationRight = [];
            playershipsLocation = [];
            playershipsLocationRight = [];

            player_moves = 0;
            player_points = 0;

            opponents_moves = 0;
            opponents_points = 0;




            $('#js-grid-selection').addClass('lift-up');


            $('h1').removeClass('transparent');
            $("#js-expand-menu").css("opacity", "1");

            var Rows = sizeOfGrid;
            var Cols = sizeOfGrid;
            var CellNum = -1;
            var RowNum = -1;
            for (var i = 0; i < Rows; ++i) {

                var string_tr = '<tr>';

                $(string_tr).appendTo('#board-left');
                $(string_tr).appendTo('#board-right');
                RowNum += 1;

                for (var j = 0; j < Cols; ++j) {

                    CellNum += 1;
                    if (CellNum === sizeOfGrid) {
                        CellNum = 0;
                    }
                    var string_td = '<td class="square" id="Lcell-' + RowNum + CellNum + '">';
                    $(string_td).appendTo('#board-left');

                    var string_tdR = '<td class="square" id="Rcell-' + RowNum + CellNum + '">';
                    $(string_tdR).appendTo('#board-right');

                    var string_span = '<span></span>';
                    $(string_span).appendTo('#board-left');
                    $(string_span).appendTo('#board-right');

                    var string_td_end = '</td>';
                    $(string_td_end).appendTo('#board-left');
                    $(string_td_end).appendTo('#board-right');

                }

                //    document.getElementById("board").writeln("</tr>") ;
                var string_tr_end = '</tr>';
                $(string_tr_end).appendTo('#board-left');
                $(string_tr_end).appendTo('#board-right');
            }

            paiguta_uus_laev = function (sisend) {


                for (var row = 0; row < GRID_x + 1; row++) {

                    for (var col = 0; col < GRID_x + 1; col++) {


                        var curr = sisend[row][col];

                        var top1 = (row === 0) ? 0 : sisend[row - 1][col];
                        var top2 = (row === 0) ? 0 : sisend[row - 1][col + 1];

                        var bot1 = (row === GRID_x) ? 0 : sisend[row + 1][col];
                        var bot2 = (row === GRID_x) ? 0 : sisend[row + 1][col + 1];

                        var lef = (col === 0) ? 0 : sisend[row][col - 1];

                        var rig1 = (col === GRID_x) ? undefined : sisend[row][col + 1];
                        var rig2 = (col === GRID_x - 1) ? 0 : sisend[row][col + 2];


                        if (curr === 0 && top1 === 0 && top2 === 0 && bot1 === 0 && bot2 === 0 && lef === 0 && rig2 === 0 && rig1 === 0) {

                            countBoat += 1;

                            sisend[row][col] = 1;
                            sisend[row][col + 1] = 1;

                            y.push([row]);
                            x.push([col]);

                            console.log('---');
                            console.log(countBoat + ' YX: ' + row + col);


                        }

                        else if (curr === 1 && rig1 === 1) {

                            countBoat += 1;

                            sisend[row][col] = 1;
                            sisend[row][col + 1] = 1;

                            y.push([row]);
                            x.push([col]);


                            console.log(countBoat + ' YXesimene: ' + row + col);


                        }

                    }
                }

                sisend.forEach(function (rows) {
                    console.log(rows);
                });


            };

            paiguta_uus_laev_opp = function (sisend) {


                for (var row = 0; row < GRID_x + 1; row++) {

                    for (var col = 0; col < GRID_x + 1; col++) {


                        var curr = sisend[row][col];

                        var top1 = (row === 0) ? 0 : sisend[row - 1][col];
                        var top2 = (row === 0) ? 0 : sisend[row - 1][col + 1];

                        var bot1 = (row === GRID_x) ? 0 : sisend[row + 1][col];
                        var bot2 = (row === GRID_x) ? 0 : sisend[row + 1][col + 1];

                        var lef = (col === 0) ? 0 : sisend[row][col - 1];

                        var rig1 = (col === GRID_x) ? undefined : sisend[row][col + 1];
                        var rig2 = (col === GRID_x - 1) ? 0 : sisend[row][col + 2];


                        if (curr === 0 && top1 === 0 && top2 === 0 && bot1 === 0 && bot2 === 0 && lef === 0 && rig2 === 0 && rig1 === 0) {

                            countBoatOpp += 1;

                            sisend[row][col] = 1;
                            sisend[row][col + 1] = 1;

                            yOpp.push([row]);
                            xOpp.push([col]);

                            console.log('---');
                            console.log(countBoatOpp + ' YX: ' + row + col);


                        }

                        else if (curr === 1 && rig1 === 1) {

                            countBoatOpp += 1;

                            sisend[row][col] = 1;
                            sisend[row][col + 1] = 1;

                            yOpp.push([row]);
                            xOpp.push([col]);


                            console.log(countBoatOpp + ' YXesimene: ' + row + col);


                        }

                    }
                }

                sisend.forEach(function (rows) {
                    console.log(rows);
                });


            };


            switch (true) {
                case sizeOfGrid === 3:
                    state = [
                        [
                            [1, 1, 0],
                            [0, 0, 0],
                            [0, 0, 0]
                        ],
                        [
                            [0, 1, 1],
                            [0, 0, 0],
                            [0, 0, 0]
                        ]
                    ];
                    break;
                case sizeOfGrid === 4:
                    state = [
                        [
                            [1, 1, 0, 0],
                            [0, 0, 0, 0],
                            [0, 0, 0, 0],
                            [0, 0, 0, 0]
                        ],
                        [
                            [0, 1, 1, 0],
                            [0, 0, 0, 0],
                            [0, 0, 0, 0],
                            [0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 1, 1],
                            [0, 0, 0, 0],
                            [0, 0, 0, 0],
                            [0, 0, 0, 0]
                        ]
                    ];
                    break;
                case sizeOfGrid === 5:
                    state = [

                        [
                            [1, 1, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 1, 1, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 1, 1, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 1, 1],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0]
                        ]
                    ];
                    break;
                case sizeOfGrid === 6:
                    state = [

                        [
                            [1, 1, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 1, 1, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 1, 1, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 1, 1, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 1, 1],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0]
                        ]
                    ];
                    break;
                case sizeOfGrid === 7:
                    state = [

                        [
                            [1, 1, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 1, 1, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 1, 1, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 1, 1, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 1, 1, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 0, 1, 1],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0]
                        ]
                    ];
                    break;
                case sizeOfGrid === 8:
                    state = [

                        [
                            [1, 1, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 1, 1, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 1, 1, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 1, 1, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 1, 1, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 0, 1, 1, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 0, 0, 1, 1],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0]
                        ]
                    ];
                    break;
                case sizeOfGrid === 9:
                    state = [

                        [
                            [1, 1, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 1, 1, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 1, 1, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 1, 1, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 1, 1, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 0, 1, 1, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 0, 0, 1, 1, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 0, 0, 0, 1, 1],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ]
                    ];
                    break;
                case sizeOfGrid === 10:
                    state = [

                        [
                            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ]
                    ];
                    break;
            }


            var current_state = state;

            var randomInput = current_state[Math.floor(Math.random() * current_state.length)];

            var randomInput_opp = current_state[Math.floor(Math.random() * current_state.length)];

            var ships = current_state.length;

            console.log('max ships ' + ships);

            var GRID_x = current_state.length;

            paiguta_uus_laev(randomInput);

            paiguta_uus_laev_opp(randomInput_opp);


            function setup_player() {

                //randomize the order of all ships
                var is_ship = [0];
                while (is_ship.length < countBoat) {
                    var randomnumber = Math.ceil(Math.random() * countBoat -1)
                    var found = false;
                    for (var i = 0; i < is_ship.length; i++) {
                        if (is_ship[i] == randomnumber) {
                            found = true;
                            break
                        }
                    }
                    if (!found)is_ship[is_ship.length] = randomnumber;
                }

                if ( 4 < sizeOfGrid < 8 ) {
                    var maxValue = Math.max.apply(this, is_ship);

                    var maxValIndex = $.inArray(maxValue,is_ship);


                    if (maxValIndex > -1) {
                        is_ship.splice(maxValIndex, 1);
                    }
                }

                console.log('-----------');
                console.log(is_ship);
                console.log('y: '+ y);
                console.log('x: '+ x);
                console.log('-----------');

                //amount of ships chosen from ui will be taken from the randomized array of ships (var is_ship)
                for (var z = 0; z < numberOfShips ; ++z) {


                    var xLast = x[is_ship[z]];
                    var yLast = y[is_ship[z]];


                    console.log('yx value at index [' + z + '] is: ' + yLast + xLast );
                    console.log('-----------');

                    var yx_sum = yLast + xLast;
                    playershipsLocation.push(yx_sum);




                    $("#Lcell-" + yLast + xLast).addClass( "ship" );
                    var nextCell = ++xLast;
                    $("#Lcell-" + yLast + nextCell).addClass( "ship" );

                    yx_sum = yLast + xLast;
                    playershipsLocationRight.push(yx_sum);
               //     console.log('playershipsLocationRight'+playershipsLocationRight)

                }


            }
            setup_player();

      //    console.log('player ships location :' +  playershipsLocation);

            function setup_opp() {

                //randomize the order of all ships
                var is_ship = [0];
                while (is_ship.length < countBoat) {
                    var randomnumber = Math.ceil(Math.random() * countBoat -1)
                    var found = false;
                    for (var i = 0; i < is_ship.length; i++) {
                        if (is_ship[i] == randomnumber) {
                            found = true;
                            break
                        }
                    }
                    if (!found)is_ship[is_ship.length] = randomnumber;
                }

                // Get the max value from the array and remove it
                if ( 4 < sizeOfGrid < 8 ) {
                    var maxValue = Math.max.apply(this, is_ship);

                    var maxValIndex = $.inArray(maxValue,is_ship);


                    if (maxValIndex > -1) {
                        is_ship.splice(maxValIndex, 1);
                    }
                }


                console.log('-----------');
                console.log(is_ship);
                console.log('y: '+ yOpp);
                console.log('x: '+ xOpp);
                console.log('-----------');

                //amount of ships chosen from ui will be taken from the randomized array of ships (var is_ship)
                for (var z = 0; z < numberOfShips ; ++z) {



                    var xLast = xOpp[is_ship[z]];
                    var yLast = yOpp[is_ship[z]];


                    console.log('yx value at index [' + z + '] is: ' + yLast + xLast );
                    console.log('-----------');

                    var yx_sum = yLast + xLast;

                    oppshipsLocation.push(yx_sum);

                    yx_sum = yLast + ++xLast;
                    oppshipsLocationRight.push(yx_sum);



                }


            }
            setup_opp();

      //      console.log('Opponent ships location :' +  oppshipsLocation);
       //     console.log('Opponent ships location :' +  oppshipsLocationRight);

            gameplay();

        });


    }


    function gameplay() {



        function init_turns() {
            players_turn ();

        }

        init_turns();


function players_turn () {


    $('#board-left').addClass('disabled')
    $('#board-right').removeClass('disabled')
    $('.card').removeClass('flipped');

    $(document).on('click','.board-right td', function () {

        var cell_id =  $(this).attr("id");
        var c_id = cell_id.replace('Rcell-','');


        if(oppshipsLocation.indexOf(c_id) != -1 )
        {

            $(this).addClass('ship-opponent');
            $(this).next().addClass('step' + c_id);
            $('.step' + c_id).next().addClass('ship-after');



        }

        else if (oppshipsLocationRight.indexOf(c_id) != -1)
        {

            $(this).addClass('ship-opponent');
            $(this).prev().addClass('step' + c_id);
            $('.step' + c_id).prev().addClass('ship-after');

        }

        else {
            $(this).addClass('player-missed');
            opponents_turn ();
        }

        var player_points = $('.ship-opponent').length;

        var player_missed = $('.player-missed').length;
        $('.players-moves').html(player_missed);

        var opp_left = numberOfShips - player_points;

        $('#opponents-navy').html(opp_left);

        if (opp_left = 0){
// you won
        }




        return false;


    });
}


        function opponents_turn () {

            $('#board-right').addClass('disabled')
            $('#board-left').removeClass('disabled')
            $('.card').addClass('flipped');

            $(document).on('click','.board-left td', function () {


                var cell_id =  $(this).attr("id");
                var c_id = cell_id.replace('Lcell-','');


                if(playershipsLocation.indexOf(c_id) != -1 )
                {

                    $(this).addClass('ship-player');
                    $(this).next().addClass('step' + c_id);
                    $('.step' + c_id).next().addClass('ship-after');

                }

                else if (playershipsLocationRight.indexOf(c_id) != -1)
                {

                    $(this).addClass('ship-player');
                    $(this).prev().addClass('step' + c_id);
                    $('.step' + c_id).prev().addClass('ship-after');

                }

                else {

                    $(this).addClass('opp-missed');
                    players_turn ();
                }

                var opponents_points = $('.ship-player').length;
                var opponent_missed = $('.opp-missed').length;
                $('.opponents-moves').html(opponent_missed);


                var player_left = numberOfShips - opponents_points;
                $('#players-navy').html(player_left);

                if (player_left = 0){
                // you lost
                }




                return false;

            });



        }



    }


});

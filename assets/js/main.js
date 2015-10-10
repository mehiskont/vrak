$(document).ready(function () {


    var grid = '#js-grid-selection',
        numberOfShips = '',
        sizeOfGrid = '',
        state;


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

            console.log('numberOfShips' + numberOfShips)

        });

        $("#js-expand-menu").click(function () {

            $(this).css("opacity", "0");
            $('#js-grid-selection').removeClass('lift-up');

            $('#board-left').empty();
            $('#board-right').empty();
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

            $('#js-grid-selection').addClass('lift-up');
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
                    var string_td = '<td id="Lcell-' + RowNum + CellNum + '" onclick="ClickCell(this)">';
                    $(string_td).appendTo('#board-left');

                    var string_tdR = '<td id="Rcell-' + RowNum + CellNum + '" onclick="ClickCell(this)">';
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

                    $("#Lcell-" + yLast + xLast).addClass( "ship" );
                    var nextCell = ++xLast;
                    $("#Lcell-" + yLast + nextCell).addClass( "ship" );

                }


            }
            setup_player();


            function setup_opp() {

                //randomize the order of all ships
                var is_ship = [0];
                while (is_ship.length < countBoat) {
                    var randomnumber = Math.ceil(Math.random() * countBoat)
                    var found = false;
                    for (var i = 0; i < is_ship.length; i++) {
                        if (is_ship[i] == randomnumber) {
                            found = true;
                            break
                        }
                    }
                    if (!found)is_ship[is_ship.length] = randomnumber;
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

                    $("#Rcell-" + yLast + xLast).addClass( "ship" );
                    var nextCell = ++xLast;
                    $("#Rcell-" + yLast + nextCell).addClass( "ship" );

                }


            }
            setup_opp();


        });


    }




});
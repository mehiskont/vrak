$(document).ready(function () {


    var grid = '#js-grid-selection',
        numberOfShips = '',
        sizeOfGrid = '',
        state;


    var x = [];
    var y = [];
    var xFirst = [];
    var yFirst = [];

    var countBoat = 0;


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

            $('#js-grid-selection').addClass('lift-up');
            $("#js-expand-menu").css("opacity", "1");

            var Rows = sizeOfGrid;
            var Cols = sizeOfGrid;
            var CellNum = -1;
            var RowNum = -1;
            for (var i = 0; i < Rows; ++i) {

                var string_tr = '<tr>';

                $(string_tr).appendTo('#board-left');
                RowNum += 1;

                for (var j = 0; j < Cols; ++j) {

                    CellNum += 1;
                    if (CellNum === sizeOfGrid) {
                        CellNum = 0;
                    }
                    var string_td = '<td id="Lcell-' + RowNum + CellNum + '" onclick="ClickCell(this)">';
                    $(string_td).appendTo('#board-left');

                    var string_span = '<span></span>';
                    $(string_span).appendTo('#board-left');

                    var string_td_end = '</td>';
                    $(string_td_end).appendTo('#board-left');

                }

                //    document.getElementById("board").writeln("</tr>") ;
                var string_tr_end = '</tr>';
                $(string_tr_end).appendTo('#board-left');
            }
            for (var iR = 0; iR < Rows; ++iR) {

                var string_trR = '<tr>';
                $(string_trR).appendTo('#board-right');

                for (var jR = 0; jR < Cols; ++jR) {
                    CellNum += 1;
                    var string_tdR = '<td id="Rcell-' + CellNum + '" onclick="ClickCell(this)">';
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

                            y.push([row]);
                            x.push([col]);
                            yFirst.push([row]);
                            xFirst.push([col]);

                            console.log(countBoat + ' YX: ' + row + col);


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

            var ships = current_state.length;

            console.log('max ships ' + ships);

            var GRID_x = current_state.length;

            paiguta_uus_laev(randomInput);


            function setup() {


                var is_ship = [];
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

                console.log('-----------');


                for (var z = 0; z < numberOfShips; ++z) {

                    var xLast = x[is_ship[z]];
                    var yLast = y[is_ship[z]];


                    if (xLast === undefined && yLast === undefined) {
                        console.log('yx value at index [' + z + '] is: ' + yFirst + xFirst);
                        console.log('-----------');

                        $("#Lcell-" + yFirst + xFirst).addClass( "ship" );
                        var nextCell1 = ++xFirst;
                        $("#Lcell-" + yFirst + nextCell1).addClass( "ship" );

                    }

                    else {
                        console.log('yx value at index [' + z + '] is: ' + yLast + xLast );
                        console.log('-----------');

                        $("#Lcell-" + yLast + xLast).addClass( "ship" );
                        var nextCell2 = ++xLast;
                        $("#Lcell-" + yLast + nextCell2).addClass( "ship" );
                    }

                }


            }

            setup();


            //      ships_layout();

        });

    }

    function ships_layout() {

        var gridXY = sizeOfGrid * sizeOfGrid;

        for (var i = 0; i < numberOfShips; ++i) {
            var x = Math.floor((Math.random() * gridXY) + 0);
            $("#Lcell-" + x).css("background-color", "red");
            var c = x + 1;

            $("#Lcell-" + c).css("background-color", "red");

        }

        $('#board-left').click(function () {
            var cellId = $(this).attr("id");
        })


    }


/////////  calculations


});
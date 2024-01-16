const canvas = document.querySelector('canvas');
canvas.width  = 350;
canvas.height = canvas.width;
const c = canvas.getContext('2d');
c.save();

var gameOver = false;
var winner = "";
var margin = canvas.width / 13;
var xTurn = true;
var cells = 
['', '', '',
 '', '', '',
 '', '', '',]

DrawBoard();


addEventListener('click', (e) =>
{
    if (!gameOver)
    {
        var xDiv = Math.floor(e.offsetX / (canvas.width  / 3));
        var yDiv = Math.floor(e.offsetY / (canvas.height / 3));

        if (cells[xDiv + yDiv * 3] == '')
        {
            if (xTurn) cells[xDiv + yDiv * 3] = 'X';
            else       cells[xDiv + yDiv * 3] = 'O';

            DrawCellMark(xDiv, yDiv);
        }

        TestVictory();
    }
})

function TestVictory()
{
    var xCells = [];
    for (var i = 0; i < cells.length; i++)
    {
        if (cells[i] == 'X') xCells.push(i);
    }

    if
    (
        (xCells.includes(0) && xCells.includes(1) && xCells.includes(2)) ||
        (xCells.includes(3) && xCells.includes(4) && xCells.includes(5)) ||
        (xCells.includes(6) && xCells.includes(7) && xCells.includes(8)) ||
        (xCells.includes(0) && xCells.includes(3) && xCells.includes(6)) ||
        (xCells.includes(1) && xCells.includes(4) && xCells.includes(7)) ||
        (xCells.includes(2) && xCells.includes(5) && xCells.includes(8)) ||
        (xCells.includes(0) && xCells.includes(4) && xCells.includes(8)) ||
        (xCells.includes(2) && xCells.includes(4) && xCells.includes(6))
    )
    {
        console.log('X victory');
        gameOver = true;
        winner = "X";
        DrawGameOver();
    }
    

    var oCells = [];
    for (var i = 0; i < cells.length; i++)
    {
        if (cells[i] == 'O') oCells.push(i);
    }

    if
    (
        (oCells.includes(0) && oCells.includes(1) && oCells.includes(2)) ||
        (oCells.includes(3) && oCells.includes(4) && oCells.includes(5)) ||
        (oCells.includes(6) && oCells.includes(7) && oCells.includes(8)) ||
        (oCells.includes(0) && oCells.includes(3) && oCells.includes(6)) ||
        (oCells.includes(1) && oCells.includes(4) && oCells.includes(7)) ||
        (oCells.includes(2) && oCells.includes(5) && oCells.includes(8)) ||
        (oCells.includes(0) && oCells.includes(4) && oCells.includes(8)) ||
        (oCells.includes(2) && oCells.includes(4) && oCells.includes(6))
    )
    {
        console.log('O victory');
        gameOver = true;
        winner = "O";
        DrawGameOver();
    }
}

function DrawGameOver()
{
    c.resetTransform();
    c.font = '72px sans-serif';
    c.textBaseline = 'middle';
    c.textAlign = 'center';
    c.fillStyle = 'blue';
    c.strokeStyle = 'white';
    c.strokeText(`${winner} venceu!`, canvas.width / 2, canvas.height / 2);
    c.fillText(`${winner} venceu!`, canvas.width / 2, canvas.height / 2);
    
}

function DrawCellMark(xDiv, yDiv)
{
    if (xTurn)
    {
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.translate(xDiv * canvas.width / 3, yDiv * canvas.height / 3);
        c.moveTo(margin, margin);
        c.lineTo(canvas.width / 3 - margin, canvas.height / 3 - margin);
        c.moveTo(canvas.width / 3 - margin, margin);
        c.lineTo(margin, canvas.height / 3 - margin);
        c.stroke()
        xTurn = false;
    }
    else
    {
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.translate(xDiv * canvas.width / 3, yDiv * canvas.height / 3);
        c.beginPath();
        c.arc(canvas.width / 6, canvas.height / 6, (canvas.width / 3 - margin * 2) / 2, 0, 180 * Math.PI);
        c.stroke();
        xTurn = true;
    }
}

function DrawBoard()
{
    c.moveTo(canvas.width / 3, 0);
    c.lineTo(canvas.width / 3, canvas.height - 0);

    c.moveTo((canvas.width / 3) * 2, 0);
    c.lineTo((canvas.width / 3) * 2, canvas.height - 0);

    c.moveTo (0, canvas.height / 3);
    c.lineTo(canvas.width - 0, canvas.height / 3);

    c.moveTo (0, (canvas.height / 3) * 2);
    c.lineTo(canvas.width - 0, (canvas.height / 3) * 2);

    c.lineWidth = margin / 3;
    c.stroke();
}
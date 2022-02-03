const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

window.resizeTo(300, 600)

function hide() {
    document.getElementById('notes').style.display = 'none';
}

const fs = require('fs')
const gui = require('nw.gui');

var cellWidth1 = 0
var textX1 = 0
var textY1 = 545
var cellMove = 10

class Cell {
    constructor(timeStamp, textContent, hyperLink, textWidth) {
        this.timeStamp = timeStamp
        this.textContent = textContent
        this.hyperlink = hyperLink
        this.textWidth = textWidth
    }
    anime = function () {
        const URL = 'https://sean.fish/mal_unapproved/anime';
        fetch(URL)
            .then(function (res) { return res.text() })
            .then(function (text) {
                var logNo = 0
                const d = new Date();
                logNo = d.getTime()
                var logNoRecent = fs.readFileSync('./data/seanLog/recent.txt')
                var index1 = text.indexOf("<li>This was updated")
                var index2 = text.indexOf('\n', index1)
                text = text.replace(text.substring(index1, index2), '')
                var recent = fs.readFileSync(`./data/seanLog/log${logNoRecent}.txt`).toString()
                if (text != recent) {
                    fs.writeFileSync(`./data/seanLog/recent.txt`, `${logNo}`)
                    fs.writeFileSync(`./data/seanLog/log${logNo}.txt`, text);
                    var time1 = `${sysTime.getHours() + ":" + `${sysTime.getMinutes() < 10 ? '0' : ''}` + sysTime.getMinutes()}`
                    fs.writeFileSync('./data/cellData/time1.txt', `${time1}`)
                    ctx.fillStyle = '#00ff00'
                    ctx.fillRect(0, 530, 300, 1)
                    ctx.fillStyle = '#ffffff'
                    ctx.font = "11px consolas"
                    ctx.fillText(`${sysTime.getHours() + ":" + `${sysTime.getMinutes() < 10 ? '0' : ''}` + sysTime.getMinutes()}`, textX1, textY1)
                    var timeMetrics = ctx.measureText(`${sysTime.getHours() + ":" + sysTime.getMinutes()}`)
                    //console.log(metrics.width)
                    var text = 'New MAL Entry!'
                    ctx.fillText(text, textX1 + timeMetrics.width + 2, textY1)
                    var textMetrics = ctx.measureText(text)
                    cellWidth1 =
                        Math.abs(timeMetrics.actualBoundingBoxLeft)
                        + Math.abs(timeMetrics.actualBoundingBoxRight)
                        + Math.abs(textMetrics.actualBoundingBoxLeft)
                        + Math.abs(textMetrics.actualBoundingBoxRight)
                        + 2
                    console.log('update ocurred')
                }
                else {
                    fs.writeFileSync('./data/cellData/cell1.txt', `${530 - cellMove}`)
                    console.log('no update')
                    ctx.fillStyle = '#00ff00'
                    ctx.fillRect(0, fs.readFileSync('./data/cellData/cell1.txt'), 300, 1)
                    ctx.fillStyle = '#ffffff'
                    ctx.font = "11px consolas"
                    ctx.fillText(`${fs.readFileSync('./data/cellData/time1.txt')}`, textX1, textY1 - cellMove)
                    var timeMetrics = ctx.measureText(`${fs.readFileSync('./data/cellData/time1.txt')}`)
                    var text = 'New MAL Entry!'
                    ctx.fillText(text, textX1 + timeMetrics.width + 2, textY1 - cellMove)
                    var textMetrics = ctx.measureText(text)
                    cellWidth1 =
                        Math.abs(timeMetrics.actualBoundingBoxLeft)
                        + Math.abs(timeMetrics.actualBoundingBoxRight)
                        + Math.abs(textMetrics.actualBoundingBoxLeft)
                        + Math.abs(textMetrics.actualBoundingBoxRight)
                        + 4
                }

            })
            .catch(function (err) { console.log(err) });
    }
}

var anime = 'New MAL Entry!'
var timeMetricsAnime = ctx.measureText(`${fs.readFileSync('./data/cellData/time1.txt')}`)
var textMetricsAnime = ctx.measureText(anime)
var cellWidthAnime =
    Math.abs(timeMetricsAnime.actualBoundingBoxLeft)
    + Math.abs(timeMetricsAnime.actualBoundingBoxRight)
    + Math.abs(textMetricsAnime.actualBoundingBoxLeft)
    + Math.abs(textMetricsAnime.actualBoundingBoxRight)
    + 4

let cells = [];

while (cells.length < 1) {
    let cell = new Cell(
        fs.readFileSync('./data/cellData/time1.txt').toString(),
        anime,
        'https://sean.fish/mal_unapproved/anime',
        cellWidthAnime,
    )
    cells.push(cell)
}

function garbo() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].anime();
    }
}

garbo()

var clickX = 0
var clickY = 0
var mouseX = 0
var mouseY = 0
var sysTime = new Date()

function onClick(event) { //sets mousePos coords to read-only mousePos values
    clickX = event.pageX
    clickY = event.pageY
    console.log(mouseX, mouseY)
    if (clickX > 0 && clickX < 84) {
        if (clickY > 528 && clickY < 545) {
            gui.Shell.openExternal("https://sean.fish/mal_unapproved/anime")
        }
    }
}

function mouseHov(event) {
    mouseX = event.pageX
    mouseY = event.pageY
    setInterval(draw, 1000 / 30)
    function draw() {
        if (mouseX > 0 && mouseX < cellWidth1 && mouseY > 528 && mouseY < 545) {
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(textX1, textY1 - 10, cellWidth1, 1)
            document.body.style.cursor = "pointer"
        }
        else {
            ctx.fillStyle = '#000000'
            ctx.fillRect(textX1, textY1 - 10, cellWidth1, 1)
            document.body.style.cursor = "default"
        }
    }
}

canvas.addEventListener("mousemove", mouseHov, false)
canvas.addEventListener("mouseup", onClick, false)
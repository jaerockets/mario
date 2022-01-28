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

var clickX = 0
var clickY = 0
var mouseX = 0
var mouseY = 0
var textX = 0
var textY = 545
var sysTime = new Date()

function onClick(event) { //sets mousePos coords to read-only mousePos values
    clickX = event.pageX
    clickY = event.pageY
    //console.log(mouseX, mouseY)
    if (clickX > 0 && clickX < 84) {
        if (clickY > 528 && clickY < 539) {
            gui.Shell.openExternal("https://sean.fish/mal_unapproved/anime")
        }
    }
}

function mouseHov(event) {
    mouseX = event.pageX
    mouseY = event.pageY
    setInterval(draw, 1000 / 30)
    function draw() {
        if (mouseX > 0 && mouseX < 84 && mouseY > 528 && mouseY < 539) {
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(textX, textY, cellWidth, 1)
            document.body.style.cursor = "pointer"
        }
        else {
            ctx.fillStyle =  '#000000'
            ctx.fillRect(textX, textY, cellWidth, 1)
            document.body.style.cursor = "default"
        }
    }
}

canvas.addEventListener("mousemove", mouseHov, false)
canvas.addEventListener("mouseup", onClick, false)

var cellWidth = 0

const URL = 'https://sean.fish/mal_unapproved/anime';
    fetch(URL)
    .then(function (res) { return res.text() })
    .then(function (text) {
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
            console.log('update ocurred')
        }
        else {
            console.log('no update')
            ctx.fillStyle = '#00ff00'
            ctx.fillRect(0, 530, 300, 1)
            ctx.fillStyle = '#ffffff'
            ctx.font = "11px consolas" 
            ctx.fillText(`${sysTime.getHours() + ":" + `${sysTime.getMinutes()<10?'0':''}` + sysTime.getMinutes()}`, textX, textY)
            var timeMetrics = ctx.measureText(`${sysTime.getHours() + ":" + sysTime.getMinutes()}`)
            //console.log(metrics.width)
            var text = 'New MAL Entry!'
            ctx.fillText(text, textX+timeMetrics.width+2, textY)
            var textMetrics = ctx.measureText(text)
            cellWidth=
                 Math.abs(timeMetrics.actualBoundingBoxLeft)
                +Math.abs(timeMetrics.actualBoundingBoxRight)
                +Math.abs(textMetrics.actualBoundingBoxLeft)
                +Math.abs(textMetrics.actualBoundingBoxRight)
        }

    })
    .catch(function (err) { console.log(err) });
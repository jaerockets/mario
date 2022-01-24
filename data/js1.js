const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

window.resizeTo(300, 600)

// remember 40 unit canvas buffer

ctx.fillStyle = '#00FF00'
//ctx.fillRect(185, 0, 100, 100)
ctx.fillRect(0, 525, 300, 1)

ctx.fillStyle = '#ffffff'
ctx.font = "11px consolas"
ctx.fillText('bread man killed you', 0, 536)

ctx.fillStyle = '#000000'
ctx.fillRect(187, 3, 95, 95)

ctx.fillStyle = '#ff0000'
ctx.fillRect(260, 90, 10, 10)


function hide() {
    document.getElementById('notes').style.display='none';
}

const fs = require('fs')

const URL = 'https://sean.fish/mal_unapproved/anime';
fetch(URL)
.then(res => res.text())
.then(text => {
    const d = new Date();
    logNo=d.getTime()
    var logNoRecent=fs.readFileSync('./data/seanLog/recent.txt')
    var index1 = text.indexOf("<li>This was updated")
    var index2 = text.indexOf('\n', index1)
    text=text.replace(text.substring(index1, index2),'')
    var recent = fs.readFileSync(`./data/seanLog/log${logNoRecent}.txt`).toString()
    index1=recent.indexOf("<li>This was updated")
    index2=recent.indexOf('\n', index1)
    recent=recent.replace(recent.substring(index1, index2),'')
    if (text != recent) {
        fs.writeFileSync(`./data/seanLog/recent.txt`, `${logNo}`)
        fs.writeFileSync(`./data/seanLog/log${logNo}.txt`, text);
    }
    else {
        console.log('no update')
    }
            
})
.catch(err => console.log(err));

var mouseX = 0
var mouseY = 0

function coordCheck(event) { //sets mousePos coords to read-only mousePos values
    mouseX = event.pageX
    mouseY = event.pageY
    if (mouseX > 187) {
        if (mouseY < 100) {
            console.log('i eat weed')
        }
    }
}

canvas.addEventListener("mouseup", coordCheck, false)
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

window.resizeTo(300, 600)

// remember 40 unit canvas buffer

ctx.fillStyle = '#00FF00'
ctx.fillRect(0, 525, 300, 1)
ctx.fillStyle = '#ffffff'
ctx.font = "11px consolas"
ctx.fillText('bread man killed you', 0, 536)

const URL = 'https://sean.fish/mal_unapproved/anime';
fetch(URL)
.then(res => res.text())
.then(text => {
    console.log(text);
})
.catch(err => console.log(err));
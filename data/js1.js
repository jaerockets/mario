const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

draw = function () {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, 25, 25)
}

draw()
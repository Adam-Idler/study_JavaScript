'use strict';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const paint = document.getElementById('paint');
const pctx = paint.getContext('2d');
const color = document.getElementById('color');
const brushWidth = document.getElementById('brush-width');

const angle = (degrees = 360) => (Math.PI / 180) * degrees;

ctx.lineWidth = '10';
// Синие
ctx.beginPath();
ctx.strokeStyle = '#0885c2';
ctx.arc(75, 75, 70, 0, angle(360), false);
ctx.stroke();
ctx.closePath();
// Черное
ctx.beginPath();
ctx.moveTo(305, 75);
ctx.strokeStyle = '#333';
ctx.arc(235, 75, 70, 0, angle(), false);
ctx.stroke();
ctx.closePath();
// Красное
ctx.beginPath();
ctx.moveTo(465, 75);
ctx.strokeStyle = '#ed334e';
ctx.arc(395, 75, 70, 0, angle(), false);
ctx.stroke();
ctx.closePath();
// Желтое
ctx.beginPath();
ctx.moveTo(155, 75);
ctx.strokeStyle = '#fbb132';
ctx.arc(155, 145, 70, angle(266), angle(355), false);
ctx.moveTo(225, 155);
ctx.arc(155, 145, 70, angle(3.5), angle(258), false);
ctx.stroke();
ctx.closePath();
// Зеленое
ctx.beginPath();
// ctx.moveTo(385, 145);
ctx.strokeStyle = '#1c8b3c';
ctx.arc(315, 145, 70, angle(266), angle(355.5), false);
ctx.moveTo(385, 155);
ctx.arc(315, 145, 70, angle(3.5), angle(258), false);
ctx.stroke();
ctx.closePath();

color.addEventListener('input', () => pctx.strokeStyle = color.value);
brushWidth.addEventListener('input', () => pctx.lineWidth = brushWidth.value);

paint.addEventListener('mousemove', (event) => {
  const x = event.offsetX,
        y = event.offsetY,
        mx = event.movementX,
        my = event.movementY;

        if (event.buttons > 0) {
          pctx.beginPath();
          pctx.moveTo(x, y);
          pctx.lineTo(x - mx, y - my);
          pctx.stroke();
          ctx.closePath();
        }
});
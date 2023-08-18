// ***** Image animation with transform

// const image = document.getElementById('logo');

// let start;
// let done = false;

// function step (timestamp) {
//     if(start === undefined) {
//         start = timestamp
//     }

//     const elapsed = timestamp - start;

//     if(elapsed > 733.3398856755) {
//        done = true;
//     }

//     if(done) {
//         return;
//     }

//     image.style.transform = `translateX(${elapsed/2}px) rotate(${elapsed/2}deg)`;
//     requestAnimationFrame(step);
// }

// ;

// requestAnimationFrame(step);

// animated clock


const canvas = document.getElementById('canvas');
const faceColor = document.getElementById('face-color');
const borderColor = document.getElementById('border-color');
const lineColor = document.getElementById('line-color');
const largeHandColor = document.getElementById('large-hand-color');
const secondHandColor = document.getElementById('second-hand-color');



function clock() {
	const now = new Date();
	
	const ctx = canvas.getContext('2d');

	// setup canvas
	ctx.save(); //save the default state
	ctx.clearRect(0, 0, 300, 300);
	ctx.translate(150, 150); //put 00 in the middle
	ctx.rotate(-Math.PI / 2); //rotate clock -90deg
	
	// stroke styles
	ctx.strokeStyle = '#000000';
	ctx.fillStyle = '#f4f4f4';
	ctx.lineWidth = 5;
	ctx.lineCap = 'round';

	// draw clock face/border
	ctx.save();
	ctx.beginPath();
	ctx.lineWidth = 12;
	ctx.strokeStyle = borderColor.value;
	ctx.fillStyle = faceColor.value;

	ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
	ctx.stroke();
	ctx.fill();
	ctx.restore();

	// draw hour marks, tick lines

	ctx.save();
	ctx.strokeStyle = lineColor.value;
	ctx.lineWidth = 4;
	for (let i = 0; i < 12; i++) {
		ctx.beginPath();

		ctx.rotate(Math.PI / 6);
		ctx.moveTo(110, 0);
		ctx.lineTo(120, 0);
		ctx.stroke();
	}
	ctx.restore();

	// draw minute lines
	ctx.save();
	ctx.strokeStyle = lineColor.value;
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'grey';
	for (let i = 0; i < 60; i++) {
		if (i % 5 !== 0) {
			ctx.beginPath();
			ctx.moveTo(117, 0);
			ctx.lineTo(120, 0);
			ctx.stroke();
		}
		ctx.rotate(Math.PI / 30);
	}
	ctx.restore();

	// get hours
	const hr = now.getHours() % 12;
	const min = now.getMinutes();
	const sec = now.getSeconds();

	// draw hour hand
	ctx.save();
	ctx.rotate(
		(Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec
	);
	ctx.strokeStyle = largeHandColor.value;
	ctx.lineWidth = 8;
	ctx.beginPath();
	ctx.moveTo(-10, 0);
	ctx.lineTo(80, 0);
	ctx.stroke();
	ctx.restore();

	// draw minute hand
	ctx.save();
	ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
	ctx.strokeStyle = largeHandColor.value;
	ctx.lineWidth = 4;
	ctx.beginPath();
	ctx.moveTo(-10, 0);
	ctx.lineTo(118, 0);
	ctx.stroke();
	ctx.restore();

	// draw second hand
	ctx.save();
	ctx.rotate((sec * Math.PI) / 30);
	ctx.strokeStyle = secondHandColor.value;
	ctx.fillStyle = secondHandColor.value;
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(-20, 0);
	ctx.lineTo(100, 0);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(0, 0, 5, 0, Math.PI * 2, true);
	ctx.fill();
	ctx.restore();

	ctx.restore(); //restore default state

	requestAnimationFrame(clock);
}

requestAnimationFrame(clock);

document.getElementById('save-btn').addEventListener('click', () => {
	const dataURL = canvas.toDataURL('image/png');
	const link = document.createElement('a');
	link.download = 'clock.png';
	link.href = dataURL;
	link.click();
})
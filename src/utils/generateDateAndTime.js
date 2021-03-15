function generateDate() {
	let result;
	let months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
	let d = new Date();
	let day = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();

	result = `${day}-${month}-${year}`

	return result;

}

function generateTimeNumber() {
	let result;
	let d = new Date();
	let hour = d.getHours();
	let minutes = d.getMinutes();
	let seconds = d.getSeconds();
	let milliseconds = d.getMilliseconds();
	result = `${hour}-${minutes}-${seconds}-${milliseconds}`
	return result;
}


export {generateDate, generateTimeNumber}

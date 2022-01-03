export function New(row, col, cnt) {
	let tid = (row * cnt * 2) + (col * 2);
	let num = (row * cnt) + col;

	if (num % 2 !== 0) {
		tid++;
	}

	return tid;
}

export function Reverse(row, col, cnt, max) {
	let tid = (row * cnt * 2) + (col * 2);
	let num = (row * cnt) + col;

	if (num % 2 !== 0) {
		tid--;
	}

	return max - tid - 2;
}

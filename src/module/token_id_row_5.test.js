import * as tokenid from "./token_id";

// 1. Shodo is white.
test("0, 0, 5 => 0", () => {
	let row = 0;
	let col = 0;
	let cnt = 5;

	let tid = tokenid.New(row, col, cnt);

	// 0000: white
	// 0001: black
	expect(tid).toBe(0);
});

// 2. Shodo is black.
test("0, 1, 5 => 3", () => {
	let row = 0;
	let col = 1;
	let cnt = 5;

	let tid = tokenid.New(row, col, cnt);

	// 0002: white
	// 0003: black
	expect(tid).toBe(3);
});

// 3. Shodo is white.
test("0, 2, 5 => 4", () => {
	let row = 0;
	let col = 2;
	let cnt = 5;

	let tid = tokenid.New(row, col, cnt);

	// 0004: white
	// 0005: black
	expect(tid).toBe(4);
});

// 4. Shodo is black.
test("0, 3, 5 => 7", () => {
	let row = 0;
	let col = 3;
	let cnt = 5;

	let tid = tokenid.New(row, col, cnt);

	// 0006: white
	// 0007: black
	expect(tid).toBe(7);
});

// 5. Shodo is white.
test("0, 4, 5 => 8", () => {
	let row = 0;
	let col = 4;
	let cnt = 5;

	let tid = tokenid.New(row, col, cnt);

	// 0008: white
	// 0009: black
	expect(tid).toBe(8);
});

// 6. Shodo is black.
test("1, 0, 5 => 11", () => {
	let row = 1;
	let col = 0;
	let cnt = 5;

	let tid = tokenid.New(row, col, cnt);

	// 0010: white
	// 0011: black
	expect(tid).toBe(11);
});

// 7. Shodo is white.
test("1, 1, 5 => 12", () => {
	let row = 1;
	let col = 1;
	let cnt = 5;

	let tid = tokenid.New(row, col, cnt);

	// 0012: white
	// 0013: black
	expect(tid).toBe(12);
});

// 8. Shodo is black.
test("1, 2, 5 => 15", () => {
	let row = 1;
	let col = 2;
	let cnt = 5;

	let tid = tokenid.New(row, col, cnt);

	// 0014: white
	// 0015: black
	expect(tid).toBe(15);
});

// 9. Shodo is white.
test("1, 3, 5 => 16", () => {
	let row = 1;
	let col = 3;
	let cnt = 5;

	let tid = tokenid.New(row, col, cnt);

	// 0016: white
	// 0017: black
	expect(tid).toBe(16);
});

// 10. Shodo is black.
test("1, 4, 5 => 19", () => {
	let row = 1;
	let col = 4;
	let cnt = 5;

	let tid = tokenid.New(row, col, cnt);

	// 0018: white
	// 0019: black
	expect(tid).toBe(19);
});

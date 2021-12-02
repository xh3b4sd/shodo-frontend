import * as tokenid from "./token_id";

// 1. Shodo is white.
test("0, 0, 2 => 0", () => {
	let row = 0;
	let col = 0;
	let cnt = 2;

	let tid = tokenid.New(row, col, cnt);

	// 0000: white
	// 0001: black
	expect(tid).toBe(0);
});

// 2. Shodo is black.
test("0, 1, 2 => 3", () => {
	let row = 0;
	let col = 1;
	let cnt = 2;

	let tid = tokenid.New(row, col, cnt);

	// 0002: white
	// 0003: black
	expect(tid).toBe(3);
});

// 3. Shodo is white.
test("1, 0, 2 => 4", () => {
	let row = 1;
	let col = 0;
	let cnt = 2;

	let tid = tokenid.New(row, col, cnt);

	// 0004: white
	// 0005: black
	expect(tid).toBe(4);
});

// 4. Shodo is black.
test("1, 1, 2 => 7", () => {
	let row = 1;
	let col = 1;
	let cnt = 2;

	let tid = tokenid.New(row, col, cnt);

	// 0006: white
	// 0007: black
	expect(tid).toBe(7);
});

// 2. Shodo is white.
test("2, 0, 2 => 8", () => {
	let row = 2;
	let col = 0;
	let cnt = 2;

	let tid = tokenid.New(row, col, cnt);

	// 0008: white
	// 0009: black
	expect(tid).toBe(8);
});

// 6. Shodo is black.
test("2, 1, 2 => 11", () => {
	let row = 2;
	let col = 1;
	let cnt = 2;

	let tid = tokenid.New(row, col, cnt);

	// 0010: white
	// 0011: black
	expect(tid).toBe(11);
});

// 7. Shodo is white.
test("3, 0, 2 => 12", () => {
	let row = 3;
	let col = 0;
	let cnt = 2;

	let tid = tokenid.New(row, col, cnt);

	// 0012: white
	// 0013: black
	expect(tid).toBe(12);
});

// 8. Shodo is black.
test("3, 1, 2 => 15", () => {
	let row = 3;
	let col = 1;
	let cnt = 2;

	let tid = tokenid.New(row, col, cnt);

	// 0014: white
	// 0015: black
	expect(tid).toBe(15);
});

// 9. Shodo is white.
test("4, 0, 2 => 16", () => {
	let row = 4;
	let col = 0;
	let cnt = 2;

	let tid = tokenid.New(row, col, cnt);

	// 0016: white
	// 0017: black
	expect(tid).toBe(16);
});

// 10. Shodo is black.
test("4, 1, 2 => 19", () => {
	let row = 4;
	let col = 1;
	let cnt = 2;

	let tid = tokenid.New(row, col, cnt);

	// 0018: white
	// 0019: black
	expect(tid).toBe(19);
});

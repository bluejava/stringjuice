const Sj = require("..")({}) // pass in a new object and it gets extended and returned

const s = "To be or not to be, that is an odd question"

section("Extended Object - Functional Programming Style", () => {
	test("find", () => {
		assert.equal(Sj.find('be')(s), 3)
		assert.equal(Sj.find('x')(s), -1)
		assert.equal(Sj.find(/b...t/)(s), 16)
		assert.equal(Sj.find(/b....t/)(s), -1)
	})

	test("contains", () => {
		assert.equal(Sj.contains('that')(s), true)
		assert.equal(Sj.contains('those')(s), false)
		assert.equal(Sj.contains(/b[c-f]/)(s), true)
		assert.equal(Sj.contains(/t[c-f]/)(s), false)
	})

	test("first", () => {
		assert.equal(Sj.first(4)(s), "To b")
		assert.equal(Sj.first(0)(s), "")
		assert.equal(Sj.first(-1)(s), "")
		assert.equal(Sj.first(1000)(s), s)
	})

	test("last", () => {
		assert.equal(Sj.last(3)(s), "ion")
		assert.equal(Sj.last(1000)(s), s)
		assert.equal(Sj.last(0)(s), "")
		assert.equal(Sj.last(-1)(s), "")
	})

	test("rmFirst", () => {
		assert.equal(Sj.rmFirst(3)(s), "be or not to be, that is an odd question")
		assert.equal(Sj.rmFirst(3)("123"), "")
		assert.equal(Sj.rmFirst(5)("123"), "")
		assert.equal(Sj.rmFirst(3)(""), "")
		assert.equal(Sj.rmFirst(0)("123"), "123")
		assert.equal(Sj.rmFirst(-1)("123"), "123")
	})

	test("rmLast", () => {
		assert.equal(Sj.rmLast(3)(s), "To be or not to be, that is an odd quest")
		assert.equal(Sj.rmLast(0)(s), s)
		assert.equal(Sj.rmLast(1)(""), "")
	})

	test("upTo", () => {
		assert.equal(Sj.upTo('that')(s), "To be or not to be, ")
		assert.equal(Sj.upTo('that', 2)(s), "To be or not to be, th")
		assert.equal(Sj.upTo('that', -3)(s), "To be or not to b")
		assert.equal(Sj.upTo('bogus')(s), null)
		assert.equal(Sj.upTo('bogus', -5)(s), null)
		assert.equal(Sj.upTo(/q|x/)(s), "To be or not to be, that is an odd ")
		assert.equal(Sj.upTo(/q|x/,-5)(s), "To be or not to be, that is an")
		assert.equal(Sj.upTo(/bogus/, 4)(s), null)
	})

	test("after", () => {
		assert.equal(Sj.after('that')(s), " is an odd question")
		assert.equal(Sj.after('that', 2)(s), "s an odd question")
		assert.equal(Sj.after('that', -4)(s), "that is an odd question")
		assert.equal(Sj.after('bogus')(s), null)
	})

	test("upToLast", () => {
		assert.equal(Sj.upToLast('b')(s), "To be or not to ")
		assert.equal(Sj.upToLast(/b|q/)(s), "To be or not to be, that is an odd ")
		assert.equal(Sj.upToLast(/b|q/, 3)(s), "To be or not to be, that is an odd que")
		assert.equal(Sj.upToLast(/bogus/, 3)(s), null)
	})

	test("afterLast", () => {
		assert.equal(Sj.afterLast('q')(s), "uestion")
		assert.equal(Sj.afterLast(/b|x/,3)(s), "that is an odd question")
		assert.equal(Sj.afterLast(/foo/)(s), null)
	})

	test("isNum", () => {
		assert.equal(Sj.isNum(s), false)
		assert.equal(Sj.isNum('1.23'), true)
		assert.equal(Sj.isNum('1.23f'), false)
	})

	test("isInt", () => {
		assert.equal(Sj.isInt(s), false)
		assert.equal(Sj.isInt('1.23'), false)
		assert.equal(Sj.isInt('123'), true)
		assert.equal(Sj.isInt('-123'), true)
		assert.equal(Sj.isInt('2-123'), false)
	})

	test("extract", () => {
		assert.equal(Sj.extract(/,.*q/)(s), ", that is an odd q")
		assert.equal(Sj.extract(/(\w*) question/)(s), "odd")
	})

	test("trunc", () => {
		assert.equal(Sj.trunc(10)(s), "To be or n")
		assert.equal(Sj.trunc(10, true)(s), "To be or …")
		assert.equal(Sj.trunc(4, true)("123"), "123")
		assert.equal(Sj.trunc(3)("123"), "123")
	})

	test("forceLen", () => {
		assert.equal(Sj.forceLen(10)(s), "To be or n")
		assert.equal(Sj.forceLen(10)('hi'), "hi        ")
		assert.equal(Sj.forceLen(10)('0'), "         0")
	})

	test("pad", () => {
		assert.equal(Sj.pad(10)("test"), "test      ")
		assert.equal(Sj.pad(10)('123'), "       123")
		assert.equal(Sj.pad(10, 'right')('test'), "      test")
		assert.equal(Sj.pad(10, 'left')('123'), "123       ")
		assert.equal(Sj.pad(10, 'center')('hi'), "    hi    ")

		assert.equal(Sj.pad(12, 'full')('a b c d'), "a   b   c  d")
		assert.equal(Sj.pad(2, 'full')('a b c d'), 'a b c d')

		assert.equal(Sj.pad(10, '-')('test'), "test------")
		assert.equal(Sj.pad(10, '0')('4500'), "0000004500")
	})
})
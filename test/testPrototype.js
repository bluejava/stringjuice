require("..")()

const s = "To be or not to be, that is an odd question"

section("String Prototype Augmentation Style", () => {
	test("find", () => {
		assert.equal(s.find('be'), 3)
		assert.equal(s.find('x'), -1)
		assert.equal(s.find(/b...t/), 16)
		assert.equal(s.find(/b....t/), -1)
	})

	test("findAll", () => {
		const result = "a1b1 a5b6 a2b9".findAll(/a(.)b(.)/)
		assert.equal(result.length, 3)
		assert.equal(result[0].index, 0)
		assert.equal(result[0].match, "a1b1")
		assert.equal(result[0].capt.length, 2)
		assert.equal(result[0].capt[0], "1")
		assert.equal(result[0].capt[1], "1")

		assert.equal(result[1].index, 5)
		assert.equal(result[1].capt[1], "6")

		assert.equal(result[2].index, 10)
		assert.equal(result[2].match, "a2b9")
	})

	test("contains", () => {
		assert.equal(s.contains('that'), true)
		assert.equal(s.contains('those'), false)
		assert.equal(s.contains(/b[c-f]/), true)
		assert.equal(s.contains(/t[c-f]/), false)
	})

	test("first", () => {
		assert.equal(s.first(4), "To b")
		assert.equal(s.first(0), "")
		assert.equal(s.first(-1), "")
		assert.equal(s.first(1000), s)
	})

	test("last", () => {
		assert.equal(s.last(3), "ion")
		assert.equal(s.last(1000), s)
		assert.equal(s.last(0), "")
		assert.equal(s.last(-1), "")
	})

	test("rmFirst", () => {
		assert.equal(s.rmFirst(3), "be or not to be, that is an odd question")
		assert.equal("123".rmFirst(3), "")
		assert.equal("123".rmFirst(5), "")
		assert.equal("".rmFirst(3), "")
		assert.equal("123".rmFirst(0), "123")
		assert.equal("123".rmFirst(-1), "123")
	})

	test("rmLast", () => {
		assert.equal(s.rmLast(3), "To be or not to be, that is an odd quest")
		assert.equal(s.rmLast(0), s)
		assert.equal("".rmLast(1), "")
	})

	test("upTo", () => {
		assert.equal(s.upTo('that'), "To be or not to be, ")
		assert.equal(s.upTo('that', 2), "To be or not to be, th")
		assert.equal(s.upTo('that', -3), "To be or not to b")
		assert.equal(s.upTo('bogus'), null)
		assert.equal(s.upTo('bogus', -5), null)
		assert.equal(s.upTo(/q|x/), "To be or not to be, that is an odd ")
		assert.equal(s.upTo(/q|x/,-5), "To be or not to be, that is an")
		assert.equal(s.upTo(/bogus/, 4), null)
	})

	test("after", () => {
		assert.equal(s.after('that'), " is an odd question")
		assert.equal(s.after('that', 2), "s an odd question")
		assert.equal(s.after('that', -4), "that is an odd question")
		assert.equal(s.after('bogus'), null)
	})

	test("upToLast", () => {
		assert.equal(s.upToLast('b'), "To be or not to ")
		assert.equal(s.upToLast(/b|q/), "To be or not to be, that is an odd ")
		assert.equal(s.upToLast(/b|q/, 3), "To be or not to be, that is an odd que")
		assert.equal(s.upToLast(/bogus/, 3), null)
	})

	test("afterLast", () => {
		assert.equal(s.afterLast('q'), "uestion")
		assert.equal(s.afterLast(/b|x/,3), "that is an odd question")
		assert.equal(s.afterLast(/foo/), null)
	})

	test("isNum", () => {
		assert.equal(s.isNum(), false)
		assert.equal('1.23'.isNum(), true)
		assert.equal('1.23f'.isNum(), false)
	})

	test("isInt", () => {
		assert.equal(s.isInt(), false)
		assert.equal('1.23'.isInt(), false)
		assert.equal('123'.isInt(), true)
		assert.equal('-123'.isInt(), true)
		assert.equal('2-123'.isInt(), false)
	})

	test("extract", () => {
		assert.equal(s.extract(/,.*q/), ", that is an odd q")
		assert.equal(s.extract(/(\w*) question/), "odd")
	})

	test("trunc", () => {
		assert.equal(s.trunc(10), "To be or n")
		assert.equal(s.trunc(10, true), "To be or …")
		assert.equal("123".trunc(4, true), "123")
		assert.equal("123".trunc(3), "123")
	})

	test("forceLen", () => {
		assert.equal(s.forceLen(10), "To be or n")
		assert.equal('hi'.forceLen(10), "hi        ")
		assert.equal('0'.forceLen(10), "         0")
	})

	test("pad", () => {
		assert.equal('test'.pad(10), "test      ")
		assert.equal('123'.pad(10), "       123")
		assert.equal('test'.pad(10, 'right'), "      test")
		assert.equal('123'.pad(10, 'left'), "123       ")
		assert.equal('hi'.pad(10, 'center'), "    hi    ")

		assert.equal('a b c d'.pad(12, 'full'), "a   b   c  d")
		assert.equal('a b c d'.pad(2, 'full'), 'a b c d')

		assert.equal('test'.pad(10, '-'), "test------")
		assert.equal('4500'.pad(10, '0'), "0000004500")
	})
})
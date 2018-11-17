// The following line extends the String object
require("./index")()

// setup a test string, and shortcut to the log
const log = console.log
const s = "To be or not to be, that is an odd question"
const SQ = "'"
const quote = s => JSON.stringify(s)
const tlog = (t,a) => console.log(t.pad(50), "= " + a)
// find : returns the first instance of the string or regexp specified.
console.log("Most examples use string s: " + quote(s))

const examples =
	[
		"s.find('be')",
		"s.find(/b...t/)",

		"s.contains('that')",
		"s.contains('those')",
		"s.contains(/b[c-f]/)",
		"s.contains(/t[c-f]/)",

		"s.first(4)",
		"s.last(3)",
		"s.rmFirst(3)",
		"s.rmLast(3)",

		"s.upTo('that')",
		"s.upTo('that', 2)",
		"s.upTo('that', -3)",

		"s.upTo(/q|x/)",
		"s.upTo(/q|x/,-5)",
		"s.upTo(/bogus/,4)",

		"s.after('that')",
		"s.after('that', 2)",
		"s.after('that', -4)",

		"s.upToLast('b')",
		"s.upToLast(/b|q/)",
		"s.upToLast(/b|q/, 3)",

		"s.afterLast('q')",
		"s.afterLast(/b|x/,3)",
		"s.afterLast(/foo/)",

		"s.extract(/,.*q/)",
		"s.extract(/(\\w*) question/)",

		"s.isNum()",
		"'1.23'.isNum()",
		"'1.23f'.isNum()",

		"s.isInt()",
		"'1.23'.isInt()",
		"'123'.isInt()",
		"'-123'.isInt()",
		"'2-123'.isInt()",

		"s.trunc(10)",
		"s.trunc(10, true)",

		"'test'.pad(10)",
		"'123'.pad(10)",
		"'test'.pad(10, 'right')",
		"'123'.pad(10, 'left')",

		"'test'.pad(10, '-')",
		"'4500'.pad(10, '0')",

		"'hi'.pad(10, 'center')",
		"s.pad(60, 'full')",

		"\"a1b1 a5b6 a2b9\".findAll(/a(.)b(.)/)",

		"s.forceLen(10)",
		"'hi'.forceLen(10)",
		"'30'.forceLen(10)",
		"'100'.forceLen(10, 'left', '-')"
	]

examples.forEach(example => {
		let result = eval(`JSON.stringify(${example})`)
		// if(typeof result === "string")
		// 	result = quote(result)
		console.log(example.pad(40, "right"), "= " + result)
	})
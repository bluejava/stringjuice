// stringjuice can be used to extend the String prototype, or
// a string utility object with a set of useful functions.

function stringjuice(o)
{
	function find(s, str, startIndex)
	{
		if(str instanceof RegExp)
		{
			if(!str.global)
				str = new RegExp(str, "g") // this does not preserve other flags - but we assume either you used flags or you didn't
			str.lastIndex = startIndex
			var next = str.exec(s)
			return next ? next.index : -1
		}
		else
			return s.indexOf(str, startIndex)
	}

	function findAll(s, str)
	{
		if(!(str instanceof RegExp))
		{
			var ret = [ ], i = 0
			while((i = s.indexOf(str, i)) >= 0)
				ret.push(i++)
			return ret
		}
		else
		{
			if(!str.global)
				str = new RegExp(str, "g") // this does not preserve other flags - but we assume either you used flags or you didn't
			var next = str.exec(s),
				ret = [ ] //  to be returned
			while(next)
			{
				ret.push({ index: next.index, match: next[0] })
				next = str.exec(s)
			}
		}
		return ret
	}

	// returns true if string contains passed string (or regex)
	function contains(s, str, startIndex) {
			return find(s, str, startIndex) >= 0
		}

	function first(s, n) {return s.substring(0, n) } // returns first n chars
	function last(s, n) {return s.substring(s.length - n, s.length) } // returns last n chars
	function rmFirst(s, n) {return s.substring(n, s.length) } // returns string mins first n chars stripped
	function rmLast(s, n) {return s.substring(0, s.length - n) } // returns string with last n chars chopped off

	 // returns string upto the passed character (or string, or regex)
	function upTo(s, str, adjust)
	{
		adjust = adjust || 0
		var i = find(s, str)
		if(i < 0)
			return null
		return s.substring(0, i + adjust)
	}

	function after(s, str, adjust)
	{
		var len, i
		if(str instanceof RegExp)
		{
			var reob = s.match(str)
			if(!reob) return null
			len = reob[0].length
			i = reob.index
		}
		else
		{
			i = find(s, str)
			len = str.length
			if(i < 0)
				return null
		}

		return rmFirst(s, i + len + (adjust || 0))
	}

	// An indexOf that works with regexp or string
	function lastIndexOf2(s, str)
	{
		if(str instanceof RegExp)
		{
			const finds = findAll(s, str)
			return finds.length ? finds[finds.length - 1] : null
		}
		else
		{
			const index = s.lastIndexOf(str)
			return index >= 0 ? { index: s.lastIndexOf(str), match: str } : null
		}
	}

	function upToLast(s, str, adjust)
	{
		adjust = adjust || 0

		const mo = lastIndexOf2(s, str)

		if(!mo)
			return null
		return s.substring(0, mo.index + adjust)
	}

	function afterLast(s, str, adjust)
	{
		adjust = adjust || 0

		const mo = lastIndexOf2(s, str)

		if(!mo)
			return null

		return s.substring(mo.index + adjust + mo.match.length)
	}

	function isNum(s) { return contains(s, /^-?\d*\.?\d*$/) } // true if string is floating point number
	function isInt(s) { return contains(s, /^-?\d+$/) } // true if string is integer "683", etc.
	function trunc(s, n, ie)
	{
		if(s.length <= n)
			return s.valueOf()
		return s.substring(0, ie ? n - 1 : n) + (ie ? "…" : "")
	}

	function forceLen(s, n, justify, c)
	{
		if(s.length > n)
			return trunc(s, n)
		else
			return pad(s, n, justify, c)
	}

	function extract(s, re)
	{
		const match = s.match(re),
			hasCapture = contains(re.toString(), /[^\\]\(/)
		if(match)
			return hasCapture ? match[1] : match[0]
		return null
	}

	/**
	 *
	 * @param {string} s string to pad
	 * @param {integer} n size to pad to
	 * @param {["left"|"right"|"center"|"auto"]="auto"} justify justification. auto justifies text left and numbers right
	 */
	function pad(s, n, justify, c)
	{
		c = c || " "
		justify = justify || "auto"
		if(justify.length === 1)
		{
			c = justify
			justify = "auto"
		}

		if(justify === "full")
			return fullJustify(s, n, c)

		if(justify === "auto")
			justify = isNum(s) ? "right" : "left"  // left justify text, right justify numbers

		while(s.length < n)
			s = (justify === "right" || (justify === "center" && s.length % 2)) ? c + s : s + c

		return s
	}

	function fullJustify(s, n, c)
	{
		const words = s.split(" ")

		if(words.length < 2)
			return pad(s, n, "left", c)

		let gaps = words.length - 1,
			spaces = gaps + Math.max(n - s.length, 0)
		return words.map(w => {
				const s = Math.round(spaces / gaps--)
				spaces -= s
				return pad(w, w.length + s, "left", c)
			})
			.join("")
	}

	function addFunc(o, f)
	{
		o[f.name] =
			f.length > 1
			? o[f.name] = function() { return s => f.apply(s, [s, ...arguments]) }
			: f
	}

	function addFuncSP(o, f)
	{
		o[f.name] =
			f.length > 0
			? o[f.name] = function() { return s => f.apply(s, arguments) }
			: s => f.apply(s)
	}

	[ after, afterLast, contains, extract, find, findAll, first, forceLen, isInt, isNum, last, pad, rmLast, rmFirst, trunc, upTo, upToLast ]
		.forEach(f => {
			if(o)
				addFunc(o, f)
			else
				String.prototype[f.name] = function() { return f.apply(null, [ this, ...arguments] )}
		})

	if(o)
		Object.getOwnPropertyNames(String.prototype)
			.forEach(fn => addFuncSP(o, String.prototype[fn]))

	return o
}

module.exports = stringjuice
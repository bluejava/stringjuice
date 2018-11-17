# StringJuice 🥤

Juice up your JavaScript string utility belt with StringJuice

---

StringJuice is a small, well tested set of string utilities to aid in parsing, formatting and manipulating strings. These utilities can help you build more sophisticated string processing routines quickly and reliably.

You can either extend the String prototype, or use a utility object FP style functions. If you prefer the later, it also converts the standard String methods to FP-style functions.

## Summary by Example:

Most examples below use string s: `"To be or not to be, that is an odd question"`.

Note: These examples are using the extended String prototype form, but these can be written in FP style as well.


                            s.find('be') = 3
                         s.find(/b...t/) = 16
                      s.contains('that') = true
                     s.contains('those') = false
                    s.contains(/b[c-f]/) = true
                    s.contains(/t[c-f]/) = false
                              s.first(4) = 'To b'
                               s.last(3) = 'ion'
                            s.rmFirst(3) = 'be or not to be, that is an odd question'
                             s.rmLast(3) = 'To be or not to be, that is an odd quest'
                          s.upTo('that') = 'To be or not to be, '
                           s.upTo(/q|x/) = 'To be or not to be, that is an odd '
                         s.after('that') = ' is an odd question'
                         s.upToLast('b') = 'To be or not to '
                       s.upToLast(/b|q/) = 'To be or not to be, that is an odd '
                        s.afterLast('q') = 'uestion'
                      s.afterLast(/foo/) = null
                       s.extract(/,.*q/) = ', that is an odd q'
             s.extract(/(\w*) question/) = 'odd'
                               s.isNum() = false
                          '1.23'.isNum() = true
                         '1.23f'.isNum() = false
                               s.isInt() = false
                          '1.23'.isInt() = false
                           '123'.isInt() = true
                          '-123'.isInt() = true
                         '2-123'.isInt() = false
                             s.trunc(10) = 'To be or n'
                       s.trunc(10, true) = 'To be or …'
                          'test'.pad(10) = 'test      '
                           '123'.pad(10) = '       123'
                 'test'.pad(10, 'right') = '      test'
                   '123'.pad(10, 'left') = '123       '
                     'test'.pad(10, '-') = 'test------'
                     '4500'.pad(10, '0') = '0000004500'
                  'hi'.pad(10, 'center') = '    hi    '
    "a1b1 a5b6 a2b9".findAll(/a(.)b(.)/) = [{"index":0,"match":"a1b1","capt":["1","1"]},{"index":5,"match":"a5b6","capt":["5","6"]},{"index":10,"match":"a2b9","capt":["2","9"]}]
                       s.pad(60, 'full') = 'To   be   or   not   to   be,  that   is  an   odd  question'
                          s.forceLen(10) = 'To be or n'
                       'hi'.forceLen(10) = 'hi        '
                       '30'.forceLen(10) = '        30'
         '100'.forceLen(10, 'left', '-') = '100-------'

## Primary Motivation

The primary motivation for writing this library was to accomplish the following:

### Goal 1: Remove inconsistencies between matching operations using strings vs using regular expressions.

Standard String methods:

```javascript
// test if string contains another string
"trout mask".includes("mask")     // true

// Test if string contains a regular expression
/m..k/.test("trout mask")         // true

// Test if string exists after position 5
"trout mask".includes("mask", 5)  // true

// Test if string contains regexp after position 5
// hmmm.. no method seems to directly support this.. so...
/m..k/.test("trout mask".substring(5)) // true
```

Yikes! Lets see the same functions once juiced up with **StringJuice**:

```javascript
// test if string contains another string
"trout mask".contains("mask")         // true

// Test if string contains a regular expression
"trout mask".contains(/m..k/)         // true

// Test if string exists after position 5
"trout mask".contains("mask", 5)      // true

// Test if string contains regexp after position 5
"trout mask".contains(/m..k/, 5)      // true
```

All 4 tests use same method and same format - No trip to MDN required!

### Goal 2: Support both methods on strings and/or functional programming style

Note: The FP style uses the same function names and supports the same exact arguments. But instead of calling them as a method on the string object, you call the function directly, and it returns a function that you then call with the string object:

```javascript
"abba zaba".findAll(/.a/) // String prototype extension style
// or
Sj.findAll(/.a/)("abba zaba") // FP style
```

i.e. each method becomes a partial function, which makes it super useful for functional programming.

It even FP-ifies the standard string methods! Read more about OO vs FP styles below.

### Provide some really useful functions for string inspection and manipulation

Check it:

```javascript
const line = "040:+34 -665 -44 +8:alter:452293"
const trans = line.after(":") // "+34 -665 -44 +8:alter:452293"
const transType = trans.after(":").upTo(":")  // "alter"

trans.upTo(":")
	.findAll(/.\d+/)
	.map(ao => ao.match) // [ '+34', '-665', '-44', '+8' ]
	.forEach(alt => {
// ...
```


## Supports OO and FP styles

StringJuice offers 2 different ways to access its API. By extending the String prototype (OO style) or by providing them in curried form on an object of your choice.

If you want to access them using methods right on the strings, simply initialize `StringJuice` with no argument:

```javascript
StringJuice() // calling with no arg installs it into String Prototype

"--hi--".rmFirst(2).rmLast(2)  // "hi"

"4t 6y 8u".findAll(/\d+/)  // [ { index: 0, match: '4' }, { index: 3, match: '6' }, { index: 6, match: '8' } ]

"Welcome".pad(20, 'right')  // '             Welcome'

const input = "::Order #122:Sun Jul  1 13:38:07 JST 2018:500DEN  "
const valid = input.trim().rmFirst(2).afterLast(":").rmLast(3).isNum() // true
```

Or, you can place the functions into an object for use as FP (and to avoid "poluting" the String Class if thats important to you). The functions are the same and take the same arguments, but they return a function that then takes the string to operate on.

```javascript
const Sj = StringJuice({}) // passing an object in extends that object instead
Sj.rmLast(2)(Sj.rmFirst(2)("--hi--"))  // "hi"

Sj.findAll(/\d+/)("4t 6y 8u")  // [ { index: 0, match: '4' }, { index: 3, match: '6' }, { index: 6, match: '8' } ]

Sj.pad(20, 'right')("Welcome")  // '             Welcome'

const input = "::Order #122:Sun Jul  1 13:38:07 JST 2018:500DEN  "
Sj.isNum(Sj.rmLast(3)(Sj.afterLast(":")(Sj.rmFirst(2)(Sj.trim(input)))))
// or using something like Rambda's compose
const isValid = R.compose(Sj.isNum, Sj.rmLast(3), Sj.afterLast(":"), Sj.rmFirst(2), Sj.trim)
const valid = isValid(input)
```

Notice the use of `Sj.trim` in the example above. This is available due to a feature of StringJuice that provides functional style use of all String prototype functions. Just as the StringJuice API, all String methods that take no arguments become a function that takes a single string argument, while String methods that take arguments take those same arguments but return a function that THEN takes a single string argument.

Some exmaples:

```javascript
const Sj = StringJuice({})          // Create the StringJuice object
Sj.trim("   Hello.  ")              // "Hello."
Sj.substring(2,4)("abcdefg")        // "cd"
Sj.concat("world")("hello ")        // "hello world"
Sj.indexOf("c")("abcdefg")          // 2
Sj.split(",")("a,b,c")              // [ 'a', 'b', 'c' ]
Sj.toUpperCase("hello")             // HELLO

const names = [ "Amy", "Billy", ... ]
names.map(Sj.toUpperCase)           // [ 'AMY', 'BILLY', ... ]
```

## API

### `after`

`{string|RegExp}str, {integer}[adjust] → {string}result`

Returns the portion of the string after matching `str`. If `adjust` is specified, the returned portion starting index is adjusted.

Examples:

```javascript
const str = "hello world"
str.after("ll")        // 'o world'
str.after("ll", -2)    // 'llo world'
str.after(/o.w/)       // 'orld'
str.after("x")         // null
```

### `afterLast`

`{string|RegExp}str, {integer}[adjust] → {string}result`

Returns the portion of the string after matching the last `str`. If `adjust` is specified, the returned portion starting index is adjusted.

Examples:

```javascript
const str = "hello world"
str.afterLast("l")        // 'd'
str.afterLast("l", -2)    // 'rld'
str.afterLast(/./)        // ''
str.afterLast("x")        // null
```

### `contains`

`{string|RegExp}str, {integer}[startIndex] → {boolean}result`

Returns true if the string contains the string or RegExp `str`. If a `startIndex` is specified, the match must occur on or after this index.

Note: This is similar to the standard `includes` String function, but is better named and supports RegExp as the match criteria.

Examples:

```javascript
const str = "hello world"
str.contains("o")        // true
str.contains(/\d/)       // false (no numbers exist in string)
str.contains(/\W/)       // true (a whitespace does exist in string)
```

### `extract`

`{RegExp}regexp → {string}result`

Extracts a match from the string. If the `regexp` specified contains *capturing parentheses*, the first of these is returned.

Examples:

```javascript
"abba zaba".extract(/z..a/)                     // "zaba"
"abba zaba".extract(/bb(.)/)                    // "a"
"path/to/my/file.html".extract(/.*\/(.*)\..*/)  // "file"
```

### `find`

`{string|RegExp}str, {integer}[startIndex] → {integer}startIndex`

Returns the `startIndex` of the first occurance of the specified String or RegExp `str`. If a `startIndex` is specified, the match must occur on or after this index.

Note: This is similar to the standard `search` String function, but supports both String and RegExp as the match criteria, and supports a `startIndex`.

Examples:

```javascript
const str = "hello world"
str.contains("o")        // true
str.contains(/\d/)       // false (no numbers exist in string)
str.contains(/\W/)       // true (a whitespace does exist in string)
```

### `findAll`

`{string|RegExp}str → {[object]}results`

Returns an array containing all matches found against the String or RegExp `str`. When used with a String, the `results` array is an array of integers where matches were found. When used with RegExp, `results` is an array of objects with each containing:

- `index` - the index within the string at which the match was found
- `match` - the fully matched string
- `capt` - an array of captured values from capturing groups

To everyone who's tried to do this using standard String and/or RegExp methods: you're welcome. 😉

Examples:

```javascript
"abaaba".findAll("b")      // [ 1, 4 ]
"this is it".findAll("i")  // [ 2, 5, 8 ]
"foo".findAll("x")         // [ ]

"a b c".findAll(/\w/)      // [ { index: 0, match: 'a' }, { index: 2, match: 'b' }, { index: 4, match: 'c' } ]
"32x + 57y".findAll(/\d+/) // [ { index: 0, match: '32' }, { index: 6, match: '57' } ]
```

### `forceLen`

### `{integer}length, {string}justify, {string}fill → {string}result`

Forces the string to be of the `length` specified by either truncating or padding. (See `trunc` and `pad`). The `justify` and `fill` are passed to the `pad` function when padding is necessary. See `pad` for details.

Examples:

```javascript
"hello".forceLen(8)              // 'hello   '
"55".forceLen(8)                 // '      55'
"55".forceLen(8, "left")         // '55      '
"abcdefghij".forceLen(8)         // 'abcdefgh'
"hi".forceLen(8, "center", "-")  // '---hi---'
```

### `first`

#### `{integer]count → {string}result`

Returns the first `count` characters in the string. If less than `count` characters exist, then the entire string is returned.

Examples:

```javascript
"hello".first(3)              // 'hel'
"hello".first(10)             // 'hello'
"hello".first(0)              // ''
```

### `isInt`

#### `→ {boolean}result`

Returns `true` if the string contains an integer value.

Examples:

```javascript
"123".isInt()              // true
"-600".isInt()             // true
"5.0".isInt()              // false
"5,600".isInt()            // false
```

### `isNum`

#### `→ {boolean}result`

Returns `true` if the string contains a numeric value.

Examples:

```javascript
"123".isInt()              // true
"-600".isInt()             // true
"5.0".isInt()              // false
"5,600".isInt()            // false
```

### `last`

#### `{integer]count → {string}result`

Returns the first `count` characters in the string. If less than `count` characters exist, then the entire string is returned.

Examples:

```javascript
"hello".last(3)              // 'llo'
"hello".last(10)             // 'hello'
"hello".last(0)              // ''
```

### `pad`

### `{integer}length, {string}justify, {string}fill → {string}result`

If the length of the string is less than the `length` specified, pad the string with spaces (or the character specified in `fill`) until it is of the specified `length`. The `justify` parameter allows you to specify your content to remain in the `left` portion of the returned string, the `right` portion or in the `center`. If `justify` is left unspecified (or is specified as `auto`), numeric values are `right` justified while other content is `left` justified.

Examples:

```javascript
"hello".pad(8)                //  'hello   '
"55".pad(8)                   //  '      55'
"55".pad(8, "left")           //  '55      '
"abcdefghij".pad(8)           //  'abcdefghij'
"hi".pad(8, "center", "-")    //  '---hi---'
```

### `rmFirst`

#### `{integer]count → {string}result`

Returns the string with its first `count` characters removed.

Examples:

```javascript
"hello".rmFirst(3)              // 'lo'
"hello".rmFirst(10)             // ''
"hello".rmFirst(0)              // 'hello'
```

### `rmLast`

#### `{integer]count → {string}result`

Returns the string with its last `count` characters removed.

Examples:

```javascript
"hello".rmLast(3)              // 'he'
"hello".rmLast(10)             // ''
"hello".rmLast(0)              // 'hello'
```

### `trunc`

### `{integer}length, {boolean}includeEllipse → {string}result`

Returns the string truncated to the `length` specified. If the `includeEllipse` option is set to `true`, any truncated characters are replaced by the ellipse character (…) while still maintaining the string length at `length`.

Examples:

```javascript
"hello".trunc(3)                //  'hel'
"hello".trunc(3, true)          //  'he…'
"hello".trunc(10)               //  'hello'
```

### `upTo`

`{string|RegExp}str, {integer}[adjust] → {string}result`

Returns the string up to the matched portion of `str`. If there is no match found, `null` is returned. If an `adjust` value is specified, the ending index of the returned string is adjusted accordingly.

Examples:

```javascript
const str = "hello world"
str.upTo("d")           // 'hello worl'
str.upTo(/[v-z]/)       // 'hello '
str.upTo(/[wxyz]/,-1)   // 'hello'
```

### `upToLast`


`{string|RegExp}str, {integer}[adjust] → {string}result`

Returns the string up to the last matched portion of `str`. If there is no match found, `null` is returned. If an `adjust` value is specified, the ending index of the returned string is adjusted accordingly.

Examples:

```javascript
const str = "abba zaba"
str.upToLast("ba")          // 'abba za'
str.upToLast(/.b/)          // 'abba z'
str.upToLast(/[^ab]/,-1)    // 'abba'
```

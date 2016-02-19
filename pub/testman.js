


/*
* @version    0.3.1
* @date       2015-06-19
* @stability  2 - Unstable
* @author     Lauri Rooden <lauri@rooden.ee>
* @license    MIT License
*/


!function(exports) {
	var doneTick, started
	, totalCases = 0
	, failedCases = 0
	, totalAsserts = 0
	, passedAsserts = 0
	, toString = Object.prototype.toString
	, bold  = '\u001b[1m'
	, red   = '\u001b[31m'
	, green = '\u001b[32m'
	, reset = '\u001b[0m'
	, proc = typeof process == "undefined" ? { argv: [] } : process
	, Fn = exports.Fn || require("./lib/functional-lite.js").Fn
	, color = proc.stdout && proc.stdout.isTTY && proc.argv.indexOf("--no-color") == -1


	if (!color) {
		bold = red = green = reset = ""
	}

	describe.result = ""

	function print(str) {
		describe.result += str + "\n"
		console.log(str)
	}

	function This() {
		return this
	}

	function type(obj) {
		// Standard clearly states that NaN is a number
		// but it is not useful for testing.
		return (
			obj == null || obj != obj ? "" + obj : toString.call(obj).slice(8, -1)
		).toLowerCase()
	}

	function deepEqual(actual, expected) {
		if (actual === expected) return true

		var key, len
		, actualType = type(actual)

		if (actualType != type(expected)) return false

		if (actualType == "object") {
			var keysA = Object.keys(actual)
			, keysB = Object.keys(expected)
			len = keysA.length
			if (len != keysB.length || !deepEqual(keysA.sort(), keysB.sort())) return false
			for (; len--; ) {
				key = keysA[len]
				if (!deepEqual(actual[key], expected[key])) return false
			}
			return true
		}

		if (actualType == "array" || actualType == "arguments") {
			len = actual.length
			if (len != expected.length) return false
			for (; len--; ) {
				if (!deepEqual(actual[len], expected[len])) return false
			}
			return true
		}

		return "" + actual == "" + expected
	}


	function AssertionError(message, _stackStart) {
		this.name = "AssertionError"
		this.message = message
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, _stackStart || AssertionError)
		}
	}
	AssertionError.prototype = Object.create(Error.prototype)


	function describe(name) {
		return new TestSuite(name)
	}

	function TestSuite(name) {
		var testSuite = this

		if (!started) {
			started = +new Date()
			print("TAP version 13")
		}

		testSuite.name  = name || "{unnamed test suite}"
		testSuite.cases = []

		print("# " + testSuite.name)

		return testSuite
	}



	TestSuite.prototype = {
		_test: This,
		describe: describe,
		it: function(name, options) {
			return this.test("it " + name, null, options)
		},
		test: function(name, next, options) {
			var testSuite = this
			, testCase = new TestCase(name, options, testSuite)


			if (next) next(testCase)

			return testCase
		},
		done: function() {
			if (this.done_) return
			this.done_ = +new Date()

			print("1.." + totalCases)
			print("#" + (failedCases ? "" : green + bold) + " pass  " + (totalCases - failedCases)
				+ "/" + totalCases
				+ " [" + passedAsserts + "/" + totalAsserts + "]"
				+ " in " + (this.done_ - started) + " ms"
				+ reset)

			failedCases && print("#" + red + bold + " fail  " + failedCases
				+ " [" + (totalAsserts - passedAsserts) + "]"
				+ reset)
			/*
			* FAILED tests 1, 3, 6
			* Failed 3/6 tests, 50.00% okay
			* PASS 1 test executed in 0.023s, 1 passed, 0 failed, 0 dubious, 0 skipped.
			*/
			if (proc.exit) proc.exit()
		}
	}

	function TestCase(name, options, testSuite) {
		var testCase = this
		totalCases++
		testCase.name = totalCases + " - " + (name || "{unnamed test case}")
		testCase.options = options || {}
		testCase.failed = []
		testCase.passedAsserts = 0
		testCase.totalAsserts = 0

		testSuite.cases.push( testCase )

		if (testCase.options.skip) {
			testCase.ok = testCase.equal = testCase.type = testCase.run = This
		}

		;["describe", "it", "test", "done"].forEach(function(name) {
			testCase[name] = function() {
				testCase.end()
				return testSuite[name].apply(testSuite, arguments)
			}
		})

		clearTimeout(doneTick)
		doneTick = setTimeout(done, 50)

		function done() {
			if (testCase.ok == describe.it.ok) testSuite.done()
			else testCase.run(done)
		}

		return testCase
	}

	TestCase.prototype = describe.it = describe.assert = {
		wait: Fn.hold,
		ok: function(value, message) {
			var testCase = this
			, prefix = " #" + (testCase.passedAsserts + testCase.failed.length+1)
			totalAsserts++
			testCase.totalAsserts++
			try {
				if (typeof value == "function") value = value.call(testCase)
				if (!value) throw new AssertionError(message)
				passedAsserts++
				testCase.passedAsserts++
			} catch(e) {
				testCase.failed.push(message + prefix + (testCase.options.noStack ? "" : "\n" + e.stack))
			}
			return testCase
		},
		equal: function(actual, expected, message) {
			return this.ok(actual == expected, message || actual + "==" + expected)
		},
		notEqual: function(actual, expected, message) {
			return this.ok(actual != expected, message || actual + "!=" + expected)
		},
		strictEqual: function(actual, expected, message) {
			return this.ok(actual === expected, message || actual + "===" + expected)
		},
		notStrictEqual: function(actual, expected, message) {
			return this.ok(actual !== expected, message || actual + "!==" + expected)
		},
		deepEqual: function(actual, expected, message) {
			return this.ok(deepEqual(actual, expected), message || actual + "deepEqual" + expected)
		},
		notDeepEqual: function(actual, expected, message) {
			return this.ok(!deepEqual(actual, expected), message || actual + "notDeepEqual" + expected)
		},
		throws: function(fn, message) {
			var actual = false
			, expected = true
			try {
				fn()
			} catch(e) {
				actual = true
			}
			return this.ok(actual, message || "throws")
		},
		plan: function(num) {
			this.planned = num
			return this
		},
		end: function() {
			var testCase = this

			if (testCase.ended) return

			testCase.ended = new Date()

			if (testCase.options.skip) {
				return print("ok " + testCase.name + " # skip - " + testCase.options.skip)
			}

			if (testCase.planned != void 0) {
				testCase.equal(testCase.planned, testCase.totalAsserts, null, "planned")
			}

			testCase.name += " [" + testCase.passedAsserts + "/" + testCase.totalAsserts + "]"

			if (testCase.failed.length) {
				failedCases++
				print("not ok " + testCase.name + "\n---\n" + testCase.failed.join("\n") + "\n---")
			} else {
				print("ok " + testCase.name)
			}
		},
		run: function(fn) {
			fn.call(this)
			return this
		},
		anyOf: function(a, b) {
			return this.ok( Array.isArray(b) && b.indexOf(a) != -1, "should be one of '" + b + "', got " + a )
		},
		type: function(thing, expected) {
			var t = type(thing)
			return this.ok( t === expected, "type should be " + expected + ", got " + t )
		}
	}

	exports.describe = describe.describe = describe

	var testPoint
	exports.test = function(name, next) {
		if (!testPoint) testPoint = describe()
		return testPoint = testPoint.test(name, next)
	}

}(this)


/*
* http://sourceforge.net/projects/portableapps/files/
*/




describe.GLOBAL = {}

describe.it.goTo = function(route) {
	location.href = "#" + route
	setTimeout(this.wait(), 60)
	return this
}

describe.it.waitTill = function(actual, options) {
	var result
	, count = 30
	, resume = this.wait()

	if (options.timeout) {
		count = 0 | (options.timeout / 50)
	}

	this.ok(function() {
		return !!result
	}, options || "Expected: function returns something")
	test()

	return this

	function test() {
		result = actual()
		if (!result && count--) return setTimeout(test, 50)
		resume()
	}
}
describe.it.viewOpen = function(actual, options) {
	return this.waitTill(function() {
		return View(actual).open
	}, options || "Expected: View "+actual+" should be open")
}
describe.it.waitSelector = function(actual, options) {
	return this.waitTill(function() {
		return document.body.find(actual)
	}, options || "Expected: selector "+actual+" should be in dom")
}
describe.it.countSelectors = function(actual, expected, options) {
	this.waitSelector(actual, options)
	this.ok(function() {
		var nodes = document.body.findAll(actual)
		, count = nodes && nodes.length
		return count === expected
	}, options || "Number of matches for " + actual + " should be " + expected)
	return this
}
describe.it.haveText = function(actual, expected, options) {
	this.waitSelector(actual, options)
	this.waitTill(function() {
		var node = document.body.find(actual)
		, txt = node && node[node.tagName == "INPUT" ? "val" : "txt"]().trim()
		return txt === expected
	}, options || actual + " should have text: " + expected)
	return this
}
describe.it.fill = function(actual, expected, options) {
	this.waitSelector(actual, options)
	this.ok(function() {
		var node = document.body.find(actual)
		, val = node && node.val(expected)
		return val === expected
	}, options || actual + " should have value " + expected)
	return this
}
describe.it.click = function(actual, expected, options) {
	this.waitSelector(actual, options)
	this.ok(function() {
		var ev
		, node = document.body.find(actual)
		, attr = {
			pointerX: 0, pointerY: 0, button: 0,
			ctrlKey: false, altKey: false, shiftKey: false, metaKey: false,
			bubbles: true, cancelable: true
		}

		if (node) {
			if (node.dispatchEvent) {
				ev = document.createEvent("MouseEvents")
				ev.initMouseEvent("click", true, true, document.defaultView, attr.button,
					attr.pointerX, attr.pointerY, attr.pointerX, attr.pointerY,
					attr.ctrlKey, attr.altKey, attr.shiftKey, attr.metaKey,
					attr.button, node)
				node.dispatchEvent(ev)
			} else if (node.click) {
				node.click()
			} else if (node.fireEvent) {
				node.fireEvent("onclick")
			} else if (typeof node.onclick == "function") {
				node.onclick()
			}
		}
		return !!node
	}, options || actual + " should be clickable")
	return this
}

describe.it.collectViewsUsage = function() {
	var viewsUsage = describe.GLOBAL.viewsUsage = {}

	View.on("show", function(route) {
		var view = View.views[route]

		do {
			viewsUsage[route] = viewsUsage[route] || 0
			viewsUsage[route]++
		} while (route = (view = view.parent || {}).route)
	})
	return this
}


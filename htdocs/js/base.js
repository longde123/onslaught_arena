/**
 * horde - A quick game
 * @var object
 */
horde = {};

/**
 * Context corrected window.setInterval() wrapper
 * @param {number} when Milliseconds between intervals
 * @param {object} fn Function to call each interval
 * @param {object} context Value of "this" when calling function
 * @return {number} Interval ID
 */
horde.setInterval = function horde_setInterval (when, fn, context) {
	var f = function horde_setInterval_anon () {
		fn.call(context);
	};
	return window.setInterval(f, when);
};

/**
 * Context corrected .addEventListener() wrapper
 * @param {string} type Type of event
 * @param {object} fn Function to call
 * @param {object} target Object on which to listen
 * @param {object} context Value of "this" when calling function
 * @return {void}
 */
horde.on = function horde_on (type, fn, target, context) {
	target.addEventListener(type, function horde_on_anon (e) {
		fn.call(context, e);
	}, false);
};

/**
 * Returns the current UNIX time
 * @return {number} Millisecodns since epoch
 */
horde.now = function horde_now () {
	return Date.now();
};

/**
 * Creates a canvas elements and adds it to the document
 * @param {string} id Element ID attribute
 * @param {number} width Width of the canvas in pixels
 * @param {number} height Height of the canvas in pixels
 * @hidden {boolean} Whether or not this canvas is visible
 * @return {object} <canvas> element
 */
horde.makeCanvas = function horde_makeCanvas (id, width, height, hidden) {
	var canvas = document.createElement("canvas");
	canvas.id = id;
	canvas.width = Number(width) || 0;
	canvas.height = Number(height) || 0;
	if (hidden === true) {
		canvas.style.display = "none";
	}
	document.body.appendChild(canvas);
	return canvas;
};

/**
 * Returns a random number between min and max
 * @param {number} min Minimum number
 * @param {number} max Maximum number
 * @return {number} Random number between min and max
 */
horde.randomRange = function horde_randomRange (min, max) {
	return (Math.round(Math.random() * (max - min)) + min);
};

/**
 * Directions enumeration
 */
horde.directions = {
	UP: 0,
	UP_RIGHT: 1,
	RIGHT: 2,
	DOWN_RIGHT: 3,
	DOWN: 4,
	DOWN_LEFT: 5,
	LEFT: 6,
	UP_LEFT: 7,
	fromVector: function (v) {
		v.floor();
		if (v.x === 0 && v.y < 0) {
			return horde.directions.UP;
		}
		if (v.x > 0 && v.y < 0) {
			return horde.directions.UP_RIGHT;
		}
		if (v.x > 0 && v.y === 0) {
			return horde.directions.RIGHT;
		}
		if (v.x > 0 && v.y > 0) {
			return horde.directions.DOWN_RIGHT;
		}
		if (v.x === 0 && v.y > 0) {
			return horde.directions.DOWN;
		}
		if (v.x < 0 && v.y > 0) {
			return horde.directions.DOWN_LEFT;
		}
		if (v.x < 0 && v.y === 0) {
			return horde.directions.LEFT;
		}
		if (v.x < 0 && v.y < 0) {
			return horde.directions.UP_LEFT;
		}
	}
};

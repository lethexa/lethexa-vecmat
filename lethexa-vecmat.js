/* global exports */

(function (exports) {
    'use strict';
    var twoPI = Math.PI * 2.0;

    var round = function (x, digits) {
        var multiplier = Math.pow(10.0, digits);
        return Math.round(x * multiplier) / multiplier;
    };
    exports.roundDigits = round;

    exports.toRadians = function (value) {
        return value * Math.PI / 180.0;
    };

    exports.toDegrees = function (value) {
        return value * 180.0 / Math.PI;
    };

    exports.isExistent = function (value) {
        return value !== undefined && value !== null;
    };

    var toRange0_2PI = function (a) {
        while (a >= twoPI)
            a -= twoPI;
        while (a < 0)
            a += twoPI;
        return a;
    };
    exports.toRange0_2PI = toRange0_2PI;

    var toRangePI_PI = function (a) {
        while (a < - Math.PI)
            a += twoPI;
        while (a >= Math.PI)
            a -= twoPI;
        return a;
    };
    exports.toRangePI_PI = toRangePI_PI;



    /**
     * Converts a vector in array form to OpenGL.
     * @method toOpenGL
     * @static
     * @param v {Array} The array to convert
     * @return {Array} The OpenGL array
     */
    exports.toOpenGL = function (v) {
        return [v[0], v[2], -v[1]];
    };

    /**
     * Converts a vector in array form from OpenGL.
     * @method fromOpenGL
     * @static
     * @param v {Array} The array to convert
     * @return {Array} The OpenGL array
     */
    exports.fromOpenGL = function (v) {
        return [v[0], -v[2], v[1]];
    };


    /** 
     * Vector math in function-form.
     */
    exports.MathFunc3d = {
        makeVector: function (v) {
            return new exports.Vector3d(v[0], v[1], v[2]);
        },
        nullVector: function () {
            return new exports.Vector3d(0, 0, 0);
        },
        add: function (a, b) {
            return a.add(b);
        },
        sub: function (a, b) {
            return a.sub(b);
        },
        mulScalar: function (a, s) {
            return a.mulScalar(s);
        },
        dot: function (a, b) {
            return a.dot(b);
        },
        cross: function (a, b) {
            return a.cross(b);
        },
        unit: function (a) {
            return a.unit();
        },
        toArray: function (a) {
            return a.toArray();
        },
        lengthSquared: function (a) {
            return a.lengthSquared();
        }
    };





    /**
     * Calculates the intersection at y-axis for a given line
     * @method intersectionAtPositiveYAxis2d
     * @for Vector3d
     * @static
     * @param v1 {Vector3d} The first point of the line
     * @param v2 {Vector3d} The second point of the line
     * @return {Vector3d} The intersection-point 
     */
    exports.intersectionAtPositiveYAxis2d = function (v1, v2) {
        if (v1._y < 0.0 && v2._y < 0.0)
            return undefined; // Keine Lösung, hinter mir
        if (v1._x < 0.0 && v2._x < 0.0)
            return undefined; // Keine Lösung
        if (v1._x > 0.0 && v2._x > 0.0)
            return undefined; // Keine Lösung
        var mz = v2._y - v1._y;
        var mn = v2._x - v1._x;
        var y;
        if (mn === 0.0) {
            // Parallel zur y-achse
            y = (v2._y < v1._y ? v2._y : v1._y);
            if (y < 0.0)
                return undefined;
            return exports.vector3dFromElements(0.0, y, 0.0);
        } else {
            y = (v1._y + (mz / mn) * (0.0 - v1._x));
            if (y < 0.0)
                return undefined;
            return exports.vector3dFromElements(0.0, y, 0.0);
        }
    };





    /**
     * Creates a 2d-vector from a string
     * @method vector2dFromString
     * @for Vector2d
     * @static
     * @param vecAsString {String} The vector as string of format '0.0;0.0'
     * @example
     var v = vecmat.vector2dFromString('0.0;0.0');
     */
    exports.vector2dFromString = function (vecAsString) {
        var parts = vecAsString.split(';');
        if (parts.length < 2)
            throw new Error('Too few arguments');
        return new exports.Vector2d(
                parseFloat(parts[0]),
                parseFloat(parts[1])
                );
    };

    /**
     * Creates a vector from polar coordinates
     * @method vector2dFromPolar
     * @for Vector2d
     * @static
     * @param pitch {Number} The pitch angle
     * @param distance {Number} The distance
     * @return {Vector2d} The resulting vector
     */
    exports.vector2dFromPolar = function (pitch, distance) {
        return new exports.Vector2d(
                distance * Math.cos(pitch),
                distance * Math.sin(pitch)
                );
    };

    /**
     * Creates a vector from an array
     * @method vector2dFromArray
     * @for Vector2d
     * @static
     * @param elements {Array} The vector as array [x,y]
     * @return {Vector2d} The resulting vector
     */
    exports.vector2dFromArray = function (elements) {
        return new exports.Vector2d(
                elements[0],
                elements[1]
                );
    };

    /**
     * Creates a vector from an the elements x, y
     * @method vector2dFromElements
     * @for Vector2d
     * @static
     * @param x {Number} The x-value
     * @param y {Number} The y-value
     * @return {Vector2d} The resulting vector
     */
    exports.vector2dFromElements = function (x, y) {
        return new exports.Vector2d(x, y);
    };

    /**
     * Creates a vector from an the elements x, y
     * @class Vector2d
     * @constructor
     * @param x {Number} The x-value
     * @param y {Number} The y-value
     * @example
     var vecmat = require('lethexa-vecmat');
     
     var v = new vecmat.Vector2d(1.0, 2.0);
     */
    exports.Vector2d = function (x, y) {
        this._x = x || 0.0;
        this._y = y || 0.0;
    };

    /**
     * Copies this vector to a new one.
     * @method clone
     * @return The new vector 
     */
    exports.Vector2d.prototype.clone = function () {
        return new exports.Vector2d(this._x, this._y);
    };

    /**
     * Rounds the floored vector
     * @method floor
     * @return The result with floored elements 
     */
    exports.Vector2d.prototype.floor = function () {
        return new exports.Vector2d(
                Math.floor(this._x),
                Math.floor(this._y)
                );
    };

    /**
     * Rounds the ceiled vector
     * @method ceil
     * @return The result with ceil elements 
     */
    exports.Vector2d.prototype.ceil = function () {
        return new exports.Vector2d(
                Math.ceil(this._x),
                Math.ceil(this._y)
                );
    };

    /**
     * Rounds the floored vector
     * @method floor
     * @return The result with floored elements 
     */
    exports.Vector2d.prototype.floor = function () {
        return new exports.Vector2d(
                Math.floor(this._x),
                Math.floor(this._y)
                );
    };

    /**
     * Fetches the minimum components of the vector
     * @method min
     * @param a The Vector
     * @param b The Vector
     * @return The vector with minimum components from both.
     */
    exports.Vector2d.prototype.min = function (a, b) {
        return new exports.Vector2d(
                Math.min(a._x, b._x),
                Math.min(a._y, b._y)
                );
    };

    /**
     * Fetches the minimum components of the vector
     * @method max
     * @param a The Vector
     * @param b The Vector
     * @return The vector with minimum components from both.
     */
    exports.Vector2d.prototype.max = function (a, b) {
        return new exports.Vector2d(
                Math.max(a._x, b._x),
                Math.max(a._y, b._y)
                );
    };

    /**
     * Rounds the elements to the given fraction-digits
     * @method round
     * @param digits {Number} Number of digits to round.
     * @return The result with rounded elements 
     */
    exports.Vector2d.prototype.round = function (digits) {
        return new exports.Vector2d(
                round(this._x, digits),
                round(this._y, digits)
                );
    };

    /**
     * Checks for equality and returns true if equal
     * @method isEqualTo
     * @param v {Vector2d} The vector to check against.
     * @return True if both are equal 
     */
    exports.Vector2d.prototype.isEqualTo = function (v) {
        if (this._x !== v._x)
            return false;
        if (this._y !== v._y)
            return false;
        return true;
    };

    /**
     * Returns the x-value of the vector
     * @method x 
     * @return {Number} The x-value
     */
    exports.Vector2d.prototype.x = function () {
        return this._x;
    };

    /**
     * Returns the y-value of the vector
     * @method y 
     * @return {Number} The x-value
     */
    exports.Vector2d.prototype.y = function () {
        return this._y;
    };

    /**
     * The length of the vector
     * @method length
     * @return {Number} The length of the vector
     */
    exports.Vector2d.prototype.length = function () {
        return Math.sqrt(this.lengthSquared());
    };

    /**
     * The squared length of the vector
     * @method lengthSquared
     * @return {Number} The squared length of the vector
     */
    exports.Vector2d.prototype.lengthSquared = function () {
        return this._x * this._x + this._y * this._y;
    };

    /**
     * The distance from one vector to another.
     * @method distanceTo
     * @param v {Vector2d} The other vector
     * @return {Number} The distance to the vector
     */
    exports.Vector2d.prototype.distanceTo = function (v) {
        return v.sub(this).length();
    };

    /**
     * The squared distance from one vector to another.
     * @method distanceSquaredTo
     * @param v {Vector2d} The other vector
     * @return {Number} The squared distance to the vector
     */
    exports.Vector2d.prototype.distanceSquaredTo = function (v) {
        return v.sub(this).lengthSquared();
    };

    /**
     * Creates the unit-vector
     * @method unit
     * @return {Vector2d} The unit-vector
     */
    exports.Vector2d.prototype.unit = function () {
        var betrag = this.length();
        if (betrag === 0.0)
            return undefined;
        return new exports.Vector2d(
                this._x / betrag,
                this._y / betrag
                );
    };

    /**
     * Creates the negativ vector
     * @method neg
     * @return {Vector2d} The neg-vector
     */
    exports.Vector2d.prototype.neg = function () {
        return new exports.Vector2d(
                -this._x,
                -this._y
                );
    };

    /**
     * Calculates the angle of the vector from x to y
     * @method pitch
     * @return {Number} The pitch-angle
     */
    exports.Vector2d.prototype.pitch = function () {
        var pitch = Math.atan2(this._y, this._x);
        return pitch;
    };


    /**
     * Adds this vector to another
     * @method add
     * @param v {Vector2d} The vector to add.
     * @return {Vector2d} The resulting sum
     */
    exports.Vector2d.prototype.add = function (v) {
        return new exports.Vector2d(
                this._x + v._x,
                this._y + v._y
                );
    };

    /**
     * Subtracts another vector from this
     * @method sub
     * @param v {Vector2d} The vector to subtract.
     * @return {Vector2d} The resulting subtraction
     */
    exports.Vector2d.prototype.sub = function (v) {
        return new exports.Vector2d(
                this._x - v._x,
                this._y - v._y
                );
    };

    /**
     * Multiplies this vector and a scalar value 
     * @method mul
     * @param s {Number} The scalar to multiply.
     * @return {Vector2d} The resulting vector
     */
    exports.Vector2d.prototype.mul = function (s) {
        return this.mulScalar(s);
    };

    /**
     * Multiplies this vector and a scalar value 
     * @method mulScalar
     * @param s {Number} The scalar to multiply.
     * @return {Vector2d} The resulting vector
     */
    exports.Vector2d.prototype.mulScalar = function (s) {
        return new exports.Vector2d(
                this._x * s,
                this._y * s
                );
    };

    /**
     * Calculates the dot-product of two vectors
     * @method dot
     * @param b {Vector2d} The other vector
     * @return {Number} The resulting scalar value
     */
    exports.Vector2d.prototype.dot = function (b) {
        return this._x * b._x + this._y * b._y;
    };

    /**
     * Converts the vector to an array
     * @method toArray
     * @return {Array} The array
     */
    exports.Vector2d.prototype.toArray = function () {
        return [this._x, this._y];
    };

    /**
     * Creates a string from the vector
     * @method toString
     * @return {String} The vector as string
     */
    exports.Vector2d.prototype.toString = function () {
        return '' + this._x + ';' + this._y;
    };

    var vec2UnitX = Object.freeze(new exports.Vector2d(1.0, 0.0));
    var vec2UnitY = Object.freeze(new exports.Vector2d(0.0, 1.0));
    var vec2Null = Object.freeze(new exports.Vector2d(0.0, 0.0));

    /**
     * Creates a unit-vector on the x-axis
     * @method makeUnitXVector2d
     * @for Vector2d
     * @return The vector
     */
    exports.makeUnitXVector2d = function () {
        return vec2UnitX;
    };

    /**
     * Creates a unit-vector on the y-axis
     * @method makeUnitYVector2d
     * @for Vector2d
     * @return The vector
     */
    exports.makeUnitYVector2d = function () {
        return vec2UnitY;
    };

    /**
     * Creates a null-vector
     * @method makeNullVector2d
     * @for Vector2d
     * @return The vector
     */
    exports.makeNullVector2d = function () {
        return vec2Null;
    };









    /**
     * Creates a 3d-vector from a string
     * @method vector3dFromString
     * @for Vector3d
     * @static
     * @param vecAsString {String} The vector as string of format '0.0;0.0;0.0'
     * @example
     var v = vecmat.vector3dFromString('0.0;0.0;0.0');
     */
    exports.vector3dFromString = function (vecAsString) {
        var parts = vecAsString.split(';');
        if (parts.length < 3)
            throw new Error('Too few arguments');
        return new exports.Vector3d(
                parseFloat(parts[0]),
                parseFloat(parts[1]),
                parseFloat(parts[2])
                );
    };

    /**
     * Creates a vector from polar coordinates
     * @method vector3dFromPolar
     * @for Vector3d
     * @static
     * @param pitch {Number} The pitch angle
     * @param yaw {Number} The yaw angle
     * @param distance {Number} The distance
     * @return {Vector3d} The resulting vector
     */
    exports.vector3dFromPolar = function (pitch, yaw, distance) {
        var cosPitchDist = distance * Math.cos(pitch);
        var sinPitchDist = -distance * Math.sin(pitch);

        return new exports.Vector3d(
                cosPitchDist * Math.cos(yaw),
                cosPitchDist * Math.sin(yaw),
                sinPitchDist);
    };

    /**
     * Creates a vector from an array
     * @method vector3dFromArray
     * @for Vector3d
     * @static
     * @param elements {Array} The vector as array [x,y,z]
     * @return {Vector3d} The resulting vector
     */
    exports.vector3dFromArray = function (elements) {
        return new exports.Vector3d(
                elements[0],
                elements[1],
                elements[2]
                );
    };

    /**
     * Creates a vector from an OpenGL array
     * @method vector3dFromOpenGLArray
     * @for Vector3d
     * @static
     * @param elements {Array} The vector as array [x,y,z]
     * @return {Vector3d} The resulting vector
     */
    exports.vector3dFromOpenGLArray = function (elements) {
        return new exports.Vector3d(
                elements[0],
                -elements[2],
                elements[1]
                );
    };

    /**
     * Creates a vector from an the elements x, y, z
     * @method vector3dFromElements
     * @for Vector3d
     * @static
     * @param x {Number} The x-value
     * @param y {Number} The y-value
     * @param z {Number} The z-value
     * @return {Vector3d} The resulting vector
     */
    exports.vector3dFromElements = function (x, y, z) {
        return new exports.Vector3d(x, y, z);
    };

    /**
     * Creates a vector from an the elements x, y, z
     * @class Vector3d
     * @constructor
     * @param x {Number} The x-value
     * @param y {Number} The y-value
     * @param z {Number} The z-value
     * @example
     var vecmat = require('lethexa-vecmat');
     
     var v = new vecmat.Vector3d(1.0, 2.0, 3.0);
     */
    exports.Vector3d = function (x, y, z) {
        this._x = x || 0.0;
        this._y = y || 0.0;
        this._z = z || 0.0;
    };

    /**
     * Copies this vector to a new one.
     * @method clone
     * @return The new vector 
     */
    exports.Vector3d.prototype.clone = function () {
        return new exports.Vector3d(this._x, this._y, this._z);
    };

    /**
     * Rounds the floored vector
     * @method floor
     * @return The result with floored elements 
     */
    exports.Vector3d.prototype.floor = function () {
        return new exports.Vector3d(
                Math.floor(this._x),
                Math.floor(this._y),
                Math.floor(this._z)
                );
    };

    /**
     * Rounds the ceiled vector
     * @method ceil
     * @return The result with ceil elements 
     */
    exports.Vector3d.prototype.ceil = function () {
        return new exports.Vector3d(
                Math.ceil(this._x),
                Math.ceil(this._y),
                Math.ceil(this._z)
                );
    };

    /**
     * Rounds the floored vector
     * @method floor
     * @return The result with floored elements 
     */
    exports.Vector3d.prototype.floor = function () {
        return new exports.Vector3d(
                Math.floor(this._x),
                Math.floor(this._y),
                Math.floor(this._z)
                );
    };

    /**
     * Fetches the minimum components of the vector
     * @method min
     * @param a The Vector
     * @param b The Vector
     * @return The vector with minimum components from both.
     */
    exports.Vector3d.prototype.min = function (a, b) {
        return new exports.Vector3d(
                Math.min(a._x, b._x),
                Math.min(a._y, b._y),
                Math.min(a._z, b._z)
                );
    };

    /**
     * Fetches the minimum components of the vector
     * @method max
     * @param a The Vector
     * @param b The Vector
     * @return The vector with minimum components from both.
     */
    exports.Vector3d.prototype.max = function (a, b) {
        return new exports.Vector3d(
                Math.max(a._x, b._x),
                Math.max(a._y, b._y),
                Math.max(a._z, b._z)
                );
    };

    /**
     * Rounds the elements of the vector to the given fraction-digits
     * @method round
     * @param digits {Number} Number of digits to round.
     * @return The vector with rounded elements 
     */
    exports.Vector3d.prototype.round = function (digits) {
        return new exports.Vector3d(
                round(this._x, digits),
                round(this._y, digits),
                round(this._z, digits)
                );
    };

    /**
     * Checks for equality and returns true if equal
     * @method isEqualTo
     * @param v {Vector3d} The vector to check against.
     * @return True if both are equal 
     */
    exports.Vector3d.prototype.isEqualTo = function (v) {
        if (this._x !== v._x)
            return false;
        if (this._y !== v._y)
            return false;
        if (this._z !== v._z)
            return false;
        return true;
    };

    /**
     * Returns the x-value of the vector
     * @method x 
     * @return {Number} The x-value
     */
    exports.Vector3d.prototype.x = function () {
        return this._x;
    };

    /**
     * Returns the y-value of the vector
     * @method y 
     * @return {Number} The x-value
     */
    exports.Vector3d.prototype.y = function () {
        return this._y;
    };

    /**
     * Returns the z-value of the vector
     * @method z 
     * @return {Number} The x-value
     */
    exports.Vector3d.prototype.z = function () {
        return this._z;
    };

    /**
     * The length of the vector
     * @method length
     * @return {Number} The length of the vector
     */
    exports.Vector3d.prototype.length = function () {
        return Math.sqrt(this.lengthSquared());
    };

    /**
     * The squared length of the vector
     * @method lengthSquared
     * @return {Number} The squared length of the vector
     */
    exports.Vector3d.prototype.lengthSquared = function () {
        return this._x * this._x + this._y * this._y + this._z * this._z;
    };

    /**
     * The distance from one vector to another.
     * @method distanceTo
     * @param v {Vector3d} The other vector
     * @return {Number} The distance to the vector
     */
    exports.Vector3d.prototype.distanceTo = function (v) {
        return v.sub(this).length();
    };

    /**
     * The squared distance from one vector to another.
     * @method distanceSquaredTo
     * @param v {Vector2d} The other vector
     * @return {Number} The squared distance to the vector
     */
    exports.Vector3d.prototype.distanceSquaredTo = function (v) {
        return v.sub(this).lengthSquared();
    };

    /**
     * Creates the unit-vector
     * @method unit
     * @return {Vector3d} The unit-vector
     */
    exports.Vector3d.prototype.unit = function () {
        var betrag = this.length();
        if (betrag === 0.0)
            return undefined;
        return new exports.Vector3d(
                this._x / betrag,
                this._y / betrag,
                this._z / betrag
                );
    };

    /**
     * Creates the negativ vector
     * @method neg
     * @return {Vector3d} The neg-vector
     */
    exports.Vector3d.prototype.neg = function () {
        return new exports.Vector3d(
                -this._x,
                -this._y,
                -this._z
                );
    };

    /**
     * Calculates the angle of the vector from z to the xy-plane
     * @method pitch
     * @return {Number} The pitch-angle
     */
    exports.Vector3d.prototype.pitch = function () {
        var distXY = Math.sqrt(this._x * this._x + this._y * this._y);
        var pitch = -Math.atan2(this._z, distXY);
        return pitch;
    };

    /**
     * Calculates the angle of the vector in xy-plane
     * @method yaw
     * @return {Number} The yaw-angle
     */
    exports.Vector3d.prototype.yaw = function () {
        var yaw = Math.atan2(this._y, this._x);
        return yaw;
    };

    /**
     * Adds this vector to another
     * @method add
     * @param v {Vector3d} The vector to add.
     * @return {Vector3d} The resulting sum
     */
    exports.Vector3d.prototype.add = function (v) {
        return new exports.Vector3d(
                this._x + v._x,
                this._y + v._y,
                this._z + v._z
                );
    };

    /**
     * Subtracts another vector from this
     * @method sub
     * @param v {Vector3d} The vector to subtract.
     * @return {Vector3d} The resulting subtraction
     */
    exports.Vector3d.prototype.sub = function (v) {
        return new exports.Vector3d(
                this._x - v._x,
                this._y - v._y,
                this._z - v._z
                );
    };

    /**
     * Multiplies this vector and a scalar value 
     * @method mul
     * @param s {Number} The scalar to multiply.
     * @return {Vector3d} The resulting vector
     */
    exports.Vector3d.prototype.mul = function (s) {
        return this.mulScalar(s);
    };

    /**
     * Multiplies this vector and a scalar value 
     * @method mulScalar
     * @param s {Number} The scalar to multiply.
     * @return {Vector3d} The resulting vector
     */
    exports.Vector3d.prototype.mulScalar = function (s) {
        return new exports.Vector3d(
                this._x * s,
                this._y * s,
                this._z * s
                );
    };

    /**
     * Calculates the dot-product of two vectors
     * @method dot
     * @param b {Vector3d} The other vector
     * @return {Number} The resulting scalar value
     */
    exports.Vector3d.prototype.dot = function (b) {
        return this._x * b._x + this._y * b._y + this._z * b._z;
    };

    /**
     * Calculates the cross-product of two vectors
     * @method cross
     * @param b {Vector3d} The other vector creating the plane
     * @return {Vector3d} The vector perpendicular to the plane of this ans b
     */
    exports.Vector3d.prototype.cross = function (b) {
        var x = this._y * b._z - this._z * b._y;
        var y = this._z * b._x - this._x * b._z;
        var z = this._x * b._y - this._y * b._x;
        return new exports.Vector3d(x, y, z);
    };

    /**
     * Calculates the spat-product of three vectors
     * @method spat
     * @param b {Vector3d} The second vector
     * @param c {Vector3d} The third vector
     * @return {Number} The result
     */
    exports.Vector3d.prototype.spat = function (b, c) {
        return this.dot(b.cross(c));
    };

    /**
     * Converts the vector to an array
     * @method toArray
     * @return {Array} The array
     */
    exports.Vector3d.prototype.toArray = function () {
        return [this._x, this._y, this._z];
    };

    /**
     * Converts the vector to an array
     * @method toArray
     * @return {Array} The array
     */
    exports.Vector3d.prototype.toOpenGLArray = function () {
        return [this._x, this._z, -this._y];
    };

    /**
     * Creates a string from the vector
     * @method toString
     * @return {String} The vector as string
     */
    exports.Vector3d.prototype.toString = function () {
        return '' + this._x + ';' + this._y + ';' + this._z;
    };

    var vec3UnitX = Object.freeze(new exports.Vector3d(1.0, 0.0, 0.0));
    var vec3UnitY = Object.freeze(new exports.Vector3d(0.0, 1.0, 0.0));
    var vec3UnitZ = Object.freeze(new exports.Vector3d(0.0, 0.0, 1.0));
    var vec3Null = Object.freeze(new exports.Vector3d(0.0, 0.0, 0.0));

    /**
     * Creates a unit-vector on the x-axis
     * @method makeUnitXVector3d
     * @for Vector3d
     * @return The vector
     */
    exports.makeUnitXVector3d = function () {
        return vec3UnitX;
    };

    /**
     * Creates a unit-vector on the y-axis
     * @method makeUnitYVector3d
     * @for Vector3d
     * @return The vector
     */
    exports.makeUnitYVector3d = function () {
        return vec3UnitY;
    };

    /**
     * Creates a unit-vector on the z-axis
     * @method makeUnitZVector3d
     * @for Vector3d
     * @return The vector
     */
    exports.makeUnitZVector3d = function () {
        return vec3UnitZ;
    };

    /**
     * Creates a null-vector
     * @method makeNullVector3d
     * @for Vector3d
     * @return The vector
     */
    exports.makeNullVector3d = function () {
        return vec3Null;
    };






    /**
     * Creates a matrix from an two-dimensional array
     * @method matrix3x3FromArray
     * @for Matrix3x3
     * @param array {Array} The matrix
     * @return The matrix
     */
    exports.matrix3x3FromArray = function (array) {
        return new exports.Matrix3x3(array);
    };

    /**
     * Creates a Matrix from the axises of a coordinate system.
     * 
     * @param {Vector3d} r Right
     * @param {Vector3d} u Up
     * @param {Vector3d} f Front
     */
    exports.matrix3x3FromColumnVectors = function(r, u, f) {
        return exports.matrix3x3FromArray([
            [r.x(), u.x(), f.x()],
            [r.y(), u.y(), f.y()],
            [r.z(), u.z(), f.z()]
        ]);
    };

    /**
     * Creates a Matrix from the axises of a coordinate system.
     * 
     * @param {Vector3d} r Right
     * @param {Vector3d} u Up
     * @param {Vector3d} f Front
     */
    exports.matrix3x3FromRowVectors = function(r, u, f) {
        return exports.matrix3x3FromArray([
            r.toArray(),
            u.toArray(),
            f.toArray()
        ]);
    };

    /**
     * Creates a unit matrix array
     * @method makeUnitMatrix3x3
     * @for Matrix3x3
     * @return The unit matrix
     */
    exports.makeUnitMatrix3x3 = function () {
        return new exports.Matrix3x3([
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]);
    };

    /**
     * Creates a null matrix array
     * @method makeNullMatrix3x3
     * @for Matrix3x3
     * @return The null matrix
     */
    exports.makeNullMatrix3x3 = function () {
        return new exports.Matrix3x3([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]);
    };

    /**
     * Creates a transformation-matrix (local to global) from euler angles
     * @method toGlobalMatrix3x3
     * @for Matrix3x3
     * @param phi {Number} Angle around x-axis
     * @param theta {Number} Angle around y-axis
     * @param psi {Number} Angle around z-axis
     * @return The transformation matrix
     */
    exports.toGlobalMatrix3x3 = function (phi, theta, psi) {
        var mRotToGlobal = exports.makeUnitMatrix3x3();
        if (phi !== 0.0)
            mRotToGlobal = exports.makeXRotation3x3(phi).mul(mRotToGlobal);
        if (theta !== 0.0)
            mRotToGlobal = exports.makeYRotation3x3(theta).mul(mRotToGlobal);
        if (psi !== 0.0)
            mRotToGlobal = exports.makeZRotation3x3(psi).mul(mRotToGlobal);
        return mRotToGlobal;
    };

    /**
     * Creates a transformation-matrix (global to local) from euler angles
     * @method toLocalMatrix3x3
     * @for Matrix3x3
     * @param phi {Number} Angle around x-axis
     * @param theta {Number} Angle around y-axis
     * @param psi {Number} Angle around z-axis
     * @return The transformation matrix
     */
    exports.toLocalMatrix3x3 = function (phi, theta, psi) {
        var mRotToGlobal = exports.makeUnitMatrix3x3();
        if (psi !== 0.0)
            mRotToGlobal = exports.makeZRotation3x3(psi).mul(mRotToGlobal);
        if (theta !== 0.0)
            mRotToGlobal = exports.makeYRotation3x3(theta).mul(mRotToGlobal);
        if (phi !== 0.0)
            mRotToGlobal = exports.makeXRotation3x3(phi).mul(mRotToGlobal);
        return mRotToGlobal;
    };

    /**
     * Creates a rotation around the x-axis
     * @method makeXRotation3x3
     * @for Matrix3x3
     * @param angle {Number} Angle around x-axis
     * @return The rotation matrix
     */
    exports.makeXRotation3x3 = function (angle) {
        var si_x = Math.sin(angle);
        var co_x = Math.cos(angle);
        return new exports.Matrix3x3([
            [1.0, 0.0, 0.0],
            [0.0, co_x, -si_x],
            [0.0, si_x, co_x]
        ]);
    };

    /**
     * Creates a rotation around the y-axis
     * @method makeXRotation3x3
     * @for Matrix3x3
     * @param angle {Number} Angle around y-axis
     * @return The rotation matrix
     */
    exports.makeYRotation3x3 = function (angle) {
        var si_y = Math.sin(angle);
        var co_y = Math.cos(angle);
        return new exports.Matrix3x3([
            [co_y, 0.0, si_y],
            [0.0, 1.0, 0.0],
            [-si_y, 0.0, co_y]
        ]);
    };

    /**
     * Creates a rotation around the z-axis
     * @method makeXRotation3x3
     * @for Matrix3x3
     * @param angle {Number} Angle around z-axis
     * @return The rotation matrix
     */
    exports.makeZRotation3x3 = function (angle) {
        var si_z = Math.sin(angle);
        var co_z = Math.cos(angle);
        return new exports.Matrix3x3([
            [co_z, -si_z, 0.0],
            [si_z, co_z, 0.0],
            [0.0, 0.0, 1.0]
        ]);
    };

    /**
     * Creates a scalematrix
     * @method makeScale3x3
     * @for Matrix3x3
     * @param scaleX {Number} Scale in x-axis
     * @param scaleY {Number} Scale in y-axis
     * @param scaleZ {Number} Scale in z-axis
     * @return The scale matrix
     */
    exports.makeScale3x3 = function (scaleX, scaleY, scaleZ) {
        return new exports.Matrix3x3([
            [scaleX, 0.0, 0.0],
            [0.0, scaleY, 0.0],
            [0.0, 0.0, scaleZ]
        ]);
    };

    /**
     * Creates a 3x3-matrix fro the given elements.
     * The elements are an two-dimensional array
     * @class Matrix3x3
     * @constructor
     * @param elements {Array} A two-dimensional array 3x3 of elements.
     * @example
     
     var vecmat = require('lethexa-vecmat');
     
     var m = new vecmat.Matrix3x3([
     [1,0,0], 
     [0,1,0], 
     [0,0,1]
     ]);
     */
    exports.Matrix3x3 = function (elements) {
        if (elements.length < 3)
            throw new Error('vertical array to short');
        this._elements = elements;

        this.e11 = this._elements[0][0];
        this.e12 = this._elements[0][1];
        this.e13 = this._elements[0][2];

        this.e21 = this._elements[1][0];
        this.e22 = this._elements[1][1];
        this.e23 = this._elements[1][2];

        this.e31 = this._elements[2][0];
        this.e32 = this._elements[2][1];
        this.e33 = this._elements[2][2];
    };

    /**
     * Copies this matrix to a new one.
     * @method clone
     * @return The cloned matrix 
     */
    exports.Matrix3x3.prototype.clone = function () {
        return new exports.Matrix3x3([
            [this.e11, this.e12, this.e13],
            [this.e21, this.e22, this.e23],
            [this.e31, this.e32, this.e33]
        ]);
    };

    /**
     * Rounds the elements of the matrix to the given fraction-digits
     * @method round
     * @param digits {Number} Number of digits to round.
     * @return The matrix with rounded elements 
     */
    exports.Matrix3x3.prototype.round = function (digits) {
        return new exports.Matrix3x3([
            [round(this.e11, digits), round(this.e12, digits), round(this.e13, digits)],
            [round(this.e21, digits), round(this.e22, digits), round(this.e23, digits)],
            [round(this.e31, digits), round(this.e32, digits), round(this.e33, digits)]
        ]);
    };

    exports.Matrix3x3.prototype.isEqualTo = function (m) {
        var x, y;
        for (y = 0; y < this._elements.length; y++) {
            for (x = 0; x < this._elements[y].length; x++) {
                if (this._elements[y][x] !== m._elements[y][x]) {
                    return false;
                }
            }
        }
        return true;
    };

    /**
     * Multiplies with a scalar value.
     * @method mulScalar
     * @param s {Number} A scalar value
     * @return The resulting matrix
     */
    exports.Matrix3x3.prototype.mulScalar = function (s) {
        return new exports.Matrix3x3([
            [this.e11 * s, this.e12 * s, this.e13 * s],
            [this.e21 * s, this.e22 * s, this.e23 * s],
            [this.e31 * s, this.e32 * s, this.e33 * s]
        ]);
    };

    /**
     * Multiplies with a vector value.
     * @method mulVector
     * @param u {Vector} A vector
     * @return The resulting vector
     */
    exports.Matrix3x3.prototype.mulVector = function (u) {
        if (!(u instanceof exports.Vector3d))
            throw new Error('u is not a Vector3d');
        return new exports.Vector3d(
                this.e11 * u.x() + this.e12 * u.y() + this.e13 * u.z(),
                this.e21 * u.x() + this.e22 * u.y() + this.e23 * u.z(),
                this.e31 * u.x() + this.e32 * u.y() + this.e33 * u.z()
                );
    };



    /**
     * Multiplies with an other Matrix3x3.
     * @method mul
     * @param m {Matrix3x3} The matrix to multiply with
     * @return The resulting matrix
     */
    exports.Matrix3x3.prototype.mul = function (m) {
        if (!(m instanceof exports.Matrix3x3))
            throw new Error('m is not a Matrix3x3');
        return new exports.Matrix3x3([
            [
                this.e11 * m.e11 + this.e12 * m.e21 + this.e13 * m.e31,
                this.e11 * m.e12 + this.e12 * m.e22 + this.e13 * m.e32,
                this.e11 * m.e13 + this.e12 * m.e23 + this.e13 * m.e33
            ],
            [
                this.e21 * m.e11 + this.e22 * m.e21 + this.e23 * m.e31,
                this.e21 * m.e12 + this.e22 * m.e22 + this.e23 * m.e32,
                this.e21 * m.e13 + this.e22 * m.e23 + this.e23 * m.e33
            ],
            [
                this.e31 * m.e11 + this.e32 * m.e21 + this.e33 * m.e31,
                this.e31 * m.e12 + this.e32 * m.e22 + this.e33 * m.e32,
                this.e31 * m.e13 + this.e32 * m.e23 + this.e33 * m.e33
            ]
        ]);
    };

    /**
     * Adds an other Matrix3x3.
     * @method add
     * @param m2 {Matrix3x3} The matrix to add
     * @return The resulting matrix
     */
    exports.Matrix3x3.prototype.add = function (m2) {
        return new exports.Matrix3x3([
            [
                this.e11 + m2.e11,
                this.e12 + m2.e12,
                this.e13 + m2.e13
            ],
            [
                this.e21 + m2.e21,
                this.e22 + m2.e22,
                this.e23 + m2.e23
            ],
            [
                this.e31 + m2.e31,
                this.e32 + m2.e32,
                this.e33 + m2.e33
            ]
        ]);
    };

    /**
     * Subtracts an other Matrix3x3.
     * @method sub
     * @param m2 {Matrix3x3} The matrix to subtract
     * @return The resulting matrix
     */
    exports.Matrix3x3.prototype.sub = function (m2) {
        return new exports.Matrix3x3([
            [
                this.e11 - m2.e11,
                this.e12 - m2.e12,
                this.e13 - m2.e13
            ],
            [
                this.e21 - m2.e21,
                this.e22 - m2.e22,
                this.e23 - m2.e23
            ],
            [
                this.e31 - m2.e31,
                this.e32 - m2.e32,
                this.e33 - m2.e33
            ]
        ]);
    };

    /**
     * Returns the transposed matrix
     * @method transpose
     * @return The resulting matrix
     */
    exports.Matrix3x3.prototype.transpose = function () {
        return new exports.Matrix3x3([
            [this.e11, this.e21, this.e31],
            [this.e12, this.e22, this.e32],
            [this.e13, this.e23, this.e33]
        ]);
    };

    /**
     * Calculates the determinante of the matrix
     * @method det
     * @return The resulting determinante
     */
    exports.Matrix3x3.prototype.det = function () {
        return this.e11 * this.e22 * this.e33 +
                this.e12 * this.e23 * this.e31 +
                this.e13 * this.e21 * this.e32 -
                this.e13 * this.e22 * this.e31 -
                this.e11 * this.e23 * this.e32 -
                this.e12 * this.e21 * this.e33;
    };


    /**
     * Calculates the inverse of the matrix
     * @method inverse
     * @return The resulting inverse matrix
     */
    exports.Matrix3x3.prototype.inverse = function () {
        var d = this.det();
        if (d === 0.0)
            d = 1;
        return exports.matrix3x3FromArray([
            [(this.e22 * this.e23 - this.e23 * this.e32) / d,
                -(this.e12 * this.e33 - this.e13 * this.e32) / d,
                (this.e12 * this.e23 - this.e13 * this.e22) / d],
            [-(this.e21 * this.e33 - this.e23 * this.e31) / d,
                (this.e11 * this.e33 - this.e13 * this.e31) / d,
                -(this.e11 * this.e23 - this.e13 * this.e21) / d],
            [(this.e21 * this.e32 - this.e22 * this.e31) / d,
                -(this.e11 * this.e32 - this.e12 * this.e31) / d,
                (this.e11 * this.e22 - this.e12 * this.e21) / d]
        ]);
    };

    /**
     * Returns the euler-angle around the x-axis
     * @method phi
     * @return The angle
     */
    exports.Matrix3x3.prototype.phi = function () {
        return Math.atan2(this.e32, this.e33);
    };

    /**
     * Returns the euler-angle around the y-axis
     * @method theta
     * @return The angle
     */
    exports.Matrix3x3.prototype.theta = function () {
        return Math.asin(-this.e31);
    };

    /**
     * Returns the euler-angle around the z-axis
     * @method psi
     * @return The angle
     */
    exports.Matrix3x3.prototype.psi = function () {
        return Math.atan2(this.e21, this.e11);
    };

    /**
     * Creates an array from the matrix.
     * @method toArray
     * @return The matrix as array
     */
    exports.Matrix3x3.prototype.toArray = function () {
        return  [
            [this.e11, this.e12, this.e13],
            [this.e21, this.e22, this.e23],
            [this.e31, this.e32, this.e33]
        ];
    };

    /**
     * Creates a string of the matrix
     * @method toString
     * @return {String} Matrix as string
     */
    exports.Matrix3x3.prototype.toString = function () {
        var result = '';
        this._elements.forEach(function (rowsArray) {
            rowsArray.forEach(function (value) {
                result += '' + value + ',';
            });
            result += '\n';
        });
        return result;
    };




    /**
     * Create the shortest arc quaternion
     * @method shortestArcQuat
     * @for Quat
     * @static
     * @param v0 {Vector3d} The first vector
     * @param v1 {Vector3d} The second vector
     * @return The quaternion
     */
    exports.shortestArcQuat = function (v0, v1) {
        v0 = v0.unit();
        v1 = v1.unit();
        var c = v0.cross(v1);
        var d = v0.dot(v1);
        if (d === -1.0) {
            return exports.quatFromRotation(Math.PI, exports.makeNullVector3d());
        } else if (d === 1.0) {
            return exports.quatFromRotation(0.0, exports.makeUnitZVector3d());
        }
        var s = Math.sqrt((1.0 + d) * 2.0);
        return new exports.Quat(
                s / 2.0,
                new exports.Vector3d(
                        c.x() / s,
                        c.y() / s,
                        c.z() / s
                        )
                );
    };


    /**
     * Create a quaternion from euler angles
     * @method quatFromEulerAngles
     * @for Quat
     * @static
     * @param phi {Number} Angle around x-axis
     * @param theta {Number} Angle around y-axis
     * @param psi {Number} Angle around z-axis
     * @return The resulting quaternion
     */
    exports.quatFromEulerAngles = function (phi, theta, psi) {
        var croll = Math.cos(0.5 * phi);
        var cpitch = Math.cos(0.5 * theta);
        var cyaw = Math.cos(0.5 * psi);

        var sroll = Math.sin(0.5 * phi);
        var spitch = Math.sin(0.5 * theta);
        var syaw = Math.sin(0.5 * psi);

        var cyawcpitch = cyaw * cpitch;
        var syawspitch = syaw * spitch;
        var cyawspitch = cyaw * spitch;
        var syawcpitch = syaw * cpitch;

        return new exports.Quat(
                cyawcpitch * croll + syawspitch * sroll,
                new exports.Vector3d(
                        cyawcpitch * sroll - syawspitch * croll,
                        cyawspitch * croll + syawcpitch * sroll,
                        syawcpitch * croll - cyawspitch * sroll
                        )
                );
    };

    /**
     * Create a quaternion from a rotation around an axis as unit-vector
     * @method quatFromRotation
     * @for Quat
     * @static
     * @param angle {Number} The angle around the axis
     * @param axis {Vector3d} The rotation-axis
     * @return The rotation-quaternion
     */
    exports.quatFromRotation = function (angle, axis) {
        var halfAngle = angle * 0.5;
        return new exports.Quat(
                Math.cos(halfAngle),
                axis.mul(Math.sin(halfAngle))
                );
    };

    /**
     * Create a quaternion from a rotation around an axis as unit-vector
     * @method quatFromRotation
     * @for Quat
     * @static
     * @param v {Vector3d} The vector
     * @return The rotation-quaternion
     */
    exports.quatFromVector3d = function (v) {
        return new exports.Quat(0.0, v);
    };

    /**
     * A quaternion
     * @class Quat
     * @constructor
     * @param r {Number} Real part
     * @param v {Vector3d} Imaginary vector part
     * @example
     var vecmat = require('lethexa-vecmat');
     
     var v = new vecmat.Quat(1.0, new vecmat.Vector3d(1.0, 2.0, 3.0));
     */
    exports.Quat = function (r, v) {
        if (r === undefined)
            throw new Error('r is undefined');
        if (v === undefined)
            throw new Error('v is undefined');
        this._r = r;
        this._v = v;
    };

    /**
     * Copies this quaternion to a new one.
     * @method clone
     * @return The cloned quaternion 
     */
    exports.Quat.prototype.clone = function () {
        return new exports.Quat(this._r, this._v);
    };

    /**
     * Rounds the elements of the quaternion to the given fraction-digits
     * @method round
     * @param digits {Number} Number of digits to round.
     * @return The quaternion with rounded elements 
     */
    exports.Quat.prototype.round = function (digits) {
        return new exports.Quat(
                round(this._r, digits),
                this._v.round(digits)
                );
    };

    /**
     * Checks for equality and returns true if equal
     * @method isEqualTo
     * @param q {Quat} The quaternion to check against.
     * @return True if both are equal 
     */
    exports.Quat.prototype.isEqualTo = function (q) {
        if (this._r !== q._r)
            return false;
        if (!this._v.isEqualTo(q._v))
            return false;
        return true;
    };

    /**
     * The real part of the quaternion
     * @method real
     * @return {Number} The real part of the quaternion
     */
    exports.Quat.prototype.real = function () {
        return this._r;
    };

    /**
     * The imaginary part of the quaternion
     * @method imag
     * @return {Vector3d} The imaginary part of the quaternion
     */
    exports.Quat.prototype.imag = function () {
        return this._v;
    };

    /**
     * Adds to this quaternion
     * @method add
     * @param q {Quat} The quaternion to add
     * @return {Quat}  The sum-quaternion 
     */
    exports.Quat.prototype.add = function (q) {
        return new exports.Quat(
                this._r + q._r,
                this._v.add(q._v)
                );
    };

    /**
     * Subtracts from this quaternion
     * @method sub
     * @param q {Quat} The quaternion to add
     * @return {Quat}  The subtraction-result 
     */
    exports.Quat.prototype.sub = function (q) {
        return new exports.Quat(
                this._r - q._r,
                this._v.sub(q._v)
                );
    };

    /**
     * The squared length of the quaternion
     * @method lengthSquared
     * @return {Number} The squared length of the quaternion
     */
    exports.Quat.prototype.lengthSquared = function () {
        var vecLenSquared = this._v.lengthSquared();
        return this._r * this._r + vecLenSquared;
    };

    /**
     * The length of the quaternion
     * @method length
     * @return {Number} The length of the quaternion
     */
    exports.Quat.prototype.length = function () {
        return Math.sqrt(this.lengthSquared());
    };

    /**
     * Creates the unit-quat from this quaternion
     * @method unit
     * @return {Quat} The unit quaternion
     */
    exports.Quat.prototype.unit = function () {
        var length = this.length();
        if (length === 0.0)
            throw new Error('unit not possible because length is 0');
        var one_div_length = 1.0 / length;
        return new exports.Quat(
                this._r * one_div_length,
                this._v.mul(one_div_length)
                );
    };

    /**
     * The scalar-product of the two quaternions
     * @method dot
     * @param q {Quat} The other quat
     * @return {Number} The scalar-product of the quaternions
     */
    exports.Quat.prototype.dot = function (q) {
        return q._r * this._r + q._v.x() * this._v.x() + q._v.y() * this._v.y() + q._v.z() * this._v.z();
    };

    /**
     * The rotation axis of the quaternion
     * @method axis
     * @return {Vector3d} The rotation-axis as unit-vector
     */
    exports.Quat.prototype.axis = function () {
        var length = this.length();
        if (length === 0.0)
            return new exports.Vector3d(0.0, 0.0, 0.0);
        return this._v.mul(length);
    };

    /**
     * The angle around the axis
     * @method angle
     * @return {Number} The angle of the rotation
     */
    exports.Quat.prototype.angle = function () {
        return 2.0 * Math.acos(this._r);
    };

    /**
     * The angle between two quaternions
     * @method angleTo
     * @param q {Quat} The other quaternion
     * @return {Number} The angle
     */
    exports.Quat.prototype.angleTo = function (q) {
        return 2.0 * Math.acos(this.dot(q));
    };

    /**
     * Calculates the lerp to to an other quaternion 
     * @method lerpTo
     * @param q2 {Quat} The target quaterion
     * @param dt {Number} The interpolation factor
     * @return {Quat} The angle of the rotation
     */
    exports.Quat.prototype.lerpTo = function (q2, dt) {
        var q1 = this;
        return q1.mulScalar(1.0 - dt).add(q2.mulScalar(dt));
    };

    /**
     * Calculates the slerp to to an other quaternion 
     * @method slerpTo
     * @param q2 {Quat} The target quaterion
     * @param dt {Number} The interpolation factor
     * @return {Quat} The angle of the rotation
     */
    exports.Quat.prototype.slerpTo = function (q2, dt) {
        var q1 = this;
        var qt = q2;
        var cosAngle = q1.dot(qt);
        if (cosAngle < 0.0) {
            qt = qt.neg();
            cosAngle = q1.dot(qt);
        } else if (cosAngle > 1.0) {
            cosAngle = 1.0;
        }
        var angle = Math.acos(cosAngle);
        if (angle === 0.0) {
            return q1;
        }

        var sinAngle = Math.sin(angle);
        var part1 = Math.sin((1.0 - dt) * angle) / sinAngle;
        var part2 = Math.sin(dt * angle) / sinAngle;
        return q1.mulScalar(part1).add(qt.mulScalar(part2));
    };

    /**
     * The negative quaternion
     * @method neg
     * @return {Quat} The angle of the rotation
     */
    exports.Quat.prototype.neg = function () {
        return new exports.Quat(-this._r, this._v.neg());
    };

    /**
     * The conjugate quaternion
     * @method conj
     * @return {Quat} The conjugate of the rotation
     */
    exports.Quat.prototype.conj = function () {
        return new exports.Quat(this._r, this._v.neg());
    };

    /**
     * Raises a quaternion to the power of s.
     * @method pow
     * @param s {Number} The power.
     * @return The resulting quaternion.
     */
    exports.Quat.prototype.pow = function (s) {
        return new exports.Quat(s * this.angle(), this.axis());
    };

    /**
     * Multiplies a quaternion and a scalar
     * @method mulScalar
     * @param s {Number} A number
     * @return The resulting quaternion
     */
    exports.Quat.prototype.mulScalar = function (s) {
        return new exports.Quat(
                this._r * s,
                this._v.mulScalar(s)
                );
    };

    /**
     * Converts this quaternion to euler angles [phi, theta, psi]
     * @method toEulerAngles
     * @return The euler angles [phi, theta, psi]
     */
    exports.Quat.prototype.toEulerAngles = function () {
        var q = this;
        var qn = this._r;
        var qvx = this._v.x();
        var qvy = this._v.y();
        var qvz = this._v.z();

        var q00 = qn * qn;
        var q11 = qvx * qvx;
        var q22 = qvy * qvy;
        var q33 = qvz * qvz; 
        
        var r11 = q00 + q11 - q22 - q33;
        var r21 = 2.0 * (qvx * qvy + qn * qvz);
        var r31 = 2.0 * (qvx * qvz - qn * qvy);
        var r32 = 2.0 * (qvy * qvz + qn * qvx);
        var r33 = q00 - q11 - q22 + q33;

        var tmp = Math.abs(r31);
        if(tmp > 0.999999)
        {
            var r12 = 2.0 * (qvx * qvy - qn * qvz);
            var r13 = 2.0 * (qvx * qvz + qn * qvy);
            
            return [
                0.0,
                -Math.PI/2.0 * (r31/tmp),
                Math.atan2(-r12, -r31*r13)
            ];
        }
        else
        {
            return [
                Math.atan2(r32, r33),
                Math.asin(-r31),
                Math.atan2(r21, r11)
            ];
        }
    };

    /**
     * Rotate the given vector with this quaternion
     * @method rotateVector
     * @param v {Vector3d} The vector to rotate around the quaternion.
     * @return The rotated vector
     */
    exports.Quat.prototype.rotateVector = function (v) {
        return this.mul(exports.quatFromVector3d(v)).mul(this.conj()).imag();
    };

    /**
     * Multiplies a quaternion and a quaternion
     * @method mul
     * @param q {Quat} A quaternion
     * @return The resulting quaternion
     */
    exports.Quat.prototype.mul = function (q) {
        var r = this._r;
        var vx = this._v.x();
        var vy = this._v.y();
        var vz = this._v.z();
        var qr = q._r;
        var qvx = q._v.x();
        var qvy = q._v.y();
        var qvz = q._v.z();
        return new exports.Quat(
                r * qr - vx * qvx - vy * qvy - vz * qvz,
                new exports.Vector3d(
                        r * qvx + vx * qr + vy * qvz - vz * qvy,
                        r * qvy + vy * qr + vz * qvx - vx * qvz,
                        r * qvz + vz * qr + vx * qvy - vy * qvx
                        )
                );
    };

    /**
     * Multiplies a quaternion and a vector3d
     * @method mulVector
     * @param v A vector
     * @return The resulting quaternion
     */
    exports.Quat.prototype.mulVector = function (v) {
        var vec = new exports.Quat(0.0, v);
        return this.mul(vec).mul(this.conj());
    };

    /**
     * Converts a quaternion to a matrix
     * @method toMatrix3x3
     * @return The resulting 3x3-matrix
     */
    exports.Quat.prototype.toMatrix3x3 = function () {
        var w = this._r;
        var x = this._v.x();
        var y = this._v.y();
        var z = this._v.z();

        var x2 = x * x;
        var y2 = y * y;
        var z2 = z * z;

        var xy = x * y;
        var xz = x * z;
        var yz = y * z;

        var wx = w * x;
        var wy = w * y;
        var wz = w * z;

        return new exports.Matrix3x3([
            [1.0 - 2.0 * (y2 + z2), 2.0 * (xy - wz), 2.0 * (wy + xz)],
            [2.0 * (xy + wz), 1.0 - 2.0 * (x2 + z2), 2.0 * (yz - wx)],
            [2.0 * (xz - wy), 2.0 * (yz + wx), 1.0 - 2.0 * (x2 + y2)]
        ]);
    };

    /**
     * Returns the quaternion as string.
     * @method toString
     * @return {String} The quaternion as string
     */
    exports.Quat.prototype.toString = function () {
        return this._r + ',' + this._v;
    };








    /**
     * Creates a ray from two points.
     * @method rayFromPoints
     * @param p1 {Vector3d} Point1
     * @param p2 {Vector3d} Point2
     * @return The ray.
     */
    exports.rayFromPoints = function (p1, p2) {
        return new exports.Ray(p1, p2.sub(p1));
    };

    /**
     * Creates a ray from a point and an direction.
     * @method rayFromPoints
     * @param start {Vector3d} Startpoint
     * @param direction {Vector3d} Direction
     * @return The ray.
     */
    exports.rayFromPointDir = function (start, direction) {
        return new exports.Ray(start, direction);
    };


    /**
     * A ray with startpoint ans direction.
     * @class Ray
     * @constructor
     * @param start {Vector3d} Starting point
     * @param direction {Vector3d} The ray direction
     */
    exports.Ray = function (start, direction) {
        this._start = start;
        this._direction = direction.unit();
    };

    /**
     * Copies this ray to a new one.
     * @method clone
     * @return The cloned ray 
     */
    exports.Ray.prototype.clone = function () {
        return new exports.Ray(this._start, this._direction);
    };

    /**
     * Rounds the elements to the given fraction-digits
     * @method round
     * @param digits {Number} The number of digits to round.
     * @return A copied object with rounded elements 
     */
    exports.Ray.prototype.round = function (digits) {
        return new exports.Ray(
                this._start.round(digits),
                this._direction.round(digits)
                );
    };

    /**
     * Checks for equality and returns true if equal
     * @method isEqualTo
     * @param r {Ray} The ray to check against.
     * @return True if both are equal 
     */
    exports.Ray.prototype.isEqualTo = function (r) {
        if (!this._start.isEqualTo(r._start))
            return false;
        if (!this._direction.isEqualTo(r._direction))
            return false;
        return true;
    };

    /**
     * Returns the startpoint of the ray.
     * @method getStart
     * @return {Vector3d} The startpoint.
     */
    exports.Ray.prototype.getStart = function () {
        return this._start;
    };

    /**
     * Returns the direction of the ray.
     * @method getDirection
     * @return {Vector3d} The direction.
     */
    exports.Ray.prototype.getDirection = function () {
        return this._direction;
    };

    /**
     * Returns the point at the length.
     * @method getPointAtLength
     * @param length {Number} The length.
     * @return {Vector3d} The point.
     */
    exports.Ray.prototype.getPointAtLength = function (length) {
        return this._start.add(this._direction.mulScalar(length));
    };



    var EPSILON = 0.000001;

    /**
     * A triangle.
     * @class Triangle
     * @constructor
     * @param v1 {Vector3d} Corner 1
     * @param v2 {Vector3d} Corner 2
     * @param v3 {Vector3d} Corner 3
     */
    exports.Triangle = function (v1, v2, v3) {
        this._v1 = v1;
        this._v2 = v2;
        this._v3 = v3;

        this._e1 = v2.sub(v1); // Edge 1
        this._e2 = v3.sub(v1); // Edge 2
        this._normal = this._e1.cross(this._e2).unit(); // Plane normal
    };

    /**
     * Copies this ray to a new one.
     * @method clone
     * @return The cloned ray 
     */
    exports.Triangle.prototype.clone = function () {
        return new exports.Triangle(
                this._v1,
                this._v2,
                this._v3
                );
    };

    /**
     * Rounds the elements to the given fraction-digits
     * @method round
     * @param digits {Number} The number of digits to round.
     * @return A copied object with rounded elements 
     */
    exports.Triangle.prototype.round = function (digits) {
        return new exports.Triangle(
                this._v1.round(digits),
                this._v2.round(digits),
                this._v3.round(digits)
                );
    };

    /**
     * Checks for equality and returns true if equal
     * @method isEqualTo
     * @param t {Triangle} The triangle to check against.
     * @return True if both are equal 
     */
    exports.Triangle.prototype.isEqualTo = function (t) {
        if (!this._v1.isEqualTo(t._v1))
            return false;
        if (!this._v2.isEqualTo(t._v2))
            return false;
        if (!this._v3.isEqualTo(t._v3))
            return false;
        return true;
    };

    /**
     * Returns the normal of the triangle-plane.
     * @method getNormal
     * @return {Vector3d} The plane normal.
     */
    exports.Triangle.prototype.getNormal = function () {
        return this._n;
    };

    /**
     * Intersects an infinite ray with this triangle.
     * Algorithm from: https://en.wikipedia.org/wiki/M%C3%B6ller%E2%80%93Trumbore_intersection_algorithm
     * @method intersect
     * @param ray {Ray} The intersecting ray.
     * @return {Object} Intersection data.
     */
    exports.Triangle.prototype.intersect = function (ray) {
        var O = ray.getStart();
        var D = ray.getDirection();
        var P, Q, T;
        var det, inv_det, u, v;
        var t;

        //Begin calculating determinant - also used to calculate u parameter
        P = D.cross(this._e2);
        //if determinant is near zero, ray lies in plane of triangle
        det = this._e1.dot(P);
        //NOT CULLING
        if (det > -EPSILON && det < EPSILON)
            return undefined;
        inv_det = 1.0 / det;

        //calculate distance from V1 to ray origin
        T = O.sub(this._v1);

        //Calculate u parameter and test bound
        u = T.dot(P) * inv_det;
        //The intersection lies outside of the triangle
        if (u < 0.0 || u > 1.0)
            return undefined;

        //Prepare to test v parameter
        Q = T.cross(this._e1);

        //Calculate V parameter and test bound
        v = D.dot(Q) * inv_det;
        //The intersection lies outside of the triangle
        if (v < 0.0 || u + v > 1.0)
            return undefined;

        t = this._e2.dot(Q) * inv_det;

        if (t <= EPSILON) // No hit, no win
            return undefined;

        //ray intersection
        return {
            object: this,
            normal: this._normal,
            ray: ray,
            pointOfIntersect: ray.getPointAtLength(t),
            rayLengthOfIntersect: t
        };
    };

    /**
     * Creates a string of the triangle
     * @method toString
     * @return {String} Triangle as string
     */
    exports.Triangle.prototype.toString = function () {
        return 'pt1=' + this._v1 + ', pt2=' + this._v2 + ', pt3=' + this._v3;
    };




    /**
     * A plane.
     * @class Plane
     * @constructor
     * @param v {Vector3d} Position
     * @param n {Vector3d} Normal
     */
    exports.Plane = function (v, n) {
        this._v = v;
        this._n = n;
    };

    /**
     * Copies this ray to a new one.
     * @method clone
     * @return The cloned ray 
     */
    exports.Plane.prototype.clone = function () {
        return new exports.Plane(
                this._v,
                this._n
                );
    };

    /**
     * Rounds the elements to the given fraction-digits
     * @method round
     * @param digits {Number} The number of digits to round.
     * @return A copied object with rounded elements 
     */
    exports.Plane.prototype.round = function (digits) {
        return new exports.Plane(
                this._v.round(digits),
                this._n.round(digits)
                );
    };

    /**
     * Checks for equality and returns true if equal.
     * Important: This function checks for equality of the vectors not the planes !
     * @method isEqualTo
     * @param p {Plane} The plane to check against.
     * @return True if both are equal 
     */
    exports.Plane.prototype.isEqualTo = function (p) {
        if (!this._v.isEqualTo(p._v))
            return false;
        if (!this._n.isEqualTo(p._n))
            return false;
        return true;
    };

    /**
     * Intersects an infinite ray with this plane.
     * @method intersect
     * @param ray {Ray} The intersecting ray.
     * @return {Object} Intersection data.
     */
    exports.Plane.prototype.intersect = function (ray) {
        var p0 = this._v;
        var n = this._n;
        var I0 = ray.getStart();
        var I = ray.getDirection();
        var nominator = p0.sub(I0).dot(n);
        var denominator = I.dot(n);

        if (denominator === 0.0)
            return undefined;

        var result = nominator / denominator;
        if (result <= 0.0) // Parallel or behind ray
            return undefined;

        return {
            object: this,
            normal: this._n,
            ray: ray,
            pointOfIntersect: ray.getPointAtLength(result),
            rayLengthOfIntersect: result
        };
    };

    /**
     * Creates a string of the triangle
     * @method toString
     * @return {String} Triangle as string
     */
    exports.Plane.prototype.toString = function () {
        return 'p=' + this._v + ', n=' + this._n;
    };





    /**
     * Creates a 2d box.
     * @method box2dFromElements
     * @param x1 {Number} x-coord of first point. 
     * @param y1 {Number} y-coord of first point. 
     * @param x2 {Number} x-coord of second point. 
     * @param y2 {Number} y-coord of second point. 
     * @return {Box2d} The initilized box. 
     */
    exports.box2dFromElements = function (x1, y1, x2, y2) {
        var pt1 = exports.vector2dFromElements(x1, y1);
        var pt2 = exports.vector2dFromElements(x2, y2);
        return new exports.Box2d(pt1, pt2);
    };

    /**
     * Creates a 2d box.
     * @method box2dFromArray
     * @param array {Arry} An array in the form [x1, y1, x2, y2].
     * @return {Box2d} The initilized box. 
     */
    exports.box2dFromArray = function (array) {
        var pt1 = exports.vector2dFromElements(array[0], array[1]);
        var pt2 = exports.vector2dFromElements(array[2], array[3]);
        return new exports.Box2d(pt1, pt2);
    };

    /**
     * An axis-parallel 2d box.
     * @class Box2d
     * @constructor
     * @param pt1 {Vector2d} Point1 
     * @param pt2 {Vector2d} Point2
     */
    exports.Box2d = function (pt1, pt2) {
        this._pt1 = pt1;
        this._pt2 = pt2;
    };

    /**
     * Copies this ray to a new one.
     * @method clone
     * @return The cloned ray 
     */
    exports.Box2d.prototype.clone = function () {
        return new exports.Box2d(
                this._pt1,
                this._pt2
                );
    };

    /**
     * Rounds the elements to the given fraction-digits
     * @method round
     * @param digits {Number} The number of digits to round.
     * @return A copied object with rounded elements 
     */
    exports.Box2d.prototype.round = function (digits) {
        return new exports.Box2d(
                this._pt1.round(digits),
                this._pt2.round(digits)
                );
    };

    /**
     * Checks for equality and returns true if equal.
     * Important: This function checks for equality of the vectors !
     * @method isEqualTo
     * @param p {Box3d} The box to check against.
     * @return True if both are equal 
     */
    exports.Box2d.prototype.isEqualTo = function (p) {
        if (!this._pt1.isEqualTo(p._pt1))
            return false;
        if (!this._pt2.isEqualTo(p._pt2))
            return false;
        return true;
    };

    /**
     * Checks if point is contained in this box.
     * @method containsPoint
     * @param pt {Vector3d} The point to check.
     * @return True if point in box.
     */
    exports.Box2d.prototype.containsPoint = function (pt) {
        if ((pt.x() < this._pt1.x()) || (pt.x() > this._pt2.x()))
            return false;
        if ((pt.y() < this._pt1.y()) || (pt.y() > this._pt2.y()))
            return false;
        return true;
    };

    /**
     * Checks this box intersects the given one.
     * @method containsPoint
     * @param box {Box3d} The other box.
     * @return True the boxes intersect.
     */
    exports.Box2d.prototype.intersects = function (box) {
        if (this._pt2.x() < box._pt1.x())
            return false;
        if (this._pt1.x() > box._pt2.x())
            return false;
        if (this._pt2.y() < box._pt1.y())
            return false;
        if (this._pt1.y() > box._pt2.y())
            return false;
        return true;
    };

    /**
     * Creates an array of the box
     * @method toArray
     * @return {Array} An array in the form [x1, y1, x2, y2]
     */
    exports.Box2d.prototype.toArray = function () {
        return [
            this._pt1.x(), this._pt1.y(), 
            this._pt2.x(), this._pt2.y()
        ];
    };

    /**
     * Creates a string of the box
     * @method toString
     * @return {String} Box3d as string
     */
    exports.Box2d.prototype.toString = function () {
        return 'p1=' + this._pt1 + ', pt2=' + this._pt2;
    };







    /**
     * Creates a 3d box.
     * @method box3dFromElements
     * @param x1 {Number} x-coord of first point. 
     * @param y1 {Number} y-coord of first point. 
     * @param z1 {Number} z-coord of first point. 
     * @param x2 {Number} x-coord of second point. 
     * @param y2 {Number} y-coord of second point. 
     * @param z2 {Number} z-coord of second point. 
     */
    exports.box3dFromElements = function (x1, y1, z1, x2, y2, z2) {
        var pt1 = exports.vector3dFromElements(x1, y1, z1);
        var pt2 = exports.vector3dFromElements(x2, y2, z2);
        return new exports.Box3d(pt1, pt2);
    };
    
    /**
     * Creates a 3d box.
     * @method box2dFromArray
     * @param array {Arry} An array in the form [x1, y1, z1, x2, y2, z2].
     * @return {Box3d} The initilized box. 
     */
    exports.box3dFromArray = function (array) {
        var pt1 = exports.vector3dFromElements(array[0], array[1], array[2]);
        var pt2 = exports.vector3dFromElements(array[3], array[4], array[5]);
        return new exports.Box3d(pt1, pt2);
    };

    /**
     * An axis-parallel 3d box.
     * @class Box3d
     * @constructor
     * @param pt1 {Vector3d} Point1 
     * @param pt2 {Vector3d} Point2
     */
    exports.Box3d = function (pt1, pt2) {
        this._pt1 = pt1;
        this._pt2 = pt2;
    };

    /**
     * Copies this ray to a new one.
     * @method clone
     * @return The cloned ray 
     */
    exports.Box3d.prototype.clone = function () {
        return new exports.Box3d(
                this._pt1,
                this._pt2
                );
    };

    /**
     * Rounds the elements to the given fraction-digits
     * @method round
     * @param digits {Number} The number of digits to round.
     * @return A copied object with rounded elements 
     */
    exports.Box3d.prototype.round = function (digits) {
        return new exports.Box3d(
                this._pt1.round(digits),
                this._pt2.round(digits)
                );
    };

    /**
     * Checks for equality and returns true if equal.
     * Important: This function checks for equality of the vectors !
     * @method isEqualTo
     * @param p {Box3d} The box to check against.
     * @return True if both are equal 
     */
    exports.Box3d.prototype.isEqualTo = function (p) {
        if (!this._pt1.isEqualTo(p._pt1))
            return false;
        if (!this._pt2.isEqualTo(p._pt2))
            return false;
        return true;
    };

    /**
     * Checks if point is contained in this box.
     * @method containsPoint
     * @param pt {Vector3d} The point to check.
     * @return True if point in box.
     */
    exports.Box3d.prototype.containsPoint = function (pt) {
        if ((pt.x() < this._pt1.x()) || (pt.x() > this._pt2.x()))
            return false;
        if ((pt.y() < this._pt1.y()) || (pt.y() > this._pt2.y()))
            return false;
        if ((pt.z() < this._pt1.z()) || (pt.z() > this._pt2.z()))
            return false;
        return true;
    };

    /**
     * Checks this box intersects the given one.
     * @method containsPoint
     * @param box {Box3d} The other box.
     * @return True the boxes intersect.
     */
    exports.Box3d.prototype.intersects = function (box) {
        if (this._pt2.x() < box._pt1.x())
            return false;
        if (this._pt1.x() > box._pt2.x())
            return false;
        if (this._pt2.y() < box._pt1.y())
            return false;
        if (this._pt1.y() > box._pt2.y())
            return false;
        if (this._pt2.z() < box._pt1.z())
            return false;
        if (this._pt1.z() > box._pt2.z())
            return false;
        return true;
    };

    /**
     * Creates an array of the box
     * @method toArray
     * @return {Array} An array in the form [x1, y1, z1, x2, y2, z2]
     */
    exports.Box3d.prototype.toArray = function () {
        return [
            this._pt1.x(), this._pt1.y(), this._pt1.z(), 
            this._pt2.x(), this._pt2.y(), this._pt2.z()
        ];
    };

    /**
     * Creates a string of the box
     * @method toString
     * @return {String} Box3d as string
     */
    exports.Box3d.prototype.toString = function () {
        return 'p1=' + this._pt1 + ', pt2=' + this._pt2;
    };





    /**
     * A sector.
     * @class Sector2d
     * @constructor
     * @param v {Vector2d} Position
     * @param minAngle {Number} Start angle in radians (0..2PI)
     * @param maxAngle {Number} End angle in radians (0..2PI)
     * @param radius {Number} The radius of the segment (Optional)
     */
    exports.Sector2d = function (v, minAngle, maxAngle, radius) {
        this._v = v;
        this._minAngle = minAngle;
        this._maxAngle = maxAngle;
        this._radius = radius;
        this._radius2 = radius !== undefined ? radius * radius : undefined;
    };

    /**
     * Copies this ray to a new one.
     * @method clone
     * @return The cloned ray 
     */
    exports.Sector2d.prototype.clone = function () {
        return new exports.Sector2d(
                this._v,
                this._minAngle,
                this._maxAngle,
                this._radius
                );
    };

    /**
     * Rounds the elements to the given fraction-digits
     * @method round
     * @param digits {Number} The number of digits to round.
     * @return A copied object with rounded elements 
     */
    exports.Sector2d.prototype.round = function (digits) {
        return new exports.Sector2d(
                this._v.round(digits),
                round(this._minAngle, digits),
                round(this._maxAngle, digits),
                this._radius !== undefined ? round(this._radius, digits) : undefined
                );
    };

    /**
     * Checks for equality and returns true if equal.
     * Important: This function checks for equality of the vectors !
     * @method isEqualTo
     * @param p {Box3d} The box to check against.
     * @return True if both are equal 
     */
    exports.Sector2d.prototype.isEqualTo = function (p) {
        if (!this._v.isEqualTo(p._v))
            return false;
        if (this._minAngle !== p._minAngle)
            return false;
        if (this._maxAngle !== p._maxAngle)
            return false;
        if (this._radius !== p._radius)
            return false;
        return true;
    };

    /**
     * Checks if point is contained in this box.
     * @method containsPoint
     * @param angle {Number} The angle to test against.
     * @return True if angle in sector.
     */
    exports.Sector2d.prototype.containsAngle = function (angle) {
        var minAngle = toRangePI_PI(this._minAngle);
        var maxAngle = toRangePI_PI(this._maxAngle);
        var testAngle = toRangePI_PI(angle);

        if (minAngle < maxAngle) {
            // Kein Nulldurchgang...
            return (testAngle >= minAngle) && (testAngle <= maxAngle);
        } else {
            // Mit Nulldurchgang...
            return (testAngle <= maxAngle) || (testAngle >= minAngle);
        }
    };

    /**
     * Checks if point is contained in this sector.
     * @method containsPoint
     * @param pt {Vector3d} The point to check.
     * @return True if point in sector.
     */
    exports.Sector2d.prototype.containsPoint = function (pt) {
        var relPt = pt.sub(this._v);
        if (this._radius2) {
            if (relPt.lengthSquared() > this._radius2) {
                return false;
            }
        }
        return this.containsAngle(relPt.pitch());
    };

    /**
     * Creates a string of the sector
     * @method toString
     * @return {String} Sector2d as string
     */
    exports.Sector2d.prototype.toString = function () {
        return 'p=' + this._v + ', minAngle=' + toRange0_2PI(this._minAngle) + ', maxAngle=' + toRange0_2PI(this._maxAngle) + ', radius=' + this._radius;
    };





    /**
     * A sector.
     * @class Sector3d
     * @constructor
     * @param v {Vector2d} Position
     * @param minHorAngle {Number} Start horizontal angle in radians (0..2PI)
     * @param maxHorAngle {Number} End horizontal angle in radians (0..2PI)
     * @param minVerAngle {Number} Start vertical angle in radians (-PI..PI)
     * @param maxVerAngle {Number} End vertical angle in radians (-PI..PI)
     * @param radius {Number} The radius of the segment (Optional)
     */
    exports.Sector3d = function (v, minHorAngle, maxHorAngle, minVerAngle, maxVerAngle, radius) {
        this._v = v;
        this._minHorAngle = minHorAngle;
        this._maxHorAngle = maxHorAngle;
        this._minVerAngle = minVerAngle;
        this._maxVerAngle = maxVerAngle;
        this._radius = radius;
        this._radius2 = radius !== undefined ? radius * radius : undefined;
    };

    /**
     * Copies this ray to a new one.
     * @method clone
     * @return The cloned ray 
     */
    exports.Sector3d.prototype.clone = function () {
        return new exports.Sector2d(
                this._v,
                toRange0_2PI(this._minHorAngle),
                toRange0_2PI(this._maxHorAngle),
                toRangePI_PI(this._minVerAngle),
                toRangePI_PI(this._maxVerAngle),
                this._radius
                );
    };

    /**
     * Rounds the elements to the given fraction-digits
     * @method round
     * @param digits {Number} The number of digits to round.
     * @return A copied object with rounded elements 
     */
    exports.Sector3d.prototype.round = function (digits) {
        return new exports.Sector2d(
                this._v.round(digits),
                round(this._minHorAngle, digits),
                round(this._maxHorAngle, digits),
                round(this._minVerAngle, digits),
                round(this._maxVerAngle, digits),
                this._radius !== undefined ? round(this._radius, digits) : undefined
                );
    };

    /**
     * Checks for equality and returns true if equal.
     * Important: This function checks for equality of the vectors !
     * @method isEqualTo
     * @param p {Box3d} The box to check against.
     * @return True if both are equal 
     */
    exports.Sector3d.prototype.isEqualTo = function (p) {
        if (!this._v.isEqualTo(p._v))
            return false;
        if (this._minHorAngle !== p._minHorAngle)
            return false;
        if (this._maxHorAngle !== p._maxHorAngle)
            return false;
        if (this._minVerAngle !== p._minVerAngle)
            return false;
        if (this._maxVerAngle !== p._maxVerAngle)
            return false;
        if (this._radius !== p._radius)
            return false;
        return true;
    };

    /**
     * Checks if point is contained in this box.
     * @method containsPoint
     * @param angle {Number} The angle to test against.
     * @return True if angle in sector.
     */
    exports.Sector3d.prototype.containsHorizontalAngle = function (angle) {
        var minAngle = toRangePI_PI(this._minHorAngle);
        var maxAngle = toRangePI_PI(this._maxHorAngle);
        var testAngle = toRangePI_PI(angle);

        if (minAngle < maxAngle) {
            // Kein Nulldurchgang...
            return (testAngle >= minAngle) && (testAngle <= maxAngle);
        } else {
            // Mit Nulldurchgang...
            return (testAngle <= maxAngle) || (testAngle >= minAngle);
        }
    };

    /**
     * Checks if point is contained in this box.
     * @method containsPoint
     * @param angle {Number} The angle to test against.
     * @return True if angle in sector.
     */
    exports.Sector3d.prototype.containsVerticalAngle = function (angle) {
        var minAngle = toRangePI_PI(this._minVerAngle);
        var maxAngle = toRangePI_PI(this._maxVerAngle);
        var testAngle = toRangePI_PI(angle);

        if (minAngle < maxAngle) {
            // Kein Nulldurchgang...
            return (testAngle >= minAngle) && (testAngle <= maxAngle);
        } else {
            // Mit Nulldurchgang...
            return (testAngle <= maxAngle) || (testAngle >= minAngle);
        }
    };

    /**
     * Checks if point is contained in this sector.
     * @method containsPoint
     * @param pt {Vector3d} The point to check.
     * @return True if point in sector.
     */
    exports.Sector3d.prototype.containsPoint = function (pt) {
        var relPt = pt.sub(this._v);
        if (this._radius2) {
            if (relPt.lengthSquared() > this._radius2) {
                return false;
            }
        }
        return this.containsHorizontalAngle(relPt.yaw()) && this.containsVerticalAngle(relPt.pitch());
    };

    /**
     * Creates a string of the sector
     * @method toString
     * @return {String} Sector3d as string
     */
    exports.Sector3d.prototype.toString = function () {
        return 'p=' + this._v + ', minHorAngle=' + toRange0_2PI(this._minHorAngle) + ', maxHorAngle=' + toRange0_2PI(this._maxHorAngle) + ', minVerAngle=' + toRange0_2PI(this._minVerAngle) + ', maxVerAngle=' + toRange0_2PI(this._maxVerAngle) + ', radius=' + this._radius;
    };





    /**
     * A circle.
     * @class Circle2d
     * @constructor
     * @param v {Vector2d} Position
     * @param r {Number} Radius
     */
    exports.Circle2d = function (v, r) {
        this._v = v;
        this._r = r;
        this._r2 = r * r;
    };

    /**
     * Copies this ray to a new one.
     * @method clone
     * @return The cloned ray 
     */
    exports.Circle2d.prototype.clone = function () {
        return new exports.Circle2d(
                this._v,
                this._r
                );
    };

    /**
     * Rounds the elements to the given fraction-digits
     * @method round
     * @param digits {Number} The number of digits to round.
     * @return A copied object with rounded elements 
     */
    exports.Sector2d.prototype.round = function (digits) {
        return new exports.Circle2d(
                this._v.round(digits),
                round(this._r, digits)
                );
    };

    /**
     * Checks for equality and returns true if equal.
     * Important: This function checks for equality of the vectors not the planes !
     * @method isEqualTo
     * @param p {Circle2d} The line to check against.
     * @return True if both are equal 
     */
    exports.Circle2d.prototype.isEqualTo = function (p) {
        if (!this._v.isEqualTo(p._v))
            return false;
        if (this._r !== p._r)
            return false;
        return true;
    };

    /**
     * Calculates the bounding box of the line.
     * @method createBoundingBox3d
     * @return {Box2d} Intersection data.
     */
    exports.Circle2d.prototype.getBoundingBox2d = function () {
        var x = this._v.x();
        var y = this._v.y();
        return new exports.Box2d(
                new exports.vector2dFromElements(x - this._r, y - this._r),
                new exports.vector2dFromElements(x + this._r, y + this._r)
                );
    };

    /**
     * Checks if point is contained in this line.
     * @method containsPoint
     * @param pt {Vector2d} The point to check.
     * @return True if point in line.
     */
    exports.Circle2d.prototype.containsPoint = function (pt) {
        return this._v.sub(pt).lengthSquared() <= this._r2;
    };

    /**
     * Calculates the tangent-points from a point.
     * @method tangentFrom
     * @param pt {Vector3d} The point.
     * @return The tangent points.
     */
    exports.Circle2d.prototype.tangentFrom = function (pt) {
        var cx = this._v.x();
        var cy = this._v.y();
        var px = pt.x();
        var py = pt.y();
        var radius = this._r;
        var dx = cx - px;
        var dy = cy - py;
        var dd = Math.sqrt(dx * dx + dy * dy);
        var a = Math.asin(radius / dd);
        var b = Math.atan2(dy, dx);
        var t1 = b - a;
        var t2 = b + a;
        //console.log('dx', dx, 'dy', dy, 'radius', radius, 'dd', dd, 'radius / dd', radius / dd, 'a', a, 'b', b, 't1', t1, 't2', t2)

        return {
            p1: exports.vector2dFromElements(radius * Math.sin(t1), radius * -Math.cos(t1)),
            p2: exports.vector2dFromElements(radius * -Math.sin(t2), radius * Math.cos(t2)),
            center: exports.vector2dFromElements(-radius * Math.cos(b), radius * -Math.sin(b)),
            arclength: 2 * a
        };
    };

    /**
     * Creates a string of the line
     * @method toString
     * @return {String} line as string
     */
    exports.Circle2d.prototype.toString = function () {
        return 'c=' + this._v + ', r=' + this._r;
    };




    /**
     * A sphere.
     * @class Sphere
     * @constructor
     * @param v {Vector3d} Position
     * @param r {Number} Radius
     */
    exports.Sphere = function (v, r) {
        this._v = v;
        this._r = r;
        this._r2 = r * r;
    };

    /**
     * Copies this ray to a new one.
     * @method clone
     * @return The cloned ray 
     */
    exports.Sphere.prototype.clone = function () {
        return new exports.Sphere(
                this._v,
                this._r
                );
    };

    /**
     * Rounds the elements to the given fraction-digits
     * @method round
     * @param digits {Number} The number of digits to round.
     * @return A copied object with rounded elements 
     */
    exports.Sphere.prototype.round = function (digits) {
        return new exports.Sphere(
                this._v.round(digits),
                round(this._r, digits)
                );
    };

    /**
     * Checks for equality and returns true if equal.
     * Important: This function checks for equality of the vectors not the planes !
     * @method isEqualTo
     * @param p {Sphere} The sphere to check against.
     * @return True if both are equal 
     */
    exports.Sphere.prototype.isEqualTo = function (p) {
        if (!this._v.isEqualTo(p._v))
            return false;
        if (this._r !== p._r)
            return false;
        return true;
    };

    /**
     * Intersects an infinite ray with this sphere.
     * @method intersect
     * @param ray {Ray} The intersecting ray.
     * @return {Object} Intersection data.
     */
    exports.Sphere.prototype.intersect = function (ray) {
        var C = this._v;
        var r = this._r;
        var O = ray.getStart();
        var I = ray.getDirection();

        var oc = O.sub(C);
        var x1 = I.dot(oc);
        var oc_abs_squared = oc.lengthSquared();
        var radicant = x1 * x1 - oc_abs_squared + r * r;

        if (radicant < 0.0)
            return undefined;

        var result;
        if (radicant === 0.0) {
            result = -x1;
        } else {
            var root = Math.sqrt(radicant);
            var d1 = -x1 - root;
            var d2 = -x1 + root;
            result = d1 < d2 ? d1 : d2; // Take the nearest...
        }

        var pt = ray.getPointAtLength(result);
        var normal = pt.sub(C).unit();

        return {
            object: this,
            normal: normal,
            ray: ray,
            pointOfIntersect: pt,
            rayLengthOfIntersect: result
        };
    };

    /**
     * Calculates the bounding box of the sphere.
     * @method createBoundingBox3d
     * @return {Box3d} Intersection data.
     */
    exports.Sphere.prototype.getBoundingBox3d = function () {
        var x = this._v.x();
        var y = this._v.y();
        var z = this._v.z();
        return new exports.Box3d(
                new exports.vector3dFromElements(x - this._r, y - this._r, z - this._r),
                new exports.vector3dFromElements(x + this._r, y + this._r, z + this._r)
                );
    };

    /**
     * Checks if point is contained in this sphere.
     * @method containsPoint
     * @param pt {Vector3d} The point to check.
     * @return True if point in sphere.
     */
    exports.Sphere.prototype.containsPoint = function (pt) {
        return this._v.sub(pt).lengthSquared() <= this._r2;
    };

    /**
     * Calculates the tangent from a point.
     * @method tangentFrom
     * @param pt {Vector3d} The point.
     * @return The tangent point.
     */
    exports.Sphere.prototype.tangentFrom = function (pt) {
        // find tangents
        var cx = this._v.x();
        var cy = this._v.y();
        var px = pt.x();
        var py = pt.y();
        var radius = this._r;
        dx = cx - px;
        dy = cy - py;
        dd = Math.sqrt(dx * dx + dy * dy);
        a = Math.asin(radius / dd);
        b = Math.atan2(dy, dx);
        t1 = b - a;
        t2 = b + a;

        return {
            p1: exports.vector3dFromElements(radius * Math.sin(t1), radius * -Math.cos(t1)),
            p2: exports.vector3dFromElements(radius * -Math.sin(t2), radius * Math.cos(t2))
        };
    };

    /**
     * Creates a string of the sphere
     * @method toString
     * @return {String} Sphere as string
     */
    exports.Sphere.prototype.toString = function () {
        return 'c=' + this._v + ', r=' + this._r;
    };






    /**
     * A 3d-line.
     * @class Line
     * @constructor
     * @param p1 {Vector2d} Point 1
     * @param p2 {Vector2d} Point 2
     */
    exports.Line3d = function (p1, p2) {
        this._p1 = p1;
        this._p2 = p2;
    };

    /**
     * Copies this ray to a new one.
     * @method clone
     * @return The cloned ray 
     */
    exports.Line3d.prototype.clone = function () {
        return new exports.Line3d(
                this._p1,
                this._p2
                );
    };

    /**
     * Rounds the elements to the given fraction-digits
     * @method round
     * @param digits {Number} The number of digits to round.
     * @return A copied object with rounded elements 
     */
    exports.Line3d.prototype.round = function (digits) {
        return new exports.Line3d(
                this._p1.round(digits),
                this._p2.round(digits)
                );
    };

    /**
     * Checks for equality and returns true if equal.
     * @method isEqualTo
     * @param other {Line3d} The line to check against.
     * @return True if both are equal 
     */
    exports.Line3d.prototype.isEqualTo = function (other) {
        if (!this._p1.isEqualTo(other._p1))
            return false;
        if (!this._p2.isEqualTo(other._p2))
            return false;
        return true;
    };

    /**
     * Returns the direction vector of the line
     * @method getDirection
     * @return {Vector3d} The direction vector of the line.
     */
    exports.Line3d.prototype.getDirection = function () {
        return this._p2.sub(this._p1);
    };

    /**
     * Returns the distance from the given vector to the line
     * @method distanceTo
     * @param p {Vector3d} The given vector.
     * @return {Number} The distance.
     */
    exports.Line3d.prototype.distanceTo = function (p) {
        var a_sub_p = this._pt1.sub(p);
        var n = this.getDirection();
        return a_sub_p.sub(n.mulScalar(a_sub_p.dot(n)));
    };

    /**
     * Creates the angle to the X-axis.
     * @method getAngleOfLine
     * @return The angle in radians. 
     */
    exports.Line3d.prototype.getAngleToXAxis = function () {
        var dir = this.getDirection();
        return Math.atan2(dir.y(), dir.x());
    };

    /**
     * Creates a string of the line
     * @method toString
     * @return {String} Line3d as string
     */
    exports.Line3d.prototype.toString = function () {
        return 'p1=' + this._p1 + ', p2=' + this._p2;
    };





    /**
     * A 2d-line.
     * @class Line
     * @constructor
     * @param p1 {Vector2d} Point 1
     * @param p2 {Vector2d} Point 2
     */
    exports.Line2d = function (p1, p2) {
        this._p1 = p1;
        this._p2 = p2;
    };

    /**
     * Copies this ray to a new one.
     * @method clone
     * @return The cloned ray 
     */
    exports.Line2d.prototype.clone = function () {
        return new exports.Line2d(
                this._p1,
                this._p2
                );
    };

    /**
     * Rounds the elements to the given fraction-digits
     * @method round
     * @param digits {Number} The number of digits to round.
     * @return A copied object with rounded elements 
     */
    exports.Line2d.prototype.round = function (digits) {
        return new exports.Line2d(
                this._p1.round(digits),
                this._p2.round(digits)
                );
    };

    /**
     * Checks for equality and returns true if equal.
     * @method isEqualTo
     * @param other {Line2d} The line to check against.
     * @return True if both are equal 
     */
    exports.Line2d.prototype.isEqualTo = function (other) {
        if (!this._p1.isEqualTo(other._p1))
            return false;
        if (!this._p2.isEqualTo(other._p2))
            return false;
        return true;
    };

    /**
     * Returns the direction vector of the line
     * @method getDirection
     * @return {Vector2d} The direction vector of the line.
     */
    exports.Line2d.prototype.getDirection = function () {
        return this._p2.sub(this._p1);
    };

    /**
     * Returns the distance from the given vector to the line
     * @method distanceTo
     * @param p {Vector3d} The given vector.
     * @return {Number} The distance.
     */
    exports.Line2d.prototype.distanceTo = function (p) {
        var a_sub_p = this._pt1.sub(p);
        var n = this.getDirection();
        return a_sub_p.sub(n.mulScalar(a_sub_p.dot(n)));
    };

    /**
     * Creates the angle to the X-axis.
     * @method getAngleOfLine
     * @return The angle in radians. 
     */
    exports.Line2d.prototype.getAngleToXAxis = function () {
        var dir = this.getDirection();
        return Math.atan2(dir.y(), dir.x());
    };

    /**
     * Detects if point is left or right of the line.
     * @method isPointOnLeftOfLine
     * @param ptToCheck {Vector2d} The point to check against.
     * @return Left(true) or right(false)
     */
    exports.Line2d.prototype.isPointOnLeftOfLine = function (ptToCheck) {
        var line1 = new exports.Line2d(this._p1, ptToCheck);
        var line2 = new exports.Line2d(this._p1, this._p2);
        var a1 = toRangePI_PI(line1.getAngleToXAxis());
        var a2 = toRangePI_PI(line2.getAngleToXAxis());
        return toRangePI_PI(a1 - a2) >= 0.0;
    };

    /**
     * Calculates the intersectionpoint of two lines if available.
     * @method intersect
     * @param otherLine {Line2d} The other line.
     * @return Vector2d if lines intersect otherwise undefined
     */
    exports.Line2d.prototype.intersect = function(otherLine) {
        var p0_x = this._p1.x();
        var p0_y = this._p1.y();
        var p1_x = this._p2.x();
        var p1_y = this._p2.y();

        var p2_x = otherLine._p1.x();
        var p2_y = otherLine._p1.y();
        var p3_x = otherLine._p2.x();
        var p3_y = otherLine._p2.y();
        
        var s1_x = p1_x - p0_x;     
        var s1_y = p1_y - p0_y;
        var s2_x = p3_x - p2_x;
        var s2_y = p3_y - p2_y;

        var div = -s2_x * s1_y + s1_x * s2_y;
        if(div === 0.0)
            return undefined;
        
        var s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / div;
        var t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / div;

        if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
            // Intersection detected...
            return exports.vector2dFromElements(
                p0_x + (t * s1_x),
                p0_y + (t * s1_y)
            );
        }
        return undefined; // No intersection...
    };

    /**
     * Creates a string of the line
     * @method toString
     * @return {String} Line2d as string
     */
    exports.Line2d.prototype.toString = function () {
        return 'p1=' + this._p1 + ', p2=' + this._p2;
    };




    /**
     * A two-dimensional polygon.
     * @class Polygon2d
     * @constructor
     * @param corners {Array[Vector2d]} The corners-points as array of 2d-vectors.
     */
    exports.Polygon2d = function (corners) {
        this._corners = corners;
    };

    /**
     * Copies this ray to a new one.
     * @method clone
     * @return The cloned ray 
     */
    exports.Polygon2d.prototype.clone = function () {
        return new exports.Polygon2d(this._corners);
    };

    /**
     * Rounds the elements to the given fraction-digits
     * @method round
     * @param digits {Number} The number of digits to round.
     * @return A copied object with rounded elements 
     */
    exports.Polygon2d.prototype.round = function (digits) {
        var tgtCorners = [];
        this._corners.forEach(function (point) {
            tgtCorners.push(point.round(digits));
        });
        return new exports.Polygon2d(tgtCorners);
    };

    /**
     * Checks for equality and returns true if equal.
     * @method isEqualTo
     * @param other {Line2d} The line to check against.
     * @return True if both are equal 
     */
    exports.Polygon2d.prototype.isEqualTo = function (other) {
        if (this._corners.length !== other._corners.length)
            return false;
        for (var i = 0; i < this._corners.length; i++) {
            var corner = this._corners[i];
            var otherCorner = other._corners[i];
            if (!corner.isEqualTo(otherCorner))
                return false;
        }
        return true;
    };

    /**
     * Returns the corners of the polygon.
     * @method corners
     * @return The corners 
     */
    exports.Polygon2d.prototype.getCorners = function () {
        return this._corners;
    };

    /**
     * Checks for equality and returns true if equal.
     * @method isEqualTo
     * @param poly {Polygon2d} The polygon to check against.
     * @return True if both are equal 
     */
    exports.Polygon2d.prototype.isEqualTo = function (poly) {
        for (var i = 0; i < this._corners.length; i++) {
            var thisPoint = this._corners[i];
            var otherPoint = poly._corners[i];
            if (!thisPoint.isEqualTo(otherPoint))
                return false;
        }
        return true;
    };

    /**
     * Checks if a point is contained in a polygon.
     * Taken from https://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
     * @method containsPoint
     * @param pt {Vector2d} The point to check against.
     * @return True if point is contained.
     */
    exports.Polygon2d.prototype.containsPoint = function (pt) {
        var result = false;
        var nvert = this._corners.length;
        for (var i = 0, j = nvert - 1; i < nvert; j = i++) {
            var vertx_i = this._corners[i].x();
            var verty_i = this._corners[i].y();
            var vertx_j = this._corners[j].x();
            var verty_j = this._corners[j].y();
            var testx = pt.x();
            var testy = pt.y();
            var a = verty_i > testy;
            var b = verty_j > testy;
            var c = testx;
            var d = (vertx_j - vertx_i) * (testy - verty_i) / (verty_j - verty_i) + vertx_i;
            if ((a !== b) && (c < d))
                result = !result;
        }
        return result;
    };

    /**
     * Creates a string of the polygon
     * @method toString
     * @return {String} Polygon2d as string
     */
    exports.Polygon2d.prototype.toString = function () {
        var result;
        this._corners.forEach(function (corner) {
            if (!result) {
                result += corner;
            } else {
                result += '; ' + corner;
            }
        });
        return result;
    };

    /**
     * Creates the bounding polygon around the given points.
     * @method createBoundingPolygon
     * @param points {Array[Vector2d]} The list of points.
     * @return The list of bounding points.
     */
    exports.createBoundingPolygon = function (points) {
        if (points.length === 0)
            return [];

        var getLeftmostPointOnHull = function () {
            var leftmost;
            points.forEach(function (point) {
                if (leftmost) {
                    if (leftmost.x() > point.x()) {
                        leftmost = point;
                    }
                } else {
                    leftmost = point;
                }
            });
            return leftmost;
        };

        var isOnLeftOfLineFromPoint = function (ptToCheck, p1, p2) {
            var line = new exports.Line2d(p1, p2);
            return line.isPointOnLeftOfLine(ptToCheck);
        };

        var result = [];
        var pointOnHull = getLeftmostPointOnHull();
        var i = 0;
        var endPoint;
        do {
            result[i] = pointOnHull;
            endPoint = undefined;
            for (var j = 0; j < points.length; j++) {
                var point = points[j];
                if (pointOnHull !== point) {
                    if (endPoint === undefined)
                        endPoint = point;
                    if ((endPoint === pointOnHull) || isOnLeftOfLineFromPoint(point, pointOnHull, endPoint)) {
                        if (pointOnHull.isEqualTo(point))
                            return;
                        endPoint = point;
                    }
                }
            }

            pointOnHull = endPoint;
            i += 1;
        } while (!endPoint.isEqualTo(result[0]));

        return result;
    };



})(typeof exports === 'undefined' ? this.vecmat = {} : exports);


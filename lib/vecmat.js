/* global exports */

(function (exports) {
    'use strict';
    var round = function(x, digits) {
        var multiplier = Math.pow(10.0, digits);
        return Math.floor(x * multiplier ) / multiplier;
    };

    var toRange0_2PI = function(a) {
       var twoPI = Math.PI * 2.0;
       while(a >= twoPI) a -= twoPI;
       while(a <      0) a += twoPI;
       return a;
    };
    

    /** 
     * Vector math in function-form.
     */
    exports.MathFunc3d = {
        makeVector: function(v) {
          return new exports.Vector3d(v[0],v[1],v[2]);
        },
        nullVector: function() {
          return new exports.Vector3d(0,0,0);
        },
        add: function(a, b) {
          return a.add(b);
        },
        sub: function(a, b) {
          return a.sub(b);
        },
        mulScalar: function(a, s) {
          return a.mulScalar(s);
        },
        dot: function(a, b) {
          return a.dot(b);
        },
        cross: function(a, b) {
          return a.cross(b);   
        },
        unit: function(a) {
          return a.unit();
        },
        toArray: function(a) {
          return a.toArray();
        },
        lengthSquared: function(a) {
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
        }
        else {
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
     * @param elements {Number} The x-value
     * @param elements {Number} The y-value
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
        this._x = x;
        this._y = y;
    };
 
    /**
     * Rounds the elements of the vector to the given fraction-digits
     * @method round
     * @return The vector with rounded elements 
     */ 
    exports.Vector2d.prototype.round = function(digits) {
        return new exports.Vector2d(
            round(this._x, digits),
            round(this._y, digits)
        );
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
     * @return {Vector2d} The resulting vector
     */
    exports.Vector2d.prototype.mul = function (s) {
	return this.mulScalar(s);
    };

    /**
     * Multiplies this vector and a scalar value 
     * @method mulScalar
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
     * Creates a vector from an the elements x, y, z
     * @method vector3dFromElements
     * @for Vector3d
     * @static
     * @param elements {Number} The x-value
     * @param elements {Number} The y-value
     * @param elements {Number} The z-value
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
        this._x = x;
        this._y = y;
        this._z = z;
    };
 
    /**
     * Rounds the elements of the vector to the given fraction-digits
     * @method round
     * @return The vector with rounded elements 
     */ 
    exports.Vector3d.prototype.round = function(digits) {
        return new exports.Vector3d(
            round(this._x, digits),
            round(this._y, digits),
            round(this._z, digits)
        );
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
     * The distance from one vector to another.
     * @method distanceTo
     * @param v {Vector3d} The other vector
     * @return {Number} The distance to the vector
     */
    exports.Vector3d.prototype.distanceTo = function (v) {
        return v.sub(this).length();
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
     * @return {Vector3d} The resulting vector
     */
    exports.Vector3d.prototype.mul = function (s) {
	return this.mulScalar(s);
    };

    /**
     * Multiplies this vector and a scalar value 
     * @method mulScalar
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
     * @return The matrix
     */
    exports.matrix3x3FromArray = function (array) {
        return new exports.Matrix3x3(array);
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
     * Rounds the elements of the matrix to the given fraction-digits
     * @method round
     * @return The matrix with rounded elements 
     */ 
    exports.Matrix3x3.prototype.round = function(digits) {
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
        if(!(u instanceof exports.Vector3d))
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
        if(!(m instanceof exports.Matrix3x3))
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
     * @param m {Matrix3x3} The matrix to add
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
     * @param m {Matrix3x3} The matrix to subtract
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
	if(d == 0)
	  d = 1;
        return exports.matrix3x3FromArray([
	  [ (this.e22*this.e23 - this.e23*this.e32) / d, 
           -(this.e12*this.e33 - this.e13*this.e32) / d, 
	    (this.e12*this.e23 - this.e13*this.e22) / d ],

          [-(this.e21*this.e33 - this.e23*this.e31) / d, 
            (this.e11*this.e33 - this.e13*this.e31) / d, 
	   -(this.e11*this.e23 - this.e13*this.e21) / d ],

          [ (this.e21*this.e32 - this.e22*this.e31) / d, 
           -(this.e11*this.e32 - this.e12*this.e31) / d, 
	    (this.e11*this.e22 - this.e12*this.e21) / d ]
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
    exports.shortestArcQuat = function(v0, v1) {
   	var q;
	v0 = v0.unit();
	v1 = v1.unit();
	var c = v0.cross(v1);
	var d = v0.dot(v1);
	if(d === -1.0) {
            return exports.quatFromRotation( Math.PI, exports.makeNullVector3d());
	}
	else if(d === 1.0)	{
            return exports.quatFromRotation( 0.0, exports.makeUnitZVector3d() );
	}
	var s = Math.sqrt( (1.0 + d) * 2.0 );
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
    exports.quatFromEulerAngles = function( phi, theta, psi ) {
        var croll  = Math.cos(0.5 * phi);
        var cpitch = Math.cos(0.5 * theta);
        var cyaw   = Math.cos(0.5 * psi);
	
        var sroll  = Math.sin(0.5 * phi);
        var spitch = Math.sin(0.5 * theta);
        var syaw   = Math.sin(0.5 * psi);

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
    exports.quatFromRotation = function( angle, axis ) {
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
     * @param angle {Number} The angle around the axis
     * @param axis {Vector3d} The rotation-axis
     * @return The rotation-quaternion
     */
    exports.quatFromVector3d = function( v ) {
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
    exports.Quat = function(r, v) {
        if (r === undefined)
            throw new Error('r is undefined');
        if (v === undefined)
            throw new Error('v is undefined');
   	this._r = r;
	this._v = v;	
    };
   
    /**
     * Rounds the elements of the quaternion to the given fraction-digits
     * @method round
     * @return The quaternion with rounded elements 
     */ 
    exports.Quat.prototype.round = function(digits) {
        return new exports.Quat(
            round(this._r, digits),
            this._v.round(digits)
        );
    };

    /**
     * The real part of the quaternion
     * @method real
     * @return {Number} The real part of the quaternion
     */
    exports.Quat.prototype.real = function() {
        return this._r;
    };
    
    /**
     * The imaginary part of the quaternion
     * @method imag
     * @return {Vector3d} The imaginary part of the quaternion
     */
    exports.Quat.prototype.imag = function() {
        return this._v;
    };

    /**
     * Adds to this quaternion
     * @method add
     * @param q {Quat} The quaternion to add
     * @return {Quat}  The sum-quaternion 
     */
    exports.Quat.prototype.add = function(q) {
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
    exports.Quat.prototype.sub = function(q) {
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
    exports.Quat.prototype.lengthSquared = function() {
	var vecLenSquared = this._v.lengthSquared();
        return this._r*this._r + vecLenSquared;
    };

    /**
     * The length of the quaternion
     * @method length
     * @return {Number} The length of the quaternion
     */
    exports.Quat.prototype.length = function() {
        return Math.sqrt(this.lengthSquared());
    };

    /**
     * Creates the unit-quat from this quaternion
     * @method unit
     * @return {Quat} The unit quaternion
     */
    exports.Quat.prototype.unit = function() {
	var length = this.length();
	if(length === 0.0)
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
    exports.Quat.prototype.dot = function(q) {
	return q._r * this._r + q._v.x() * this._v.x() + q._v.y() * this._v.y() + q._v.z() * this._v.z();
    };

    /**
     * The rotation axis of the quaternion
     * @method axis
     * @return {Vector3d} The rotation-axis as unit-vector
     */
    exports.Quat.prototype.axis = function() {
	var length = this.length();
	if(length === 0.0)
            return new exports.Vector3d(0.0, 0.0, 0.0);
        return this._v.mul(length);
    };

    /**
     * The angle around the axis
     * @method angle
     * @return {Number} The angle of the rotation
     */
    exports.Quat.prototype.angle = function() {
        return 2.0 * Math.acos(this._r);
    };

    /**
     * The angle between two quaternions
     * @method angleTo
     * @param q {Quat} The other quaternion
     * @return {Number} The angle
     */
    exports.Quat.prototype.angleTo = function(q) {
	return 2.0 * Math.acos( this.dot( q ) );
    };

    /**
     * Calculates the lerp to to an other quaternion 
     * @method lerpTo
     * @param q2 {Quat} The target quaterion
     * @param dt {Number} The interpolation factor
     * @return {Quat} The angle of the rotation
     */
    exports.Quat.prototype.lerpTo = function(q2, dt) {
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
    exports.Quat.prototype.slerpTo = function(q2, dt) {
	var q1 = this;
	var qt = q2;
	var cosAngle = q1.dot(qt);
	if(cosAngle < 0.0) {
            qt = -qt;
            cosAngle = q1.dot( qt );
	}
	else if(cosAngle > 1.0) {
            cosAngle = 1.0;
	}
	var angle = Math.acos( cosAngle );
	if(angle === 0.0) {
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
    exports.Quat.prototype.neg = function() {
        return new exports.Quat(-this._r, this._v.neg());
    };

    /**
     * The conjugate quaternion
     * @method conj
     * @return {Quat} The conjugate of the rotation
     */
    exports.Quat.prototype.conj = function() {
        return new exports.Quat(this._r, this._v.neg());
    };

    /**
     * Multiplies a quaternion and a scalar
     * @method mulScalar
     * @param q {Number} A number
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
    exports.Quat.prototype.toEulerAngles = function (s) {
        var e0 = this._r;
        var e1 = this._v.x();
        var e2 = this._v.y();
        var e3 = this._v.z();
        return [
            toRange0_2PI( Math.atan2((e2*e3 + e0*e1), 0.5 - (e1*e1 + e2*e2)) ),
            Math.asin(-2.0*(e1*e3 + e0*e2)),
            toRange0_2PI( Math.atan2((e1*e2 + e0*e3), 0.5 - (e2*e2 + e3*e3)) )
        ];
    };

    /**
     * Rotate the given vector with this quaternion
     * @method rotateVector
     * @param v {Vector3d} The vector to rotate around the quaternion.
     * @return The rotated vector
     */
    exports.Quat.prototype.rotateVector = function (v) {
        return this.conj().mul(exports.quatFromVector3d(v)).mul(this).imag();
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
	    r*qr - vx*qvx - vy*qvy - vz*qvz,
	    new exports.Vector3d(
		r*qvx + vx*qr  + vy*qvz - vz*qvy,
		r*qvy + vy*qr  + vz*qvx - vx*qvz,
		r*qvz + vz*qr  + vx*qvy - vy*qvx
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
            [1.0 - 2.0 * (y2 + z2),       2.0 * (xy - wz),       2.0 * (wy + xz)],
            [      2.0 * (xy + wz), 1.0 - 2.0 * (x2 + z2),       2.0 * (yz - wx)],
	    [      2.0 * (xz - wy),       2.0 * (yz + wx), 1.0 - 2.0 * (x2 + y2)] 
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

})(typeof exports === 'undefined' ? this.vecmat = {} : exports);


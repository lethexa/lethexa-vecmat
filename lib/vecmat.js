/*
 * Copyright (c) 2015, Tim Leerhoff <tleerhof@web.de>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

/* global exports */

(function (exports) {
    'use strict';


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
     * Creates a 3d-vector from a string
     * @method vector3dFromString
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

    exports.vector3dFromPolar = function (pitch, yaw, distance) {
        var cosPitchDist = distance * Math.cos(pitch);
        var sinPitchDist = -distance * Math.sin(pitch);

        return new exports.Vector3d(
                cosPitchDist * Math.cos(yaw),
                cosPitchDist * Math.sin(yaw),
                sinPitchDist);
    };

    exports.vector3dFromArray = function (elements) {
        return new exports.Vector3d(
                elements[0],
                elements[1],
                elements[2]
                );
    };

    exports.vector3dFromElements = function (x, y, z) {
        return new exports.Vector3d(x, y, z);
    };

    exports.Vector3d = function (x, y, z) {
        this._x = x;
        this._y = y;
        this._z = z;
    };

    exports.Vector3d.prototype.x = function () {
        return this._x;
    };

    exports.Vector3d.prototype.y = function () {
        return this._y;
    };

    exports.Vector3d.prototype.z = function () {
        return this._z;
    };

    exports.Vector3d.prototype.length = function () {
        return Math.sqrt(this.lengthSquared());
    };

    exports.Vector3d.prototype.lengthSquared = function () {
        return this._x * this._x + this._y * this._y + this._z * this._z;
    };

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

    exports.Vector3d.prototype.neg = function () {
        return new exports.Vector3d(
                -this._x,
                -this._y,
                -this._z
                );
    };

    exports.Vector3d.prototype.pitch = function () {
        var distXY = Math.sqrt(this._x * this._x + this._y * this._y);
        var pitch = -Math.atan2(this._z, distXY);
        return pitch;
    };

    exports.Vector3d.prototype.yaw = function () {
        var yaw = Math.atan2(this._y, this._x);
        return yaw;
    };

    exports.Vector3d.prototype.add = function (v) {
        return new exports.Vector3d(
                this._x + v._x,
                this._y + v._y,
                this._z + v._z
                );
    };

    exports.Vector3d.prototype.sub = function (v) {
        return new exports.Vector3d(
                this._x - v._x,
                this._y - v._y,
                this._z - v._z
                );
    };

    exports.Vector3d.prototype.mul = function (s) {
        return new exports.Vector3d(
                this._x * s,
                this._y * s,
                this._z * s
                );
    };

    exports.Vector3d.prototype.dot = function (b) {
        return this._x * b._x + this._y * b._y + this._z * b._z;
    };

    exports.Vector3d.prototype.cross = function (b) {
        var x = this._y * b._z - this._z * b._y;
        var y = this._z * b._x - this._x * b._z;
        var z = this._x * b._y - this._y * b._x;
        return new exports.Vector3d(x, y, z);
    };

    exports.Vector3d.prototype.spat = function (b, c) {
        return this.dot(b.cross(c));
    };

    exports.Vector3d.prototype.toArray = function () {
        return [this._x, this._y, this._z];
    };

    exports.Vector3d.prototype.toString = function () {
        return '' + this._x + ';' + this._y + ';' + this._z;
    };

    var vec3UnitX = Object.freeze(new exports.Vector3d(1.0, 0.0, 0.0));
    var vec3UnitY = Object.freeze(new exports.Vector3d(0.0, 1.0, 0.0));
    var vec3UnitZ = Object.freeze(new exports.Vector3d(0.0, 0.0, 1.0));
    var vec3Null = Object.freeze(new exports.Vector3d(0.0, 0.0, 0.0));

    exports.makeUnitXVector3d = function () {
        return vec3UnitX;
    };

    exports.makeUnitYVector3d = function () {
        return vec3UnitY;
    };

    exports.makeUnitZVector3d = function () {
        return vec3UnitZ;
    };

    exports.makeNullVector3d = function () {
        return vec3Null;
    };






    exports.matrix3x3FromArray = function (array) {
        return new exports.Matrix3x3(array);
    };

    exports.makeUnitMatrix3x3 = function () {
        return new exports.Matrix3x3([
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]);
    };

    exports.makeNullMatrix3x3 = function () {
        return new exports.Matrix3x3([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]);
    };

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

    exports.makeXRotation3x3 = function (angle) {
        var si_x = Math.sin(angle);
        var co_x = Math.cos(angle);
        return new exports.Matrix3x3([
            [1.0, 0.0, 0.0],
            [0.0, co_x, -si_x],
            [0.0, si_x, co_x]
        ]);
    };

    exports.makeYRotation3x3 = function (angle) {
        var si_y = Math.sin(angle);
        var co_y = Math.cos(angle);
        return new exports.Matrix3x3([
            [co_y, 0.0, si_y],
            [0.0, 1.0, 0.0],
            [-si_y, 0.0, co_y]
        ]);
    };

    exports.makeZRotation3x3 = function (angle) {
        var si_z = Math.sin(angle);
        var co_z = Math.cos(angle);
        return new exports.Matrix3x3([
            [co_z, -si_z, 0.0],
            [si_z, co_z, 0.0],
            [0.0, 0.0, 1.0]
        ]);
    };

    exports.makeScale3x3 = function (scaleX, scaleY, scaleZ) {
        return new exports.Matrix3x3([
            [scaleX, 0.0, 0.0],
            [0.0, scaleY, 0.0],
            [0.0, 0.0, scaleZ]
        ]);
    };

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

    exports.Matrix3x3.prototype.mul = function (s) {
        if (typeof (s) === 'number') {
            return new exports.Matrix3x3([
                [this.e11 * s, this.e12 * s, this.e13 * s],
                [this.e21 * s, this.e22 * s, this.e23 * s],
                [this.e31 * s, this.e32 * s, this.e33 * s]
            ]);
        }
        else if (s instanceof exports.Matrix3x3) {
            var m2 = s;
            return new exports.Matrix3x3([
                [
                    this.e11 * m2.e11 + this.e12 * m2.e21 + this.e13 * m2.e31,
                    this.e11 * m2.e12 + this.e12 * m2.e22 + this.e13 * m2.e32,
                    this.e11 * m2.e13 + this.e12 * m2.e23 + this.e13 * m2.e33
                ],
                [
                    this.e21 * m2.e11 + this.e22 * m2.e21 + this.e23 * m2.e31,
                    this.e21 * m2.e12 + this.e22 * m2.e22 + this.e23 * m2.e32,
                    this.e21 * m2.e13 + this.e22 * m2.e23 + this.e23 * m2.e33
                ],
                [
                    this.e31 * m2.e11 + this.e32 * m2.e21 + this.e33 * m2.e31,
                    this.e31 * m2.e12 + this.e32 * m2.e22 + this.e33 * m2.e32,
                    this.e31 * m2.e13 + this.e32 * m2.e23 + this.e33 * m2.e33
                ]
            ]);
        }
        else if (s instanceof exports.Vector3d) {
            var u = s;
            return exports.vector3dFromArray([           
                    this.e11 * u.x() + this.e12 * u.y() + this.e13 * u.z(),
                    this.e21 * u.x() + this.e22 * u.y() + this.e23 * u.z(),
                    this.e31 * u.x() + this.e32 * u.y() + this.e33 * u.z()
            ]);
        }
    };

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

    exports.Matrix3x3.prototype.transpose = function () {
        return new exports.Matrix3x3([
            [this.e11, this.e21, this.e31],
            [this.e12, this.e22, this.e32],
            [this.e13, this.e23, this.e33]
        ]);
    };

    exports.Matrix3x3.prototype.det = function () {
        return this.e11 * this.e22 * this.e33 +
                this.e12 * this.e23 * this.e31 +
                this.e13 * this.e21 * this.e32 -
                this.e13 * this.e22 * this.e31 -
                this.e11 * this.e23 * this.e32 -
                this.e12 * this.e21 * this.e33;
    };

    exports.Matrix3x3.prototype.phi = function () {
        return Math.atan2(this.e32, this.e33);
    };

    exports.Matrix3x3.prototype.theta = function () {
        return Math.asin(-this.e31);
    };

    exports.Matrix3x3.prototype.psi = function () {
        return Math.atan2(this.e21, this.e11);
    };


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
     * A quaternion
     * @class Quat
     * @constructor
     * @param r {Number} Real part
     * @param v {Vector3d} Imaginary vector part
     */
    exports.Quat = function(r, v) {
        if (r === undefined)
            throw new Error('r is undefined');
        if (v === undefined)
            throw new Error('v is undefined');
   	this._r = r;
	this._v = v;	
    };

    exports.Quat.prototype.add = function(q) {
	return new exports.Quat(
            this._r + q._r,
            this._v.add(q._v)
	);
    };

    exports.Quat.prototype.toString = function () {
        return this._r + ',' + this._v;
    };

})(typeof exports === 'undefined' ? this.vecmat = {} : exports);


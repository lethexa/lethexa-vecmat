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

    exports.vector3dFromString = function (vecAsString) {
        var parts = vecAsString.split(';');
        if (parts.length < 3)
            throw new Error('Too few arguments');
        return new exports.Vector3d([
            parseFloat(parts[0]),
            parseFloat(parts[1]),
            parseFloat(parts[2])
        ]);
    };

    exports.vector3dFromPolar = function (pitch, yaw, distance)
    {
        var cosPitchDist = distance * Math.cos(pitch);
        var sinPitchDist = -distance * Math.sin(pitch);

        return new exports.Vector3d([
                cosPitchDist * Math.cos(yaw),
                cosPitchDist * Math.sin(yaw),
                sinPitchDist]);
    };

    exports.vector3dFromElements = function (x,y,z)
    {
        return new exports.Vector3d([x,y,z]);
    };

    exports.Vector3d = function (elements) {
        this._x = elements[0];
        this._y = elements[1];
        this._z = elements[2];
    };

    exports.Vector3d.prototype.x = function() {
        return this._x;
    };

    exports.Vector3d.prototype.y = function() {
        return this._y;
    };

    exports.Vector3d.prototype.z = function() {
        return this._z;
    };

    exports.Vector3d.prototype.length = function() {
        return Math.sqrt(this.lengthSquared());
    };

    exports.Vector3d.prototype.lengthSquared = function() {
        return this._x*this._x + this._y*this._y+ this._z*this._z;
    };

    exports.Vector3d.prototype.unit = function() {
        var betrag = this.length();
        if(betrag === 0.0)
            return undefined;
        return exports.vector3dFromElements(
            this._x / betrag,
            this._y / betrag,
            this._z / betrag
        );
    };

    exports.Vector3d.prototype.neg = function() {
        return exports.vector3dFromElements(
            -this._x,
            -this._y,
            -this._z
        );
    };

    exports.Vector3d.prototype.pitch = function() {
        var distXY = Math.sqrt(this._x * this._x + this._y * this._y);
        var pitch = -Math.atan2(this._z, distXY);
        return pitch;
    };

    exports.Vector3d.prototype.yaw = function() {
        var yaw = Math.atan2(this._y, this._x);
        return yaw;
    };

    exports.Vector3d.prototype.add = function(v) {
        return new exports.Vector3d([
            this._x + v._x,
            this._y + v._y,
            this._z + v._z
        ]);
    };

    exports.Vector3d.prototype.sub = function(v) {
        return new exports.Vector3d([
            this._x - v._x,
            this._y - v._y,
            this._z - v._z
        ]);
    };

    exports.Vector3d.prototype.mul = function(s) {
        return new exports.Vector3d([
            this._x * s,
            this._y * s,
            this._z * s
        ]);
    };

    exports.Vector3d.prototype.dot = function(b) {
        return this.x * b.x + this.y * b.y + this.z * b.z;
    };
    
    exports.Vector3d.prototype.cross = function(b) {
        var x = this._y * b._z - this._z * b._y;
        var y = this._z * b._x - this._x * b._z;
        var z = this._x * b._y - this._y * b._x;
        return new exports.Vector3d(x, y, z);
    };

    exports.Vector3d.prototype.spat = function(b, c) {
        return dot(b.cross(c));
    };

    exports.Vector3d.prototype.toArray = function() {
        return [this._x, this._y, this._z];
    };

    exports.Vector3d.prototype.toString = function () {
        return '' + this._x + ';' + this._y + ';' + this._z;
    };


    exports.Matrix3x3 = function (elements) {

    };

})(typeof exports === 'undefined' ? this.geo = {} : exports);


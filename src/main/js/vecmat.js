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

        return new exports.Vector3d(
                cosPitchDist * Math.cos(yaw),
                cosPitchDist * Math.sin(yaw),
                sinPitchDist);
    };

    exports.Vector3d = function (elements) {
        this._elements = elements;

    };
    exports.Vector3d.prototype.toString = function () {
        return '' + this._elements[0] + ';' + this._elements[1] + ';' + this._elements[2];
    };


    exports.Matrix3x3 = function (elements) {

    };

})(typeof exports === 'undefined' ? this.geo = {} : exports);


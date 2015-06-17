var assert = require("assert");
var vecmat = require("../../main/js/vecmat.js");


describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(5));
            assert.equal(-1, [1, 2, 3].indexOf(0));
        });
    });
});



describe('Vector3d', function () {
    describe('#vector3dFromString()', function () {
        it('should return valid vector when parsing from string', function () {
            var v = vecmat.vector3dFromString('1;2;3');
            
            var actual = v.toString();
            var expected = '1;2;3';
            
            assert.equal(expected, actual);
        });
    });

    describe('#vector3dFromPolar()', function () {
        it('should return valid vector when providing polar coordinates', function () {
            var v = vecmat.vector3dFromPolar(0, 0, 1);

            var actual = v.toString();
            var expected = '1;0;0';

            assert.equal(expected, actual);
        });
    });

    describe('#vector3dFromElements()', function () {
        it('should return valid vector when providing 3 elements', function () {
            var v = vecmat.vector3dFromElements(0, 0, 1);

            var actual = v.toString();
            var expected = '0;0;1';

            assert.equal(expected, actual);
        });
    });

    describe('#length()', function () {
        it('should return the length of the vector', function () {
            var v = vecmat.vector3dFromElements(0, 0, 1);

            var actual = v.length();
            var expected = 1;

            assert.equal(expected, actual);
        });
    });

    describe('#neg()', function () {
        it('should return the negative vector', function () {
            var v = vecmat.vector3dFromElements(1, 2, 3);

            var actual = v.neg().toString();
            var expected = '-1;-2;-3';

            assert.equal(expected, actual);
        });
    });

    describe('#unit()', function () {
        it('should return the unit vector', function () {
            var v = vecmat.vector3dFromElements(0, 0, 5);

            var actual = v.unit().toString();
            var expected = '0;0;1';

            assert.equal(expected, actual);
        });
    });

    describe('#pitch()', function () {
        it('should return the pitch of the vector', function () {
            var v = vecmat.vector3dFromPolar(45 * Math.PI / 180.0, 0, 5);

            var actual = v.pitch();
            var expected = 45 * Math.PI / 180.0;

            assert.equal(expected, actual);
        });
    });

    describe('#yaw()', function () {
        it('should return the yaw of the vector', function () {
            var v = vecmat.vector3dFromPolar(0, 45 * Math.PI / 180.0, 5);

            var actual = v.yaw();
            var expected = 45 * Math.PI / 180.0;

            assert.equal(expected, actual);
        });
    });
});


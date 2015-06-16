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
});


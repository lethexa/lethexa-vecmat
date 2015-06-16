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
});

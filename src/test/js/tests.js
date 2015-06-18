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

    describe('#add()', function () {
        it('should return the addition of two vectors', function () {
            var v1 = vecmat.vector3dFromElements(1, 2, 3);
            var v2 = vecmat.vector3dFromElements(2, 4, 6);

            var actual = v1.add(v2);
            var expected = vecmat.vector3dFromElements(3, 6, 9);

            assert.equal(expected.x(), actual.x());
            assert.equal(expected.y(), actual.y());
            assert.equal(expected.z(), actual.z());
        });
    });

    describe('#sub()', function () {
        it('should return the subtraction of two vectors', function () {
            var v1 = vecmat.vector3dFromElements(1, 2, 3);
            var v2 = vecmat.vector3dFromElements(2, 4, 6);

            var actual = v2.sub(v1);
            var expected = vecmat.vector3dFromElements(1, 2, 3);

            assert.equal(expected.x(), actual.x());
            assert.equal(expected.y(), actual.y());
            assert.equal(expected.z(), actual.z());
        });
    });

    describe('#sub()', function () {
        it('should return the multiplication with a scalar', function () {
            var v = vecmat.vector3dFromElements(1, 2, 3);

            var actual = v.mul(10);
            var expected = vecmat.vector3dFromElements(10, 20, 30);

            assert.equal(expected.x(), actual.x());
            assert.equal(expected.y(), actual.y());
            assert.equal(expected.z(), actual.z());
        });
    });

    describe('#dot()', function () {
        it('should return the dot-product of two vectors', function () {
            var v1 = vecmat.vector3dFromElements(1, 0, 0);
            var v2 = vecmat.vector3dFromElements(0, 1, 0);

            var actual = v1.dot(v2);
            var expected = 0;

            assert.equal(expected, actual);
        });
    });

    describe('#cross()', function () {
        it('should return the multiplication with a scalar', function () {
            var v1 = vecmat.vector3dFromElements(1, 0, 0);
            var v2 = vecmat.vector3dFromElements(0, 1, 0);

            var actual = v1.cross(v2);
            var expected = vecmat.vector3dFromElements(0, 0, 1);

            assert.equal(expected.x(), actual.x());
            assert.equal(expected.y(), actual.y());
            assert.equal(expected.z(), actual.z());
        });
    });

    describe('#spat()', function () {
        it('should return the spatproduct of 3 vectors', function () {
            var b = vecmat.vector3dFromElements(0, 1, 0);
            var c = vecmat.vector3dFromElements(0, 1, 0);
            var i = vecmat.vector3dFromElements(1, 0, 0);

            var actual = i.spat(b, c);
            var expected = 0.0;

            assert.equal(expected, actual);
        });
    });

    describe('#spat()', function () {
        it('should return the volume of 3 vectors', function () {
            var a = vecmat.vector3dFromElements(1, 0, 0);
            var b = vecmat.vector3dFromElements(0, 1, 0);
            var c = vecmat.vector3dFromElements(0, 0, 1);

            var actual = a.spat(b, c);
            var expected = 1.0;

            assert.equal(expected, actual);
        });
    });

    describe('#toArray()', function () {
        it('should return the vector as array', function () {
            var v = vecmat.vector3dFromElements(1, 2, 3);

            var actual = v.toArray();
            var expected = [1,2,3];

            assert.equal(expected[0], actual[0]);
            assert.equal(expected[1], actual[1]);
            assert.equal(expected[2], actual[2]);
        });
    });
});






describe('Matrix3x3', function () {
    describe('#makeXRotation3x3()', function () {
        it('should return valid rotationmatrix for given angle', function () {
            var actual = vecmat.makeXRotation3x3(0.0);
            var expected = vecmat.makeUnitMatrix3x3();

            assert.equal(true, actual.isEqualTo(expected));
        });
    });
});

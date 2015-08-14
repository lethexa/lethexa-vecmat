var assert = require("assert");
var vecmat = require("../lib/vecmat.js");


describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(5));
            assert.equal(-1, [1, 2, 3].indexOf(0));
        });
    });
});



describe('Vector3d', function () {
    
    describe('#intersectionAtPositiveYAxis2d()', function () {
        it('should return intesectionpoint at y-axis', function () {
            var v1 = vecmat.vector3dFromString('-1;2;0');
            var v2 = vecmat.vector3dFromString('1;4;0');
            
            var actual = vecmat.intersectionAtPositiveYAxis2d(v1, v2).toString();
            var expected = '0;3;0';
            
            assert.equal(expected, actual);
        });
    });

    
    
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
    describe('#mul()', function () {
        it('multiply a matrix with a skalar', function () {
            var m = vecmat.matrix3x3FromArray([[1,0,0],[0,1,0],[0,0,1]]);
            var s = 2;
            
            var actual = m.mul(s).toString();
            var expected = '2,0,0,\n0,2,0,\n0,0,2,\n';
            
            assert.equal(expected, actual);
        });
    });

    describe('#mul()', function () {
        it('multiply two matrices', function () {
            var m1 = vecmat.matrix3x3FromArray([[1,0,0],[0,1,0],[0,0,1]]);
            var m2 = vecmat.matrix3x3FromArray([[1,0,0],[0,1,0],[0,0,1]]);
            
            var actual = m1.mul(m2).toString();
            var expected = '1,0,0,\n0,1,0,\n0,0,1,\n';
            
            assert.equal(expected, actual);
        });
    });

    describe('#mul()', function () {
        it('multiply two matrices', function () {
            var m1 = vecmat.matrix3x3FromArray([[1,0,0],[0,1,0],[0,0,1]]);
            var m2 = vecmat.matrix3x3FromArray([[-1,0,0],[0,-1,0],[0,0,-1]]);
            
            var actual = m1.mul(m2).toString();
            var expected = '-1,0,0,\n0,-1,0,\n0,0,-1,\n';
            
            assert.equal(expected, actual);
        });
    });

    describe('#mul()', function () {
        it('multiply a matrix and a vector', function () {
            var m1 = vecmat.makeUnitMatrix3x3();
            var v2 = vecmat.vector3dFromArray([1,0,0]);
            
            var actual = m1.mul(v2).toString();
            var expected = '1;0;0';
            
            assert.equal(expected, actual);
        });
    });

    describe('#transpose()', function () {
        it('transpose a matrices', function () {
            var m = vecmat.matrix3x3FromArray([[1,2,3],[4,5,6],[7,8,9]]);
            
            var actual = m.transpose().toString();
            var expected = '1,4,7,\n2,5,8,\n3,6,9,\n';
            
            assert.equal(expected, actual);
        });
    });

    describe('#det()', function () {
        it('calculates the determinante of a matrices', function () {
            var m = vecmat.matrix3x3FromArray([[1,0,0],[0,1,0],[0,0,1]]);
            
            var actual = m.det();
            var expected = 1;
            
            assert.equal(expected, actual);
        });
    });

    describe('#phi()', function () {
        it('calculates phi-angle of a matrices', function () {
            var m = vecmat.matrix3x3FromArray([[1,0,0],[0,1,0],[0,0,1]]);
            
            var actual = m.phi();
            var expected = 0;
            
            assert.equal(expected, actual);
        });
    });

    describe('#theta()', function () {
        it('calculates theta-angle of a matrices', function () {
            var m = vecmat.matrix3x3FromArray([[1,0,0],[0,1,0],[0,0,1]]);
            
            var actual = m.theta();
            var expected = 0;
            
            assert.equal(expected, actual);
        });
    });

    describe('#psi()', function () {
        it('calculates psi-angle of a matrices', function () {
            var m = vecmat.matrix3x3FromArray([[1,0,0],[0,1,0],[0,0,1]]);
            
            var actual = m.psi();
            var expected = 0;
            
            assert.equal(expected, actual);
        });
    });


    describe('#makeXRotation3x3()', function () {
        it('Creates a rotation-matrix around the x-axis', function () {
            var m = vecmat.makeXRotation3x3(0.0);
            
            var actual = m.toString();
            var expected = vecmat.makeUnitMatrix3x3().toString();
            
            assert.equal(expected, actual);
        });
    });

    describe('#makeYRotation3x3()', function () {
        it('Creates a rotation-matrix around the y-axis', function () {
            var m = vecmat.makeYRotation3x3(0.0);
            
            var actual = m.toString();
            var expected = vecmat.makeUnitMatrix3x3().toString();
            
            assert.equal(expected, actual);
        });
    });

    describe('#makeZRotation3x3()', function () {
        it('Creates a rotation-matrix around the z-axis', function () {
            var m = vecmat.makeZRotation3x3(0.0);
            
            var actual = m.toString();
            var expected = vecmat.makeUnitMatrix3x3().toString();
            
            assert.equal(expected, actual);
        });
    });

    describe('#makeScale3x3()', function () {
        it('Creates a rotation-matrix around the z-axis', function () {
            var m = vecmat.makeScale3x3(1.0, 2.0, 3.0);

            var actual = m.toString();
            var expected = vecmat.matrix3x3FromArray([[1,0,0],[0,2,0],[0,0,3]]).toString();
            
            assert.equal(expected, actual);
        });
    });

    describe('#toGlobalMatrix3x3()', function () {
        it('Creates a rotation-matrix from 3 angles', function () {
            var m = vecmat.toGlobalMatrix3x3(0.0, 0.0, 0.0);

            var actual = m.toString();
            var expected = vecmat.matrix3x3FromArray([[1,0,0],[0,1,0],[0,0,1]]).toString();
            
            assert.equal(expected, actual);
        });
    });

    describe('#toLocalMatrix3x3()', function () {
        it('Creates a rotation-matrix from 3 angles', function () {
            var m = vecmat.toLocalMatrix3x3(0.0, 0.0, 0.0);

            var actual = m.toString();
            var expected = vecmat.matrix3x3FromArray([[1,0,0],[0,1,0],[0,0,1]]).toString();
            
            assert.equal(expected, actual);
        });
    });

    describe('#toLocalMatrix3x3()', function () {
        it('Multiplication of toLocal- and toGlobal gives unitmatrix', function () {
            var g = vecmat.toGlobalMatrix3x3(Math.PI, Math.PI, 0);
            var l = vecmat.toLocalMatrix3x3(-Math.PI, -Math.PI, 0);

            var actual = g.mul(l).toString();
            var expected = vecmat.matrix3x3FromArray([[1,0,0],[0,1,0],[0,0,1]]).toString();
            
            assert.equal(expected, actual);
        });
    });

    describe('#toString()', function () {
        it('should return a string reprentation of a matrix', function () {
            var m = vecmat.makeUnitMatrix3x3();
            
            var actual = m.toString();
            var expected = '1,0,0,\n0,1,0,\n0,0,1,\n';
            
            assert.equal(expected, actual);
        });
    });

    describe('#toString()', function () {
        it('should return a string reprentation of a matrix', function () {
            var m = vecmat.makeNullMatrix3x3();
            
            var actual = m.toString();
            var expected = '0,0,0,\n0,0,0,\n0,0,0,\n';
            
            assert.equal(expected, actual);
        });
    });
});



describe('Quat', function () {
    describe('#add()', function () {
        it('should return the sum of the quaternions', function () {
	    var q1 = new vecmat.Quat(1.0, new vecmat.Vector3d(1.0, 1.0, 1.0) );
	    var q2 = new vecmat.Quat(2.0, new vecmat.Vector3d(2.0, 2.0, 2.0) );
		
            var result = q1.add(q2);
            var expected = new vecmat.Quat(3.0, new vecmat.Vector3d(3.0, 3.0, 3.0));

            assert.deepEqual(expected, result);
        });
    });
    
    describe('#sub()', function () {
        it('should return the substraction of the quaternions', function () {
	    var q1 = new vecmat.Quat(1.0, new vecmat.Vector3d(1.0, 1.0, 1.0) );
	    var q2 = new vecmat.Quat(2.0, new vecmat.Vector3d(2.0, 2.0, 2.0) );
		
            var result = q1.sub(q2);
            var expected = new vecmat.Quat(-1.0, new vecmat.Vector3d(-1.0, -1.0, -1.0));

            assert.deepEqual(expected, result);
        });
    });


    describe('#toString()', function () {
        it('should return a valid string representation', function () {
	    var q = new vecmat.Quat(1.0, new vecmat.Vector3d(2.0, 3.0, 4.0) );
		
            var result = q.toString();
            var expected = '1,2;3;4';

            assert.deepEqual(expected, result);
        });
    });

});



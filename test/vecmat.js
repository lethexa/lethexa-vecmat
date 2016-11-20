var assert = require('assert');
//var vecmat = require('../lib/vecmat.js');
//var vecmat = require('../coverage/instrument/lib/vecmat.js');
var vecmat = require((process.env.APP_DIR_FOR_CODE_COVERAGE || '../lib/') + 'vecmat.js');


var round = function(x, digits) {
    var multiplier = Math.pow(10.0, digits);
    return Math.floor(x * multiplier ) / multiplier;
};




describe('Vector2d', function () {    
    
    describe('#vector2dFromString()', function () {
        it('should return valid vector when parsing from string', function () {
            var v = vecmat.vector2dFromString('1;2');
            
            var actual = v.toString();
            var expected = '1;2';
            
            assert.equal(expected, actual);
        });
    });

    describe('#vector2dFromPolar()', function () {
        it('should return valid vector when providing polar coordinates', function () {
            var v = vecmat.vector2dFromPolar(0, 1);

            var actual = v.toString();
            var expected = '1;0';

            assert.equal(expected, actual);
        });
    });

    describe('#vector2dFromElements()', function () {
        it('should return valid vector when providing 2 elements', function () {
            var v = vecmat.vector2dFromElements(0, 1);

            var actual = v.toString();
            var expected = '0;1';

            assert.equal(expected, actual);
        });
    });

    describe('#isEqualTo()', function () {
        it('should return true if both are equal', function () {
            var v1 = vecmat.vector2dFromElements(0, 1);
            var v2 = vecmat.vector2dFromElements(0, 1);

            var result = v1.isEqualTo(v2);

            assert.equal(true, result);
        });
    });

    describe('#isEqualTo()', function () {
        it('should return false if both are NOT equal', function () {
            var v1 = vecmat.vector2dFromElements(0, 0);
            var v2 = vecmat.vector2dFromElements(1, 1);

            var result = v1.isEqualTo(v2);

            assert.equal(false, result);
        });
    });

    describe('#length()', function () {
        it('should return the length of the vector', function () {
            var v = vecmat.vector2dFromElements(0, 1);

            var actual = v.length();
            var expected = 1;

            assert.equal(expected, actual);
        });
    });

    describe('#neg()', function () {
        it('should return the negative vector', function () {
            var v = vecmat.vector2dFromElements(1, 2);

            var actual = v.neg().toString();
            var expected = '-1;-2';

            assert.equal(expected, actual);
        });
    });

    describe('#unit()', function () {
        it('should return the unit vector', function () {
            var v = vecmat.vector2dFromElements(0, 5);

            var actual = v.unit().toString();
            var expected = '0;1';

            assert.equal(expected, actual);
        });
    });

    describe('#pitch()', function () {
        it('should return the pitch of the vector', function () {
            var v = vecmat.vector2dFromPolar(45 * Math.PI / 180.0, 5);

            var actual = v.pitch();
            var expected = 45 * Math.PI / 180.0;

            assert.equal(expected, actual);
        });
    });

    describe('#add()', function () {
        it('should return the addition of two vectors', function () {
            var v1 = vecmat.vector2dFromElements(1, 2);
            var v2 = vecmat.vector2dFromElements(2, 4);

            var actual = v1.add(v2);
            var expected = vecmat.vector3dFromElements(3, 6);

            assert.equal(expected.x(), actual.x());
            assert.equal(expected.y(), actual.y());
        });
    });

    describe('#sub()', function () {
        it('should return the subtraction of two vectors', function () {
            var v1 = vecmat.vector2dFromElements(1, 2);
            var v2 = vecmat.vector2dFromElements(2, 4);

            var actual = v2.sub(v1);
            var expected = vecmat.vector3dFromElements(1, 2);

            assert.equal(expected.x(), actual.x());
            assert.equal(expected.y(), actual.y());
        });
    });

    describe('#sub()', function () {
        it('should return the multiplication with a scalar', function () {
            var v = vecmat.vector2dFromElements(1, 2);

            var actual = v.mul(10);
            var expected = vecmat.vector3dFromElements(10, 20);

            assert.equal(expected.x(), actual.x());
            assert.equal(expected.y(), actual.y());
        });
    });

    describe('#dot()', function () {
        it('should return the dot-product of two vectors', function () {
            var v1 = vecmat.vector2dFromElements(1, 0);
            var v2 = vecmat.vector2dFromElements(0, 1);

            var actual = v1.dot(v2);
            var expected = 0;

            assert.equal(expected, actual);
        });
    });

    describe('#toArray()', function () {
        it('should return the vector as array', function () {
            var v = vecmat.vector2dFromElements(1, 2);

            var actual = v.toArray();
            var expected = [1,2];

            assert.equal(expected[0], actual[0]);
            assert.equal(expected[1], actual[1]);
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

    describe('#isEqualTo()', function () {
        it('should return true if both are equal', function () {
            var v1 = vecmat.vector3dFromElements(1, 1, 1);
            var v2 = vecmat.vector3dFromElements(1, 1, 1);

            var result = v1.isEqualTo(v2);

            assert.equal(true, result);
        });
    });

    describe('#isEqualTo()', function () {
        it('should return false if both are NOT equal', function () {
            var v1 = vecmat.vector3dFromElements(0, 0, 0);
            var v2 = vecmat.vector3dFromElements(1, 1, 1);

            var result = v1.isEqualTo(v2);

            assert.equal(false, result);
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
    describe('#mulScalar()', function () {
        it('multiply a matrix with a skalar', function () {
            var m = vecmat.matrix3x3FromArray([[1,0,0],[0,1,0],[0,0,1]]);
            var s = 2;
            
            var actual = m.mulScalar(s).toString();
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

    describe('#mulVector()', function () {
        it('multiply a matrix and a vector', function () {
            var m1 = vecmat.makeUnitMatrix3x3();
            var v2 = vecmat.vector3dFromArray([1,0,0]);
            
            var actual = m1.mulVector(v2).toString();
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
    describe('#quatFromEulerAngles()', function () {
        it('should return a quat from the given euler angles', function () {
            var phi = 0.0;
            var theta = 45.0 * Math.PI / 180.0;
            var psi = 0.0;

	    var result = vecmat.quatFromEulerAngles(phi, theta, psi);
	    var expected = vecmat.quatFromRotation(
                45.0 * Math.PI / 180.0, 
                vecmat.makeUnitYVector3d()
            );
		
            assert.deepEqual(expected.round(8), result.round(8));
        });
    });

    describe('#shortestArcQuat()', function () {
        it('should return the shortest arc quat between two vectors 1', function () {
            var v1 = new vecmat.Vector3d(1.0, 0.0, 0.0);
            var v2 = new vecmat.Vector3d(0.0, 1.0, 0.0);

	    var result = vecmat.shortestArcQuat(v1, v2);
	    var expected = vecmat.quatFromRotation(
                90.0 * Math.PI / 180.0, 
                vecmat.makeUnitZVector3d()
            );
		
            assert.deepEqual(expected.round(8), result.round(8));
        });
    });

    describe('#shortestArcQuat()', function () {
        it('should return the shortest arc quat between two vectors 2', function () {
            var v1 = new vecmat.Vector3d(1.0, 0.0, 0.0);
            var v2 = new vecmat.Vector3d(1.0, 1.0, 0.0);

	    var result = vecmat.shortestArcQuat(v1, v2);
	    var expected = vecmat.quatFromRotation(
                45.0 * Math.PI / 180.0, 
                vecmat.makeUnitZVector3d()
            );
		
            assert.deepEqual(expected.round(8), result.round(8));
        });
    });

    describe('#isEqualTo()', function () {
        it('should return true if both are equal', function () {
            var q1 = new vecmat.Quat(2.0, new vecmat.Vector3d(1.0, 1.0, 1.0) );
            var q2 = new vecmat.Quat(2.0, new vecmat.Vector3d(1.0, 1.0, 1.0) );

            var result = q1.isEqualTo(q2);

            assert.equal(true, result);
        });
    });

    describe('#isEqualTo()', function () {
        it('should return false if both are NOT equal', function () {
            var q1 = new vecmat.Quat(2.0, new vecmat.Vector3d(0.0, 0.0, 0.0) );
            var q2 = new vecmat.Quat(2.0, new vecmat.Vector3d(1.0, 1.0, 1.0) );

            var result = q1.isEqualTo(q2);

            assert.equal(false, result);
        });
    });

    describe('#real()', function () {
        it('should return the real part of the quaternion', function () {
	    var q = new vecmat.Quat(2.0, new vecmat.Vector3d(1.0, 1.0, 1.0) );
		
            var result = q.real();
            var expected = 2.0;

            assert.deepEqual(expected, result);
        });
    });

    describe('#imag()', function () {
        it('should return the imag part of the quaternion', function () {
	    var q = new vecmat.Quat(2.0, new vecmat.Vector3d(1.0, 1.0, 1.0) );
		
            var result = q.imag();
            var expected = new vecmat.Vector3d(1.0, 1.0, 1.0);

            assert.deepEqual(expected, result);
        });
    });

    describe('#quatRotationFromAxis()', function () {
        it('should return a rotation quaternion from axis and angle', function () {
            var angle = 180.0 * Math.PI / 180.0;
            var axis = vecmat.makeUnitZVector3d();

	    var result = vecmat.quatFromRotation(angle, axis);
	    var expected = new vecmat.Quat(6.123233995736766e-17, new vecmat.Vector3d(0.0, 0.0, 1.0) );
		
            assert.deepEqual(expected, result);
        });
    });


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

    describe('#lengthSquared()', function () {
        it('should return the length-squared of the quaternion', function () {
	    var q = new vecmat.Quat(2.0, new vecmat.Vector3d(2.0, 2.0, 2.0) );
		
            var result = q.lengthSquared();
            var expected = 16;

            assert.deepEqual(expected, result);
        });
    });

    describe('#length()', function () {
        it('should return the length of the quaternion', function () {
	    var q = new vecmat.Quat(2.0, new vecmat.Vector3d(2.0, 2.0, 2.0) );
		
            var result = q.length();
            var expected = 4;

            assert.deepEqual(expected, result);
        });
    });
    
    describe('#unit()', function () {
        it('should return a unit-length quaternion', function () {
	    var q = new vecmat.Quat(16.0, new vecmat.Vector3d(0.0, 0.0, 0.0) );
		
            var result = q.unit();
            var expected = new vecmat.Quat(1.0, new vecmat.Vector3d(0.0, 0.0, 0.0));

            assert.deepEqual(expected, result);
        });
    });

    describe('#dot()', function () {
        it('should return the scalar-product', function () {
	    var q1 = new vecmat.Quat(1.0, new vecmat.Vector3d(1.0, 1.0, 1.0) );
            var q2 = new vecmat.Quat(2.0, new vecmat.Vector3d(2.0, 2.0, 2.0) );	
	
            var result = q1.dot(q2);
            var expected = 8.0;

            assert.deepEqual(expected, result);
        });
    });

    describe('#axis()', function () {
        it('should return the rotation-axis of the quaternion', function () {
            var angle = 180.0 * Math.PI / 180.0;
            var axis = vecmat.makeUnitZVector3d();
	    var q = vecmat.quatFromRotation(angle, axis);

	    var result = q.axis();
	    var expected = axis;
		
            assert.deepEqual(expected, result);
        });
    });

    describe('#angle()', function () {
        it('should return the angle around the rotation-axis of the quaternion', function () {
            var angle = 180.0 * Math.PI / 180.0;
            var axis = vecmat.makeUnitZVector3d();
	    var q = vecmat.quatFromRotation(angle, axis);

	    var result = q.angle();
	    var expected = angle;
		
            assert.deepEqual(expected, result);
        });
    });

    describe('#angleTo()', function () {
        it('should return the angle between two quaternions', function () {
            var angle = 45.0 * Math.PI / 180.0;
            var axis = vecmat.makeUnitZVector3d();
            var q1 = vecmat.quatFromRotation(0, axis);
            var q2 = vecmat.quatFromRotation(angle, axis);

	    var result = round(q1.angleTo(q2), 6);
	    var expected = round(angle, 6);
		
            assert.deepEqual(expected, result);
        });
    });

    describe('#lerpTo()', function () {
        it('should return the first quat, when dt = 0', function () {
            var angle = 45.0 * Math.PI / 180.0;
            var axis = vecmat.makeUnitZVector3d();
            var q1 = vecmat.quatFromRotation(0, axis);
            var q2 = vecmat.quatFromRotation(angle, axis);
            var dt = 0.0;

	    var result = q1.lerpTo(q2, dt);
	    var expected = q1;
		
            assert.deepEqual(expected, result);
        });
    });

    describe('#lerpTo()', function () {
        it('should return the first quat, when dt = 1', function () {
            var angle = 45.0 * Math.PI / 180.0;
            var axis = vecmat.makeUnitZVector3d();
            var q1 = vecmat.quatFromRotation(0, axis);
            var q2 = vecmat.quatFromRotation(angle, axis);
            var dt = 1.0;

	    var result = q1.lerpTo(q2, dt);
	    var expected = q2;
		
            assert.deepEqual(expected, result);
        });
    });


    describe('#slerpTo()', function () {
        it('should return the first quat, when dt = 0', function () {
            var angle = 45.0 * Math.PI / 180.0;
            var axis = vecmat.makeUnitZVector3d();
            var q1 = vecmat.quatFromRotation(0, axis);
            var q2 = vecmat.quatFromRotation(angle, axis);
            var dt = 0.0;

	    var result = q1.slerpTo(q2, dt);
	    var expected = q1;
		
            assert.deepEqual(expected, result);
        });
    });

    describe('#slerpTo()', function () {
        it('should return the first quat, when dt = 1', function () {
            var angle = 45.0 * Math.PI / 180.0;
            var axis = vecmat.makeUnitZVector3d();
            var q1 = vecmat.quatFromRotation(0, axis);
            var q2 = vecmat.quatFromRotation(angle, axis);
            var dt = 1.0;

	    var result = q1.slerpTo(q2, dt);
	    var expected = q2;
		
            assert.deepEqual(expected, result);
        });
    });




    describe('#neg()', function () {
        it('should return the negative quaternion', function () {
	    var q = new vecmat.Quat(16.0, new vecmat.Vector3d(1.0, 2.0, 3.0) );

	    var result = q.neg();
	    var expected = new vecmat.Quat(-16.0, new vecmat.Vector3d(-1.0, -2.0, -3.0) );
		
            assert.deepEqual(expected, result);
        });
    });

    describe('#conj()', function () {
        it('should return the conjugate quaternion', function () {
	    var q = new vecmat.Quat(16.0, new vecmat.Vector3d(1.0, 2.0, 3.0) );

	    var result = q.conj();
	    var expected = new vecmat.Quat(16.0, new vecmat.Vector3d(-1.0, -2.0, -3.0) );
		
            assert.deepEqual(expected, result);
        });
    });

    describe('#mul()', function () {
        it('should return a combined rotation quaternion', function () {
            var angle = 90.0 * Math.PI / 180.0;
            var axis = vecmat.makeUnitZVector3d();
            var q1 = vecmat.quatFromRotation(angle, axis);
            var q2 = vecmat.quatFromRotation(angle, axis);

	    var result = q1.mul(q2);
	    var expected = new vecmat.Quat(2.220446049250313e-16, new vecmat.Vector3d(0.0, 0.0, 1.0) );
		
            assert.deepEqual(expected, result);
        });
    });

    describe('#mulVector()', function () {
        it('should return a rotated vector', function () {
            var angle = 90.0 * Math.PI / 180.0;
            var axis = vecmat.makeUnitZVector3d();
            var v = vecmat.makeUnitXVector3d();
            var q = vecmat.quatFromRotation(angle, axis);

	    var result = q.mulVector(v).round(6);
	    var expected = vecmat.quatFromVector3d(vecmat.makeUnitYVector3d());
		
            assert.deepEqual(expected, result);
        });
    });

    describe('#toMatrix3x3()', function () {
        it('should create a rotated vector', function () {
            var angle = 90.0 * Math.PI / 180.0;
            var axis = vecmat.makeUnitZVector3d();
            var q = vecmat.quatFromRotation(angle, axis);
            var v = new vecmat.Vector3d(1.0, 0.0, 0.0);

	    var result = q.toMatrix3x3().mulVector(v);
	    var expected = new vecmat.Vector3d(2.220446049250313e-16, 1.0, 0.0);
		
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


describe('Ray', function () {

    describe('#isEqualTo()', function () {
        it('should return true if both are equal', function () {
            var r1 = new vecmat.Ray(new vecmat.Vector3d(0.0, 0.0, 0.0), new vecmat.Vector3d(1.0, 1.0, 1.0) );
            var r2 = new vecmat.Ray(new vecmat.Vector3d(0.0, 0.0, 0.0), new vecmat.Vector3d(1.0, 1.0, 1.0) );

            var result = r1.isEqualTo(r2);

            assert.equal(true, result);
        });
    });

    describe('#isEqualTo()', function () {
        it('should return false if both are NOT equal', function () {
            var r1 = new vecmat.Ray(new vecmat.Vector3d(0.0, 0.0, 0.0), new vecmat.Vector3d(1.0, 1.0, 1.0) );
            var r2 = new vecmat.Ray(new vecmat.Vector3d(1.0, 1.0, 1.0), new vecmat.Vector3d(0.0, 0.0, 0.0) );

            var result = r1.isEqualTo(r2);

            assert.equal(false, result);
        });
    });

    describe('#getStart()', function () {
        it('should return the raystart-vector', function () {
            var start = new vecmat.Vector3d(1,0,0);
            var end = new vecmat.Vector3d(2,0,0);
            var ray = vecmat.rayFromPoints(start, end);

            assert.deepEqual(start, ray.getStart());
        });
    });

    describe('#getDirection()', function () {
        it('should return the raydirection-vector', function () {
            var start = new vecmat.Vector3d(1,0,0);
            var end = new vecmat.Vector3d(3,0,0);
            var ray = vecmat.rayFromPoints(start, end);

            assert.deepEqual(new vecmat.Vector3d(1,0,0), ray.getDirection());
        });
    });

    describe('#getDirection()', function () {
        it('should return the raydirection-vector', function () {
            var start = new vecmat.Vector3d(0,0,0);
            var direction = new vecmat.Vector3d(2,0,0);
            var ray = vecmat.rayFromPointDir(start, direction);

            assert.deepEqual(new vecmat.Vector3d(1,0,0), ray.getDirection());
        });
    });

    describe('#getPointAtLength()', function () {
        it('should return the vector at the given distance', function () {
            var start = new vecmat.Vector3d(0,0,0);
            var direction = new vecmat.Vector3d(2,0,0);
            var ray = vecmat.rayFromPointDir(start, direction);

            var result = ray.getPointAtLength(0.5);

            assert.deepEqual(new vecmat.Vector3d(0.5,0,0), result);
        });
    });
});


describe('Triangle', function () {

    describe('#isEqualTo()', function () {
        it('should return true if both are equal', function () {
            var t1 = new vecmat.Triangle(new vecmat.Vector3d(0.0, 0.0, 0.0), new vecmat.Vector3d(1.0, 1.0, 1.0), new vecmat.Vector3d(2.0, 1.0, 1.0) );
            var t2 = new vecmat.Triangle(new vecmat.Vector3d(0.0, 0.0, 0.0), new vecmat.Vector3d(1.0, 1.0, 1.0), new vecmat.Vector3d(2.0, 1.0, 1.0) );

            var result = t1.isEqualTo(t2);

            assert.equal(true, result);
        });
    });

    describe('#isEqualTo()', function () {
        it('should return false if both are NOT equal', function () {
            var t1 = new vecmat.Triangle(new vecmat.Vector3d(0.0, 0.0, 0.0), new vecmat.Vector3d(1.0, 1.0, 1.0), new vecmat.Vector3d(2.0, 1.0, 1.0) );
            var t2 = new vecmat.Triangle(new vecmat.Vector3d(1.0, 0.0, 0.0), new vecmat.Vector3d(1.0, 1.0, 1.0), new vecmat.Vector3d(2.0, 1.0, 1.0) );

            var result = t1.isEqualTo(t2);

            assert.equal(false, result);
        });
    });

    describe('#intersect()', function () {
        it('should return the intersection-vector between a ray and the triangle', function () {
            var triangle = new vecmat.Triangle(
              new vecmat.Vector3d(-1,0,0),
              new vecmat.Vector3d(1,0,0),
              new vecmat.Vector3d(0,2,0)
            );
            var start = new vecmat.Vector3d(0,1,10);
            var direction = new vecmat.Vector3d(0,0,-1);
            var ray = vecmat.rayFromPointDir(start, direction);

            var result = triangle.intersect(ray);

            assert.deepEqual(triangle, result.object);
            assert.deepEqual(new vecmat.Vector3d(0,0,1), result.normal);
            assert.deepEqual(ray, result.ray);
            assert.deepEqual(new vecmat.Vector3d(0,1,0), result.pointOfIntersect);
        });
    });

    describe('#intersect()', function () {
        it('should return undefined when not intersecting between a ray and the triangle', function () {
            var triangle = new vecmat.Triangle(
              new vecmat.Vector3d(-1,0,0),
              new vecmat.Vector3d(1,0,0),
              new vecmat.Vector3d(0,2,0)
            );
            var start = new vecmat.Vector3d(2,1,10);
            var direction = new vecmat.Vector3d(0,0,-1);
            var ray = vecmat.rayFromPointDir(start, direction);

            var result = triangle.intersect(ray);

            assert.equal(undefined, result);
        });
    });

});




describe('Plane', function () {

    describe('#isEqualTo()', function () {
        it('should return true if both are equal', function () {
            var p1 = new vecmat.Plane(new vecmat.Vector3d(0.0, 0.0, 0.0), new vecmat.Vector3d(1.0, 1.0, 1.0) );
            var p2 = new vecmat.Plane(new vecmat.Vector3d(0.0, 0.0, 0.0), new vecmat.Vector3d(1.0, 1.0, 1.0) );

            var result = p1.isEqualTo(p2);

            assert.equal(true, result);
        });
    });

    describe('#isEqualTo()', function () {
        it('should return false if both are NOT equal', function () {
            var p1 = new vecmat.Plane(new vecmat.Vector3d(0.0, 0.0, 0.0), new vecmat.Vector3d(1.0, 1.0, 1.0) );
            var p2 = new vecmat.Plane(new vecmat.Vector3d(0.0, 0.0, 0.0), new vecmat.Vector3d(0.0, 1.0, 1.0) );

            var result = p1.isEqualTo(p2);

            assert.equal(false, result);
        });
    });

    describe('#intersect()', function () {
        it('should return the intersection-vector between a ray and the plane', function () {
            var plane = new vecmat.Plane(
              new vecmat.Vector3d(0,0,1),
              new vecmat.Vector3d(0,0,1)
            );
            var start = new vecmat.Vector3d(1,1,10);
            var direction = new vecmat.Vector3d(0,0,-1);
            var ray = vecmat.rayFromPointDir(start, direction);

            var result = plane.intersect(ray);

            assert.deepEqual(plane, result.object);
            assert.deepEqual(new vecmat.Vector3d(0,0,1), result.normal);
            assert.deepEqual(ray, result.ray);
            assert.deepEqual(new vecmat.Vector3d(1,1,1), result.pointOfIntersect);
        });
    });

    describe('#intersect()', function () {
        it('should return the intersection-vector between a ray and the plane', function () {
            var plane = new vecmat.Plane(
              new vecmat.Vector3d(0,0,1),
              new vecmat.Vector3d(0,0,1)
            );
            var start = new vecmat.Vector3d(1,1,-10);
            var direction = new vecmat.Vector3d(0,0,1);
            var ray = vecmat.rayFromPointDir(start, direction);

            var result = plane.intersect(ray);

            assert.deepEqual(plane, result.object);
            assert.deepEqual(new vecmat.Vector3d(0,0,1), result.normal);
            assert.deepEqual(ray, result.ray);
            assert.deepEqual(new vecmat.Vector3d(1,1,1), result.pointOfIntersect);
        });
    });

    describe('#intersect()', function () {
        it('should return undefined when not intersecting between a ray and the plane', function () {
            var plane = new vecmat.Plane(
              new vecmat.Vector3d(0,0,1),
              new vecmat.Vector3d(0,0,1)
            );
            var start = new vecmat.Vector3d(0,0,0);
            var direction = new vecmat.Vector3d(1,0,0);
            var ray = vecmat.rayFromPointDir(start, direction);

            var result = plane.intersect(ray);

            assert.equal(undefined, result);
        });
    });


});





describe('Box3d', function () {

    describe('#isEqualTo()', function () {
        it('should return true if both are equal', function () {
            var b1 = new vecmat.Box3d(new vecmat.Vector3d(0.0, 0.0, 0.0), new vecmat.Vector3d(10.0, 10.0, 10.0));
            var b2 = new vecmat.Box3d(new vecmat.Vector3d(0.0, 0.0, 0.0), new vecmat.Vector3d(10.0, 10.0, 10.0));

            var result = b1.isEqualTo(b2);

            assert.equal(true, result);
        });
    });

    describe('#isEqualTo()', function () {
        it('should return false if both are NOT equal', function () {
            var b1 = new vecmat.Box3d(vecmat.vector3dFromElements(0.0, 0.0, 0.0), vecmat.vector3dFromElements(10.0, 10.0, 10.0));
            var b2 = new vecmat.Box3d(vecmat.vector3dFromElements(0.0, 0.0, 0.0), vecmat.vector3dFromElements(20.0, 20.0, 20.0));

            var result = b1.isEqualTo(b2);

            assert.equal(false, result);
        });
    });

    describe('#containsPoint()', function () {
        it('should return true if point is contained in the box', function () {
            var box = new vecmat.Box3d(vecmat.vector3dFromElements(5.0, 5.0, 5.0), vecmat.vector3dFromElements(10.0, 10.0, 10.0));
            var pt = vecmat.vector3dFromElements(7.0, 7.0, 7.0);

            var result = box.containsPoint(pt);

            assert.equal(true, result);
        });
    });

    describe('#containsPoint()', function () {
        it('should return true if point is contained in the box', function () {
            var box = new vecmat.Box3d(vecmat.vector3dFromElements(5.0, 5.0, 5.0), vecmat.vector3dFromElements(10.0, 10.0, 10.0));
            var pt = vecmat.vector3dFromElements(0.0, 0.0, 0.0);

            var result = box.containsPoint(pt);

            assert.equal(false, result);
        });
    });
});





describe('Sphere', function () {

    describe('#isEqualTo()', function () {
        it('should return true if both are equal', function () {
            var p1 = new vecmat.Sphere(new vecmat.Vector3d(0.0, 0.0, 0.0), 10);
            var p2 = new vecmat.Sphere(new vecmat.Vector3d(0.0, 0.0, 0.0), 10);

            var result = p1.isEqualTo(p2);

            assert.equal(true, result);
        });
    });

    describe('#isEqualTo()', function () {
        it('should return false if both are NOT equal', function () {
            var p1 = new vecmat.Sphere(new vecmat.Vector3d(0.0, 0.0, 0.0), 10);
            var p2 = new vecmat.Sphere(new vecmat.Vector3d(0.0, 0.0, 0.0), 20);

            var result = p1.isEqualTo(p2);

            assert.equal(false, result);
        });
    });

    describe('#intersect()', function () {
        it('should return the intersection-vector between a ray and the sphere', function () {
            var sphere = new vecmat.Sphere(
              new vecmat.Vector3d(0,0,0),
              1
            );
            var start = new vecmat.Vector3d(-10,0,0);
            var direction = new vecmat.Vector3d(1,0,0);
            var ray = vecmat.rayFromPointDir(start, direction);

            var result = sphere.intersect(ray);

            assert.deepEqual(sphere, result.object);
            assert.deepEqual(new vecmat.Vector3d(-1,0,0), result.normal);
            assert.deepEqual(ray, result.ray);
            assert.deepEqual(new vecmat.Vector3d(-1,0,0), result.pointOfIntersect);
        });
    });

    describe('#intersect()', function () {
        it('should return the intersection-vector between a ray and the sphere', function () {
            var sphere = new vecmat.Sphere(
              new vecmat.Vector3d(0,0,0),
              1
            );
            var start = new vecmat.Vector3d(-10,0.99999999999,0);
            var direction = new vecmat.Vector3d(1,0,0);
            var ray = vecmat.rayFromPointDir(start, direction);

            var result = sphere.intersect(ray);

            assert.deepEqual(sphere, result.object);
            assert.deepEqual(new vecmat.Vector3d(-0.000004,1,0), result.normal.round(6));
            assert.deepEqual(ray, result.ray);
            assert.deepEqual(new vecmat.Vector3d(-0.000004,1,0), result.pointOfIntersect.round(6));
        });
    });

    describe('#intersect()', function () {
        it('should return the intersection-vector between a ray and the sphere', function () {
            var sphere = new vecmat.Sphere(
              new vecmat.Vector3d(0,0,0),
              1
            );
            var start = new vecmat.Vector3d(-10,2,0);
            var direction = new vecmat.Vector3d(1,0,0);
            var ray = vecmat.rayFromPointDir(start, direction);

            var result = sphere.intersect(ray);

            assert.deepEqual(undefined, result);
        });
    });

    describe('#getBoundingBox3d()', function () {
        it('should return a valid bounding box for the sphere', function () {
            var sphere = new vecmat.Sphere(
              new vecmat.Vector3d(0,0,0),
              1
            );
            var box = new vecmat.Box3d(
                vecmat.vector3dFromElements(-1.0, -1.0, -1.0), 
                vecmat.vector3dFromElements(1.0, 1.0, 1.0)
            );

            var result = box.isEqualTo(sphere.getBoundingBox3d());

            assert.equal(true, result);
        });
    });
});





describe('Line2d', function () {

    describe('#isEqualTo()', function () {
        it('should return true if both are equal', function () {
            var p1 = new vecmat.Line2d(new vecmat.Vector2d(0.0, 0.0), new vecmat.Vector2d(1.0, 1.0));
            var p2 = new vecmat.Line2d(new vecmat.Vector2d(0.0, 0.0), new vecmat.Vector2d(1.0, 1.0));

            var result = p1.isEqualTo(p2);

            assert.equal(true, result);
        });
    });

    describe('#isEqualTo()', function () {
        it('should return false if both are NOT equal', function () {
            var p1 = new vecmat.Line2d(new vecmat.Vector2d(0.0, 0.0), new vecmat.Vector2d(1.0, 1.0));
            var p2 = new vecmat.Line2d(new vecmat.Vector2d(0.0, 0.0), new vecmat.Vector2d(2.0, 2.0));

            var result = p1.isEqualTo(p2);

            assert.equal(false, result);
        });
    });

    describe('#getAngleToXAxis()', function () {
        it('should return the angle to the X-axis', function () {
            var line = new vecmat.Line2d(new vecmat.Vector2d(0.0, 0.0), new vecmat.Vector2d(1.0, 1.0));

            assert.equal(line.getAngleToXAxis() * 180.0 / Math.PI, 45.0);
        });
    });

    describe('#isPointOnLeftOfLine()', function () {
        it('should return true if point is left of line', function () {
            var line = new vecmat.Line2d(new vecmat.Vector2d(0.0, 0.0), new vecmat.Vector2d(1.0, 1.0));
	    var point = new vecmat.Vector2d(1.0, 2.0);
	    
            assert.equal(line.isPointOnLeftOfLine(point), true);
        });
    });

});





describe('Polygon2d', function () {

    describe('#isEqualTo()', function () {
        it('should return true if both are equal', function () {
            var p1 = new vecmat.Polygon2d([new vecmat.Vector2d(1.0, 2.0)]);
            var p2 = new vecmat.Polygon2d([new vecmat.Vector2d(1.0, 2.0)]);

            var result = p1.isEqualTo(p2);

            assert.equal(true, result);
        });
    });

    describe('#isEqualTo()', function () {
        it('should return false if both are NOT equal', function () {
            var p1 = new vecmat.Polygon2d([new vecmat.Vector2d(1.0, 1.0)]);
            var p2 = new vecmat.Polygon2d([new vecmat.Vector2d(2.0, 2.0)]);

            var result = p1.isEqualTo(p2);

            assert.equal(false, result);
        });
    });

    describe('#containsPoint()', function () {
        it('should return true if point is in polygon', function () {
            var poly = new vecmat.Polygon2d([
                new vecmat.Vector2d(-1.0, 1.0),
                new vecmat.Vector2d( 1.0, 1.0),
                new vecmat.Vector2d( 1.0,-1.0),
                new vecmat.Vector2d(-1.0,-1.0)
            ]);
            var point = new vecmat.Vector2d(0,0);

            var result = poly.containsPoint(point);

            assert.equal(true, result);
        });
    });

    describe('#containsPoint()', function () {
        it('should return false if point is outside polygon', function () {
            var poly = new vecmat.Polygon2d([
                new vecmat.Vector2d(-1.0, 1.0),
                new vecmat.Vector2d( 0.0,-0.5),
                new vecmat.Vector2d( 1.0, 1.0),
                new vecmat.Vector2d( 1.0,-1.0),
                new vecmat.Vector2d(-1.0,-1.0)
            ]);
            var point = new vecmat.Vector2d(0,0);

            var result = poly.containsPoint(point);

            assert.equal(false, result);
        });
    });

    describe('#createBoundingPolygon()', function () {
        it('should return a bounding polygon for the given vector-cloud', function () {
            var points = [
                new vecmat.Vector2d(-1.0, 1.0),
                new vecmat.Vector2d( 0.0,-0.5),
                new vecmat.Vector2d( 1.0, 1.0),
                new vecmat.Vector2d( 1.0,-1.0),
                new vecmat.Vector2d(-1.0,-1.0)
            ];
            var boundingPoly = new vecmat.createBoundingPolygon(points);
            assert.equal(true, points[0].isEqualTo(boundingPoly[0]));
            assert.equal(true, points[2].isEqualTo(boundingPoly[1]));
            assert.equal(true, points[3].isEqualTo(boundingPoly[2]));
            assert.equal(true, points[4].isEqualTo(boundingPoly[3]));
        });
    });
});



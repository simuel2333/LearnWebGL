import {Mat3, Mat4} from "../../../src/lib/graphicsMath.js";
import chai from "chai";

const assert = chai.assert;

describe('Test graphicsMath', function () {
    describe('Matrix3', function () {
        let m1 = new Mat3(
            1, 3, 2,
            1, 0, 0,
            1, 2, 2
        );
        let m2 = new Mat3(
            0, 0, 2,
            7, 5, 0,
            2, 1, 1
        );
        // m3 = m1 x m2
        let m3 = new Mat3(
            25, 17, 4,
            0, 0, 2,
            18, 12, 4
        );
        let I = Mat3.identity();
        it('Multiply: m1 x m2 = m3', function () {
            assert.equal(true, m1.multiply(m2).equals(m3))
        });
        it('inverse: m1.inverse x m1 = I', function () {
            assert.equal(true, m1.inverse().multiply(m1).equals(I))
        })
    });
    describe('Matrix4', function () {
        let m1 = new Mat4(
            1, 3, 2, 5,
            1, 0, 0, 9,
            1, 2, 2, 7,
            0, 3, 5, 15
        );
        let m2 = new Mat4(
            0, 0, 2, 5,
            7, 5, 0, 11,
            2, 1, 1, 0,
            1, 2, 3, 4
        );
        // m3 = m1 x m2
        let m3 = new Mat4(
            30, 27, 19, 58,
            9, 18, 29, 41,
            25, 26, 25, 55,
            46, 50, 50, 93
        );
        let I = Mat4.identity();
        it('Multiply: m1 x m2 = m3', function () {
            assert.equal(true, m1.multiply(m2).equals(m3))
        });
        it('inverse: m1.inverse x m1 = I', function () {
            assert.equal(true, m1.inverse().multiply(m1).equals(I))
        })
    });
});
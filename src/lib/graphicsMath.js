const EPSILON = 0.000001;

/**
 * 格式化打印数组
 *
 * @param arr 待打印的数组
 * @param row 行数
 * @param col 列数
 */
function printMatrix(arr, row, col) {
    let cntArr = arr.map(num => num.toString().length);
    let maxCnt = cntArr.reduce((p, c) => p > c ? p : c);
    let result = '';
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            let space = maxCnt - cntArr[i * col + j];
            for (let k = 0; k < space; k++) {
                result += ' ';
            }
            result += arr[i * col + j] + ' ';
        }
        if (i < row - 1) result += '\n';
    }
    console.log(result);
}

export class Mat4 extends Array {
    constructor(
        m00 = 1, m01 = 0, m02 = 0, m03 = 0,
        m10 = 0, m11 = 1, m12 = 0, m13 = 0,
        m20 = 0, m21 = 0, m22 = 1, m23 = 0,
        m30 = 0, m31 = 0, m32 = 0, m33 = 1
    ) {
        super(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
    }

    copy(m) {
        this[0] = m[0];
        this[1] = m[1];
        this[2] = m[2];
        this[3] = m[3];
        this[4] = m[4];
        this[5] = m[5];
        this[6] = m[6];
        this[7] = m[7];
        this[8] = m[8];
        this[9] = m[9];
        this[10] = m[10];
        this[11] = m[11];
        this[12] = m[12];
        this[13] = m[13];
        this[14] = m[14];
        this[15] = m[15];
        return this;
    }

    set(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
        if (m00.length) return this.copy(m00);
        this[0] = m00;
        this[1] = m01;
        this[2] = m02;
        this[3] = m03;
        this[4] = m10;
        this[5] = m11;
        this[6] = m12;
        this[7] = m13;
        this[8] = m20;
        this[9] = m21;
        this[10] = m22;
        this[11] = m23;
        this[12] = m30;
        this[13] = m31;
        this[14] = m32;
        this[15] = m33;
        return this;
    }

    /**
     * 判断当前矩阵和m是否相等
     */
    equals(m, epsilon = EPSILON) {
        if (this.length !== m.length) return false;
        return !this.some((ele, idx) => Math.abs(ele - m[idx]) > epsilon);
    }

    get T() {
        return new Mat4(
            this[0], this[4], this[8], this[12],
            this[1], this[5], this[9], this[13],
            this[2], this[6], this[10], this[14],
            this[3], this[7], this[11], this[15]
        );
    }

    static identity() {
        return new Mat4(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        )
    }

    /**
     * this * m
     */
    multiply(m, isTransSmallNumToZero = false, epsilon = EPSILON) {
        if (this.length !== m.length) {
            throw new Error('The count of row/col of matrix must be equal!');
        }
        let a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3];
        let a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7];
        let a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11];
        let a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15];
        let out = Mat4.identity();
        // Cache only the current line of the second matrix
        let b0 = this[0], b1 = this[1], b2 = this[2], b3 = this[3];
        out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = this[4];
        b1 = this[5];
        b2 = this[6];
        b3 = this[7];
        out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = this[8];
        b1 = this[9];
        b2 = this[10];
        b3 = this[11];
        out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = this[12];
        b1 = this[13];
        b2 = this[14];
        b3 = this[15];
        out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        if (isTransSmallNumToZero) {
            out = Mat4.transSmallNumToZero(m, epsilon);
        }
        return out;
    }

    /**
     * 求当前矩阵的逆矩阵
     */
    inverse() {
        let a00 = this[0], a01 = this[1], a02 = this[2], a03 = this[3];
        let a10 = this[4], a11 = this[5], a12 = this[6], a13 = this[7];
        let a20 = this[8], a21 = this[9], a22 = this[10], a23 = this[11];
        let a30 = this[12], a31 = this[13], a32 = this[14], a33 = this[15];

        let b00 = a00 * a11 - a01 * a10;
        let b01 = a00 * a12 - a02 * a10;
        let b02 = a00 * a13 - a03 * a10;
        let b03 = a01 * a12 - a02 * a11;
        let b04 = a01 * a13 - a03 * a11;
        let b05 = a02 * a13 - a03 * a12;
        let b06 = a20 * a31 - a21 * a30;
        let b07 = a20 * a32 - a22 * a30;
        let b08 = a20 * a33 - a23 * a30;
        let b09 = a21 * a32 - a22 * a31;
        let b10 = a21 * a33 - a23 * a31;
        let b11 = a22 * a33 - a23 * a32;

        // Calculate the determinant
        let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

        if (!det) {
            return null;
        }
        det = 1.0 / det;
        let out = Mat4.identity();
        out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
        out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
        out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
        out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
        out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
        out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
        out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
        out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
        out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
        out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
        out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
        out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
        out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
        out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
        out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
        out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

        return out;
    }

    static transSmallNumToZero(m, epsilon = EPSILON) {
        return m.map(num => num < EPSILON ? 0 : num);
    }

    print() {
        printMatrix(this, 4, 4);
    }
}

export class Vec4 extends Array {
    constructor(x = 0, y = x, z = x, w = x) {
        super(x, y, z, w);
    }

    get x() {
        return this[0];
    }

    get y() {
        return this[1];
    }

    get z() {
        return this[2];
    }

    get w() {
        return this[3];
    }

    set x(v) {
        this[0] = v;
    }

    set y(v) {
        this[1] = v;
    }

    set z(v) {
        this[2] = v;
    }

    set w(v) {
        this[3] = v;
    }

    set(x, y, z, w) {
        if (x.length) return this.copy(x);
        this[0] = x;
        this[1] = y;
        this[2] = z;
        this[3] = w;
        return this;
    }

    copy(v) {
        this[0] = v[0];
        this[1] = v[1];
        this[2] = v[2];
        this[3] = v[3];
        return this;
    }

}

export class Mat3 extends Array {
    constructor(
        m00 = 1, m01 = 0, m02 = 0,
        m10 = 0, m11 = 1, m12 = 0,
        m20 = 0, m21 = 0, m22 = 1
    ) {
        super(m00, m01, m02, m10, m11, m12, m20, m21, m22);
    }

    set(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
        if (m00.length) return this.copy(m00);
        this[0] = m00;
        this[1] = m01;
        this[2] = m02;
        this[3] = m10;
        this[4] = m11;
        this[5] = m12;
        this[6] = m20;
        this[7] = m21;
        this[8] = m22;
        return this;
    }

    /**
     * 判断当前矩阵和m是否相等
     */
    equals(m, epsilon = EPSILON) {
        if (this.length !== m.length) return false;
        return !this.some((ele, idx) => Math.abs(ele - m[idx]) > epsilon);
    }

    multiply(m, isTransSmallNumToZero = false, epsilon = EPSILON) {
        if (this.length !== m.length) {
            throw new Error('The count of row/col of matrix must be equal!');
        }
        let a00 = this[0], a01 = this[1], a02 = this[2];
        let a10 = this[3], a11 = this[4], a12 = this[5];
        let a20 = this[6], a21 = this[7], a22 = this[8];

        let b00 = m[0], b01 = m[1], b02 = m[2];
        let b10 = m[3], b11 = m[4], b12 = m[5];
        let b20 = m[6], b21 = m[7], b22 = m[8];


        let out = Mat3.identity();
        out[0] = a00 * b00 + a01 * b10 + a02 * b20;
        out[1] = a00 * b01 + a01 * b11 + a02 * b21;
        out[2] = a00 * b02 + a01 * b12 + a02 * b22;

        out[3] = a10 * b00 + a11 * b10 + a12 * b20;
        out[4] = a10 * b01 + a11 * b11 + a12 * b21;
        out[5] = a10 * b02 + a11 * b12 + a12 * b22;

        out[6] = a20 * b00 + a21 * b10 + a22 * b20;
        out[7] = a20 * b01 + a21 * b11 + a22 * b21;
        out[8] = a20 * b02 + a21 * b12 + a22 * b22;
        if (isTransSmallNumToZero) {
            out = Mat4.transSmallNumToZero(m, epsilon);
        }
        return out;
    }

    copy(m) {
        this[0] = m[0];
        this[1] = m[1];
        this[2] = m[2];
        this[3] = m[3];
        this[4] = m[4];
        this[5] = m[5];
        this[6] = m[6];
        this[7] = m[7];
        this[8] = m[8];
        return this;
    }

    /**
     * 获取单位矩阵
     */
    static identity() {
        return new Mat3(
            1, 0, 0,
            0, 1, 0,
            0, 0, 1);
    }

    /**
     * 获取转置矩阵
     */
    get T() {
        return new Mat3(
            this[0], this[3], this[6],
            this[1], this[4], this[7],
            this[2], this[5], this[8]
        );
    }

    inverse() {
        let a00 = this[0], a01 = this[1], a02 = this[2];
        let a10 = this[3], a11 = this[4], a12 = this[5];
        let a20 = this[6], a21 = this[7], a22 = this[8];

        let b01 = a22 * a11 - a12 * a21;
        let b11 = -a22 * a10 + a12 * a20;
        let b21 = a21 * a10 - a11 * a20;

        // Calculate the determinant
        let det = a00 * b01 + a01 * b11 + a02 * b21;

        if (!det) {
            return null;
        }
        det = 1.0 / det;
        let out = Mat3.identity();
        out[0] = b01 * det;
        out[1] = (-a22 * a01 + a02 * a21) * det;
        out[2] = (a12 * a01 - a02 * a11) * det;
        out[3] = b11 * det;
        out[4] = (a22 * a00 - a02 * a20) * det;
        out[5] = (-a12 * a00 + a02 * a10) * det;
        out[6] = b21 * det;
        out[7] = (-a21 * a00 + a01 * a20) * det;
        out[8] = (a11 * a00 - a01 * a10) * det;
        return out;
    }

    static transSmallNumToZero(m, epsilon = EPSILON) {
        return m.map(num => num < EPSILON ? 0 : num);
    }

    print() {
        printMatrix(this, 3, 3);
    }
}

export class Vec3 extends Array {
    constructor(x = 0, y = x, z = x) {
        super(x, y, z);
    }

    get x() {
        return this[0];
    }

    get y() {
        return this[1];
    }

    get z() {
        return this[2];
    }

    set x(v) {
        this[0] = v;
    }

    set y(v) {
        this[1] = v;
    }

    set z(v) {
        this[2] = v;
    }

    copy(v) {
        this[0] = v[0];
        this[1] = v[1];
        this[2] = v[2];
        return this;
    }

    set(x, y = x, z = x) {
        if (x.length) return this.copy(x);
        this[0] = x;
        this[1] = y;
        this[2] = z;
        return this;
    }

    add(v) {
        this[0] += v[0];
        this[1] += v[1];
        this[2] += v[2];
        return this;
    }

    static add(u, v) {
        return new Vec2(u[0] + v[0], u[1] + v[1], u[2] + v[2]);
    }

    sub(v) {
        this[0] -= v[0];
        this[1] -= v[1];
        this[2] -= v[2];
        return this;
    }

    static sub(u, v) {
        return new Vec2(u[0] - v[0], u[1] - v[1], u[2] - v[2]);
    }

    multiply(v) {
        this[0] *= v[0];
        this[1] *= v[1];
        this[2] *= v[2];
        return this;
    }

    static multiply(u, v) {
        return new Vec2(u[0] * v[0], u[1] * v[1], u[2] * v[2]);
    }

    divide(v) {
        this[0] /= v[0];
        this[1] /= v[1];
        this[2] /= v[2];
        return this;
    }

    static divide(u, v) {
        return new Vec2(u[0] / v[0], u[1] / v[1], u[2] / v[2]);
    }

    len() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    static len(v) {
        return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    }

    /**
     * 求当前点到点v的距离
     */
    distance(v) {
        return Vec3.len(Vec3.sub(this, v));
    }

    /**
     * 求点u到点v的距离
     */
    static distance(u, v) {
        return Vec3.len(Vec3.sub(u, v));
    }

    negate() {
        this[0] = -this[0];
        this[1] = -this[1];
        this[2] = -this[2];
        return this;
    }

    static negate(v) {
        return new Vec3(-v[0], -v[1], -v[2]);
    }

    cross(v) {
        let x1 = this[0], y1 = this[1], z1 = this[2],
            x2 = v[0], y2 = v[1], z2 = v[2];
        this[0] = y1 * z2 - y2 * z1;
        this[1] = x2 * z1 - x1 * z2;
        this[2] = x1 * y2 - x2 * y1;
        return this;
    }

    static cross(u, v) {
        let x1 = u[0], y1 = u[1], z1 = u[2],
            x2 = v[0], y2 = v[1], z2 = v[2];
        return new Vec3(y1 * z2 - y2 * z1, x2 * z1 - x1 * z2, x1 * y2 - x2 * y1);
    }

    scale(n) {
        this[0] *= n;
        this[1] *= n;
        this[2] *= n;
        return this;
    }

    static scale(v, n) {
        return new Vec3(v[0] * n, v[1] * n, v[2] * n);
    }

    normalize() {
        let len = this.len();
        if (len > 0) {
            len = 1 / len;
        }
        this[0] *= len;
        this[1] *= len;
        this[2] *= len;
        return this;
    }

    static normalize(v) {
        let len = Vec3.len(v);
        if (len > 0) {
            len = 1 / len;
        }
        return new Vec3(v[0] * len, v[1] * len, v[2] * len);
    }

    dot(v) {
        return this[0] * v[0] + this[1] * v[1] + this[2] * v[2];
    }

    static dot(u, v) {
        return u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
    }

    equals(v) {
        return this[0] === v[0] && this[1] === v[1] && this[2] === v[2];
    }

    static equals(u, v) {
        return u[0] === v[0] && u[1] === v[1] && u[2] === v[2];
    }

    applyMatrix4(mat4) {
        let x = this[0], y = this[1], z = this[2];
        let w = mat4[12] * x + mat4[13] * y + mat4[14] * z + mat4[15];
        w = w || 1.0;
        this[0] = (mat4[0] * x + mat4[1] * y + mat4[2] * z + mat4[3]) / w;
        this[1] = (mat4[4] * x + mat4[5] * y + mat4[6] * z + mat4[7]) / w;
        this[2] = (mat4[8] * x + mat4[9] * y + mat4[10] * z + mat4[11]) / w;
        return this;
    }

    clone() {
        return new Vec3(this[0], this[1], this[2]);
    }

    angle(v) {
        const tmpA = this.clone().normalize();
        const tmpB = v.clone().normalize();
        let cosine = Vec3.dot(tmpA, tmpB);
        if (cosine > 1.0) {
            return 0;
        } else if (cosine < -1.0) {
            return Math.PI;
        } else {
            return Math.acos(cosine);
        }
    }

    static angle(u, v) {
        return u.angle(v);
    }

    print() {
        console.log(this);
    }
}

export class Vec2 extends Array {
    constructor(x = 0, y = x) {
        super(x, y);
    }

    get x() {
        return this[0];
    }

    get y() {
        return this[1];
    }

    set x(v) {
        this[0] = v;
    }

    set y(v) {
        this[1] = v;
    }

    copy(v) {
        this[0] = v[0];
        this[1] = v[1];
        return this;
    }

    clone() {
        return new Vec2(this[0], this[1]);
    }

    add(v) {
        this[0] += v[0];
        this[1] += v[1];
        return this;
    }

    static add(u, v) {
        return new Vec2(u[0] + v[0], u[1] + v[1]);
    }

    sub(v) {
        this[0] -= v[0];
        this[1] -= v[1];
        return this;
    }

    static sub(u, v) {
        return new Vec2(u[0] - v[0], u[1] - v[1]);
    }

    multiply(v) {
        this[0] *= v[0];
        this[1] *= v[1];
        return this;
    }

    static multiply(u, v) {
        return new Vec2(u[0] * v[0], u[1] * v[1]);
    }

    divide(v) {
        this[0] /= v[0];
        this[1] /= v[1];
        return this;
    }

    static divide(u, v) {
        return new Vec2(u[0] / v[0], u[1] / v[1]);
    }

    scale(v) {
        this[0] *= v;
        this[1] *= v;
        return this;
    }

    static scale(vec, n) {
        return new Vec2(vec[0] * n, vec[1] * n);
    }

    /**
     * 返回向量的长度
     */
    len() {
        return Math.sqrt(this[0] * this[0] + this[1] * this[1]);
    }

    static len(v) {
        return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
    }

    squaredLen() {
        return this[0] * this[0] + this[1] * this[1];
    }

    /**
     * 计算两个向量点之间的欧几里得距离
     * @param v
     */
    distance(v) {
        let a = this[0] - v[0],
            b = this[1] - v[1];
        return Math.sqrt(a * a + b * b);
    }

    squaredDistance(v) {
        let a = this[0] - v[0],
            b = this[1] - v[1];
        return a * a + b * b;
    }

    negate() {
        this[0] = -this[0];
        this[1] = -this[1];
    }

    static negate(v) {
        return new Vec2(-v[0], -v[1]);
    }

    cross(v) {
        return this[0] * v[1] - this[1] * v[0];
    }

    static cross(u, v) {
        return u[0] * v[1] - u[1] * v[0];
    }

    dot(v) {
        return this[0] * v[0] + this[1] * v[1];
    }

    static dot(u, v) {
        return u[0] * v[0] + u[1] * v[1];
    }

    normalize() {
        let len = this.len();
        if (len > 0) {
            len = 1 / len;
        }
        this[0] *= len;
        this[1] *= len;
        return this;
    }

    static normalize(v) {
        let u = v.clone();
        let len = Vec2.len(u);
        if (len > 0) {
            len = 1 / len;
        }
        u[0] *= len;
        u[1] *= len;
        return u;
    }

    equals(v) {
        return this[0] === v[0] && this[1] === v[1];
    }

    static equals(u, v) {
        return u[0] === v[0] && u[1] === v[1];
    }

    applyMatrix3(mat3) {
        this[0] = mat3[0] * this[0] + mat3[1] * this[1] + mat3[2];
        this[1] = mat3[3] * this[0] + mat3[4] * this[1] + mat3[5];
        return this;
    }

    applyMatrix4(mat4) {
        this[0] = mat4[0] * this[0] + mat4[1] * this[1] + mat4[3];
        this[1] = mat4[4] * this[0] + mat4[5] * this[1] + mat4[7];
        return this;
    }

    print() {
        console.log(this);
    }
}


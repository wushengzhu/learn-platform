export class Util {
    /**
     * 判断是否为undefined或Null
     */
    static isUndefinedOrNull(obj: any): boolean {
        return typeof obj === "undefined" || obj === null;
    }
    /**
     * 判断是否为undefined、null或仅有空白字符
     */
    static isNullOrWhiteSpace(str: string | undefined | null): boolean {
        return typeof str === "undefined" || str === null || /^\s*$/.test(str);
    }
    /**
     * 判断是否为0或空白字符等
     */
    static isZeroOrWhiteSpace(
        str: string | number | undefined | null
    ): boolean {
        if (typeof str === "undefined" || str === null) {
            return true;
        } else if (typeof str === "string") {
            return /^\s*$/.test(str) || str === "0";
        } else if (typeof str === "number") {
            return str === 0;
        } else {
            return false;
        }
    }
    static isGreaterOrEqualOne(
        str: string | number | undefined | null
    ): boolean {
        if (typeof str === "undefined" || str === null) {
            return true;
        } else if (typeof str === "string") {
            str = str.trim();
            if (!/^(-?\d+\.\d+)$|^(-?\d+)$/.test(str)) {
                return false;
            }
            if (str[0] === "-") {
                return false;
            }
            let strNum;
            if (str.length > 1) {
                const dotIndex = str.indexOf(".");
                if (dotIndex !== -1) {
                    str = str.substring(
                        dotIndex - 2 < 0 ? 0 : dotIndex - 2,
                        dotIndex
                    );
                } else {
                    str = str.substring(str.length - 2);
                }
                if (str === "00") {
                    str = "10";
                }
            }
            // eslint-disable-next-line prefer-const
            strNum = parseInt(str, 10);
            if (isNaN(strNum)) {
                return false;
            } else {
                return strNum >= 1;
            }
        } else if (typeof str === "number") {
            return str > 0;
        } else {
            return false;
        }
    }
    /**
     * 判断是否是布尔值
     */
    static isBoolean(obj: any): boolean {
        return obj === true || obj === false;
    }
    /**
     * 判断是否是整数
     */
    static isInt(obj: any): boolean {
        return Number(obj) === obj && obj % 1 === 0;
    }
    /**
     * 判断是否是浮点数
     */
    static isFloat(obj: any): boolean {
        return obj === Number(obj) && obj % 1 !== 0;
    }
    /**
     * 判断是否是数字
     */
    static isNumber(obj: any): boolean {
        return !isNaN(Number(obj));
    }
    /**
     * 判断是否是数组
     */
    static isArray(obj: any) {
        return Array.isArray(obj);
    }

    static objectLength(obj: any) {
        return Reflect.ownKeys(obj).length;
    }

    /**
     *
     * 将字符串转为boolean
     */
    static ConvertToBoolean(str: string): boolean {
        if (typeof str === "boolean") {
            return str;
        }
        if (Util.isNullOrWhiteSpace(str)) {
            return false;
        }
        return str.toLowerCase() === "true";
    }
    /**
     * 判断数组是否为Null或者空
     */
    static IsNullOrEmpty<T>(array: T[]) {
        if (!Util.isUndefinedOrNull(array)) {
            if (array instanceof Array) {
                if (array.length > 0) {
                    return false;
                }
            }
        }
        return true;
    }
}

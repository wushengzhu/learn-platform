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

    /**
     * 检查是否有真值
     */
    static isTruth(value: any): boolean {
        return typeof value !== "undefined" && value !== false;
    }

    static fixedZero(val: number) {
        return val * 1 < 10 ? `0${val}` : val;
    }

    static isMobile(value: string, onlyMobile = false): boolean {
        let regExp;
        /**
         * 移动号段：
         * 134 135 136 137 138 139 147 148 150 151 152 157 158 159 172 178 182 183 184 187 188 195 198
         * 联通号段：
         * 130 131 132 145 146 155 156 166 175 176 185 186 196
         * 电信号段：
         * 133 149 153 173 174 177 180 181 189 191 193 199
         * 虚拟运营商:
         * 162 165 167 170 171
         * 广电:
         * 190 192 197
         */
        if (onlyMobile) {
            regExp = new RegExp(
                /^((13[0-9])|(14[5-9])|(15[0-3,5-9])|(16[2,5-7])|(17[0-8])|(18[0-9])|(19[0-3])|(19[5-9]))\d{8}$/
            );
        } else {
            regExp = new RegExp(
                /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$|^((13[0-9])|(14[5-9])|(15[0-3,5-9])|(16[2,5-7])|(17[0-8])|(18[0-9])|(19[0-3])|(19[5-9]))\d{8}$|[1-9]\d{5}$/
            );
        }
        return regExp.test(value);
    }

    static isFunction(value: any) {
        return typeof value === "function";
    }

    /**
     * 数组交集
     */
    static intersection(one: any[], another: any[]): any[] {
        const result: any[] = [];
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < one.length; i++) {
            // tslint:disable-next-line: prefer-for-of
            for (let j = 0; j < another.length; j++) {
                if (one[i] === another[j] && result.indexOf(one[i]) === -1) {
                    result.push(one[i]);
                    break;
                }
            }
        }
        return result;
    }

    /**
     * 数组并集
     * @param one 数组one
     * @param another 数组another
     */
    static union(one: any[], another: any[]): any[] {
        return [...one, ...another];
    }

    /**
     * 数组去重
     */
    static distinct(a: any[], b: any[]): any[] {
        const arr = a.concat(b);
        const result = [];
        const obj: any = {};

        for (const i of arr) {
            if (!obj[i]) {
                result.push(i);
                obj[i] = 1;
            }
        }

        return result;
    }

    static unique(arr: Array<any>) {
        return Array.from(new Set(arr));
    }

    // /**
    //  * 请使用Platform的方法代替
    //  * @deprecated
    //  */
    // static isIE(): boolean {
    //     return (
    //         window.ActiveXObject !== undefined ||
    //         window.ActiveXObject != null ||
    //         "ActiveXObject" in window
    //     );
    // }
    // /**
    //  * 请使用Platform的方法代替
    //  * @deprecated
    //  */
    // static isEdge(): boolean {
    //     return !Util.isIE() && !!window.StyleMedia;
    // }

    static toFriendlyString(value: any) {
        if (Util.isNullOrWhiteSpace(value)) {
            return "";
        } else if (value.toString() === "NaN") {
            return "";
        } else if (value.toString() === "Infinity") {
            return "";
        } else if (value.toString() === "Invalid Date") {
            return "";
        } else if (value.toString() === "Invalid date") {
            return "";
        } else if (value.toString() === "[object Object]") {
            return "";
        } else {
            return value;
        }
    }

    static getUUID(): string {
        let dt = new Date().getTime();
        const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (c) {
                // tslint:disable-next-line:no-bitwise
                const r = (dt + Math.random() * 16) % 16 | 0;
                dt = Math.floor(dt / 16);
                // tslint:disable-next-line:no-bitwise
                return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
            }
        );
        return uuid;
    }

    static getOrigin(): string {
        if (!window.location.origin) {
            return (
                window.location.protocol +
                "//" +
                window.location.hostname +
                (window.location.port ? ":" + window.location.port : "")
            );
        } else {
            return window.location.origin;
        }
    }

    static getBaseHref() {
        const baseNode = document.querySelector("base");
        if (baseNode) {
            return baseNode.getAttribute("href");
        } else {
            return "/";
        }
    }
    static getBaseUri() {
        if (document.baseURI) {
            return document.baseURI;
        } else {
            return this.getOrigin() + this.getBaseHref();
        }
    }
    static inIframe() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    static addIfNotExist(array: Array<any>, value: any) {
        if (array.indexOf(value) === -1) {
            array.push(value);
        }
        return array;
    }
    static escapeRegExp(str: string) {
        const specials = [
            // order matters for these
            "-",
            "[",
            "]",
            // order doesn't matter for any of these
            "/",
            "{",
            "}",
            "(",
            ")",
            "*",
            "+",
            "?",
            ".",
            "\\",
            "^",
            "$",
            "|",
        ];

        // I choose to escape every character with '\'
        // even though only some strictly require it when inside of []
        const regex = RegExp("[" + specials.join("\\") + "]", "g");

        return str.replace(regex, "\\$&");
    }
    static trimEnd(str: string, char: string) {
        char = Util.escapeRegExp(char);
        return str.replace(new RegExp(`${char}+$`, "g"), "");
    }
    static trim(str: string, char: string) {
        char = Util.escapeRegExp(char);
        return str.replace(new RegExp(`^${char}+`, "g"), "");
    }
    static trimStart(str: string, char: string) {
        char = Util.escapeRegExp(char);
        return str.replace(new RegExp(`^${char}+|${char}+$`, "g"), "");
    }

    static isPromise<T>(obj: any): obj is Promise<T> {
        return (
            !!obj &&
            typeof obj.then === "function" &&
            typeof obj.catch === "function"
        );
    }

    static base64Encode(value: string | undefined | null) {
        if (Util.isNullOrWhiteSpace(value)) {
            return null;
        }
        return btoa(encodeURIComponent(value as string));
    }

    static base64Decode(value: string | undefined | null): string | null {
        if (Util.isNullOrWhiteSpace(value)) {
            return null;
        }
        try {
            return decodeURIComponent(atob(value as string));
        } catch {
            return null;
        }
    }

    static encodeURIComponent(value: string | undefined | null) {
        if (Util.isNullOrWhiteSpace(value)) {
            return null;
        }
        return encodeURIComponent(value as string);
    }

    static decodeURIComponent(value: string | undefined | null) {
        if (Util.isNullOrWhiteSpace(value)) {
            return null;
        }
        return decodeURIComponent(value as string);
    }

    static lowerCaseTheFirstLetter(str: string) {
        if (Util.isNullOrWhiteSpace(str)) {
            return null;
        }
        return str[0].toLowerCase() + str.slice(1);
    }

    /**
     * 生成一个随机整数，范围是 [min, max]
     */
    static getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // 生成一个随机的十六进制的值，在 0 ～ f 之间
    static getHex() {
        let n = 0;
        for (let i = 4; i > 0; i--) {
            n = (Util.getRandomInt(0, 1) << (i - 1)) + n;
        }
        return n.toString(16);
    }

    /**
     * 生成一个length位的十六进制值，用作一次性 Key
     */
    static getOTP(length: number): string {
        const arr = [];
        for (let i = 0; i < length; i++) {
            arr.push(Util.getHex());
        }
        return arr.join("");
    }
    /**
     * 返回秒的时间戳
     */
    static getTimeStampInSecond() {
        return Math.round(Date.now() / 1000);
    }
}

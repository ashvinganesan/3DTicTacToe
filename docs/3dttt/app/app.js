"use strict";
(function(module) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], function(exports)  {
            module(exports);
        });
    } else if (typeof exports === 'object' && exports !== null && typeof exports.nodeName !== 'string') {
        module(exports);
    } else {
        module(typeof self !== 'undefined' ? self : this);
}
}(function($rt_exports) {
let $rt_seed = 2463534242,
$rt_nextId = () => {
    let x = $rt_seed;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    $rt_seed = x;
    return x;
},
$rt_wrapFunction0 = f => function() {
    return f(this);
},
$rt_wrapFunction1 = f => function(p1) {
    return f(this, p1);
},
$rt_wrapFunction2 = f => function(p1, p2) {
    return f(this, p1, p2);
},
$rt_wrapFunction3 = f => function(p1, p2, p3) {
    return f(this, p1, p2, p3, p3);
},
$rt_wrapFunction4 = f => function(p1, p2, p3, p4) {
    return f(this, p1, p2, p3, p4);
},
$rt_eraseClinit = target => target.$clinit = () => {
},
$dbg_class = obj => {
    let cls = obj.constructor;
    let arrayDegree = 0;
    while (cls.$meta && cls.$meta.item) {
        ++arrayDegree;
        cls = cls.$meta.item;
    }
    let clsName = "";
    if (cls.$meta.primitive) {
        clsName = cls.$meta.name;
    } else {
        clsName = cls.$meta ? cls.$meta.name || "a/" + cls.name : "@" + cls.name;
    }
    while (arrayDegree-- > 0) {
        clsName += "[]";
    }
    return clsName;
},
$rt_classWithoutFields = superclass => {
    if (superclass === 0) {
        return function() {
        };
    }
    if (superclass === void 0) {
        superclass = $rt_objcls();
    }
    return function() {
        superclass.call(this);
    };
},
$rt_cls = cls => jl_Class_getClass(cls),
$rt_objcls = () => jl_Object,
$rt_createcls = () => {
    return { $array : null, classObject : null, $meta : { supertypes : [], superclass : null } };
},
$rt_createPrimitiveCls = (name, binaryName) => {
    let cls = $rt_createcls();
    cls.$meta.primitive = true;
    cls.$meta.name = name;
    cls.$meta.binaryName = binaryName;
    cls.$meta.enum = false;
    cls.$meta.item = null;
    cls.$meta.simpleName = null;
    cls.$meta.declaringClass = null;
    cls.$meta.enclosingClass = null;
    return cls;
},
$rt_charcls = $rt_createPrimitiveCls("char", "C"),
$rt_intcls = $rt_createPrimitiveCls("int", "I"),
$rt_voidcls = $rt_createPrimitiveCls("void", "V"),
$rt_compare = (a, b) => a > b ? 1 : a < b ?  -1 : a === b ? 0 : 1,
$rt_imul = Math.imul || function(a, b) {
    let ah = a >>> 16 & 0xFFFF;
    let al = a & 0xFFFF;
    let bh = b >>> 16 & 0xFFFF;
    let bl = b & 0xFFFF;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
},
$rt_udiv = (a, b) => (a >>> 0) / (b >>> 0) >>> 0,
$rt_umod = (a, b) => (a >>> 0) % (b >>> 0) >>> 0,
$rt_ucmp = (a, b) => {
    a >>>= 0;
    b >>>= 0;
    return a < b ?  -1 : a > b ? 1 : 0;
},
Long_ZERO = BigInt(0),
Long_create = (lo, hi) => BigInt.asIntN(64, BigInt.asUintN(64, BigInt(lo)) | BigInt.asUintN(64, BigInt(hi) << BigInt(32))),
Long_fromInt = val => BigInt.asIntN(64, BigInt(val | 0)),
Long_fromNumber = val => BigInt.asIntN(64, BigInt(val >= 0 ? Math.floor(val) : Math.ceil(val))),
Long_eq = (a, b) => a === b,
Long_ne = (a, b) => a !== b,
Long_ge = (a, b) => a >= b,
Long_add = (a, b) => BigInt.asIntN(64, a + b),
Long_sub = (a, b) => BigInt.asIntN(64, a - b),
Long_and = (a, b) => BigInt.asIntN(64, a & b),
Long_or = (a, b) => BigInt.asIntN(64, a | b),
Long_xor = (a, b) => BigInt.asIntN(64, a ^ b),
Long_shl = (a, b) => BigInt.asIntN(64, a << BigInt(b & 63)),
Long_shr = (a, b) => BigInt.asIntN(64, a >> BigInt(b & 63)),
$rt_createArray = (cls, sz) => {
    let data = new Array(sz);
    data.fill(null);
    return new ($rt_arraycls(cls))(data);
},
$rt_createCharArray = sz => new $rt_charArrayCls(new Uint16Array(sz)),
$rt_createIntArray = sz => new $rt_intArrayCls(new Int32Array(sz)),
$rt_arraycls = cls => {
    let result = cls.$array;
    if (result === null) {
        function JavaArray(data) {
            ($rt_objcls()).call(this);
            this.data = data;
        }
        JavaArray.prototype = Object.create(($rt_objcls()).prototype);
        JavaArray.prototype.type = cls;
        JavaArray.prototype.constructor = JavaArray;
        JavaArray.prototype.toString = function() {
            let str = "[";
            for (let i = 0;i < this.data.length;++i) {
                if (i > 0) {
                    str += ", ";
                }
                str += this.data[i].toString();
            }
            str += "]";
            return str;
        };
        JavaArray.prototype.$clone0 = function() {
            let dataCopy;
            if ('slice' in this.data) {
                dataCopy = this.data.slice();
            } else {
                dataCopy = new this.data.constructor(this.data.length);
                for (let i = 0;i < dataCopy.length;++i) {
                    dataCopy[i] = this.data[i];
                }
            }
            return new ($rt_arraycls(this.type))(dataCopy);
        };
        let name = "[" + cls.$meta.binaryName;
        JavaArray.$meta = { item : cls, supertypes : [$rt_objcls()], primitive : false, superclass : $rt_objcls(), name : name, binaryName : name, enum : false, simpleName : null, declaringClass : null, enclosingClass : null };
        JavaArray.classObject = null;
        JavaArray.$array = null;
        result = JavaArray;
        cls.$array = JavaArray;
    }
    return result;
},
$rt_stringPool_instance,
$rt_stringPool = strings => {
    $rt_stringClassInit();
    $rt_stringPool_instance = new Array(strings.length);
    for (let i = 0;i < strings.length;++i) {
        $rt_stringPool_instance[i] = $rt_intern($rt_str(strings[i]));
    }
},
$rt_s = index => $rt_stringPool_instance[index],
$rt_charArrayToString = (array, offset, count) => {
    let result = "";
    let limit = offset + count;
    for (let i = offset;i < limit;i = i + 1024 | 0) {
        let next = Math.min(limit, i + 1024 | 0);
        result += String.fromCharCode.apply(null, array.subarray(i, next));
    }
    return result;
},
$rt_str = str => str === null ? null : jl_String__init_4(str),
$rt_ustr = str => str === null ? null : str.$nativeString,
$rt_stringClassInit = () => jl_String_$callClinit(),
$rt_intern;
{
    $rt_intern = str => str;
}
let $rt_isInstance = (obj, cls) => obj instanceof $rt_objcls() && !!obj.constructor.$meta && $rt_isAssignable(obj.constructor, cls),
$rt_isAssignable = (from, to) => {
    if (from === to) {
        return true;
    }
    let map = from.$meta.assignableCache;
    if (typeof map === 'undefined') {
        map = new Map();
        from.$meta.assignableCache = map;
    }
    let cachedResult = map.get(to);
    if (typeof cachedResult !== 'undefined') {
        return cachedResult;
    }
    if (to.$meta.item !== null) {
        let result = from.$meta.item !== null && $rt_isAssignable(from.$meta.item, to.$meta.item);
        map.set(to, result);
        return result;
    }
    let supertypes = from.$meta.supertypes;
    for (let i = 0;i < supertypes.length;i = i + 1 | 0) {
        if ($rt_isAssignable(supertypes[i], to)) {
            map.set(to, true);
            return true;
        }
    }
    map.set(to, false);
    return false;
},
$rt_throw = ex => {
    throw $rt_exception(ex);
},
$rt_javaExceptionProp = Symbol("javaException"),
$rt_exception = ex => {
    if (!ex.$jsException) {
        $rt_fillNativeException(ex);
    }
    return ex.$jsException;
},
$rt_fillNativeException = ex => {
    let javaCause = $rt_throwableCause(ex);
    let jsCause = javaCause !== null ? javaCause.$jsException : void 0;
    let cause = typeof jsCause === "object" ? { cause : jsCause } : void 0;
    let err = new JavaError("Java exception thrown", cause);
    if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(err);
    }
    err[$rt_javaExceptionProp] = ex;
    ex.$jsException = err;
    $rt_fillStack(err, ex);
},
$rt_fillStack = (err, ex) => {
    if (typeof $rt_decodeStack === "function" && err.stack) {
        let stack = $rt_decodeStack(err.stack);
        let javaStack = $rt_createArray($rt_stecls(), stack.length);
        let elem;
        let noStack = false;
        for (let i = 0;i < stack.length;++i) {
            let element = stack[i];
            elem = $rt_createStackElement($rt_str(element.className), $rt_str(element.methodName), $rt_str(element.fileName), element.lineNumber);
            if (elem == null) {
                noStack = true;
                break;
            }
            javaStack.data[i] = elem;
        }
        if (!noStack) {
            $rt_setStack(ex, javaStack);
        }
    }
},
JavaError;
if (typeof Reflect === 'object') {
    let defaultMessage = Symbol("defaultMessage");
    JavaError = function JavaError(message, cause) {
        let self = Reflect.construct(Error, [void 0, cause], JavaError);
        Object.setPrototypeOf(self, JavaError.prototype);
        self[defaultMessage] = message;
        return self;
    }
    ;
    JavaError.prototype = Object.create(Error.prototype, { constructor : { configurable : true, writable : true, value : JavaError }, message : { get() {
        try {
            let javaException = this[$rt_javaExceptionProp];
            if (typeof javaException === 'object') {
                let javaMessage = $rt_throwableMessage(javaException);
                if (typeof javaMessage === "object") {
                    return javaMessage !== null ? javaMessage.toString() : null;
                }
            }
            return this[defaultMessage];
        } catch (e){
            return "Exception occurred trying to extract Java exception message: " + e;
        }
    } } });
} else {
    JavaError = Error;
}
let $rt_throwableMessage = t => jl_Throwable_getMessage(t),
$rt_throwableCause = t => jl_Throwable_getCause(t),
$rt_stecls = () => jl_StackTraceElement,
$rt_createStackElement = (className, methodName, fileName, lineNumber) => {
    {
        return null;
    }
},
$rt_setStack = (e, stack) => {
},
$rt_createOutputFunction = outputFunction => {
    let buffer = "";
    return msg => {
        let index = 0;
        while (true) {
            let next = msg.indexOf('\n', index);
            if (next < 0) {
                break;
            }
            outputFunction(buffer + msg.substring(index, next));
            buffer = "";
            index = next + 1;
        }
        buffer += msg.substring(index);
    };
},
$rt_putStdout = typeof $rt_putStdoutCustom === "function" ? $rt_putStdoutCustom : typeof console === "object" ? $rt_createOutputFunction(msg => console.info(msg)) : () => {
},
$rt_packageData = null,
$rt_packages = data => {
    let i = 0;
    let packages = new Array(data.length);
    for (let j = 0;j < data.length;++j) {
        let prefixIndex = data[i++];
        let prefix = prefixIndex >= 0 ? packages[prefixIndex] : "";
        packages[j] = prefix + data[i++] + ".";
    }
    $rt_packageData = packages;
},
$rt_metadata = data => {
    let packages = $rt_packageData;
    let i = 0;
    while (i < data.length) {
        let cls = data[i++];
        cls.$meta = {  };
        let m = cls.$meta;
        let className = data[i++];
        m.name = className !== 0 ? className : null;
        if (m.name !== null) {
            let packageIndex = data[i++];
            if (packageIndex >= 0) {
                m.name = packages[packageIndex] + m.name;
            }
        }
        m.binaryName = "L" + m.name + ";";
        let superclass = data[i++];
        m.superclass = superclass !== 0 ? superclass : null;
        m.supertypes = data[i++];
        if (m.superclass) {
            m.supertypes.push(m.superclass);
            cls.prototype = Object.create(m.superclass.prototype);
        } else {
            cls.prototype = {  };
        }
        let flags = data[i++];
        m.enum = (flags & 8) !== 0;
        m.flags = flags;
        m.primitive = false;
        m.item = null;
        cls.prototype.constructor = cls;
        cls.classObject = null;
        m.accessLevel = data[i++];
        let innerClassInfo = data[i++];
        if (innerClassInfo === 0) {
            m.simpleName = null;
            m.declaringClass = null;
            m.enclosingClass = null;
        } else {
            let enclosingClass = innerClassInfo[0];
            m.enclosingClass = enclosingClass !== 0 ? enclosingClass : null;
            let declaringClass = innerClassInfo[1];
            m.declaringClass = declaringClass !== 0 ? declaringClass : null;
            let simpleName = innerClassInfo[2];
            m.simpleName = simpleName !== 0 ? simpleName : null;
        }
        let clinit = data[i++];
        cls.$clinit = clinit !== 0 ? clinit : function() {
        };
        let virtualMethods = data[i++];
        if (virtualMethods !== 0) {
            for (let j = 0;j < virtualMethods.length;j += 2) {
                let name = virtualMethods[j];
                let func = virtualMethods[j + 1];
                if (typeof name === 'string') {
                    name = [name];
                }
                for (let k = 0;k < name.length;++k) {
                    cls.prototype[name[k]] = func;
                }
            }
        }
        cls.$array = null;
    }
};
function jl_Object() {
    this.$id$ = 0;
}
let jl_Object__init_ = $this => {
    return;
},
jl_Object__init_0 = () => {
    let var_0 = new jl_Object();
    jl_Object__init_(var_0);
    return var_0;
},
jl_Object_getClass = $this => {
    return jl_Class_getClass($this.constructor);
},
jl_Object_toString = $this => {
    let var$1, var$2, var$3;
    var$1 = jl_Class_getName(jl_Object_getClass($this));
    var$2 = jl_Integer_toHexString(jl_Object_identity($this));
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$3, var$1), 64), var$2);
    return jl_StringBuilder_toString(var$3);
},
jl_Object_identity = $this => {
    let $platformThis;
    $platformThis = $this;
    if (!$platformThis.$id$)
        $platformThis.$id$ = $rt_nextId();
    return $this.$id$;
},
jl_Object_clone = $this => {
    let var$1, $result, var$3;
    if (!$rt_isInstance($this, jl_Cloneable)) {
        var$1 = $this;
        if (var$1.constructor.$meta.item === null)
            $rt_throw(jl_CloneNotSupportedException__init_0());
    }
    $result = otp_Platform_clone($this);
    var$1 = $result;
    var$3 = $rt_nextId();
    var$1.$id$ = var$3;
    return $result;
};
function jl_Throwable() {
    let a = this; jl_Object.call(a);
    a.$message = null;
    a.$cause = null;
    a.$suppressionEnabled = 0;
    a.$writableStackTrace = 0;
}
let jl_Throwable__init_ = $this => {
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
},
jl_Throwable__init_1 = () => {
    let var_0 = new jl_Throwable();
    jl_Throwable__init_(var_0);
    return var_0;
},
jl_Throwable__init_0 = ($this, $message) => {
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
    $this.$message = $message;
},
jl_Throwable__init_2 = var_0 => {
    let var_1 = new jl_Throwable();
    jl_Throwable__init_0(var_1, var_0);
    return var_1;
},
jl_Throwable_fillInStackTrace = $this => {
    return $this;
},
jl_Throwable_initNativeException = $this => {
    $rt_fillNativeException($this);
},
jl_Throwable_getMessage = $this => {
    return $this.$message;
},
jl_Throwable_getCause = $this => {
    return $this.$cause === $this ? null : $this.$cause;
},
jl_Exception = $rt_classWithoutFields(jl_Throwable),
jl_Exception__init_ = $this => {
    jl_Throwable__init_($this);
},
jl_Exception__init_1 = () => {
    let var_0 = new jl_Exception();
    jl_Exception__init_(var_0);
    return var_0;
},
jl_Exception__init_0 = ($this, $message) => {
    jl_Throwable__init_0($this, $message);
},
jl_Exception__init_2 = var_0 => {
    let var_1 = new jl_Exception();
    jl_Exception__init_0(var_1, var_0);
    return var_1;
},
jl_RuntimeException = $rt_classWithoutFields(jl_Exception),
jl_RuntimeException__init_ = $this => {
    jl_Exception__init_($this);
},
jl_RuntimeException__init_1 = () => {
    let var_0 = new jl_RuntimeException();
    jl_RuntimeException__init_(var_0);
    return var_0;
},
jl_RuntimeException__init_0 = ($this, $message) => {
    jl_Exception__init_0($this, $message);
},
jl_RuntimeException__init_2 = var_0 => {
    let var_1 = new jl_RuntimeException();
    jl_RuntimeException__init_0(var_1, var_0);
    return var_1;
},
jl_IndexOutOfBoundsException = $rt_classWithoutFields(jl_RuntimeException),
jl_IndexOutOfBoundsException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
jl_IndexOutOfBoundsException__init_0 = () => {
    let var_0 = new jl_IndexOutOfBoundsException();
    jl_IndexOutOfBoundsException__init_(var_0);
    return var_0;
},
ju_Arrays = $rt_classWithoutFields(),
ju_Arrays_copyOf0 = ($array, $length) => {
    let var$3, $result, $sz, $i;
    var$3 = $array.data;
    $result = $rt_createCharArray($length);
    $sz = jl_Math_min($length, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
},
ju_Arrays_copyOf = ($original, $newLength) => {
    let var$3, $result, $sz, $i;
    var$3 = $original.data;
    $result = jlr_Array_newInstance(jl_Class_getComponentType(jl_Object_getClass($original)), $newLength);
    $sz = jl_Math_min($newLength, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
},
ju_Arrays_fill = ($a, $fromIndex, $toIndex, $val) => {
    let var$5, var$6;
    if ($fromIndex > $toIndex)
        $rt_throw(jl_IllegalArgumentException__init_0());
    while ($fromIndex < $toIndex) {
        var$5 = $a.data;
        var$6 = $fromIndex + 1 | 0;
        var$5[$fromIndex] = $val;
        $fromIndex = var$6;
    }
},
jlr_Array = $rt_classWithoutFields(),
jlr_Array_newInstance = ($componentType, $length) => {
    if ($componentType === null)
        $rt_throw(jl_NullPointerException__init_0());
    if ($componentType === $rt_cls($rt_voidcls))
        $rt_throw(jl_IllegalArgumentException__init_0());
    if ($length < 0)
        $rt_throw(jl_NegativeArraySizeException__init_0());
    return jlr_Array_newInstanceImpl(jl_Class_getPlatformClass($componentType), $length);
},
jlr_Array_newInstanceImpl = (var$1, var$2) => {
    if (var$1.$meta.primitive) {
        switch (var$1) {
        }
        ;
    }
    return $rt_createArray(var$1, var$2);
},
ju_Iterator = $rt_classWithoutFields(0);
function t_Bit$BitIterator() {
    jl_Object.call(this);
    this.$bits = Long_ZERO;
}
let t_Bit$BitIterator__init_ = ($this, var$1) => {
    jl_Object__init_($this);
    $this.$bits = var$1;
},
t_Bit$BitIterator__init_0 = var_0 => {
    let var_1 = new t_Bit$BitIterator();
    t_Bit$BitIterator__init_(var_1, var_0);
    return var_1;
},
t_Bit$BitIterator_hasNext = $this => {
    return Long_eq($this.$bits, Long_ZERO) ? 0 : 1;
},
t_Bit$BitIterator_next = $this => {
    let $temp, $mask;
    $temp = Long_and($this.$bits, Long_sub($this.$bits, Long_fromInt(1)));
    $mask = Long_sub($this.$bits, $temp);
    $this.$bits = $temp;
    return jl_Integer_valueOf(t_Bit_position($mask));
},
t_Bit$BitIterator_next0 = $this => {
    return $this.$next();
},
jl_System = $rt_classWithoutFields(),
jl_System_outCache = null,
jl_System_out = () => {
    if (jl_System_outCache === null)
        jl_System_outCache = otcic_JSStdoutPrintStream__init_0();
    return jl_System_outCache;
},
jl_System_currentTimeMillis = () => {
    return Long_fromNumber((new Date()).getTime());
},
t_TTTEngine = $rt_classWithoutFields(),
t_TTTEngine_bestMove = ($boardString, $playerChar) => {
    let $board, $player, $search, $move, var$7, var$8;
    $board = t_Board__init_1($boardString);
    $player = t_Player_valueOf($playerChar);
    if ($player === null)
        $rt_throw(jl_IllegalArgumentException__init_((((jl_StringBuilder__init_()).$append1($rt_s(0))).$append0($playerChar)).$toString()));
    $search = t_AlphaBeta__init_0();
    $search.$setTimeBudgetMs(1200);
    $move = $search.$bestMove($board, $player);
    if ($move === null)
        return null;
    var$7 = $rt_createIntArray(3);
    var$8 = var$7.data;
    var$8[0] = $move.$getX();
    var$8[1] = $move.$getY();
    var$8[2] = $move.$getZ();
    return var$7;
},
t_TTTEngine_applyMove = ($boardString, $x, $y, $z, $playerChar) => {
    let $board, $player;
    $board = t_Board__init_1($boardString);
    $player = t_Player_valueOf($playerChar);
    if ($player === null)
        $rt_throw(jl_IllegalArgumentException__init_((((jl_StringBuilder__init_()).$append1($rt_s(0))).$append0($playerChar)).$toString()));
    if ($board.$isEmpty($x, $y, $z)) {
        $board.$set($x, $y, $z, $player);
        return t_TTTEngine_toBoardString($board);
    }
    $rt_throw(jl_IllegalArgumentException__init_(((((((((jl_StringBuilder__init_()).$append1($rt_s(1))).$append2($x)).$append1($rt_s(2))).$append2($y)).$append1($rt_s(2))).$append2($z)).$append1($rt_s(3))).$toString()));
},
t_TTTEngine_toBoardString = $board => {
    let $sb, $pos, $p;
    $sb = jl_StringBuilder__init_2(64);
    $pos = 0;
    while ($pos < 64) {
        $p = $board.$get($pos);
        if ($p !== null)
            $sb.$append1(t_Player_toString($p));
        else
            $sb.$append0(46);
        $pos = $pos + 1 | 0;
    }
    return $sb.$toString();
},
jl_Iterable = $rt_classWithoutFields(0),
ju_Collection = $rt_classWithoutFields(0),
ju_AbstractCollection = $rt_classWithoutFields(),
ju_AbstractCollection__init_ = $this => {
    jl_Object__init_($this);
},
ju_SequencedCollection = $rt_classWithoutFields(0),
ju_List = $rt_classWithoutFields(0);
function ju_AbstractList() {
    ju_AbstractCollection.call(this);
    this.$modCount = 0;
}
let ju_AbstractList__init_ = $this => {
    ju_AbstractCollection__init_($this);
},
ji_Serializable = $rt_classWithoutFields(0),
jl_Number = $rt_classWithoutFields(),
jl_Number__init_ = $this => {
    jl_Object__init_($this);
},
jl_Comparable = $rt_classWithoutFields(0);
function jl_Integer() {
    jl_Number.call(this);
    this.$value = 0;
}
let jl_Integer_TYPE = null,
jl_Integer_integerCache = null,
jl_Integer_$callClinit = () => {
    jl_Integer_$callClinit = $rt_eraseClinit(jl_Integer);
    jl_Integer__clinit_();
},
jl_Integer__init_ = ($this, $value) => {
    jl_Integer_$callClinit();
    jl_Number__init_($this);
    $this.$value = $value;
},
jl_Integer__init_0 = var_0 => {
    let var_1 = new jl_Integer();
    jl_Integer__init_(var_1, var_0);
    return var_1;
},
jl_Integer_toHexString = $i => {
    jl_Integer_$callClinit();
    return otci_IntegerUtil_toUnsignedLogRadixString($i, 4);
},
jl_Integer_valueOf = $i => {
    jl_Integer_$callClinit();
    if ($i >= (-128) && $i <= 127) {
        jl_Integer_ensureIntegerCache();
        return jl_Integer_integerCache.data[$i + 128 | 0];
    }
    return jl_Integer__init_0($i);
},
jl_Integer_ensureIntegerCache = () => {
    let $j;
    jl_Integer_$callClinit();
    a: {
        if (jl_Integer_integerCache === null) {
            jl_Integer_integerCache = $rt_createArray(jl_Integer, 256);
            $j = 0;
            while (true) {
                if ($j >= jl_Integer_integerCache.data.length)
                    break a;
                jl_Integer_integerCache.data[$j] = jl_Integer__init_0($j - 128 | 0);
                $j = $j + 1 | 0;
            }
        }
    }
},
jl_Integer_intValue = $this => {
    return $this.$value;
},
jl_Integer_numberOfLeadingZeros = $i => {
    let $n, var$3, var$4;
    jl_Integer_$callClinit();
    if (!$i)
        return 32;
    $n = 0;
    var$3 = $i >>> 16 | 0;
    if (var$3)
        $n = 16;
    else
        var$3 = $i;
    var$4 = var$3 >>> 8 | 0;
    if (!var$4)
        var$4 = var$3;
    else
        $n = $n | 8;
    var$3 = var$4 >>> 4 | 0;
    if (!var$3)
        var$3 = var$4;
    else
        $n = $n | 4;
    var$4 = var$3 >>> 2 | 0;
    if (!var$4)
        var$4 = var$3;
    else
        $n = $n | 2;
    if (var$4 >>> 1 | 0)
        $n = $n | 1;
    return (32 - $n | 0) - 1 | 0;
},
jl_Integer__clinit_ = () => {
    jl_Integer_TYPE = $rt_cls($rt_intcls);
},
jl_AutoCloseable = $rt_classWithoutFields(0),
jl_CloneNotSupportedException = $rt_classWithoutFields(jl_Exception),
jl_CloneNotSupportedException__init_ = $this => {
    jl_Exception__init_($this);
},
jl_CloneNotSupportedException__init_0 = () => {
    let var_0 = new jl_CloneNotSupportedException();
    jl_CloneNotSupportedException__init_(var_0);
    return var_0;
},
jl_NullPointerException = $rt_classWithoutFields(jl_RuntimeException),
jl_NullPointerException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
jl_NullPointerException__init_0 = () => {
    let var_0 = new jl_NullPointerException();
    jl_NullPointerException__init_(var_0);
    return var_0;
},
jl_Character = $rt_classWithoutFields(),
jl_Character_TYPE = null,
jl_Character_characterCache = null,
jl_Character_$callClinit = () => {
    jl_Character_$callClinit = $rt_eraseClinit(jl_Character);
    jl_Character__clinit_();
},
jl_Character_forDigit = ($digit, $radix) => {
    jl_Character_$callClinit();
    if ($radix >= 2 && $radix <= 36 && $digit >= 0 && $digit < $radix)
        return $digit < 10 ? (48 + $digit | 0) & 65535 : ((97 + $digit | 0) - 10 | 0) & 65535;
    return 0;
},
jl_Character__clinit_ = () => {
    jl_Character_TYPE = $rt_cls($rt_charcls);
    jl_Character_characterCache = $rt_createArray(jl_Character, 128);
};
function jl_Enum() {
    let a = this; jl_Object.call(a);
    a.$name0 = null;
    a.$ordinal0 = 0;
}
let jl_Enum__init_ = ($this, $name, $ordinal) => {
    jl_Object__init_($this);
    $this.$name0 = $name;
    $this.$ordinal0 = $ordinal;
},
jl_Enum_ordinal = $this => {
    return $this.$ordinal0;
},
otci_IntegerUtil = $rt_classWithoutFields(),
otci_IntegerUtil_toUnsignedLogRadixString = ($value, $radixLog2) => {
    let $radix, $mask, $sz, $chars, $pos, $target, var$9, $target_0;
    if (!$value)
        return $rt_s(4);
    $radix = 1 << $radixLog2;
    $mask = $radix - 1 | 0;
    $sz = (((32 - jl_Integer_numberOfLeadingZeros($value) | 0) + $radixLog2 | 0) - 1 | 0) / $radixLog2 | 0;
    $chars = $rt_createCharArray($sz);
    $pos = $rt_imul($sz - 1 | 0, $radixLog2);
    $target = 0;
    while ($pos >= 0) {
        var$9 = $chars.data;
        $target_0 = $target + 1 | 0;
        var$9[$target] = jl_Character_forDigit(($value >>> $pos | 0) & $mask, $radix);
        $pos = $pos - $radixLog2 | 0;
        $target = $target_0;
    }
    return jl_String__init_3($chars);
};
function t_Board$EmptySquareIterator() {
    let a = this; jl_Object.call(a);
    a.$iterator0 = null;
    a.$this$0 = null;
}
let t_Board$EmptySquareIterator__init_ = ($this, var$1) => {
    $this.$this$0 = var$1;
    jl_Object__init_($this);
    $this.$iterator0 = t_Bit_iterator(Long_xor(Long_or(t_Board_access$000(var$1), t_Board_access$100(var$1)), Long_fromInt(-1)));
},
t_Board$EmptySquareIterator__init_0 = var_0 => {
    let var_1 = new t_Board$EmptySquareIterator();
    t_Board$EmptySquareIterator__init_(var_1, var_0);
    return var_1;
},
t_Board$EmptySquareIterator_hasNext = $this => {
    return $this.$iterator0.$hasNext();
},
t_Board$EmptySquareIterator_next0 = $this => {
    return t_Coordinate_valueOf(($this.$iterator0.$next0()).$intValue());
},
t_Board$EmptySquareIterator_next = $this => {
    return $this.$next1();
},
otcir_FieldInfo = $rt_classWithoutFields(),
jl_Math = $rt_classWithoutFields(),
jl_Math_random = () => {
    return jl_Math_randomImpl();
},
jl_Math_randomImpl = () => {
    return Math.random();
},
jl_Math_min = ($a, $b) => {
    if ($a < $b)
        $b = $a;
    return $b;
},
jl_Math_max = ($a, $b) => {
    if ($a > $b)
        $b = $a;
    return $b;
},
jl_Cloneable = $rt_classWithoutFields(0),
otji_JS = $rt_classWithoutFields(),
otji_JS_wrap = $array => {
    let var$2, var$3, $result, $i, var$6;
    if ($array === null)
        return null;
    var$2 = $array.data;
    var$3 = var$2.length;
    $result = new Int32Array(var$3);
    $i = 0;
    while ($i < var$3) {
        var$6 = var$2[$i];
        $result[$i] = var$6;
        $i = $i + 1 | 0;
    }
    return $result;
},
jl_CharSequence = $rt_classWithoutFields(0),
jl_StringIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException),
jl_StringIndexOutOfBoundsException__init_ = $this => {
    jl_IndexOutOfBoundsException__init_($this);
},
jl_StringIndexOutOfBoundsException__init_0 = () => {
    let var_0 = new jl_StringIndexOutOfBoundsException();
    jl_StringIndexOutOfBoundsException__init_(var_0);
    return var_0;
},
ji_Closeable = $rt_classWithoutFields(0),
ji_Flushable = $rt_classWithoutFields(0),
ji_OutputStream = $rt_classWithoutFields(),
ji_OutputStream__init_ = $this => {
    jl_Object__init_($this);
};
function ji_FilterOutputStream() {
    ji_OutputStream.call(this);
    this.$out0 = null;
}
let ji_FilterOutputStream__init_ = ($this, $out) => {
    ji_OutputStream__init_($this);
    $this.$out0 = $out;
},
ji_FilterOutputStream__init_0 = var_0 => {
    let var_1 = new ji_FilterOutputStream();
    ji_FilterOutputStream__init_(var_1, var_0);
    return var_1;
},
otcir_ClassList = $rt_classWithoutFields(),
ju_Objects = $rt_classWithoutFields(),
ju_Objects_checkFromIndexSize = ($fromIndex, $size, $length) => {
    if ($fromIndex >= 0 && $size >= 0 && $size <= ($length - $fromIndex | 0))
        return $fromIndex;
    $rt_throw(jl_IndexOutOfBoundsException__init_0());
},
jlr_Type = $rt_classWithoutFields(0);
function t_Line() {
    let a = this; jl_Object.call(a);
    a.$positions0 = Long_ZERO;
    a.$name1 = null;
}
let t_Line_lines = null,
t_Line_$assertionsDisabled = 0,
t_Line_$callClinit = () => {
    t_Line_$callClinit = $rt_eraseClinit(t_Line);
    t_Line__clinit_();
},
t_Line__init_0 = ($this, $name) => {
    t_Line_$callClinit();
    jl_Object__init_($this);
    $this.$positions0 = Long_ZERO;
    $this.$name1 = $name;
},
t_Line__init_ = var_0 => {
    let var_1 = new t_Line();
    t_Line__init_0(var_1, var_0);
    return var_1;
},
t_Line_positions = $this => {
    return $this.$positions0;
},
t_Line_set = ($this, $x, $y, $z) => {
    $this.$positions0 = t_Bit_set($this.$positions0, t_Coordinate_position($x, $y, $z));
},
t_Line_Straight = ($axis, $row, $column) => {
    let $name, var$5, $line, $i;
    t_Line_$callClinit();
    a: {
        $name = $rt_s(5);
        switch (jl_Enum_ordinal($axis)) {
            case 0:
                break;
            case 1:
                var$5 = ((((((jl_StringBuilder__init_()).$append1($name)).$append1($rt_s(6))).$append2($row)).$append1($rt_s(7))).$append2($column)).$toString();
                break a;
            case 2:
                var$5 = ((((((jl_StringBuilder__init_()).$append1($name)).$append1($rt_s(8))).$append2($row)).$append1($rt_s(9))).$append2($column)).$toString();
                break a;
            default:
                var$5 = ((((((jl_StringBuilder__init_()).$append1($name)).$append1($rt_s(10))).$append2($row)).$append1($rt_s(11))).$append2($column)).$toString();
                break a;
        }
        var$5 = ((((((jl_StringBuilder__init_()).$append1($name)).$append1($rt_s(12))).$append2($row)).$append1($rt_s(7))).$append2($column)).$toString();
    }
    $line = t_Line__init_(var$5);
    $i = 0;
    while ($i < 4) {
        b: {
            switch (jl_Enum_ordinal($axis)) {
                case 0:
                    break;
                case 1:
                    t_Line_set($line, $row, $i, $column);
                    break b;
                case 2:
                    t_Line_set($line, $row, $column, $i);
                    break b;
                default:
                    break b;
            }
            t_Line_set($line, $i, $row, $column);
        }
        $i = $i + 1 | 0;
    }
    return $line;
},
t_Line_ForwardDiagonal = ($axis, $value) => {
    let $name, var$4, $line, $i;
    t_Line_$callClinit();
    a: {
        $name = $rt_s(13);
        switch (jl_Enum_ordinal($axis)) {
            case 0:
                break;
            case 1:
                var$4 = ((((jl_StringBuilder__init_()).$append1($name)).$append1($rt_s(14))).$append2($value)).$toString();
                break a;
            case 2:
                var$4 = ((((jl_StringBuilder__init_()).$append1($name)).$append1($rt_s(15))).$append2($value)).$toString();
                break a;
            default:
                var$4 = (((((jl_StringBuilder__init_()).$append1($name)).$append1($rt_s(16))).$append2($value)).$append1($rt_s(3))).$toString();
                break a;
        }
        var$4 = ((((jl_StringBuilder__init_()).$append1($name)).$append1($rt_s(17))).$append2($value)).$toString();
    }
    $line = t_Line__init_(var$4);
    $i = 0;
    while ($i < 4) {
        b: {
            switch (jl_Enum_ordinal($axis)) {
                case 0:
                    break;
                case 1:
                    t_Line_set($line, $i, $value, $i);
                    break b;
                case 2:
                    t_Line_set($line, $i, $i, $value);
                    break b;
                default:
                    break b;
            }
            t_Line_set($line, $value, $i, $i);
        }
        $i = $i + 1 | 0;
    }
    return $line;
},
t_Line_ForwardDiagonal0 = () => {
    let $name, $line, $i;
    t_Line_$callClinit();
    $name = $rt_s(18);
    $line = t_Line__init_($name);
    $i = 0;
    while ($i < 4) {
        t_Line_set($line, $i, $i, $i);
        $i = $i + 1 | 0;
    }
    return $line;
},
t_Line_ReverseDiagonal = ($axis, $value) => {
    let $name, var$4, $line, $i;
    t_Line_$callClinit();
    a: {
        $name = $rt_s(19);
        switch (jl_Enum_ordinal($axis)) {
            case 0:
                break;
            case 1:
                var$4 = ((((jl_StringBuilder__init_()).$append1($name)).$append1($rt_s(14))).$append2($value)).$toString();
                break a;
            case 2:
                var$4 = ((((jl_StringBuilder__init_()).$append1($name)).$append1($rt_s(15))).$append2($value)).$toString();
                break a;
            default:
                var$4 = (((((jl_StringBuilder__init_()).$append1($name)).$append1($rt_s(16))).$append2($value)).$append1($rt_s(3))).$toString();
                break a;
        }
        var$4 = ((((jl_StringBuilder__init_()).$append1($name)).$append1($rt_s(17))).$append2($value)).$toString();
    }
    $line = t_Line__init_(var$4);
    $i = 0;
    while ($i < 4) {
        b: {
            switch (jl_Enum_ordinal($axis)) {
                case 0:
                    break;
                case 1:
                    t_Line_set($line, $i, $value, (4 - $i | 0) - 1 | 0);
                    break b;
                case 2:
                    t_Line_set($line, $i, (4 - $i | 0) - 1 | 0, $value);
                    break b;
                default:
                    break b;
            }
            t_Line_set($line, $value, $i, (4 - $i | 0) - 1 | 0);
        }
        $i = $i + 1 | 0;
    }
    return $line;
},
t_Line_ReverseDiagonal0 = $axis => {
    let $name, $line, $i;
    t_Line_$callClinit();
    a: {
        $name = $rt_s(20);
        switch (jl_Enum_ordinal($axis)) {
            case 0:
                $name = (((jl_StringBuilder__init_()).$append1($name)).$append1($rt_s(21))).$toString();
                break a;
            case 1:
                $name = (((jl_StringBuilder__init_()).$append1($name)).$append1($rt_s(22))).$toString();
                break a;
            case 2:
                $name = (((jl_StringBuilder__init_()).$append1($name)).$append1($rt_s(23))).$toString();
                break a;
            default:
        }
    }
    $line = t_Line__init_($name);
    $i = 0;
    while ($i < 4) {
        b: {
            switch (jl_Enum_ordinal($axis)) {
                case 0:
                    break;
                case 1:
                    t_Line_set($line, $i, (4 - $i | 0) - 1 | 0, $i);
                    break b;
                case 2:
                    t_Line_set($line, $i, $i, (4 - $i | 0) - 1 | 0);
                    break b;
                default:
                    break b;
            }
            t_Line_set($line, (4 - $i | 0) - 1 | 0, $i, $i);
        }
        $i = $i + 1 | 0;
    }
    return $line;
},
t_Line__clinit_ = () => {
    let $count, var$2, var$3, var$4, $axis, $row, $column, var$8, var$9, $value;
    t_Line_$assertionsDisabled = jl_Class_desiredAssertionStatus($rt_cls(t_Line)) ? 0 : 1;
    t_Line_lines = $rt_createArray(t_Line, 76);
    $count = 0;
    var$2 = (t_Line$Axis_values()).data;
    var$3 = var$2.length;
    var$4 = 0;
    while (var$4 < var$3) {
        $axis = var$2[var$4];
        $row = 0;
        while ($row < 4) {
            $column = 0;
            while ($column < 4) {
                var$8 = t_Line_lines.data;
                var$9 = $count + 1 | 0;
                var$8[$count] = t_Line_Straight($axis, $row, $column);
                $column = $column + 1 | 0;
                $count = var$9;
            }
            $row = $row + 1 | 0;
        }
        $value = 0;
        while ($value < 4) {
            var$8 = t_Line_lines.data;
            var$9 = $count + 1 | 0;
            var$8[$count] = t_Line_ForwardDiagonal($axis, $value);
            var$8 = t_Line_lines.data;
            $count = var$9 + 1 | 0;
            var$8[var$9] = t_Line_ReverseDiagonal($axis, $value);
            $value = $value + 1 | 0;
        }
        var$8 = t_Line_lines.data;
        var$9 = $count + 1 | 0;
        var$8[$count] = t_Line_ReverseDiagonal0($axis);
        var$4 = var$4 + 1 | 0;
        $count = var$9;
    }
    var$2 = t_Line_lines.data;
    var$3 = $count + 1 | 0;
    var$2[$count] = t_Line_ForwardDiagonal0();
    if (!t_Line_$assertionsDisabled && var$3 != 76)
        $rt_throw(jl_AssertionError__init_());
};
function jl_AbstractStringBuilder() {
    let a = this; jl_Object.call(a);
    a.$buffer = null;
    a.$length0 = 0;
}
let jl_AbstractStringBuilder__init_0 = $this => {
    jl_AbstractStringBuilder__init_($this, 16);
},
jl_AbstractStringBuilder__init_2 = () => {
    let var_0 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_0(var_0);
    return var_0;
},
jl_AbstractStringBuilder__init_ = ($this, $capacity) => {
    jl_Object__init_($this);
    $this.$buffer = $rt_createCharArray($capacity);
},
jl_AbstractStringBuilder__init_1 = var_0 => {
    let var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_(var_1, var_0);
    return var_1;
},
jl_AbstractStringBuilder_append1 = ($this, $obj) => {
    return $this.$insert($this.$length0, $obj);
},
jl_AbstractStringBuilder_append = ($this, $string) => {
    return $this.$insert0($this.$length0, $string);
},
jl_AbstractStringBuilder_insert = ($this, $index, $string) => {
    let $i, var$4, var$5;
    if ($index >= 0 && $index <= $this.$length0) {
        if ($string === null)
            $string = $rt_s(24);
        else if ($string.$isEmpty0())
            return $this;
        $this.$ensureCapacity($this.$length0 + $string.$length() | 0);
        $i = $this.$length0 - 1 | 0;
        while ($i >= $index) {
            $this.$buffer.data[$i + $string.$length() | 0] = $this.$buffer.data[$i];
            $i = $i + (-1) | 0;
        }
        $this.$length0 = $this.$length0 + $string.$length() | 0;
        $i = 0;
        while ($i < $string.$length()) {
            var$4 = $this.$buffer.data;
            var$5 = $index + 1 | 0;
            var$4[$index] = $string.$charAt($i);
            $i = $i + 1 | 0;
            $index = var$5;
        }
        return $this;
    }
    $rt_throw(jl_StringIndexOutOfBoundsException__init_0());
},
jl_AbstractStringBuilder_append0 = ($this, $value) => {
    return $this.$append3($value, 10);
},
jl_AbstractStringBuilder_append3 = ($this, $value, $radix) => {
    return $this.$insert1($this.$length0, $value, $radix);
},
jl_AbstractStringBuilder_insert2 = ($this, $target, $value, $radix) => {
    let $positive, var$5, var$6, $pos, $sz, $posLimit, var$10, var$11;
    $positive = 1;
    if ($value < 0) {
        $positive = 0;
        $value =  -$value | 0;
    }
    a: {
        if ($rt_ucmp($value, $radix) < 0) {
            if ($positive)
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 1 | 0);
            else {
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 2 | 0);
                var$5 = $this.$buffer.data;
                var$6 = $target + 1 | 0;
                var$5[$target] = 45;
                $target = var$6;
            }
            $this.$buffer.data[$target] = jl_Character_forDigit($value, $radix);
        } else {
            $pos = 1;
            $sz = 1;
            $posLimit = $rt_udiv((-1), $radix);
            b: {
                while (true) {
                    var$10 = $rt_imul($pos, $radix);
                    if ($rt_ucmp(var$10, $value) > 0) {
                        var$10 = $pos;
                        break b;
                    }
                    $sz = $sz + 1 | 0;
                    if ($rt_ucmp(var$10, $posLimit) > 0)
                        break;
                    $pos = var$10;
                }
            }
            if (!$positive)
                $sz = $sz + 1 | 0;
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + $sz | 0);
            if ($positive)
                var$11 = $target;
            else {
                var$5 = $this.$buffer.data;
                var$11 = $target + 1 | 0;
                var$5[$target] = 45;
            }
            while (true) {
                if (!var$10)
                    break a;
                var$5 = $this.$buffer.data;
                var$6 = var$11 + 1 | 0;
                var$5[var$11] = jl_Character_forDigit($rt_udiv($value, var$10), $radix);
                $value = $rt_umod($value, var$10);
                var$10 = $rt_udiv(var$10, $radix);
                var$11 = var$6;
            }
        }
    }
    return $this;
},
jl_AbstractStringBuilder_append2 = ($this, $c) => {
    return $this.$insert2($this.$length0, $c);
},
jl_AbstractStringBuilder_insert1 = ($this, $index, $c) => {
    jl_AbstractStringBuilder_insertSpace($this, $index, $index + 1 | 0);
    $this.$buffer.data[$index] = $c;
    return $this;
},
jl_AbstractStringBuilder_insert0 = ($this, $index, $obj) => {
    return $this.$insert0($index, $obj === null ? $rt_s(24) : $obj.$toString());
},
jl_AbstractStringBuilder_ensureCapacity = ($this, $capacity) => {
    let $newLength;
    if ($this.$buffer.data.length >= $capacity)
        return;
    $newLength = $this.$buffer.data.length >= 1073741823 ? 2147483647 : jl_Math_max($capacity, jl_Math_max($this.$buffer.data.length * 2 | 0, 5));
    $this.$buffer = ju_Arrays_copyOf0($this.$buffer, $newLength);
},
jl_AbstractStringBuilder_toString = $this => {
    return jl_String__init_5($this.$buffer, 0, $this.$length0);
},
jl_AbstractStringBuilder_insertSpace = ($this, $start, $end) => {
    let $sz, $i;
    $sz = $this.$length0 - $start | 0;
    $this.$ensureCapacity(($this.$length0 + $end | 0) - $start | 0);
    $i = $sz - 1 | 0;
    while ($i >= 0) {
        $this.$buffer.data[$end + $i | 0] = $this.$buffer.data[$start + $i | 0];
        $i = $i + (-1) | 0;
    }
    $this.$length0 = $this.$length0 + ($end - $start | 0) | 0;
},
jl_Appendable = $rt_classWithoutFields(0),
jl_StringBuilder = $rt_classWithoutFields(jl_AbstractStringBuilder),
jl_StringBuilder__init_1 = ($this, $capacity) => {
    jl_AbstractStringBuilder__init_($this, $capacity);
},
jl_StringBuilder__init_2 = var_0 => {
    let var_1 = new jl_StringBuilder();
    jl_StringBuilder__init_1(var_1, var_0);
    return var_1;
},
jl_StringBuilder__init_0 = $this => {
    jl_AbstractStringBuilder__init_0($this);
},
jl_StringBuilder__init_ = () => {
    let var_0 = new jl_StringBuilder();
    jl_StringBuilder__init_0(var_0);
    return var_0;
},
jl_StringBuilder_append = ($this, $obj) => {
    jl_AbstractStringBuilder_append1($this, $obj);
    return $this;
},
jl_StringBuilder_append1 = ($this, $string) => {
    jl_AbstractStringBuilder_append($this, $string);
    return $this;
},
jl_StringBuilder_append2 = ($this, $value) => {
    jl_AbstractStringBuilder_append0($this, $value);
    return $this;
},
jl_StringBuilder_append0 = ($this, $c) => {
    jl_AbstractStringBuilder_append2($this, $c);
    return $this;
},
jl_StringBuilder_insert1 = ($this, $index, $obj) => {
    jl_AbstractStringBuilder_insert0($this, $index, $obj);
    return $this;
},
jl_StringBuilder_insert3 = ($this, $index, $c) => {
    jl_AbstractStringBuilder_insert1($this, $index, $c);
    return $this;
},
jl_StringBuilder_insert2 = ($this, $index, $string) => {
    jl_AbstractStringBuilder_insert($this, $index, $string);
    return $this;
},
jl_StringBuilder_toString = $this => {
    return jl_AbstractStringBuilder_toString($this);
},
jl_StringBuilder_ensureCapacity = ($this, var$1) => {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
},
jl_StringBuilder_insert0 = ($this, var$1, var$2) => {
    return $this.$insert3(var$1, var$2);
},
jl_StringBuilder_insert = ($this, var$1, var$2) => {
    return $this.$insert4(var$1, var$2);
},
jl_StringBuilder_insert4 = ($this, var$1, var$2) => {
    return $this.$insert5(var$1, var$2);
},
jlr_AnnotatedElement = $rt_classWithoutFields(0);
function ji_PrintStream() {
    let a = this; ji_FilterOutputStream.call(a);
    a.$autoFlush = 0;
    a.$sb = null;
    a.$buffer0 = null;
    a.$charset = null;
}
let ji_PrintStream__init_ = ($this, $out, $autoFlush, $charset) => {
    ji_FilterOutputStream__init_($this, $out);
    $this.$sb = jl_StringBuilder__init_();
    $this.$buffer0 = $rt_createCharArray(32);
    $this.$autoFlush = $autoFlush;
    $this.$charset = $charset;
},
ji_PrintStream__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new ji_PrintStream();
    ji_PrintStream__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
otcic_JsConsolePrintStream = $rt_classWithoutFields(ji_PrintStream),
otcic_JsConsolePrintStream__init_ = $this => {
    ji_PrintStream__init_($this, null, 0, null);
},
otcic_JsConsolePrintStream_println = ($this, $s) => {
    $this.$print($s);
    $this.$print($rt_s(25));
},
otcic_JSStdoutPrintStream = $rt_classWithoutFields(otcic_JsConsolePrintStream),
otcic_JSStdoutPrintStream__init_ = $this => {
    otcic_JsConsolePrintStream__init_($this);
},
otcic_JSStdoutPrintStream__init_0 = () => {
    let var_0 = new otcic_JSStdoutPrintStream();
    otcic_JSStdoutPrintStream__init_(var_0);
    return var_0;
},
otcic_JSStdoutPrintStream_print = ($this, $s) => {
    if ($s === null)
        $s = $rt_s(24);
    $rt_putStdout($rt_ustr($s));
},
jl_Error = $rt_classWithoutFields(jl_Throwable),
jl_Error__init_ = $this => {
    jl_Throwable__init_($this);
},
jl_Error__init_0 = () => {
    let var_0 = new jl_Error();
    jl_Error__init_(var_0);
    return var_0;
},
jl_AssertionError = $rt_classWithoutFields(jl_Error),
jl_AssertionError__init_0 = $this => {
    jl_Error__init_($this);
},
jl_AssertionError__init_ = () => {
    let var_0 = new jl_AssertionError();
    jl_AssertionError__init_0(var_0);
    return var_0;
},
jl_ClassCastException = $rt_classWithoutFields(jl_RuntimeException),
otji_JSWrapper = $rt_classWithoutFields(),
t_Bit = $rt_classWithoutFields(),
t_Bit_isSet = ($x, $pos) => {
    return Long_eq(Long_and($x, Long_shl(Long_fromInt(1), $pos)), Long_ZERO) ? 0 : 1;
},
t_Bit_set = ($x, $pos) => {
    return Long_or($x, Long_shl(Long_fromInt(1), $pos));
},
t_Bit_position = $mask => {
    return 63 - t_Bit_countLeadingZeros($mask) | 0;
},
t_Bit_countOnes = $x => {
    let $count;
    $count = 0;
    while (Long_ne($x, Long_ZERO)) {
        $x = Long_and($x, Long_sub($x, Long_fromInt(1)));
        $count = $count + 1 | 0;
    }
    return $count;
},
t_Bit_countLeadingZeros = $x => {
    let $count, $shift, $y;
    $count = 63;
    $shift = 32;
    while ($shift > 0) {
        $y = Long_shr($x, $shift);
        if (Long_ne($y, Long_ZERO)) {
            $count = $count - $shift | 0;
            $x = $y;
        }
        $shift = $shift >> 1;
    }
    if (Long_eq($x, Long_ZERO))
        $count = $count + 1 | 0;
    return $count;
},
t_Bit_iterator = $bits => {
    return t_Bit$BitIterator__init_0($bits);
},
ju_RandomAccess = $rt_classWithoutFields(0);
function ju_ArrayList() {
    let a = this; ju_AbstractList.call(a);
    a.$array = null;
    a.$size0 = 0;
}
let ju_ArrayList__init_0 = $this => {
    ju_ArrayList__init_($this, 10);
},
ju_ArrayList__init_1 = () => {
    let var_0 = new ju_ArrayList();
    ju_ArrayList__init_0(var_0);
    return var_0;
},
ju_ArrayList__init_ = ($this, $initialCapacity) => {
    ju_AbstractList__init_($this);
    if ($initialCapacity >= 0) {
        $this.$array = $rt_createArray(jl_Object, $initialCapacity);
        return;
    }
    $rt_throw(jl_IllegalArgumentException__init_0());
},
ju_ArrayList__init_2 = var_0 => {
    let var_1 = new ju_ArrayList();
    ju_ArrayList__init_(var_1, var_0);
    return var_1;
},
ju_ArrayList_ensureCapacity = ($this, $minCapacity) => {
    let $newLength;
    if ($this.$array.data.length < $minCapacity) {
        $newLength = $this.$array.data.length >= 1073741823 ? 2147483647 : jl_Math_max($minCapacity, jl_Math_max($this.$array.data.length * 2 | 0, 5));
        $this.$array = ju_Arrays_copyOf($this.$array, $newLength);
    }
},
ju_ArrayList_get = ($this, $index) => {
    ju_ArrayList_checkIndex($this, $index);
    return $this.$array.data[$index];
},
ju_ArrayList_size = $this => {
    return $this.$size0;
},
ju_ArrayList_add = ($this, $element) => {
    let var$2, var$3;
    $this.$ensureCapacity($this.$size0 + 1 | 0);
    var$2 = $this.$array.data;
    var$3 = $this.$size0;
    $this.$size0 = var$3 + 1 | 0;
    var$2[var$3] = $element;
    $this.$modCount = $this.$modCount + 1 | 0;
    return 1;
},
ju_ArrayList_clear = $this => {
    ju_Arrays_fill($this.$array, 0, $this.$size0, null);
    $this.$size0 = 0;
    $this.$modCount = $this.$modCount + 1 | 0;
},
ju_ArrayList_checkIndex = ($this, $index) => {
    if ($index >= 0 && $index < $this.$size0)
        return;
    $rt_throw(jl_IndexOutOfBoundsException__init_0());
},
otp_Platform = $rt_classWithoutFields(),
otp_Platform_clone = var$1 => {
    let copy = new var$1.constructor();
    for (let field in var$1) {
        if (var$1.hasOwnProperty(field)) {
            copy[field] = var$1[field];
        }
    }
    return copy;
},
otp_Platform_getArrayItem = var$1 => {
    return var$1.$meta.item;
},
otp_Platform_getName = $cls => {
    return $rt_str($cls.$meta.name);
},
jnc_Charset = $rt_classWithoutFields(),
jl_String = $rt_classWithoutFields(),
jl_String_EMPTY_CHARS = null,
jl_String_EMPTY = null,
jl_String_CASE_INSENSITIVE_ORDER = null,
jl_String_$callClinit = () => {
    jl_String_$callClinit = $rt_eraseClinit(jl_String);
    jl_String__clinit_();
},
jl_String__init_ = $this => {
    jl_String_$callClinit();
    jl_Object__init_($this);
    $this.$nativeString = "";
},
jl_String__init_6 = () => {
    let var_0 = new jl_String();
    jl_String__init_(var_0);
    return var_0;
},
jl_String__init_0 = ($this, $characters) => {
    let var$2;
    jl_String_$callClinit();
    var$2 = $characters.data;
    jl_Object__init_($this);
    $this.$nativeString = $rt_charArrayToString($characters.data, 0, var$2.length);
},
jl_String__init_3 = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_0(var_1, var_0);
    return var_1;
},
jl_String__init_1 = (var$0, var$1) => {
    var$0.$nativeString = var$1;
},
jl_String__init_4 = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_1(var_1, var_0);
    return var_1;
},
jl_String__init_2 = (var$0, var$1, $offset, $count) => {
    let var$4;
    jl_String_$callClinit();
    var$4 = var$1.data;
    jl_Object__init_(var$0);
    ju_Objects_checkFromIndexSize($offset, $count, var$4.length);
    var$0.$nativeString = $rt_charArrayToString(var$1.data, $offset, $count);
},
jl_String__init_5 = (var_0, var_1, var_2) => {
    let var_3 = new jl_String();
    jl_String__init_2(var_3, var_0, var_1, var_2);
    return var_3;
},
jl_String_charAt = ($this, $index) => {
    if ($index >= 0 && $index < $this.$nativeString.length)
        return $this.$nativeString.charCodeAt($index);
    $rt_throw(jl_StringIndexOutOfBoundsException__init_0());
},
jl_String_length = $this => {
    return $this.$nativeString.length;
},
jl_String_isEmpty = $this => {
    return $this.$nativeString.length ? 0 : 1;
},
jl_String_toString = $this => {
    return $this;
},
jl_String__clinit_ = () => {
    jl_String_EMPTY_CHARS = $rt_createCharArray(0);
    jl_String_EMPTY = jl_String__init_6();
    jl_String_CASE_INSENSITIVE_ORDER = jl_String$_clinit_$lambda$_115_0__init_0();
},
jl_NegativeArraySizeException = $rt_classWithoutFields(jl_RuntimeException),
jl_NegativeArraySizeException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
jl_NegativeArraySizeException__init_0 = () => {
    let var_0 = new jl_NegativeArraySizeException();
    jl_NegativeArraySizeException__init_(var_0);
    return var_0;
},
t_Board$2 = $rt_classWithoutFields(),
t_Board$2_$SwitchMap$ttt$Player = null,
t_Board$2_$callClinit = () => {
    t_Board$2_$callClinit = $rt_eraseClinit(t_Board$2);
    t_Board$2__clinit_();
},
t_Board$2__clinit_ = () => {
    t_Board$2_$SwitchMap$ttt$Player = $rt_createIntArray((t_Player_values()).data.length);
    t_Board$2_$SwitchMap$ttt$Player.data[jl_Enum_ordinal(t_Player_X)] = 1;
    t_Board$2_$SwitchMap$ttt$Player.data[jl_Enum_ordinal(t_Player_O)] = 2;
},
t_Line$Axis = $rt_classWithoutFields(jl_Enum),
t_Line$Axis_X = null,
t_Line$Axis_Y = null,
t_Line$Axis_Z = null,
t_Line$Axis_$VALUES = null,
t_Line$Axis_$callClinit = () => {
    t_Line$Axis_$callClinit = $rt_eraseClinit(t_Line$Axis);
    t_Line$Axis__clinit_();
},
t_Line$Axis_values = () => {
    t_Line$Axis_$callClinit();
    return t_Line$Axis_$VALUES.$clone0();
},
t_Line$Axis__init_0 = ($this, var$1, var$2) => {
    t_Line$Axis_$callClinit();
    jl_Enum__init_($this, var$1, var$2);
},
t_Line$Axis__init_ = (var_0, var_1) => {
    let var_2 = new t_Line$Axis();
    t_Line$Axis__init_0(var_2, var_0, var_1);
    return var_2;
},
t_Line$Axis_$values = () => {
    let var$1, var$2;
    t_Line$Axis_$callClinit();
    var$1 = $rt_createArray(t_Line$Axis, 3);
    var$2 = var$1.data;
    var$2[0] = t_Line$Axis_X;
    var$2[1] = t_Line$Axis_Y;
    var$2[2] = t_Line$Axis_Z;
    return var$1;
};
let t_Line$Axis__clinit_ = () => {
    t_Line$Axis_X = t_Line$Axis__init_($rt_s(26), 0);
    t_Line$Axis_Y = t_Line$Axis__init_($rt_s(27), 1);
    t_Line$Axis_Z = t_Line$Axis__init_($rt_s(28), 2);
    t_Line$Axis_$VALUES = t_Line$Axis_$values();
};
function t_AlphaBeta() {
    let a = this; jl_Object.call(a);
    a.$computer = null;
    a.$deadlineMs = Long_ZERO;
}
let t_AlphaBeta__init_ = $this => {
    jl_Object__init_($this);
    $this.$deadlineMs = Long_create(4294967295, 2147483647);
},
t_AlphaBeta__init_0 = () => {
    let var_0 = new t_AlphaBeta();
    t_AlphaBeta__init_(var_0);
    return var_0;
},
t_AlphaBeta_setTimeBudgetMs = ($this, $timeBudgetMs) => {
    $this.$deadlineMs = Long_add(jl_System_currentTimeMillis(), Long_fromInt(jl_Math_max(0, $timeBudgetMs)));
},
t_AlphaBeta_bestMove = ($this, $state, $comp) => {
    let $ply, $tstate, $iter, $val, $actions, $count, $a, $v, var$11, $index;
    $ply = 4;
    $this.$computer = $comp;
    $tstate = t_Board__init_($state);
    $iter = $state.$emptySquareIterator();
    $val = (-2147483648);
    $actions = ju_ArrayList__init_1();
    $count = $tstate.$numberEmptySquares();
    if ($count < 45)
        $ply = 5;
    if ($count < 35)
        $ply = $ply + 1 | 0;
    if ($count < 20)
        $ply = $ply + 1 | 0;
    while ($iter.$hasNext()) {
        $a = $iter.$next0();
        $tstate.$set2($a, $comp);
        $v = $this.$minValue($tstate, $ply - 1 | 0, (-2147483648), 2147483647);
        $tstate = t_Board__init_($state);
        var$11 = $rt_compare($v, $val);
        if (var$11 > 0) {
            $actions.$clear();
            $actions.$add($a);
        } else if (var$11)
            $v = $val;
        else {
            $actions.$add($a);
            $v = $val;
        }
        $val = $v;
    }
    $index = $actions.$size() * jl_Math_random() | 0;
    if ($actions.$get0($index) === null)
        (jl_System_out()).$println($rt_s(29));
    return $actions.$get0($index);
},
t_AlphaBeta_maxValue = ($this, $state, $depth, $alpha, $beta) => {
    let $tstate, $iter, $maxValue, $action;
    if (Long_ge(jl_System_currentTimeMillis(), $this.$deadlineMs))
        return $state.$evaluate($this.$computer);
    $tstate = t_Board__init_($state);
    $iter = $state.$emptySquareIterator();
    if ($tstate.$isTerminal()) {
        if ($tstate.$playerWon($this.$computer))
            return 2147483647;
        if (!$tstate.$playerWon(t_Player_other($this.$computer)))
            return 0;
        return (-2147483648);
    }
    if (!$depth)
        return $tstate.$evaluate($this.$computer);
    $maxValue = (-2147483648);
    while ($iter.$hasNext()) {
        $action = $iter.$next0();
        $tstate.$set2($action, $this.$computer);
        $maxValue = jl_Math_max($maxValue, $this.$minValue($tstate, $depth - 1 | 0, $alpha, $beta));
        if ($maxValue >= $beta)
            return $maxValue;
        $alpha = jl_Math_max($alpha, $maxValue);
        $tstate = t_Board__init_($state);
    }
    return $maxValue;
},
t_AlphaBeta_minValue = ($this, $state, $depth, $alpha, $beta) => {
    let $tstate, $iter, $minValue, $action;
    if (Long_ge(jl_System_currentTimeMillis(), $this.$deadlineMs))
        return $state.$evaluate($this.$computer);
    $tstate = t_Board__init_($state);
    $iter = $state.$emptySquareIterator();
    if ($tstate.$isTerminal() && $tstate.$playerWon(t_Player_other($this.$computer)))
        return (-2147483648);
    if (!$depth)
        return $tstate.$evaluate($this.$computer);
    $minValue = 2147483647;
    while ($iter.$hasNext()) {
        $action = $iter.$next0();
        $tstate.$set2($action, t_Player_other($this.$computer));
        $minValue = jl_Math_min($minValue, $this.$maxValue($tstate, $depth - 1 | 0, $alpha, $beta));
        if ($minValue <= $alpha)
            return $minValue;
        $beta = jl_Math_min($beta, $minValue);
        $tstate = t_Board__init_($state);
    }
    return $minValue;
},
jl_IllegalArgumentException = $rt_classWithoutFields(jl_RuntimeException),
jl_IllegalArgumentException__init_1 = $this => {
    jl_RuntimeException__init_($this);
},
jl_IllegalArgumentException__init_0 = () => {
    let var_0 = new jl_IllegalArgumentException();
    jl_IllegalArgumentException__init_1(var_0);
    return var_0;
},
jl_IllegalArgumentException__init_2 = ($this, $message) => {
    jl_RuntimeException__init_0($this, $message);
},
jl_IllegalArgumentException__init_ = var_0 => {
    let var_1 = new jl_IllegalArgumentException();
    jl_IllegalArgumentException__init_2(var_1, var_0);
    return var_1;
},
t_Player = $rt_classWithoutFields(jl_Enum),
t_Player_X = null,
t_Player_O = null,
t_Player_$VALUES = null,
t_Player_$callClinit = () => {
    t_Player_$callClinit = $rt_eraseClinit(t_Player);
    t_Player__clinit_();
},
t_Player_values = () => {
    t_Player_$callClinit();
    return t_Player_$VALUES.$clone0();
},
t_Player__init_0 = ($this, var$1, var$2) => {
    t_Player_$callClinit();
    jl_Enum__init_($this, var$1, var$2);
},
t_Player__init_ = (var_0, var_1) => {
    let var_2 = new t_Player();
    t_Player__init_0(var_2, var_0, var_1);
    return var_2;
},
t_Player_other = $this => {
    switch (jl_Enum_ordinal($this)) {
        case 0:
            t_Player_$callClinit();
            return t_Player_O;
        case 1:
            t_Player_$callClinit();
            return t_Player_X;
        default:
    }
    return null;
},
t_Player_valueOf = $c => {
    t_Player_$callClinit();
    switch ($c) {
        case 79:
        case 111:
            break;
        case 88:
        case 120:
            return t_Player_X;
        default:
            return null;
    }
    return t_Player_O;
},
t_Player_toString = $this => {
    switch (jl_Enum_ordinal($this)) {
        case 0:
            break;
        case 1:
            return $rt_s(30);
        default:
            return $rt_s(31);
    }
    return $rt_s(26);
},
t_Player_$values = () => {
    let var$1, var$2;
    t_Player_$callClinit();
    var$1 = $rt_createArray(t_Player, 2);
    var$2 = var$1.data;
    var$2[0] = t_Player_X;
    var$2[1] = t_Player_O;
    return var$1;
},
t_Player__clinit_ = () => {
    t_Player_X = t_Player__init_($rt_s(26), 0);
    t_Player_O = t_Player__init_($rt_s(30), 1);
    t_Player_$VALUES = t_Player_$values();
};
function t_Coordinate() {
    jl_Object.call(this);
    this.$position2 = 0;
}
let t_Coordinate_coordinates = null,
t_Coordinate_$assertionsDisabled = 0,
t_Coordinate_$callClinit = () => {
    t_Coordinate_$callClinit = $rt_eraseClinit(t_Coordinate);
    t_Coordinate__clinit_();
},
t_Coordinate__init_0 = ($this, $position) => {
    t_Coordinate_$callClinit();
    a: {
        jl_Object__init_($this);
        if (!t_Coordinate_$assertionsDisabled) {
            if ($position < 0)
                break a;
            if ($position >= 64)
                break a;
        }
        $this.$position2 = $position;
        return;
    }
    $rt_throw(jl_AssertionError__init_());
},
t_Coordinate__init_ = var_0 => {
    let var_1 = new t_Coordinate();
    t_Coordinate__init_0(var_1, var_0);
    return var_1;
},
t_Coordinate_valueOf = $position => {
    t_Coordinate_$callClinit();
    if (!t_Coordinate_$assertionsDisabled && !($position >= 0 && $position < 64))
        $rt_throw(jl_AssertionError__init_());
    return t_Coordinate_coordinates.data[$position];
},
t_Coordinate_isValid = $position => {
    t_Coordinate_$callClinit();
    return $position >= 0 && $position < 64 ? 1 : 0;
},
t_Coordinate_getX0 = $this => {
    return t_Coordinate_getX($this.$position2);
},
t_Coordinate_getY0 = $this => {
    return t_Coordinate_getY($this.$position2);
},
t_Coordinate_getZ0 = $this => {
    return t_Coordinate_getZ($this.$position2);
},
t_Coordinate_position0 = $this => {
    return $this.$position2;
},
t_Coordinate_position = ($x, $y, $z) => {
    t_Coordinate_$callClinit();
    if (!t_Coordinate_$assertionsDisabled && !($x >= 0 && $x < 4))
        $rt_throw(jl_AssertionError__init_());
    if (!t_Coordinate_$assertionsDisabled && !($y >= 0 && $y < 4))
        $rt_throw(jl_AssertionError__init_());
    if (!t_Coordinate_$assertionsDisabled && !($z >= 0 && $z < 4))
        $rt_throw(jl_AssertionError__init_());
    return (($z * 16 | 0) + ($y * 4 | 0) | 0) + $x | 0;
},
t_Coordinate_getX = $position => {
    t_Coordinate_$callClinit();
    a: {
        if (!t_Coordinate_$assertionsDisabled) {
            if ($position < 0)
                break a;
            if ($position >= 64)
                break a;
        }
        return $position % 4 | 0;
    }
    $rt_throw(jl_AssertionError__init_());
},
t_Coordinate_getY = $position => {
    t_Coordinate_$callClinit();
    if (!t_Coordinate_$assertionsDisabled && !($position >= 0 && $position < 64))
        $rt_throw(jl_AssertionError__init_());
    return ($position / 4 | 0) % 4 | 0;
},
t_Coordinate_getZ = $position => {
    t_Coordinate_$callClinit();
    a: {
        if (!t_Coordinate_$assertionsDisabled) {
            if ($position < 0)
                break a;
            if ($position >= 64)
                break a;
        }
        return $position / 16 | 0;
    }
    $rt_throw(jl_AssertionError__init_());
},
t_Coordinate__clinit_ = () => {
    let $position;
    t_Coordinate_$assertionsDisabled = jl_Class_desiredAssertionStatus($rt_cls(t_Coordinate)) ? 0 : 1;
    t_Coordinate_coordinates = $rt_createArray(t_Coordinate, 64);
    $position = 0;
    while ($position < t_Coordinate_coordinates.data.length) {
        t_Coordinate_coordinates.data[$position] = t_Coordinate__init_($position);
        $position = $position + 1 | 0;
    }
},
t_WebEntry = $rt_classWithoutFields(),
t_WebEntry_$callClinit = () => {
    t_WebEntry_$callClinit = $rt_eraseClinit(t_WebEntry);
    t_WebEntry__clinit_();
},
t_WebEntry_ttt_bestMove = ($boardString, $player) => {
    t_WebEntry_$callClinit();
    return t_TTTEngine_bestMove($boardString, $player);
},
t_WebEntry_ttt_apply = ($boardString, $x, $y, $z, $player) => {
    t_WebEntry_$callClinit();
    return t_TTTEngine_applyMove($boardString, $x, $y, $z, $player);
},
t_WebEntry_ttt_bestMove$exported$0 = (var$1, var$2) => {
    t_WebEntry_$callClinit();
    return otji_JS_wrap(t_WebEntry_ttt_bestMove($rt_str(var$1), var$2));
},
t_WebEntry_ttt_apply$exported$1 = (var$1, var$2, var$3, var$4, var$5) => {
    t_WebEntry_$callClinit();
    return $rt_ustr(t_WebEntry_ttt_apply($rt_str(var$1), var$2, var$3, var$4, var$5));
},
t_WebEntry__clinit_ = () => {
    return;
},
otcir_MethodInfo = $rt_classWithoutFields();
function jl_Class() {
    let a = this; jl_Object.call(a);
    a.$name = null;
    a.$platformClass = null;
}
let jl_Class__init_ = ($this, $platformClass) => {
    let var$2;
    jl_Object__init_($this);
    $this.$platformClass = $platformClass;
    var$2 = $this;
    $platformClass.classObject = var$2;
},
jl_Class__init_0 = var_0 => {
    let var_1 = new jl_Class();
    jl_Class__init_(var_1, var_0);
    return var_1;
},
jl_Class_getClass = $cls => {
    let $result;
    if ($cls === null)
        return null;
    $result = $cls.classObject;
    if ($result === null)
        $result = jl_Class__init_0($cls);
    return $result;
},
jl_Class_getPlatformClass = $this => {
    return $this.$platformClass;
},
jl_Class_getName = $this => {
    if ($this.$name === null)
        $this.$name = otp_Platform_getName($this.$platformClass);
    return $this.$name;
},
jl_Class_getComponentType = $this => {
    return jl_Class_getClass(otp_Platform_getArrayItem($this.$platformClass));
},
jl_Class_desiredAssertionStatus = $this => {
    return 1;
},
ju_Comparator = $rt_classWithoutFields(0),
jl_String$_clinit_$lambda$_115_0 = $rt_classWithoutFields(),
jl_String$_clinit_$lambda$_115_0__init_ = var$0 => {
    jl_Object__init_(var$0);
},
jl_String$_clinit_$lambda$_115_0__init_0 = () => {
    let var_0 = new jl_String$_clinit_$lambda$_115_0();
    jl_String$_clinit_$lambda$_115_0__init_(var_0);
    return var_0;
};
function t_Board() {
    let a = this; jl_Object.call(a);
    a.$x = Long_ZERO;
    a.$o = Long_ZERO;
}
let t_Board_$assertionsDisabled = 0,
t_Board_$callClinit = () => {
    t_Board_$callClinit = $rt_eraseClinit(t_Board);
    t_Board__clinit_();
},
t_Board__init_0 = ($this, $board) => {
    t_Board_$callClinit();
    jl_Object__init_($this);
    $this.$x = $board.$x;
    $this.$o = $board.$o;
},
t_Board__init_ = var_0 => {
    let var_1 = new t_Board();
    t_Board__init_0(var_1, var_0);
    return var_1;
},
t_Board__init_2 = ($this, $s) => {
    let $position, $i, $c, var$5;
    t_Board_$callClinit();
    jl_Object__init_($this);
    $position = 0;
    $this.$x = Long_ZERO;
    $this.$o = Long_ZERO;
    $i = 0;
    while ($i < $s.$length()) {
        a: {
            $c = $s.$charAt($i);
            switch ($c) {
                case 32:
                case 124:
                    break;
                case 46:
                    $position = $position + 1 | 0;
                    break a;
                case 79:
                case 111:
                    var$5 = $position + 1 | 0;
                    t_Player_$callClinit();
                    $this.$set3($position, t_Player_O);
                    $position = var$5;
                    break a;
                case 88:
                case 120:
                    var$5 = $position + 1 | 0;
                    t_Player_$callClinit();
                    $this.$set3($position, t_Player_X);
                    $position = var$5;
                    break a;
                default:
                    $rt_throw(jl_IllegalArgumentException__init_((((jl_StringBuilder__init_()).$append1($rt_s(0))).$append0($c)).$toString()));
            }
        }
        $i = $i + 1 | 0;
    }
},
t_Board__init_1 = var_0 => {
    let var_1 = new t_Board();
    t_Board__init_2(var_1, var_0);
    return var_1;
},
t_Board_isTerminal = $this => {
    t_Player_$callClinit();
    return !$this.$playerWon(t_Player_O) && !$this.$playerWon(t_Player_X) && $this.$numberEmptySquares() ? 0 : 1;
},
t_Board_playerWon = ($this, $p) => {
    let $pPos, $won, var$4, var$5, var$6, $l;
    $pPos = $this.$get1($p);
    $won = 0;
    t_Line_$callClinit();
    var$4 = t_Line_lines.data;
    var$5 = var$4.length;
    var$6 = 0;
    while (var$6 < var$5) {
        $l = var$4[var$6];
        if (Long_eq(Long_and($l.$positions(), $pPos), $l.$positions()))
            $won = 1;
        var$6 = var$6 + 1 | 0;
    }
    return $won;
},
t_Board_numOfOnesInLong = $num => {
    let $count;
    t_Board_$callClinit();
    $count = 0;
    while (Long_ne($num, Long_ZERO)) {
        $num = Long_and($num, Long_sub($num, Long_fromInt(1)));
        $count = $count + 1 | 0;
    }
    return $count;
},
t_Board_evaluate = ($this, $p) => {
    let $pPos, $oPos, $fours, $threes, $twos, $ones, $oFours, $oThrees, $oTwos, $oOnes, var$12, var$13, var$14, $l, $lPos, $tempPPos, $tempOPos, $j, $k, $i;
    $pPos = $this.$get1($p);
    $oPos = $this.$get1(t_Player_other($p));
    $fours = 0;
    $threes = 0;
    $twos = 0;
    $ones = 0;
    $oFours = 0;
    $oThrees = 0;
    $oTwos = 0;
    $oOnes = 0;
    t_Line_$callClinit();
    var$12 = t_Line_lines.data;
    var$13 = var$12.length;
    var$14 = 0;
    while (var$14 < var$13) {
        $l = var$12[var$14];
        $lPos = $l.$positions();
        $tempPPos = Long_and($lPos, $pPos);
        $tempOPos = Long_and($lPos, $oPos);
        $j = t_Board_numOfOnesInLong($tempOPos);
        $k = t_Board_numOfOnesInLong($tempPPos);
        if (!$j) {
            $i = t_Board_numOfOnesInLong($tempPPos);
            if ($i == 1)
                $ones = $ones + 1 | 0;
            else if ($i == 2)
                $twos = $twos + 1 | 0;
            else if ($i == 3)
                $threes = $threes + 1 | 0;
            else if ($i == 4)
                $fours = $fours + 1 | 0;
        }
        if (!$k) {
            $i = t_Board_numOfOnesInLong($tempOPos);
            if ($i == 1)
                $oOnes = $oOnes + 1 | 0;
            else if ($i == 2)
                $oTwos = $oTwos + 1 | 0;
            else if ($i == 3)
                $oThrees = $oThrees + 1 | 0;
            else if ($i == 4)
                $oFours = $oFours + 1 | 0;
        }
        var$14 = var$14 + 1 | 0;
    }
    if (($threes <= 0 ? 0 : 1) | ($fours <= 0 ? 0 : 1))
        return ((($rt_imul($fours, 1000000000) + $threes | 0) + 10000000 | 0) + ($twos * 10000 | 0) | 0) + ($ones * 10 | 0) | 0;
    return (((((((($rt_imul($fours, 100000000) + $threes | 0) + 40000 | 0) + ($twos * 10000 | 0) | 0) + ($ones * 10 | 0) | 0) - $rt_imul($oFours, 100000000) | 0) + $oThrees | 0) + 40000 | 0) + ($oTwos * 10000 | 0) | 0) + ($oOnes * 10 | 0) | 0;
},
t_Board_isEmpty = ($this, $position) => {
    t_Board_$callClinit();
    if (!t_Board_$assertionsDisabled && !t_Coordinate_isValid($position))
        $rt_throw(jl_AssertionError__init_());
    return t_Bit_isSet(Long_or($this.$x, $this.$o), $position) ? 0 : 1;
},
t_Board_isEmpty0 = ($this, $x, $y, $z) => {
    return $this.$isEmpty1(t_Coordinate_position($x, $y, $z));
},
t_Board_numberEmptySquares = $this => {
    return t_Bit_countOnes(Long_xor(Long_or($this.$x, $this.$o), Long_fromInt(-1)));
},
t_Board_get = ($this, $player) => {
    t_Board$2_$callClinit();
    switch (t_Board$2_$SwitchMap$ttt$Player.data[jl_Enum_ordinal($player)]) {
        case 1:
            break;
        case 2:
            return $this.$o;
        default:
            return Long_ZERO;
    }
    return $this.$x;
},
t_Board_get0 = ($this, $position) => {
    t_Board_$callClinit();
    if (!t_Board_$assertionsDisabled && !t_Coordinate_isValid($position))
        $rt_throw(jl_AssertionError__init_());
    if (t_Bit_isSet($this.$x, $position)) {
        t_Player_$callClinit();
        return t_Player_X;
    }
    if (!t_Bit_isSet($this.$o, $position))
        return null;
    t_Player_$callClinit();
    return t_Player_O;
},
t_Board_set = ($this, $position, $player) => {
    t_Board_$callClinit();
    if (!t_Board_$assertionsDisabled && !$this.$isEmpty1($position))
        $rt_throw(jl_AssertionError__init_());
    a: {
        t_Board$2_$callClinit();
        switch (t_Board$2_$SwitchMap$ttt$Player.data[jl_Enum_ordinal($player)]) {
            case 1:
                break;
            case 2:
                $this.$o = t_Bit_set($this.$o, $position);
                break a;
            default:
                break a;
        }
        $this.$x = t_Bit_set($this.$x, $position);
    }
},
t_Board_set1 = ($this, $coordinate, $player) => {
    $this.$set3($coordinate.$position1(), $player);
},
t_Board_set0 = ($this, $x, $y, $z, $player) => {
    $this.$set3(t_Coordinate_position($x, $y, $z), $player);
},
t_Board_emptySquareIterator = $this => {
    return t_Board$EmptySquareIterator__init_0($this);
},
t_Board_access$000 = $x0 => {
    t_Board_$callClinit();
    return $x0.$x;
},
t_Board_access$100 = $x0 => {
    t_Board_$callClinit();
    return $x0.$o;
},
t_Board__clinit_ = () => {
    t_Board_$assertionsDisabled = jl_Class_desiredAssertionStatus($rt_cls(t_Board)) ? 0 : 1;
};
$rt_packages([-1, "java", 0, "lang"
]);
$rt_metadata([jl_Object, "Object", 1, 0, [], 0, 3, 0, 0, ["$getClass0", $rt_wrapFunction0(jl_Object_getClass), "$toString", $rt_wrapFunction0(jl_Object_toString), "$identity", $rt_wrapFunction0(jl_Object_identity), "$clone0", $rt_wrapFunction0(jl_Object_clone)],
jl_Throwable, 0, jl_Object, [], 0, 3, 0, 0, ["$fillInStackTrace", $rt_wrapFunction0(jl_Throwable_fillInStackTrace), "$getMessage", $rt_wrapFunction0(jl_Throwable_getMessage), "$getCause", $rt_wrapFunction0(jl_Throwable_getCause)],
jl_Exception, 0, jl_Throwable, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_Exception__init_), "$_init_0", $rt_wrapFunction1(jl_Exception__init_0)],
jl_RuntimeException, 0, jl_Exception, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_RuntimeException__init_), "$_init_0", $rt_wrapFunction1(jl_RuntimeException__init_0)],
jl_IndexOutOfBoundsException, 0, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_IndexOutOfBoundsException__init_)],
ju_Arrays, 0, jl_Object, [], 0, 3, 0, 0, 0,
jlr_Array, 0, jl_Object, [], 4, 3, 0, 0, 0,
ju_Iterator, 0, jl_Object, [], 3, 3, 0, 0, 0,
t_Bit$BitIterator, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0, ["$_init_6", $rt_wrapFunction1(t_Bit$BitIterator__init_), "$hasNext", $rt_wrapFunction0(t_Bit$BitIterator_hasNext), "$next", $rt_wrapFunction0(t_Bit$BitIterator_next), "$next0", $rt_wrapFunction0(t_Bit$BitIterator_next0)],
jl_System, 0, jl_Object, [], 4, 3, 0, 0, 0,
t_TTTEngine, 0, jl_Object, [], 0, 3, 0, 0, 0,
jl_Iterable, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_Collection, 0, jl_Object, [jl_Iterable], 3, 3, 0, 0, 0,
ju_AbstractCollection, 0, jl_Object, [ju_Collection], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_AbstractCollection__init_)],
ju_SequencedCollection, 0, jl_Object, [ju_Collection], 3, 3, 0, 0, 0,
ju_List, 0, jl_Object, [ju_SequencedCollection], 3, 3, 0, 0, 0,
ju_AbstractList, 0, ju_AbstractCollection, [ju_List], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_AbstractList__init_)],
ji_Serializable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Number, 0, jl_Object, [ji_Serializable], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_Number__init_)],
jl_Comparable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Integer, 0, jl_Number, [jl_Comparable], 0, 3, 0, jl_Integer_$callClinit, ["$_init_1", $rt_wrapFunction1(jl_Integer__init_), "$intValue", $rt_wrapFunction0(jl_Integer_intValue)],
jl_AutoCloseable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_CloneNotSupportedException, 0, jl_Exception, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_CloneNotSupportedException__init_)],
jl_NullPointerException, 0, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_NullPointerException__init_)],
jl_Character, 0, jl_Object, [jl_Comparable], 0, 3, 0, jl_Character_$callClinit, 0,
jl_Enum, 0, jl_Object, [jl_Comparable, ji_Serializable], 1, 3, 0, 0, ["$_init_7", $rt_wrapFunction2(jl_Enum__init_), "$ordinal", $rt_wrapFunction0(jl_Enum_ordinal)],
otci_IntegerUtil, 0, jl_Object, [], 4, 3, 0, 0, 0,
t_Board$EmptySquareIterator, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0, ["$_init_8", $rt_wrapFunction1(t_Board$EmptySquareIterator__init_), "$hasNext", $rt_wrapFunction0(t_Board$EmptySquareIterator_hasNext), "$next1", $rt_wrapFunction0(t_Board$EmptySquareIterator_next0), "$next0", $rt_wrapFunction0(t_Board$EmptySquareIterator_next)],
otcir_FieldInfo, 0, jl_Object, [], 0, 3, 0, 0, 0,
jl_Math, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_Cloneable, 0, jl_Object, [], 3, 3, 0, 0, 0,
otji_JS, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_CharSequence, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_StringIndexOutOfBoundsException, 0, jl_IndexOutOfBoundsException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_StringIndexOutOfBoundsException__init_)],
ji_Closeable, 0, jl_Object, [jl_AutoCloseable], 3, 3, 0, 0, 0,
ji_Flushable, 0, jl_Object, [], 3, 3, 0, 0, 0,
ji_OutputStream, 0, jl_Object, [ji_Closeable, ji_Flushable], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ji_OutputStream__init_)],
ji_FilterOutputStream, 0, ji_OutputStream, [], 0, 3, 0, 0, ["$_init_4", $rt_wrapFunction1(ji_FilterOutputStream__init_)],
otcir_ClassList, 0, jl_Object, [], 0, 3, 0, 0, 0,
ju_Objects, 0, jl_Object, [], 4, 3, 0, 0, 0,
jlr_Type, 0, jl_Object, [], 3, 3, 0, 0, 0,
t_Line, 0, jl_Object, [], 0, 3, 0, t_Line_$callClinit, ["$positions", $rt_wrapFunction0(t_Line_positions)],
jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction0(jl_AbstractStringBuilder__init_0), "$_init_1", $rt_wrapFunction1(jl_AbstractStringBuilder__init_), "$append4", $rt_wrapFunction1(jl_AbstractStringBuilder_append1), "$append5", $rt_wrapFunction1(jl_AbstractStringBuilder_append), "$insert0", $rt_wrapFunction2(jl_AbstractStringBuilder_insert), "$append6", $rt_wrapFunction1(jl_AbstractStringBuilder_append0), "$append3", $rt_wrapFunction2(jl_AbstractStringBuilder_append3),
"$insert1", $rt_wrapFunction3(jl_AbstractStringBuilder_insert2), "$append7", $rt_wrapFunction1(jl_AbstractStringBuilder_append2), "$insert2", $rt_wrapFunction2(jl_AbstractStringBuilder_insert1), "$insert", $rt_wrapFunction2(jl_AbstractStringBuilder_insert0), "$ensureCapacity", $rt_wrapFunction1(jl_AbstractStringBuilder_ensureCapacity), "$toString", $rt_wrapFunction0(jl_AbstractStringBuilder_toString)],
jl_Appendable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 0, 3, 0, 0, ["$_init_1", $rt_wrapFunction1(jl_StringBuilder__init_1), "$_init_", $rt_wrapFunction0(jl_StringBuilder__init_0), "$append", $rt_wrapFunction1(jl_StringBuilder_append), "$append1", $rt_wrapFunction1(jl_StringBuilder_append1), "$append2", $rt_wrapFunction1(jl_StringBuilder_append2), "$append0", $rt_wrapFunction1(jl_StringBuilder_append0), "$insert3", $rt_wrapFunction2(jl_StringBuilder_insert1), "$insert4", $rt_wrapFunction2(jl_StringBuilder_insert3),
"$insert5", $rt_wrapFunction2(jl_StringBuilder_insert2), "$toString", $rt_wrapFunction0(jl_StringBuilder_toString), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuilder_ensureCapacity), "$insert", $rt_wrapFunction2(jl_StringBuilder_insert0), "$insert2", $rt_wrapFunction2(jl_StringBuilder_insert), "$insert0", $rt_wrapFunction2(jl_StringBuilder_insert4)],
jlr_AnnotatedElement, 0, jl_Object, [], 3, 3, 0, 0, 0,
ji_PrintStream, 0, ji_FilterOutputStream, [jl_Appendable], 0, 3, 0, 0, ["$_init_5", $rt_wrapFunction3(ji_PrintStream__init_)],
otcic_JsConsolePrintStream, 0, ji_PrintStream, [], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(otcic_JsConsolePrintStream__init_), "$println", $rt_wrapFunction1(otcic_JsConsolePrintStream_println)],
otcic_JSStdoutPrintStream, 0, otcic_JsConsolePrintStream, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(otcic_JSStdoutPrintStream__init_), "$print", $rt_wrapFunction1(otcic_JSStdoutPrintStream_print)],
jl_Error, 0, jl_Throwable, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_Error__init_)]]);
$rt_metadata([jl_AssertionError, 0, jl_Error, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_AssertionError__init_0)],
jl_ClassCastException, 0, jl_RuntimeException, [], 0, 3, 0, 0, 0,
otji_JSWrapper, 0, jl_Object, [], 4, 3, 0, 0, 0,
t_Bit, 0, jl_Object, [], 0, 3, 0, 0, 0,
ju_RandomAccess, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_ArrayList, 0, ju_AbstractList, [jl_Cloneable, ji_Serializable, ju_RandomAccess], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_ArrayList__init_0), "$_init_1", $rt_wrapFunction1(ju_ArrayList__init_), "$ensureCapacity", $rt_wrapFunction1(ju_ArrayList_ensureCapacity), "$get0", $rt_wrapFunction1(ju_ArrayList_get), "$size", $rt_wrapFunction0(ju_ArrayList_size), "$add", $rt_wrapFunction1(ju_ArrayList_add), "$clear", $rt_wrapFunction0(ju_ArrayList_clear)],
otp_Platform, 0, jl_Object, [], 4, 3, 0, 0, 0,
jnc_Charset, 0, jl_Object, [jl_Comparable], 1, 3, 0, 0, 0,
jl_String, 0, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 0, 3, 0, jl_String_$callClinit, ["$_init_", $rt_wrapFunction0(jl_String__init_), "$_init_2", $rt_wrapFunction1(jl_String__init_0), "$_init_10", $rt_wrapFunction1(jl_String__init_1), "$_init_3", $rt_wrapFunction3(jl_String__init_2), "$charAt", $rt_wrapFunction1(jl_String_charAt), "$length", $rt_wrapFunction0(jl_String_length), "$isEmpty0", $rt_wrapFunction0(jl_String_isEmpty), "$toString", $rt_wrapFunction0(jl_String_toString)],
jl_NegativeArraySizeException, 0, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_NegativeArraySizeException__init_)],
t_Board$2, 0, jl_Object, [], 32, 0, 0, t_Board$2_$callClinit, 0,
t_Line$Axis, 0, jl_Enum, [], 12, 0, 0, t_Line$Axis_$callClinit, 0,
t_AlphaBeta, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(t_AlphaBeta__init_), "$setTimeBudgetMs", $rt_wrapFunction1(t_AlphaBeta_setTimeBudgetMs), "$bestMove", $rt_wrapFunction2(t_AlphaBeta_bestMove), "$maxValue", $rt_wrapFunction4(t_AlphaBeta_maxValue), "$minValue", $rt_wrapFunction4(t_AlphaBeta_minValue)],
jl_IllegalArgumentException, 0, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_IllegalArgumentException__init_1), "$_init_0", $rt_wrapFunction1(jl_IllegalArgumentException__init_2)],
t_Player, 0, jl_Enum, [], 12, 3, 0, t_Player_$callClinit, ["$other", $rt_wrapFunction0(t_Player_other), "$toString", $rt_wrapFunction0(t_Player_toString)],
t_Coordinate, 0, jl_Object, [], 0, 3, 0, t_Coordinate_$callClinit, ["$getX", $rt_wrapFunction0(t_Coordinate_getX0), "$getY", $rt_wrapFunction0(t_Coordinate_getY0), "$getZ", $rt_wrapFunction0(t_Coordinate_getZ0), "$position1", $rt_wrapFunction0(t_Coordinate_position0)],
t_WebEntry, 0, jl_Object, [], 0, 3, 0, t_WebEntry_$callClinit, 0,
otcir_MethodInfo, 0, jl_Object, [], 0, 3, 0, 0, 0,
jl_Class, 0, jl_Object, [jlr_AnnotatedElement, jlr_Type], 4, 3, 0, 0, ["$getPlatformClass", $rt_wrapFunction0(jl_Class_getPlatformClass), "$getName", $rt_wrapFunction0(jl_Class_getName), "$getComponentType", $rt_wrapFunction0(jl_Class_getComponentType), "$desiredAssertionStatus", $rt_wrapFunction0(jl_Class_desiredAssertionStatus)],
ju_Comparator, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_String$_clinit_$lambda$_115_0, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_String$_clinit_$lambda$_115_0__init_)],
t_Board, 0, jl_Object, [], 0, 3, 0, t_Board_$callClinit, ["$_init_8", $rt_wrapFunction1(t_Board__init_0), "$_init_0", $rt_wrapFunction1(t_Board__init_2), "$isTerminal", $rt_wrapFunction0(t_Board_isTerminal), "$playerWon", $rt_wrapFunction1(t_Board_playerWon), "$evaluate", $rt_wrapFunction1(t_Board_evaluate), "$isEmpty1", $rt_wrapFunction1(t_Board_isEmpty), "$isEmpty", $rt_wrapFunction3(t_Board_isEmpty0), "$numberEmptySquares", $rt_wrapFunction0(t_Board_numberEmptySquares), "$get1", $rt_wrapFunction1(t_Board_get),
"$get", $rt_wrapFunction1(t_Board_get0), "$set3", $rt_wrapFunction2(t_Board_set), "$set2", $rt_wrapFunction2(t_Board_set1), "$set", $rt_wrapFunction4(t_Board_set0), "$emptySquareIterator", $rt_wrapFunction0(t_Board_emptySquareIterator)]]);
let $rt_charArrayCls = $rt_arraycls($rt_charcls),
$rt_intArrayCls = $rt_arraycls($rt_intcls);
$rt_stringPool(["Invalid player: ", "Cell is not empty at (", ",", ")", "0", "Straight line: ", "Column: X = ", " Z = ", "Pillar: X = ", " Y = ", "???: row = ", " col = ", "Row: Y = ", "Forward diagonal: ", "XZ-Plane Y = ", "XY-Plane Z = ", "??-Plane (", "YZ-Plane X = ", "Main diagonal", "Reverse diagonal: ", "Main diagonal: reverse", "X-Axis", "Y-Axis", "Z-Axis", "null", "\n", "X", "Y", "Z", "RETURNING A NULL", "O", "."]);
jl_String.prototype.toString = function() {
    return $rt_ustr(this);
};
jl_String.prototype.valueOf = jl_String.prototype.toString;
jl_Object.prototype.toString = function() {
    return $rt_ustr(jl_Object_toString(this));
};
jl_Object.prototype.__teavm_class__ = function() {
    return $dbg_class(this);
};
let $rt_jso_marker = Symbol('jsoClass');
(() => {
    let c;
})();
$rt_exports.ttt_bestMove = t_WebEntry_ttt_bestMove$exported$0;
$rt_exports.ttt_apply = t_WebEntry_ttt_apply$exported$1;
}));

//# sourceMappingURL=app.js.map
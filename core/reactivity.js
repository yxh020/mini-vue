export class Dep {
    constructor(value) {
        this._val = value
        this.effects = new Set()
    }

    get value() {
        this.depend()
        return this._val
    }

    set value(val) {
        this._val = val
        this.notice()
    }

    // 收集依赖
    depend() {
        if (currentEffect) {
            this.effects.add(currentEffect)
        }
    }

    // 触发依赖
    notice() {
        this.effects.forEach((effect) => {
            effect()
        })
    }
}

let currentEffect = null;
export function effectWatch(fn) {
    currentEffect = fn
    fn()
    currentEffect = null
}

const targetsMap = new Map()
export function reactive(raw) {
    return new Proxy(raw, {
        get(target, key) {
            let dep = getDep(target,key)
            dep.depend()
            return Reflect.get(target, key)
        },
        set(target, key, value) {
            let dep = getDep(target,key)
            const result = Reflect.set(target, key, value)
            dep.notice()
            return result
        }
    })
}

function getDep(raw,key) {
    let depsMap = targetsMap.get(raw)
    if (!depsMap) {
        depsMap = new Map()
        targetsMap.set(raw, depsMap)
    }

    let dep = depsMap.get(key)
    if (!dep) {
        dep = new Dep()
        depsMap.set(key, dep)
    }
    return dep
}
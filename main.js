//  import { ref , effect} from './node_modules/@vue/reactivity/dist/reactivity.esm-browser.js'

//  const a = ref(10)
//  let b = 0

//  effect(()=>{
//     b = a.value + 10
//     console.log(b);
//  })

//  a.value = 20
import { Dep,effectWatch ,reactive} from './core/index.js'

// const a = new Dep(10)

// let b = 0

// effectWatch(()=>{
//     b = a.value + 10
//     console.log(b);
// })

// a.value = 20

const user = reactive({
    age: 30
})
let b = 0
effectWatch(()=>{
    b = user.age + 10
    console.log('b',b);
})
user.age = 50
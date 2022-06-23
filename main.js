// import {ref ,effect} from './node_modules/@vue/reactivity/dist/reactivity.esm-browser.js'

// const a = ref(10)
// let b

// effect(()  => {
//     b = a.value + 10
//     console.log(b);
// })

// a.value = 20

// 自己实现ref
import {Dep, effectWatch, reactive} from './core/index.js'

// const a = new Dep(10)
// let b = 0

// effectWatch(() => {
//     b = a.value + 10
//     // 优化进Class内
//     // a.depend()
//     console.log(b)
// })
// a.value = 50
// a.notice()

// 实现reactive
// const user = reactive({
//     age: 10
// })

// effectWatch(() => {
//     let nextAge = user.age + 2
//     console.log(nextAge)
// })
// user.age ++ 

// 视图效果
// const obj = reactive({
//     content: 1
// })
// effectWatch(()=>{
//     let App = document.querySelector('#app')
//     App.textContent = ''
//     let element = document.createElement('div')
//     const text = document.createTextNode('你好')
//     const text1 = document.createTextNode(obj.content)
//     element.append(text)
//     element.append(text1)
//     App.append(element)
// })
// window.obj = obj

// 模仿vue
// const App = {
//     render(context) {
//         // 优化点，每次更新，每个节点都要更新；不支持跨平台
//         effectWatch(()=>{
//             const App = document.querySelector('#app')
//             App.textContent = ''
//             const element = document.createElement('div')
//             const text = document.createTextNode('你好')
//             const text1 = document.createTextNode(context.obj.content)
//             element.append(text)
//             element.append(text1)
//             App.append(element)
//         })
//     },
//     setup () {
//         const obj = reactive({
//             content: 1
//         })
//         window.obj = obj
//         return {
//             obj
//         }
//     }
// }
// App.render(App.setup())
import {createApp} from './core/index.js'
import App from './App.js'
createApp(App).mount(document.querySelector('#app'))
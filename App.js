import {reactive , h} from './core/index.js'
window.h = h 
export default {
    render(context) {
            // 抽离effectWatch和APP清空和添加children
            // const element = document.createElement('div')
            // const text = document.createTextNode('你好')
            // const text1 = document.createTextNode(context.obj.content)
            // element.append(text)
            // element.append(text1)
            // return element
            
            // 使用虚拟节点
            // return h('div',{id:'foo', class:'fook'},[
            //     h('p',{}, '你好'),
            //     h('p',{}, String(context.obj.content)),
            // ])
            // return h('div',{},'网不好')
            // 1.test -- tag
            // return h(context.obj.tag,{}, '1')
            // 2.test --props 1 add
            // return h('div',context.obj.props, '')
            // 3.test --props 2 romve
            // return h('div',context.obj.props, '')
            // 4.test childreb new string <-> old string
            // return h('div', {}, context.obj.children)
            // 5.test childreb new string <-> old array
            // return h('div', {}, context.obj.children)
            // 6.test childreb new array <-> old array
            return h('div', {}, context.obj.children)

    },
    setup () {
        const obj = reactive({
            content: 1,
            tag:'div',
            props: {
                a:'a',
                b:'bb'
    
            },
            // children:'aaa'
            children:[
                h('p',{}, '1'),
                h('p',{}, '2')
            ]
        })
        window.obj = obj
        return {
            obj
        }
    }
}
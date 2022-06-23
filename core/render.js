
function createElement(tag) {
    return document.createElement(tag)
}

function pathProps (el, key, prevValue,nextValue) {
    if (nextValue === null) {
        el.removeAttribute(key)
    } else {
        el.setAttribute(key, nextValue)
    }
    
}

function insert(el, parent) {
    parent.append(el)
}
function createTextNode(text) {
    return document.createTextNode(text)
}
function removeElement(el, parent) {
    parent.removeChild(el)
}
export function mountElement (vnode,container) {
    const { tag ,props,children } = vnode
    // 处理tag
    const el = (vnode.el = createElement(tag))
    for (const key in props) {
        let val = props[key]
        // 添加props
        pathProps(el ,key, null, val)
    }
    // 处理children(分为字符串和数组)
    if (typeof children === 'string') {
        insert(createTextNode(children),el)
    } else if(Array.isArray(children)) {
        children.forEach(v=>{
            mountElement(v, el)
        })
    }
    // 容器添加元素
    insert(el, container)
}


// n1 -oldNode
// n2 -newNode
// 简单实现，缺点:tag变化时，props和children会被清空;都为数组时，只考虑了简单情况，比如长度相等，内容顺序有变没有考虑
export function diff(n1, n2) {
    const el = (n2.el = n1.el)
    //tag
    if(n1.tag !== n2.tag) {
        n1.el.replaceWith(createElement(n2.tag))
    } else {
        // props
        const newProps = n2.props
        const oldeProps = n1.props
        
        if(newProps) {
            for (const key in newProps) {
                // 全新的属性，添加
                if(newProps[key] !== oldeProps[key]) {
                    pathProps(el,key,oldeProps[key],newProps[key])
                }
            }
        }
        if (oldeProps){
            for (const key in oldeProps) {
                if(!(key in newProps)) {
                    pathProps(el,key,oldeProps[key], null)
                }
            }
        }

        const newChildren = n2.children
        const oldChildren = n1.children
        if (typeof newChildren === 'string')  {
            if(typeof oldChildren === 'string') {
                // 新老值都为string
                if (newChildren !== oldChildren) {
                    // 替换内容
                    el.innerText = newChildren
                }
                // 老值为数组
            } else if (Array.isArray(oldChildren)) {
                    //删除老数组内容，替换内容
                    el.innerText = newChildren
            }
        } else if(Array.isArray(newChildren)) {
            //老值为string,新值为array
            if(typeof oldChildren === 'string') {
                el.innerText = ''
                newChildren.forEach(v => {
                    mountElement(v, el)
                })
            } else if (Array.isArray(oldChildren)) {
                // 都为数组

                const length = Math.min(newChildren.length, oldChildren.length)
                for(let i=0; i<length; i++) {
                    const newVnode = newChildren[i]
                    const oldVnode = oldChildren[i]
                    // 长度相等，依次对比
                    diff(oldVnode, newVnode)
                }
                // 新的比老的多
                if (newChildren.length > length) {
                    for(let i=length; i<newChildren.length; i++) {
                        const vnode = newChildren[i]
                        // 添加新的即可
                        mountElement(vnode, el)
                    }
                }
                // 老的比新的多
                if (oldChildren.length > length) {
                    for(let i=length; i<oldChildren.length; i++) {
                        const vnode = oldChildren[i]
                        // 添加新的即可
                        removeElement(vnode.el, el)
                    }
                }
            }
        }
    }
}
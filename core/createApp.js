import {effectWatch} from './reactivity.js'
import {diff, mountElement} from './render.js'
export function createApp (rootComponent) {
    return {
        mount (rootContainer) {
            const setupResult = rootComponent.setup()
            let prevSubTree;
            let isMounted = false
            // 之前是render里包含effectWatch
            // rootComponent.render(setupResult)
            // effectWatch里包含render也会触发依赖
            effectWatch(() => {
                if (!isMounted) {
                    isMounted = true
                    rootContainer.textContent = ''
                    const subTree = rootComponent.render(setupResult)
                    prevSubTree = subTree
                    mountElement(subTree,rootContainer)
                    // rootContainer.append(subTree)
                } else {
                    const subTree = rootComponent.render(setupResult)
                    console.log('old',prevSubTree);
                    console.log('new', subTree);
                    diff(prevSubTree,subTree)
                    prevSubTree = subTree
                }
                // rootContainer.textContent = ''
                // const subTree = rootComponent.render(setupResult)
                // mountElement(subTree,rootContainer)
            })
        }
    }

}
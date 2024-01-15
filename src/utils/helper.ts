/**
 * 根据组件名寻找指定子组件
 * @param context vue实例上下文
 * @param componentName 寻找组件名
 */
export function findComponentsDownward<T extends Loni.Vue>(context: Loni.Vue, componentName: string) {
    return context.$children.reduce((components, child) => {
        if(child.$options.name === componentName) {
            components.push(child);
        }
        const foundChildren = findComponentsDownward(child, componentName) as Loni.Vue[];
        return components.concat(foundChildren);
    }, [] as Loni.Vue[]) as T[];
}

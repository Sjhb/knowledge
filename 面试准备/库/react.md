### 顶层API

简单来说就是一些静态方法和属性

- Component,PureComponent：React.PureComponent相对于React.Component实现了shouldComponentUpdate，浅层对比prop和state；
- memo
    - 高阶组件，如果组件传入相同props渲染相同结果，就可以使用memo来提升性能，memo包裹的组件在props相同的情况下会跳过渲染组件并复用最近一次的渲染结果。
    - 默认浅层对比，可以传入自定义比较函数`React.memo(MyComponent, areEqual)`
    - 如果包裹函数组件，且其实现中拥有 useState，useReducer 或 useContext 的 Hook，当 context 发生变化时，它仍会重新渲染；
- createElement：创建并返回指定类型的新React元素（div、React组件或者 React fragment）
- cloneElement：以 element 元素为样板克隆并返回新的 React 元素，几乎等同于`<element.type {...element.props} {...props}>{children}</element.type>`
- isValidElement: 验证对象是否为 React 元素，返回值为 true 或 false。
- React.children:
    - React.Children.map: 在 children 里的每个直接子节点上调用一个函数，并将 this 设置为 thisArg。如果 children 是一个数组，它将被遍历并为数组中的每个子节点调用该函数。
    - React.Children.forEach: 与 React.Children.map() 类似，但它不会返回一个数组；
    - React.Children.count: 统计数量；
    - React.Children.only： 验证 children 是否只有一个子节点（一个 React 元素），如果有则返回它，否则此方法会抛出错误；
    - React.Children.toArray： 将 children 这个复杂的数据结构以数组的方式扁平展开并返回，并为每个子节点分配一个 key
- Fragment： 简写`<></>`,不额外创建 DOM 元素的情况下，让 render() 方法中返回多个元素
- createRef: 创建一个能够通过 ref 属性附加到 React 元素的 ref
- forwardRef: 创建一个React组件,这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中,以下两种场景中特别有用
    - 转发 refs 到 DOM 组件
    - 在高阶组件中转发 refs
    - React.forwardRef 接受渲染函数作为参数。React 将使用 props 和 ref 作为参数来调用此函数。此函数应返回 React 节点
    ```javascript
        const FancyButton = React.forwardRef((props, ref) => (
            <button ref={ref} className="FancyButton">
                {props.children}
            </button>
        ));

        // You can now get a ref directly to the DOM button:
        const ref = React.createRef();
        <FancyButton ref={ref}>Click me!</FancyButton>;
    ```
- lazy: 定义一个动态加载的组件,有助于缩减 bundle 的体积，并延迟加载在初次渲染时未用到的组件
- Suspense: 可以指定加载指示器,就是如果子组件是懒加载的，在组件加载完毕之前可以用类似于`<Spinner />`这样的函数暂时显示，
    ```javascript
    // 该组件是动态加载的
    const OtherComponent = React.lazy(() => import('./OtherComponent'));
    function MyComponent() {
        return (
            // 显示 <Spinner> 组件直至 OtherComponent 加载完成
            <React.Suspense fallback={<Spinner />}>
            <div>
                <OtherComponent />
            </div>
            </React.Suspense>
        );
    }
    ```
- 

```javascript
import {
    
    
    , // 
} from 'react'
```
#### fiber

### hooks

常用： useState、useMemo、useEffect、useCallback、useContext、useRef

不常用： useImperativeHandle、useLayoutEffect（在所有的 DOM 变更之后同步调用 effect）、useDebugValue（用于在 React 开发者工具中显示自定义 hook 的标签）

#### 自定义hooks

#### hooks原理
#### 自定义hooks
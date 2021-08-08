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

#### 函数式组件和class组件之间的区别

- 函数式组件是纯函数，class组件需要继承React.Component或者React.PureComponent并实现render方法;
- 函数式组件无声明周期钩子，生命周期钩子继承自React.Component;
- 获取props的方式不同：函数式组件通过参数，class组件则通过this.props;
- 函数式组件内部比较简单，没有内部状态，而class组件则通过state保存内容状态;
- class 组件内部可以定义更多的方法在实例上，但是函数式组件无法定义；
- ref可以获取到class组件实例，但是函数式组件获取不到；

#### 生命周期

- constructor
- getDefaultProps(React.createClass需要使用getDefaultProps设置默认props，es6可以直接使用constructor)
- getInitialState(React.createClass需要使用getInitialState初始化state，es6可以直接使用constructor)
- componentWillMount
- render
- componentDidMount
- componentWillReceiveProps
- componentWillUpdate
- render
- compoentDidUpdate
- componentWillUnmount

> 服务端渲染时请求一定要放在componentDidMount中执行，因为服务端渲染就是渲染dom结构，而渲染前的ComponentWillMount是在服务端执行的，这里发送请求可能会出现错误，例如fetch

- getDerivedStateFromProps：
    - componentWillReceiveProps导致组件状态变得不可预测，另一方面也会增加组件的重绘次数。
    - 在 componentWillReceiveProps 中，我们一般会做以下两件事，一是根据 props 来更新 state，二是触发一些回调，如动画或页面跳转等。

        - 在老版本的 React 中，这两件事我们都需要在 componentWillReceiveProps 中去做。
        - 而在新版本中，官方将更新 state 与触发回调重新分配到了 getDerivedStateFromProps 与 componentDidUpdate 中，使得组件整体的更新逻辑更为清晰。而且在 getDerivedStateFromProps 中还禁止了组件去访问 this.props，强制让开发者去比较 nextProps 与 prevState 中的值，以确保当开发者用到 getDerivedStateFromProps 这个生命周期函数时，就是在根据当前的 props 来更新组件的 state，而不是去做其他一些让组件自身状态变得更加不可预测的事情。
    - 执行时机： getDerivedStateFromProps 会在每次组件被重新渲染前被调用, 这意味着无论是父组件的更新, props 的变化, 或是组件内部执行了 setState(), 它都会被调用.

- getSnapshotBeforeUpdate(prevProps, prevState)： 代替componentWillUpdate
    - 在 React 开启异步渲染模式后，在 render 阶段读取到的 DOM 元素状态并不总是和 commit 阶段相同，这就导致在componentDidUpdate 中使用 componentWillUpdate 中读取到的 DOM 元素状态是不安全的，因为这时的值很有可能已经失效了
    - getSnapshotBeforeUpdate 会在最终的 render 之前被调用，也就是说在 getSnapshotBeforeUpdate 中读取到的 DOM 元素状态是可以保证与 componentDidUpdate 中一致的。此生命周期返回的任何值都将作为参数传递给componentDidUpdate（）。

#### 事件

react实现自己的一套事件机制（中间做一层可以更方便react做优化、跨端（有些浏览器没有完整的dom事件模型）、性能），而且事件对象是共用的（在根节点处监听并处理所有的事件），所以我们在处理事件里的参数，且是在异步操作里处理，一定要提前取出自己想要的值
#### fiber

- 为了使react渲染的过程中可以被中断，可以将控制权交还给浏览器，浏览器空闲时恢复渲染，场景：计算量比较大的dom计算，就不会显得卡顿，而是一帧一帧有规律地执行任务。

### hooks

常用： useState、useMemo、useEffect、useCallback、useContext、useRef

不常用： useImperativeHandle、useLayoutEffect（在所有的 DOM 变更之后同步调用 effect）、useDebugValue（用于在 React 开发者工具中显示自定义 hook 的标签）

#### 自定义hooks

#### hooks原理
#### 自定义hooks

#### 性能优化

- 减少不必要的渲染：
    - shouldComponentUpdate，可配合immutable-js使用，`let a = immutable.formJS({a: 1，b: {1;1}}); let b = a.set('a', 2); a.b === b.b // true`,immutable每次更改都产生新的对象，父组件像自组件传递immutable独享属性可以有效防止子组件更改props，另外杜宇其它引用属性，引用关系还在，就可以保证子组件在shouldComponentUpdate中能够判断是否需要更新（pureComponent浅比较）
    - render函数中尽量不使用箭头函数和bind方法，因为这俩每次都声称新的函数，导致自组件渲染
    - 使用工具排查不必要的渲染,例如why-did-you-render
    - 
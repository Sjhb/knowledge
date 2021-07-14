### flux 架构实现

### 实现原理

闭包，通过dipatch一个action改变state，可以describe 状态的改变

#### react-redux

`Provider`基于`React.Context`实现的，`React.Context`用法：

```javascript
import React from 'react';
import ReactDom from 'react-dom';
const context = React.createContext();

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}
class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = context;
  render() {
    return <div>{this.context}</div>;
  }
}
class App extends React.Component {
  state={value: 'dark'}
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <context.Provider value={this.state.value}>
      <button onClick={() => this.setState({ value: this.state.value ==='dark'?'light':'dark'})}>onClick</button>
        <Toolbar />
      </context.Provider>
    );
  }
}
ReactDom.render(<App />, document.getElementById('app'));
```

`connect`： 使用：`connect(mapStateToProps, mapDispatchToProps)(TempComponent);`,实现原理，connect是个HOC，内容订阅了`Provider`提供的`Store`，如果`Store`更新就重新渲染`WrappedComponent`

### 一些问题

- `dispatcha(action)` 返回什么？一个action；
- `createStore`为什么会默认dispatch一个type为`@@redux/INIT`的action？获取各个模块的初始值；
- `Provider`是什么实现的，怎么知道store更新了？`Provider`是一个组件，基于`React.Context`,`Context`的`value`设置为store，然后`describe`store，触发`Context`值的变更；
- redux 是一个闭包


### redux-thunk 解决异步问题

redux-thunk是个中间件，源码：
```javascript
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```
- redux-thunk是一个中间件，它能使redux的disptach能够接收函数；
- 使用redux-thunk时问什么Promise的`catch`会捕获页面渲染错误（为什么使用`.then(resolveCb, rejectCb)`方式）？
    - `Promise.catch`不仅能捕获Promise内部发生的错误，还能捕获`Promise.then`中发生的错误，包括ui组件上的错误（dispatch =》store.decribe =》组件forceUpdate），而一般来讲我们希望捕获请求本身发生的错误，而不希望捕获组件上发生的错误

### mobx

概念：action、observable、computed

特点：通过mobx提供的api将原属性变为可监听的（基于Proxy）,有很多类似于vue的功能，例如autorun、computed，适合一些例如编辑器这样需要频繁更改状态且需要对状态进行各种监听、处理的项目
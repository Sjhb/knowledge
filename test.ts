
function A (a,b) {
    console.log(this.a)
    console.log(a)
    console.log(b)
}
let a = {
    fun: A,
    a:2,
    fun1: (a) => {},
    fun2: () => {}
}
a.fun1 = a.fun.bind({a:4}, 3)
a.fun2 = a.fun1.bind({a:10},99)
a.fun(1,2)
a.fun1(4);
a.fun2();

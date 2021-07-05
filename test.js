
let getPromise = (arg) => {
    return new Promise((res) => {
        setTimeout(() => {
            res(arg);
        }, 100)
    })
}
function * test () {
    let a = yield getPromise(1);
    let a1 = 0;
    let b = yield getPromise(a + a1 + 1);
    yield b++;
    return b;
}
let res = test();
res.next().value.then(e => {
    console.log(e)
    return res.next(e).value;
}).then((e) => {
    console.log(res.next(e))
    console.log(res.next())
})
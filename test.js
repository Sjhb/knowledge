let a = new Promise((a,b) => {
    setTimeout(() => {
        a();
    }, 1000)
})
a.catch(e => console.log(e)).then(() => {
    return Promise.reject(2)
})
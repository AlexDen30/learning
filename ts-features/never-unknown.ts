// the function that never returns a value
const neverReturn = (): never => {
    throw new Error()
}

function neverReturn1(): never {
    while (true) {
        // ...
    }
}

// unknown it’s not legal to do anything with an unknown value:
function f2(a: unknown) {
    //a.b();
}

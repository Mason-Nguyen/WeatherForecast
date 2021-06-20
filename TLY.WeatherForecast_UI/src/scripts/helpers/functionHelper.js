export const composeFunc = (...funcs) => (agr) =>
    funcs.reduce(
        (value, f) => f(value),
        agr
    )

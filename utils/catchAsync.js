

module.exports = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}

// This function recieves a function and return a function.
// The function it returns is the same as the function it recieves, 
// but it catches any errors and passes them to next
// function ue(func){
//     return (req, res, next) => {
//         func(req, res, next).catch(next)
//     }
// }
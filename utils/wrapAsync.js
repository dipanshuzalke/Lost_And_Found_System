// module.exports = (fn) => {
//     console.log(typeof fn);
//     return (req, res, next) => {
//         fn(req, res, next).catch(next); 
//     };
// };

// module.exports = (fn) => {
//     if (typeof fn !== 'function') {
//       console.error("fn is not a function for the route:", fn); // Output the route or fn
//     } else {
//       console.log("fn is a valid function");
//     }
//     return (req, res, next) => {
//       fn(req, res, next).catch(next);
//     };
//   };
  
// wrapAsync.js
module.exports = (fn) => {
    return (req, res, next) => {
      console.log(`[DEBUG]: Checking if fn is valid for route: ${req.method} ${req.originalUrl}`);
      if (typeof fn !== 'function') {
        console.error(`[ERROR]: fn is not a function for route: ${req.method} ${req.originalUrl}`);
      } else {
        console.log(`[INFO]: fn is a valid function for route: ${req.method} ${req.originalUrl}`);
      }
      fn(req, res, next).catch(next);
    };
  };
  
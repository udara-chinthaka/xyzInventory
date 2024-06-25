const express = require("express");
var Ddos = require("ddos");
const bodyParser = require("body-parser");
var config = require("./common/config.json");
var swaggerUI = require("swagger-ui-express");
var swaggerDoc = require("./swagger.json");
var ddos = new Ddos({ burst: 5, limit: 10 });
const serverless = require("serverless-http");
const app = express();
const port = process.env.PORT || config.port;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // allow origin
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,Content-Type,Accept, Authorization, X-Requested-With"
  ); // allow headers
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "DELETE, HEAD, GET, OPTIONS, POST, PUT,PATCH"
    ); // allow all type of request
    return res.status(200).json({});
  }
  next();
});

const hostedURL = " https://xyzinventory.netlify.app/api";
// middleware
app.use(bodyParser.json({ limit: "50mb" })); // maximum request body size and pass body in json format
app.use(ddos.express);

const userController = require("./controller/userController");
const loginController = require("./controller/loginController");
const productController = require("./controller/productController");
const orderController = require("./controller/orderController");
// swagger configuration
app.use("/apidocs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// app.use('/api/user', userController);
// app.use('/api/login', loginController);
// app.use('/api/product', productController);
// app.use('/api/order', orderController);

app.use(hostedURL + "/user", userController);
app.use(hostedURL + "/login", loginController);
app.use(hostedURL + "/product", productController);
app.use(hostedURL + "/order", orderController);

module.exports.handler = serverless(app);

// app.listen(port, () => {
//   console.log("XYZ Inventory server started on port " + port);
// });

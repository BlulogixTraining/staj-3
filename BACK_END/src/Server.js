const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");
const UserRoute = require("./routes/user.route.js");
const RuleRoute = require("./routes/rule.route");
const productRoutes = require('./routes/products.route.js');
const subscriptionRoutes = require('./routes/subscription.route.js');
const resourceRoutes = require("./routes/resource.route.js");
const userSubscriptionsRoutes = require('./routes/usersubscription.route');
const paymentMethodRoutes = require('./routes/payment.route.js');

const connectDB = require("./config/db.js")
const port = 3001;


require("dotenv").config();
app.use("/swagger",swaggerUi.serve, swaggerUi.setup(swaggerDoc));


//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/users", UserRoute);
app.use("/rules", RuleRoute);
app.use('/subscriptions', subscriptionRoutes);
app.use('/products', productRoutes);
app.use("/resources", resourceRoutes);
app.use('/user-subscriptions', userSubscriptionsRoutes);
app.use("/payment", paymentMethodRoutes);

try {
  connectDB();
  app.listen(port, () => {
    console.log(`App started on port ${port}`);
  });
} catch (error) {
  console.log(error);
}
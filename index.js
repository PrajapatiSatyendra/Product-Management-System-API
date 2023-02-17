const express=require('express');
const mongoose=require('mongoose');
const ProductsRoutes=require('./routes/products');
const authRoutes=require('./routes/auth');
require("dotenv").config();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger');
mongoose.set('strictQuery', true)




const app=express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/product',ProductsRoutes);
app.use('/api/auth',authRoutes);
app.use((error,req,res,next)=>{
    console.log(error);
    const status=error.statusCode ||500;
    const message=error.message;
    const data=error.data;
    res.status(status).json({message:message,data:data});
});


dburl = process.env.MONGODB_URL;
mongoose.connect(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "mongodb connection error found: "));
db.once("open", () => {
  console.log(`Database is running.`);
  app.listen(process.env.PORT || 8000, () => {
    console.log(`server is running.`);
  });
});


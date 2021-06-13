const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const customerRouter = require('./routes/customer');
const popcornRouter = require('./routes/popcorn');
const partnerRouter = require('./routes/partner');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/customer', customerRouter);
app.use('/popcorn', popcornRouter);
app.use('/partner', partnerRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});


  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/admin', (req, res) =>{
  res.render('../views/pages/dashboard', {
    title: "Duc Website",
    analyticCard: [
      {cardColor: "blue", icon: "😂", totalCount: 5, name: "products"},
      {cardColor: "blue", icon: "😂", totalCount: 8, name: "users"}
    ],
    partialsDir: 'layout'
  })
} )



router.get('/admin/products', function (req, res, next) {
  res.render('../views/pages/list', {
    title: "hello",
    products: true,
    productsArr: [{
      "id": "3501",
      "name": "Rustic Rubber Chair",
      "price": 59000,
      "category": "Mouse",
      "dateUpdated": "Mon Jan 02 2017 00:00:00 GMT+0100 (CET)"
    }]
  });
});


router.get('/admin/products/create', (req, res) => {
  res.render('../views/pages/product-create')
})


router.get('/admin/categories', (req, res) => {
  res.render('../views/pages/list', {
    title: "Categories",
    categories: true,
    categoriesArr: [{
      _id: "duc",
      name: "ducname",
      iconName: "icon",
      descriptions: "helllo"
    }]
  })
})

router.get('/admin/users', (req, res) => {
  res.render('../views/pages/list', {
    title: "Users List",
    users: true,
    usersArr: [{
      "_id": "001",
      "avatar": "https://i.imgur.com/Ys7iG23.jpg",
      "firstName": "Nordic",
      "lastName": "Coder",
      "dob": "1990-12-10T13:06:35.216Z",
      "gender": "male",
      "country": "vietnam",
      "phoneNumber": "12345678",
      "zipcode": "700000",
      "username": "admin",
      "email": "admin@nordiccoder.com",
      "emailVerified": true,
      "role": "admin"
    }, ]
  })

})

router.get('/admin/orders', (req, res) => {
  res.render('../views/pages/list', {
    title: "Orders List",
    orders: true,
    ordersArr: [{
      name: "duclmq",
      orderDate: '2019-02-02',
      shippedDate: '2019-05-03',
      customer: "minh thu",
      paymentType: "COD",
      status: "IN PROCESS",
      paymentStatus: "PAID",
      productId: "001",
      quantity: 50,
      price: 500000
    }]
  })
})


router.get('/admin/orders/create', (req, res) => {
  res.render('../views/pages/order-create')
})



module.exports = router;
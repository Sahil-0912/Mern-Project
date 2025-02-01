const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.use('/profile', express.static('uploads'))


const productroutes = require('./router/Product.Router')
const categoryroutes = require('./router/Category.Router')

app.use('/api/product', productroutes)
app.use('/api/category', categoryroutes)



require('./config/db').dbconnect()

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log(`Example app listening on port http://localhost:${PORT}`))
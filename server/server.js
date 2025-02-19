const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const categoryrouter = require('./router/Category.Router')
const productrouter = require('./router/Product.Router')
const subcategoryrouter = require('./router/SubCategory.Router')

app.use('/api/category', categoryrouter)
app.use('/api/subcategory', subcategoryrouter)
app.use('/api/product', productrouter)

require('./config/db').dbconnect()

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(PORT, () => console.log(`Example app listening on port http://localhost:${PORT}`))
const fs = require('fs')
const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8888

axios.defaults.baseURL = 'http://xxx.xxx.xxx/';

app.use(express.static('src'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }))
// parse application/json
app.use(bodyParser.json({limit: '50mb'}))

app.get('/', (req, res) => {
  fs.readFile('./src/index.html', 'utf-8', (err, file) => {
    if (err) {
        return res.end('error')
    }
    res.setHeader('Content-Type', 'text/html')
    res.end(file)
  })
})

app.post('/api', (req, res)=> {
    const { body } = req
    const { method, url } = body
    delete body.method
    delete body.url
    
    if(method.toUpperCase() === 'POST') {
        axios.post(url, body)
          .then(function (response) {
            res.send(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
    } else {
        axios.get(url, { params: body })
          .then(function (response) {
            res.send(response.data)
          })
          .catch(function (error) {
            console.log(error);
          }) 
    }
})

app.listen(port, () => {
    console.log(`Project is running at: http://localhost:${port}/`)
})
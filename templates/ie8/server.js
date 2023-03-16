const path = require('path')
const fs = require('fs')
const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8887

var baseURL = 'http://xxx.xx.xxx';

app.use(express.static(path.resolve(__dirname, 'src')))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }))
// parse application/json
app.use(bodyParser.json({limit: '50mb'}))

app.get('/', (req, res) => {
  fs.readFile(path.resolve(__dirname, './src/index.html'), 'utf-8', (err, file) => {
    if (err) {
        return res.end('error')
    }
    res.setHeader('Content-Type', 'text/html')
    res.end(file)
  })
})

app.use((req, res) => {
    let { url, method, body } = req;
    method = method.toLowerCase();
    if (url.startsWith('/api/')) {
        const params = { method, url: baseURL + url };
        if (method !== 'get') {
            params.data = body;
        }
        axios(params).then(response => {
            res.send(response.data);
        }).catch(error => {
            res.send(error);
        })
    }
})

app.listen(port, () => {
    console.log(`Project is running at: http://localhost:${port}/`)
})
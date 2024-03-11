import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const port = 5000
const app = express()
const root = '/'
const bodyParserConfig = { extended: false, limit: '50mb' }
const accessRootText = '<center><h1>You do not have permission to access.</h1></center>'

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded(bodyParserConfig))

app.get(root, (req, res) => {
  res.send(accessRootText)
})

app.listen(port, () => {
  console.clear()
  console.log('this services run on port ', port)
})

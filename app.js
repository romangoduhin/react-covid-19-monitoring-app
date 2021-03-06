const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json({extended: true}));
app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        app.listen(PORT, () => {
            console.log(`App has been started on port ${PORT} `)
        })
    } catch (e) {
        console.log('Server error', e)
        process.exit(1)
    }
}

start()

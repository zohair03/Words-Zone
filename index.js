import express from 'express'
import bodyparser from 'body-parser'
import axios from 'axios'


const app = express()
const port = 3000


app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/', async(req, res) => {
    try {
        const result = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${req.body.word}`);
        const word = result.data[0];
        res.render("index.ejs", {
        word: word.word,
        transcription: word.phonetic,
        meanings: word.meanings,
        sourceUrls: word.sourceUrls,
        });
        
    } catch (error) {
        res.render('index.ejs', {
            message: `Sorry meaning of this word is not available.`
        })
    }
})

app.listen(port,(req, res) => {
    console.log(`Listensing on ${port}.`)
})





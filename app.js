const { response } = require('express')
const express = require('express')
const hbs = require('hbs')
const https = require('https')

const path = require("path")

const PORT = 3000

const app = express()

// Set App to use the handlebars engine
app.set('view engine', 'hbs')

// folders location
staticFiles = path.join(__dirname, 'public')
viewFiles   = path.join(__dirname, 'design/views')
layoutFiles = path.join(__dirname, 'design/layouts')

// use these files inside app
app.use(express.static(staticFiles))
app.set('views', viewFiles)
hbs.registerPartials(layoutFiles)   // components: navbar & footer

// routes
app.get("", (req, res)=>{
    res.render('home', {
        pageTitle: "Homepage",
    })
})

// Here call data API with https request
app.get("/table", (req, response)=> {
    //const apiUrl = "https://swapi.dev/api/people"
    const apiUrl = "https://jsonplaceholder.typicode.com/users"
    let result = ""

    req = https.request(apiUrl, (res)=>{
        res.on('data', (dataPart)=> {
            result += dataPart.toString()
        })

        res.on('end', ()=> {
            result = JSON.parse(result)
            //console.log(result)

            response.render("table", {
                pageTitle: "Table Page",
                data: result
            })
        })
    })

    req.on('error', (err)=>{
        console.log(err)
    })

    req.end()
})

app.get("/contact", (req, res)=> {
    res.render('contact', {
        pageTitle: "Contact"
    })
})

app.get("*", (req, res)=> {
    res.render('error404', {
        pageTitle: "Error Page"
    })
})

// Run to Server
app.listen(PORT, ()=> console.log(`Express app started on http://localhost:${PORT}`))




// With Callback function
//const getDataFromApi = (url, cb) => {
//     let req = https.request(apiUrl, (res)=>{
//         let data= ''
//         res.on('data', (result)=> {
//             data += result.toString()
//         })

//         res.on('end', ()=> {
//             data = JSON.parse(data)
//             cb(data)
//             console.log(data)
//         })
//     })

//     req.on('error', (err)=>{
//         console.log(err)
//     })

//     req.end()
// }

// app.get('/table', (req, res) => {
//     getDataFromApi("https://swapi.dev/api/people/", (people) => {
//         res.render("table", {
//             pageTitle: "Table Page",
//             people,
//         })
//     })
// })

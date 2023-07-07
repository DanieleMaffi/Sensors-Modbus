const sql = require("mssql");
const path = require("path")
const ejs = require('ejs');
const { request } = require("http");
const { promisify } = require("util");

const bodyParser = require('body-parser');
const { Console } = require("console");

let results = null

var config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB,
    options: {
        encrypt: false,
        trustServerCertificate: false
    }
};

exports.loadMainPage = async (req, res) => {
    const pool = await sql.connect(config)
    let request = pool.request()

    let query = "SELECT DISTINCT NomeMisuratore FROM Datalog"

    await request.query(query, (err, results) => {
        if (err) console.log(err)
        res.status(201).render('main', {datalog: results.recordset});
    });
}

exports.sendForm = (req, res) => {
    let misuratore = req.body.misuratore
    let from = req.body.dateFrom
    let to = req.body.dateTo

    res.status(201).redirect(`/loadInfo/${misuratore}/${from}/${to}`)
}

exports.loadInfo = async (req, res) => {
    let misuratore = req.params.misuratore
    let from = req.params.from + ':00'
    let to = req.params.to + ':00'

    const pool = await sql.connect(config)
    let request = pool.request()

    let query = `SELECT Valore FROM Datalog WHERE NomeMisuratore = '${misuratore}' AND (Timestamp = '${from}' OR Timestamp = '${to}')`
    /*request.input('misuratore', sql.NVarChar, misuratore)
    request.input('from', sql.SmallDateTime, new Date(from))
    request.input('to', sql.SmallDateTime, new Date(to))*/

    await request.query(query, (err, results) => {
        if (err) console.log(err)
        console.log(results)

        let difference = (results.recordset[1]?.Valore && results.recordset[0]?.Valore) ? results.recordset[1]?.Valore - results.recordset[0]?.Valore : "Nessun valore"

        res.status(201).render('info', {
            difference: difference,
            misuratore: misuratore
        })
    })
}
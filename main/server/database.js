const {Pool} = require("pg")

const pool = new Pool({
    user:"postgres",
    password:"ErulaZ69",
    host:"localhost",
    port:5432,
    database:"mygamerhouse",
})




module.exports = pool
const db = require('mongoose')

main().catch(err => console.log(err))

async function main(){
    await db.connect(`mongodb+srv://admin:${process.env.password}@cluster0.ga13l6y.mongodb.net/test`)
}

main();

module.exports = db;

const {connect} = require("mongoose");
const  config  = require("../../config");

const run = async(app) => {
    await connect(config.md_url);
    console.log("Connect to DB...");

    app.listen(config.port, ()=>{
        console.log(config.port);
    })
}

module.exports = run;
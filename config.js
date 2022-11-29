

let PORT = process.env.PORT || 8080;
let connectionString =
    "mongodb+srv://admin:admin123@cluster0.wzu8zh7.mongodb.net/?retryWrites=true&w=majority";
let dbName = "dbtest_night";
let fullUrl =
    "mongodb+srv://admin:admin123@cluster0.wzu8zh7.mongodb.net/" +
    dbName +
    "?retryWrites=true&w=majority";
module.exports = {
    PORT,
    connectionString,
    dbName,
    fullUrl,
};
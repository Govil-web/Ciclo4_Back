console.log("Cargando configuracion...");
//Importar las dependencias
const express = require("express");
var bodyParser = require("body-parser");
let cors = require("cors");
let session = require("express-session");
//Cargar configuracion app WEB
const appConfig = require("./config");

console.log("Inicializar la Aplicacion WEB...");
//Inicializar una APLICACION WEB
require("./db/dbInitializer");
const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());
//middleware para las variables de sesion
app.use(
    session({
        secret: "mipalabrasecreta",
        cookie: { maxAge: 60000, secure: false },
    })
);
// 1) Metodo HTTP (verbos HTTP)
// 2) RUTA (VIrtual)
// 3) EL ALGORITMO QUE YO PROGRAMO PARA RESPONDER ESA PETICION

//middleware para loguear cada peticion
app.use(function (req, res, next) {
    if (req.session.MI_VAR > -1) {
        req.session.MI_VAR = req.session.MI_VAR + 1;
    } else {
        req.session.MI_VAR = 0;
    }

    console.log(req.session);
    next();
});

console.log("Configurando Routers...");
const userDummyRouter = require("./routes/routerDummyUser");
const userRouter = require("./routes/routerUsers");

//Configurar Routers en la APP

app.use("/api/usuariosDummy", userDummyRouter);
app.use("/api/usuarios", userRouter);

app.use("/", express.static("./app"));

app.get("/", function (req, res) {
    res.send("Home Page!");
});

app.get("/imagen", async function (req, res) {
    res.sendFile(
        "E:/CICLO4/1,2,6,59/backendproyecto_nigth/images/imagentest.png"
    );
});

console.log("Iniciando Servidor");

let server = app.listen(
    appConfig.PORT,

    function () {
        console.log(
            `La aplicacion WEB esta escuchando en el PUERTO: ` + appConfig.PORT
        );
    }
);
//AXIOS -> permite hacer peticiones HTTP
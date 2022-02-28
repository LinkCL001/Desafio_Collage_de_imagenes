const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const expressFileUpload = require('express-fileupload');// 1. Integrar express-fileupload a Express.(1 Punto)

app.listen(3000, () => {
    console.log("El servidor está inicializando en el puerto 3000");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(expressFileUpload({// 2. Definir que el límite para la carga de imágenes esde 5MB.(2 Puntos)
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: "El peso del archivo que intentas subir supera ellimite permitido",
    })// 3. Responder con un mensaje indicando que se sobrepasó el límite especificado. (2 Puntos)
);

app.get("/", (_, res) => {
    res.sendFile(__dirname + "/formulario.html");
    });
    
// 4. Crear una ruta POST /imagen que reciba y almacene una imagen en una carpeta pública del servidor. Considerar que 
//el formulario envía un payload con una propiedad “position”, que indica la posición del collage donde se deberá mostrar la imagen. (3 Puntos)    
app.post("/imagen", (req, res) => {
    const { target_file } = req.files;
    const { posicion } = req.body;
    target_file.mv(`${__dirname}/public/imagenes/${posicion}.jpg`, (err) => {
    res.send("Archivo cargado con éxito");
    });
});
// 5. Crear una ruta GET /deleteImg/:nombre que reciba como parámetro el nombre de
// una imagen y la elimine de la carpeta en dondeestánsiendoalojadaslasimágenes.    
app.delete("/imagen/:nombre", (req, res) => {
    const { nombre } = req.params;
    fs.unlink(`${__dirname}/public/imagenes/${nombre}.jpg`, (err) => {
    res.send(`Imagen ${nombre} fue eliminada con éxito`);
    });
});
    




// Considerar que esta interacción se ejecuta al hacer click en alguno de los números
// del collage.(2 Puntos)

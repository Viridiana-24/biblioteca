// PUERTO
process.env.PORT = process.env.PORT || 3000;

//ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//CONECCION A LA BASE DE DATOS
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/libreria';
} else {
    urlDB = 'mongodb+srv://admin:kkxnimq0XICnfA37@cluster0-fuytg.mongodb.net/biblioteca?retryWrites=true&w=majority';
}
process.env.URLDB = urlDB;

//FIRMA DE JWT
process.env.FIRMA = process.env.FIRMA || 'firma-super-secreta';
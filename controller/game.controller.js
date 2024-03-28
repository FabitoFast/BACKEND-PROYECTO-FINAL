const fs = require('fs');


//obtener juegos de la API y guardarlos en un archivo json
const obtenerJuegos = (req, res) => {
    res.send("enviar lista de juegos");
    try {
        const data = fs.readFileSync('game.json');
        const game = JSON.parse(data);

        res.status(200).json({game: game, message: 'ok'});
    } catch (error) {
        res.status(500).json({game: null, message: 'error al obtener juegos'});
    }
};


//crear juegos y guardarlos en un archivo json
const crearJuegos = async (req, res) => {
    const {nombre, descripcion, genero, plataforma, precio, stock,
    } = req.body;
    try {
       const data = fs.readFileSync('game.json');
       const game = JSON.parse(data);
       console.log(game);

       const newGame = {
        id: game.length + 1, 
        nombre:"juego 1" , 
        descripcion: "juego de autos" , 
        genero: "accion", 
        plataforma: ["PC"], 
        precio: "300", 
        stock: "hay stock", 
        };
        game.push(newGame);

        fs.writeFileSync('game.json', JSON.stringify(game, null, 2));

        } catch (error) {
            console.log("error al guardar juego");
            res.json({game: null, message: "error al guardar juego"});
    }
};


//eliminar juegos y guardarlos en un archivo json sin el elemento eliminado
const eliminarJuegos = async (req, res) => {
    try {
        const data = fs.readFileSync('game.json');
        let game = JSON.parse(data);

        game = game.filter(game => game.id !== req.params.id);
        fs.writeFileSync('game.json', JSON.stringify(game, null, 2));

        rest.status(200).json({game: game, message: 'ok'});
        
    } catch (error) {
        res.status(500).json({game: [], message: 'error al eliminar juego'});
    }
    }



//actualizar juegos y guardarlos en un archivo json con los cambios realizados
const actualizarJuegos = async (req, res) => {
    const {id} = req.params;
    const {nombre, descripcion, genero, plataforma, precio, stock} = req.body;

    try {
        const data = fs.readFileSync('game.json');
        let game = JSON.parse(data);

        game = game.map((currentGame) => {
            if (currentGame.id === parseInt(id)) {
                return {
                    ...currentGame,
                    nombre,
                    descripcion,
                    genero,
                    plataforma,
                    precio,
                    stock,
                };
            } else {
                return currentGame;
            }
        });

        fs.writeFileSync('game.json', JSON.stringify(game, null, 2));

        res.status(200).json({game, message: 'ok'});

    } catch (error) {
        res.status(500).json({game: null, message: 'error al actualizar juego'});
    }
}

// datos de una API externa

const obtenerJuegosExternos = async (req, res) => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/ability/150/");
      res.status(200).json({ game: response.data, message: 'ok' });
    } catch (error) {
      res.status(500).json({ game: null, message: 'error al obtener juegos externos' });
    }
  };

module.exports = { obtenerJuegos, crearJuegos, eliminarJuegos, actualizarJuegos, obtenerJuegosExternos};


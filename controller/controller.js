//importar el esquema que esta en models/componente

const Componente = require("../models/Componente");

const getComponents = async (req, res) => {
    try {
        const components = await Componente.find();
        res.json(200).json({ components: components, msg:"ok" });
    } catch (error) {
        res.status(500).json({
            component: null, 
            msg: "error - " + error.message,
        });
    }
};

//crear un componente   
const createComponent = async (req, res) => {
    try {
        const newComponent = await Componente(req.body);
        await newComponent.save();
        res.status(201).json({
            component: newComponent, msg: "ok"
        });
    } catch (error) {
        res.status(500).json({
            component: null, 
            msg: "error - " + error.message,
        });
    }
};


module.exports = { getComponents, createComponent};
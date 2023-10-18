// Importa los módulos o modelos necesarios
import UserModel from "../models/user.model";

// Define los controladores
const createUser = async (req, res) => {
    try {
        const user = await UserModel.create(req.body);
        return res.status(200).send({ mensaje: 'Usuario creado' });
    } catch (error) {
        return res.status(500).send({ mensaje: `Error al crear usuario: ${error}` });
    }
};

export { createUser };
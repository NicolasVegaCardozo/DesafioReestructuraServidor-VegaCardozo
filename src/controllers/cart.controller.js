// Importa el modelo necesario
import cartModel from "../models/carts.models.js";

// Crea un nuevo carrito
const createCart = async (req, res) => {
    try {
        const respuesta = await cartModel.create(req.body);
        res.status(200).send({ resultado: "OK", message: respuesta });
    } catch (error) {
        res.status(400).send({ error: `Error al crear carrito: ${error}` });
    }
};

// Obtiene todos los carritos
const getAllCarts = async (req, res) => {
    try {
        const carts = await cartModel.find();
        res.json(carts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los carritos" });
    }
};

// Obtiene un carrito específico por su ID
const getCartById = async (req, res) => {
    try {
        const cid = req.params.cid;

        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).send("Carrito no existe");
        }
        res.status(200).send(cart);
    } catch (error) {
        res.status(400).send("Error al obtener el carrito");
    }
};

// Agrega un producto a un carrito específico
const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).send({ error: "Carrito no encontrado" });
        }
        cart.products.push({ id_prod: pid, quantity: quantity });
        await cart.save();
        res.status(200).send({ resultado: "OK", mensaje: cart });
    } catch (error) {
        res.status(400).send({ error: `Error al agregar producto: ${error}` });
    }
};

// Actualiza un producto en un carrito específico
const updateProductInCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { updatedField } = req.body;
    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).send({ error: "Carrito no encontrado" });
        }
        const product = cart.products.find(
            (item) => item.id_prod._id.toString() === pid
        );
        if (!product) {
            return res.status(404).send({ error: "Producto del carrito no encontrado" });
        }
        product.field = updatedField;
        await cart.save();
        res.status(200).send(cart);
    } catch (error) {
        res.status(400).send({ error: `Error al actualizar producto: ${error}` });
    }
};

// Elimina un producto de un carrito específico
const removeProductFromCart = async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).send({ error: "Carrito no encontrado" });
        }
        const productIndex = cart.products.findIndex(
            (product) => product.id_prod._id === pid
        );
        if (productIndex <= -1) {
            return res.status(404).send({ error: "Producto del carrito no encontrado" });
        }
        cart.products.splice(productIndex, 1);
        await cart.save();
        res.status(200).send({ message: "Producto eliminado del carrito" });
    } catch (error) {
        res.status(400).send({ error: `Error al eliminar producto: ${error}` });
    }
};

// Vacía un carrito específico
const clearCart = async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).send({ error: "Carrito no encontrado" });
        }
        cart.products = [];
        await cart.save();
        res.status(200).send({ message: "Carrito vaciado" });
    } catch (error) {
        res.status(400).send({ error: `Error al vaciar carrito: ${error}` });
    }
};

// Exporta los controladores para quesean utilizados desde otros archivos:
export default {
    createCart,
    getAllCarts,
    getCartById,
    addProductToCart,
    updateProductInCart,
    removeProductFromCart,
    clearCart,
};
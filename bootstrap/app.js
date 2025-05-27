import dotenv from 'dotenv';
import constants from '../config/constants.js';
import "../config/sequelize_relations.js";

/** Init .env file */
dotenv.config();

/** Inserir as constantes na variavel global */
globalThis.CONSTANTS = constants;
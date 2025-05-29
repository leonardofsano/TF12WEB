import { Router } from 'express';
import express from 'express';
import path from 'path';
import CONSTANTS from '../config/constants.js';

import pessoasApi from "./pessoasApi.js";
import ListPublicFilesController from '../app/Controllers/ListPublicFilesController.js';

export default (function () {

    const router = Router();

    /** Usado para servir json */
    router.use(express.json());

    /** Servir o public estaticamente, tanto para arquivos como para os assets de frontend */
    // NÃO SERÁ CHAMADO CASO TENHA A CAMADA DE NGINX COM ARQUIVOS ESTÁTICOS
    router.use(express.static(path.join(CONSTANTS.DIR, 'public')));

    // Rota para listar arquivos na pasta 'public'
    // NÃO SERÁ CHAMADO CASO TENHA A CAMADA DE NGINX COM ARQUIVOS ESTÁTICOS
    router.get('/', ListPublicFilesController);

    // rota de pessoas
    router.use('/', pessoasApi);

    /** Se nenhuma rota for encontrada, 404 neles! */
    router.use((req, res) => {
        res.status(CONSTANTS.HTTP.NOT_FOUND).json({ error: "Not found" });
    });

    return router;

})();

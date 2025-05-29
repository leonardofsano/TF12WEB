import { Router } from 'express';
import ListPessoaApiController from '../app/Controllers/PessoaApi/ListPessoaApiController.js';

const router = Router();

router.get('/api/pessoas', ListPessoaApiController.list);

export default router;

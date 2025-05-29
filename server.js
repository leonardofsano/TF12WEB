import express from 'express';
import chalk from 'chalk';
import webRoutes from "./routes/web.js";
import './config/sequelize_relations.js';

const app = express();

/** Rotas */
app.use("/", webRoutes);

/** Porta que o Node vai ouvir */
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(chalk.green(`🚀 Servidor rodando em: http://localhost:${port}`));
});

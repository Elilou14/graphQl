const mysql = require("mysql2/promise");
require("dotenv").config();

// Créer une fonction pour établir la connexion
async function establishConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'dbms',
      user: process.env.DB_USER || 'api-dev',
      password: process.env.DB_PASSWORD || 'api-dev-password',
      database: process.env.DB_DATABASE || 'bdblog',
    });

    // Établir la connexion
    await connection.connect();
    console.log("Connecté à la base de données");

    return connection;
  } catch (error) {
    console.error("Erreur de connexion à la base de données : " + error.message);
    throw error;
  }
}

// Fonction pour exécuter une requête SQL
async function executeQuery(query, params = []) {
  try {
    // Obtenir une connexion active
    const connection = await establishConnection();

    // Exécuter la requête SQL
    const [results] = await connection.execute(query, params);

    // Fermer la connexion après l'exécution de la requête
    await connection.end();

    return results;
  } catch (error) {
    console.error('Erreur lors de l\'exécution de la requête :', error.message);
    throw error;
  }
}

module.exports = { executeQuery };

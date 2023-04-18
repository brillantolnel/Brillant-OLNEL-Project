const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// SITEE
exports.listeUtilisateur = (req, res) => {
    // User the connection
    connection.query('SELECT * FROM utilisateur', (err, rows) => {
      // When done with the connection, release it
      if (!err) {
        let removedUser = req.query.removed;
        res.render('Utilisateur', { rows, removedUser });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }

  exports.formUtilisateur = (req, res) => {
    res.render('Ajout-utilisateur');
  }

  exports.createutilisateur = (req, res) => {
    const { nom, prenom,tel,email,site,departement,materiel,type,licence,status} = req.body;
    let searchTerm = req.body.search;
  
    // User the connection
    connection.query('INSERT INTO utilisateur SET nom = ?, prenom = ?,tel = ?,email = ?,site = ?,departement = ?,materiel = ?,type = ?,licence = ?,status = ?', [nom, prenom,tel,email,site,departement,materiel,type,licence,status], (err, rows) => {
      if (!err) {
        // res.render('liste-Materiel', { alert: 'Materiel bien enregistré.' });
         res.redirect('/listeutilisateur');
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }

  exports.editUtilisateur = (req, res) => {
    // User the connection
    connection.query('SELECT * FROM utilisateur  WHERE id = ?', [req.params.id], (err, rows) => {
      if (!err) {
        res.render('Edit-utilisateur', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }
  exports.updateutilisateur = (req, res) => {
    const {nom, prenom,tel,email,site,departement,materiel,type,licence,status } = req.body;
    // User the connection
    connection.query('UPDATE utilisateur SET nom = ?, prenom = ?,tel = ?,email = ?,site = ?,departement = ?,materiel = ?,type = ?,licence = ?,status = ? WHERE id = ?', [nom, prenom,tel,email,site,departement,materiel,type,licence,status, req.params.id], (err, rows) => {
  
      if (!err) {
        // User the connection
        connection.query('SELECT * FROM utilisateur WHERE id = ?', [req.params.id], (err, rows) => {
          // When done with the connection, release it
          
          if (!err) {
            res.redirect('/listeutilisateur');
          } else {
            console.log(err);
          }
          console.log('The data from user table: \n', rows);
        });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }
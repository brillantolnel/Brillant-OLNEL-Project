const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// DEPARTEMENT
exports.listeDepartement = (req, res) => {
    // User the connection
    connection.query('SELECT * FROM departement', (err, rows) => {
      // When done with the connection, release it
      if (!err) {
        let removedUser = req.query.removed;
        res.render('Departement', { rows, removedUser });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }
  
  exports.createDepartement = (req, res) => {
    const { code, departement} = req.body;
    let searchTerm = req.body.search;
  
    // User the connection
    connection.query('INSERT INTO departement SET code_departement = ?, nom_departement = ?', [code, departement], (err, rows) => {
      if (!err) {
        // res.render('liste-Materiel', { alert: 'Materiel bien enregistré.' });
         res.redirect('/listedepartement');
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }
  //edit departement
  exports.editdepartement = (req, res) => {
    // User the connection
    connection.query('SELECT * FROM departement  WHERE id = ?', [req.params.id], (err, rows) => {
      if (!err) {
        res.render('Departement', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }
  // Update departement
  exports.updatedepartement = (req, res) => {
    const {code, departement } = req.body;
    // User the connection
    connection.query('UPDATE departement SET code_departement = ?, nom_departement = ? WHERE id = ?', [code, departement, req.params.id], (err, rows) => {
  
      if (!err) {
        // User the connection
        connection.query('SELECT * FROM departement WHERE id = ?', [req.params.id], (err, rows) => {
          // When done with the connection, release it
          
          if (!err) {
            res.redirect('/listedepartement');
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
  exports.supprimerDepartement = (req, res) => {
    connection.query('DELETE FROM departement WHERE id = ?', [req.params.id], (err, rows) => {
  
         if(!err) {
           res.redirect('/listedepartement');
         } else {
           console.log(err);
         }
         console.log('The data from user table: \n', rows);
       });
  }
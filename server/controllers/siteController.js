const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// SITEE
exports.listeSite = (req, res) => {
    // User the connection
    connection.query('SELECT * FROM site', (err, rows) => {
      // When done with the connection, release it
      if (!err) {
        let removedUser = req.query.removed;
        res.render('site', { rows, removedUser });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }
  
  exports.createSite = (req, res) => {
    const { code, site} = req.body;
    let searchTerm = req.body.search;
  
    // User the connection
    connection.query('INSERT INTO site SET code_site = ?, nom_site = ?', [code, site], (err, rows) => {
      if (!err) {
        // res.render('liste-Materiel', { alert: 'Materiel bien enregistré.' });
         res.redirect('/listesites');
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }
  //edit departement
  exports.editSite = (req, res) => {
    // User the connection
    connection.query('SELECT * FROM site  WHERE id = ?', [req.params.id], (err, rows) => {
      if (!err) {
        res.render('site', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }
  // Update departement
  exports.updateSite = (req, res) => {
    const {code, site } = req.body;
    // User the connection
    connection.query('UPDATE site SET code_site = ?, nom_site = ? WHERE id = ?', [code, site, req.params.id], (err, rows) => {
  
      if (!err) {
        // User the connection
        connection.query('SELECT * FROM site WHERE id = ?', [req.params.id], (err, rows) => {
          // When done with the connection, release it
          
          if (!err) {
            res.redirect('/listesites');
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
  exports.supprimerSite= (req, res) => {
    connection.query('DELETE FROM site WHERE id = ?', [req.params.id], (err, rows) => {
  
         if(!err) {
           res.redirect('/listesites');
         } else {
           console.log(err);
         }
         console.log('The data from user table: \n', rows);
       });
  }
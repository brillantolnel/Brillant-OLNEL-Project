const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
  //Materiels
exports.index = (req, res) => {
  res.render('menu');
}
exports.listeMateriel = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM materiels', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render('Materiel', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}
exports.formMaterial = (req, res) => {
  res.render('add-material');
}

exports.createMat = (req, res) => {
  const { ref, nom_materiel, type } = req.body;
  let searchTerm = req.body.search;

  // User the connection
  connection.query('INSERT INTO materiels SET ref = ?, nom_mat = ?, type = ?', [ref, nom_materiel, type], (err, rows) => {
    if (!err) {
      // res.render('liste-Materiel', { alert: 'Materiel bien enregistré.' });
       res.redirect('/listemateriel');
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}

// Edit user
exports.editMat = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM materiels  WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-Materiel', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}


// Update User
exports.updateMat = (req, res) => {
  const {ref, nom_materiel, type } = req.body;
  // User the connection
  connection.query('UPDATE materiels SET ref = ?, nom_mat = ?, type=? WHERE id = ?', [ref, nom_materiel, type, req.params.id], (err, rows) => {

    if (!err) {
      // User the connection
      connection.query('SELECT * FROM materiels WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        
        if (!err) {
          res.redirect('/listemateriel');
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

exports.supprimer = (req, res) => {
  connection.query('DELETE FROM materiels WHERE id = ?', [req.params.id], (err, rows) => {

       if(!err) {
         res.redirect('/listemateriel');
       } else {
         console.log(err);
       }
       console.log('The data from user table: \n', rows);
     });
}


// DEPARTEMENT
//exports.listeDepartement = (req, res) => {
//  // User the connection
//  connection.query('SELECT * FROM departement', (err, rows) => {
//    // When done with the connection, release it
//    if (!err) {
//      let removedUser = req.query.removed;
//      res.render('Departement', { rows, removedUser });
//    } else {
//      console.log(err);
//    }
//    console.log('The data from user table: \n', rows);
//  });
//}
//
//exports.createDepartement = (req, res) => {
//  const { code, departement} = req.body;
//  let searchTerm = req.body.search;
//
//  // User the connection
//  connection.query('INSERT INTO departement SET code_departement = ?, nom_departement = ?', [code, departement], (err, rows) => {
//    if (!err) {
//      // res.render('liste-Materiel', { alert: 'Materiel bien enregistré.' });
//       res.redirect('/listedepartement');
//    } else {
//      console.log(err);
//    }
//    console.log('The data from user table: \n', rows);
//  });
//}
////edit departement
//exports.editdepartement = (req, res) => {
//  // User the connection
//  connection.query('SELECT * FROM departement  WHERE id = ?', [req.params.id], (err, rows) => {
//    if (!err) {
//      res.render('Departement', { rows });
//    } else {
//      console.log(err);
//    }
//    console.log('The data from user table: \n', rows);
//  });
//}
//// Update departement
//exports.updatedepartement = (req, res) => {
//  const {code, departement } = req.body;
//  // User the connection
//  connection.query('UPDATE departement SET code_departement = ?, nom_departement = ? WHERE id = ?', [code, departement, req.params.id], (err, rows) => {
//
//    if (!err) {
//      // User the connection
//      connection.query('SELECT * FROM departement WHERE id = ?', [req.params.id], (err, rows) => {
//        // When done with the connection, release it
//        
//        if (!err) {
//          res.render('', { rows, alert: `${code} has been updated.` });
//        } else {
//          console.log(err);
//        }
//        console.log('The data from user table: \n', rows);
//      });
//    } else {
//      console.log(err);
//    }
//    console.log('The data from user table: \n', rows);
//  });
//}
//exports.supprimerDepartement = (req, res) => {
//  connection.query('DELETE FROM departement WHERE id = ?', [req.params.id], (err, rows) => {
//
//       if(!err) {
//         res.redirect('/listedepartement');
//       } else {
//         console.log(err);
//       }
//       console.log('The data from user table: \n', rows);
//     });
//}
//
// View Users
/* exports.view = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render('home', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // User the connection
  connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('add-user');
}

// Add new user
exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  let searchTerm = req.body.search;

  // User the connection
  connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
    if (!err) {
      res.render('add-user', { alert: 'User added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}


// Edit user
exports.edit = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}


// Update User
exports.update = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  // User the connection
  connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {

    if (!err) {
      // User the connection
      connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        
        if (!err) {
          res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
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

// Delete User
exports.delete = (req, res) => {

  // Delete a record

  // User the connection
  // connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {

  //   if(!err) {
  //     res.redirect('/');
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from user table: \n', rows);

  // });

  // Hide a record

  connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
    if (!err) {
      let removedUser = encodeURIComponent('User successeflly removed.');
      res.redirect('/?removed=' + removedUser);
    } else {
      console.log(err);
    }
    console.log('The data from beer table are: \n', rows);
  });

}

// View Users
exports.viewall = (req, res) => {

  // User the connection
  connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });

}
*/
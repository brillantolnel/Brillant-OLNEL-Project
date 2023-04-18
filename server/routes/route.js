const express = require('express');
const router = express.Router();
const materielController = require('../controllers/materielController');
const departementController = require('../controllers/departementController');
const sitesController = require('../controllers/siteController');
const utilisteurController = require('../controllers/utilisteurController');

// Routes

router.get('/', materielController.index);
//Listes
router.get('/listemateriel', materielController.listeMateriel);
router.get('/listesites', sitesController.listeSite);
router.get('/listedepartement', departementController.listeDepartement);
router.get('/listeutilisateur', utilisteurController.listeUtilisateur);

//MATERIEL
//router.get('/addmateriel', materielController.formMaterial);
router.post('/ajoutmateriel', materielController.createMat);
router.post('/ModifMateriel/:id', materielController.updateMat);
router.get('/listemateriel/:id',materielController.supprimer);

//SITE
//router.get('/listesites', sitesController.listeSite);
router.post('/ajoutsite', sitesController.createSite);
router.post('/Modif_Site/:id', sitesController.updateSite);
router.get('/listesites/:id',sitesController.supprimerSite);

//DEPARTEMENT
//router.get('/listedepartement', departementController.listeDepartement);
router.post('/ajoutdepartement', departementController.createDepartement);
router.post('/editdepartement/:id', departementController.updatedepartement);
router.get('/listedepartement/:id',departementController.supprimerDepartement);


router.get('/formUtilisateur',utilisteurController.formUtilisateur);
router.post('/ajoututilisateur',utilisteurController.createutilisateur);
router.get('/editUtilisateur/:id',utilisteurController.editUtilisateur);
router.post('/ModifUtilisateur/:id',utilisteurController.updateutilisateur);



//Departement
//router.post('/Modif_Site/:id', sitesController.updateSite);

module.exports = router;




var express = require('express');
var router = express.Router();
var Cookings = require('../models').Cookings;

router.get('/', function(req, res) {
  Cookings.all({
    order: [
      ['createdAt', 'ASC']
    ]
  })
    .then( function(cooking) {
      return res.render('cooking', { cooking: cooking });
  })
});

/* POST add recipe listing */
router.post('/', function(req, res) {
  var Recipe = req.body.recipe;
  Cookings.create({ Recipe: Recipe })
    .then( function() {
      res.redirect('/cooking');
  });
});

router.delete('/:id', function(req, res) {
  Cookings.findById(req.params.id)
    .then( function(cooking) {
      cooking.destroy()
    })
    .then( function() {
      return res.redirect('/cooking');
  });
});

router.get('/:id/edit', function(req, res) {
  Cookings.findById(req.params.id)
    .then( function(cooking) {
      return res.render('edit', { Recipe: Recipe });
  });
});

router.put('/:id', function(req, res) {
  Cookings.update(
    { Recipe: req.body.title },
    { where: { id: req.params.id } }
  )
  .then( function() {
    return res.redirect('/cooking');
  })
});

module.exports = router;
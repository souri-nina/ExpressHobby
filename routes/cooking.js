var express = require('express');
var router = express.Router();
var Cooking = require('../models').Cooking;

router.get('/', function(req, res) {
  Cooking.all({
    order: [
      ['createdAt', 'ASC']
    ]
  })
    .then( function(Cooking) {
      return res.render('cooking', { cooking: cooking });
  })
});

/* POST add recipe listing */
router.post('/', function(req, res) {
  var Recipe = req.body.recipe;
  Cooking.create({ Recipe: Recipe })
    .then( function() {
      res.redirect('/cooking');
  });
});

router.delete('/:id', function(req, res) {
  Cooking.findById(req.params.id)
    .then( function(cooking) {
      cooking.destroy()
    })
    .then( function() {
      return res.redirect('/cooking');
  });
});

router.get('/:id/edit', function(req, res) {
  Cooking.findById(req.params.id)
    .then( function(cooking) {
      return res.render('edit', { Recipe: Recipe });
  });
});

router.put('/:id', function(req, res) {
  Cooking.update(
    { Recipe: req.body.title },
    { where: { id: req.params.id } }
  )
  .then( function() {
    return res.redirect('/cooking');
  })
});

module.exports = router;
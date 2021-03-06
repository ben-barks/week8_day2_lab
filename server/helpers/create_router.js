const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const parser = require('body-parser');

const createRouter = function (collection) {

  const router = express.Router();
//INDEX
  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });
//SHOW
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .findOne({ _id: ObjectID(id) })
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });
//DELETE
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .deleteOne({ _id: ObjectID(id) })
      .then(() => collection.find().toArray())
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.post('/', (req, res) => {
    const newItem = req.body;
    //insert one, then find it in collection, arrange it to an array, then return it in json format
    collection
      .insertOne(newItem)
      .then(() => collection.find().toArray())
      .then((docs) => res.json(docs))
  });


  return router;

};

module.exports = createRouter;

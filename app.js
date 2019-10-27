const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const Thing = require('./models/thing');



mongoose.connect('mongodb+srv://dozie:<password>@cluster0-ednqz.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });


/*app.use((req, res, next) => {
    console.log("request received");
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});
   
app.use((req, res, next) => {
    res.json({ messsage: 'Your request was served by express'});
    next();
});

app.use((req, res, next) => {
    console.log('response sent successfully');
});*/

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.post('/api/stuff', (req, res, next) => {
    const thing = new Thing({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
      });
      thing.save().then(
          () => {
              res.status(201).json({
                  message: "created successfully"
              });
          }
      ).catch(
          (error) => {
              res.status(400).json({
                  error: error
              });
          }
      );
});

app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({
      _id: req.params.id
    }).then(
      (thing) => {
        res.status(200).json(thing);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  });

  app.put('/api/stuff/:id', (req, res, next) => {
    const thing = new Thing({
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId
    });
    Thing.updateOne({_id: req.params.id}, thing).then(
      () => {
        res.status(201).json({
          message: 'Thing updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });


  app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

app.use('/api/stuff', (req, res, next) => {
 /*   const stuff = [
        {
            _id: '564894561',
            title: 'My first thing',
            description: 'a thing',
            imageUrl: '',
            price: 4900,
            userId: 'adklfjaldfkjaf',
          },
          {
            _id: '56489456sdfaf1',
            title: 'My firstt thing',
            description: 'a thing',
            imageUrl: '',
            price: 2900,
            userId: 'adklasdfafjaldfkjaf',
          }

          
    ];
    res.status(200).json(stuff);*/
    Thing.find().then(
        (things) => {
          res.status(200).json(things);
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
});

module.exports = app;


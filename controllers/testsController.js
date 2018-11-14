const Test = require('../models').tests;
const TestsItems = require('../models').tests_items;
const TestsCategories = require('../models').tests_categories;

module.exports = {

    create: (request, response)  => {
        request.body.created_at =  new Date();
        request.body.updated_at = new Date();
        
        Test.create(request.body)
        .then(result => {
            response.status(200).send(result);
        })
        .catch(error => {
            response.status(500).send(error);
        });
    },

    findAll:  (request, response)  => {
        Test.findAll({
            include: [
                {model: TestsItems},
                {model: TestsCategories},

            ]
        })
        .then(result => {
            response.status(200).send(result);
        })
        .catch(error => {
            response.status(500).send(error);
        });
    },
    
    findById:  (request, response)  => {
        Test.findById(request.params.id, { include: [
            {model: TestsItems},
            {model: TestsCategories},

        ]})
        .then(result => {
            response.status(200).send(result);
        })
        .catch(error => {
            response.status(500).send(error);
        });
    },
    
    update: (request, response)  => {
        const test = request.body;
        const id = request.params.id;
        Test.update(test, { where: { id } })
        .then(result => {
            Test.findById(id).then(updatedTest => {
                response.status(200).send(updatedTest);
            }).catch(error => {
                response.status(500).send(error);
            })
        })
        .catch(error => {
            response.status(500).send(error);
        });
    },

    
    delete: (request, response)  => {
        const id = request.params.id;
        Test.findById(id).then(test => {
            test.destroy();
            response.status(200).send();
        }).catch(error => {
            response.status(500).send(error);
        })
    
    },



}
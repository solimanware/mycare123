const TestItems = require('../models').tests_items;
const Test = require('../models').tests;

module.exports = {

    create: (request, response) => {
        request.body.created_at = new Date();
        request.body.updated_at = new Date();

        TestItems.create(request.body)
            .then(result => {
                response.status(200).send(result);
            })
            .catch(error => {
                response.status(500).send(error);
            });
    },

    findAll: (request, response) => {
        TestItems.findAll({
            include: [
                { model: Test }
            ]
        })
        .then(result => {
            response.status(200).send(result);
        })
        .catch(error => {
            response.status(500).send(error);
        });
    },

    findById: (request, response) => {
        TestItems.findById(request.params.id, {
            
            include: [
                { model: Test }
            ]
        })
            .then(result => {
                response.status(200).send(result);
            })
            .catch(error => {
                response.status(500).send(error);
            });
    },

    update: (request, response) => {
        const testItem = request.body;
        const id = request.params.id;
        TestItems.update(testItem, {where: { id }})
            .then(result => {
                TestItems.findById(id).then(updatedTestItems => {
                    response.status(200).send(updatedTestItems);
                }).catch(error => {
                    response.status(500).send(error);
                })
            })
            .catch(error => {
                response.status(500).send(error);
            });
    },


    delete: (request, response) => {
        const id = request.params.id;
        TestItems.findById(id).then(testItem => {
            testItem.destroy();
            response.status(200).send();
        }).catch(error => {
            response.status(500).send(error);
        })

    },



}
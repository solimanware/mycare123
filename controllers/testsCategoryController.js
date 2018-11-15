const TestCategory = require('../models').tests_categories;
const Test = require('../models').tests;
module.exports = {

    create: (request, response)  => {
        request.body.created_at =  new Date();
        request.body.updated_at = new Date();
        
        TestCategory.create(request.body)
        .then(result => {
            response.status(200).send(result);
        })
        .catch(error => {
            response.status(500).send(error);
        });
    },

    findAll:  (request, response)  => {
        TestCategory.findAll({
            include: [
                {model: Test}
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
        TestCategory.findById(request.params.id, {
            include: [
                {model: Test}
            ]
        })
        .then(result => {
            response.status(200).send(result);
        })
        .catch(error => {
            response.status(500).send(error);
        });
    },
    
    update: (request, response)  => {
        const testCategory = request.body;
        const id = request.params.id;
        TestCategory.update(testCategory, { where: { id } })
        .then(result => {
            TestCategory.findById(id).then(updatedTestCategory => {
                response.status(200).send(updatedTestCategory);
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
        TestCategory.findById(id).then(testCategory => {
            testCategory.destroy();
            response.status(200).send();
        }).catch(error => {
            response.status(500).send(error);
        })
    
    },



}
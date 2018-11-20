const Visit = require('../models').visits;
const Patient = require('../models').Patient;
const VisitsTests = require('../models').visits_tests;
const Tests = require('../models').tests;

module.exports = {

    create: (request, response) => {
        request.body.created_at = new Date();
        request.body.updated_at = new Date();
        const testsIds = request.body.tests_ids || [];

        Visit.create(request.body)
            .then(result => {
                const visits_tests_ids = testsIds.map(test_id => ({
                    test_id,
                    visit_id: result.id
                }));
                VisitsTests.bulkCreate(visits_tests_ids)
                .then(visitsTestsResult => response.status(200).send(result))
                .catch(error => response.status(500).send(error))
            })
            .catch(error => response.status(500).send(error));

    },

    findAll: (request, response) => {
        Visit.findAll({
            include: [
                {model: Patient},
                {model: Tests}
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
        Visit.findById(request.params.id, {
            include: [
                {model: Patient},
                {model: Tests},
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
        const patient = request.body;
        const id = request.params.id;
        Visit.update(patient, { where: { id } })
            .then(result => {
                Visit.findById(id).then(updatedVisit => {
                    response.status(200).send(updatedVisit);
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
        Visit.findById(id).then(patient => {
            patient.destroy();
            response.status(200).send();
        }).catch(error => {
            response.status(500).send(error);
        })

    },



}
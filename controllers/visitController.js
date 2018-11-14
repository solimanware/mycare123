const Visit = require('../models').visits;
const Patient = require('../models').Patient;

module.exports = {

    create: (request, response) => {
        request.body.created_at = new Date();
        request.body.updated_at = new Date();

        Visit.create(request.body)
            .then(result => {
                response.status(200).send(result);
            })
            .catch(error => {
                response.status(500).send(error);
            });
    },

    findAll: (request, response) => {
        Visit.findAll({
            include: [{model: Patient}]
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
            include: [{model: Patient}]
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
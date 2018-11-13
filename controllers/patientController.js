const Patient = require('../models').Patient;

module.exports = {

    create: (request, response)  => {
        request.body.created_at =  new Date();
        request.body.updated_at = new Date();
        
        Patient.create(request.body)
        .then(result => {
            response.status(200).send(result);
        })
        .catch(error => {
            response.status(500).send(error);
        });
    },

    findAll:  (request, response)  => {
        Patient.findAll()
        .then(result => {
            response.status(200).send(result);
        })
        .catch(error => {
            response.status(500).send(error);
        });
    },
    
    findById:  (request, response)  => {
        Patient.findById(request.params.id)
        .then(result => {
            response.status(200).send(result);
        })
        .catch(error => {
            response.status(500).send(error);
        });
    },
    
    update: (request, response)  => {
        const patient = request.body;
        const id = request.params.id;
        Patient.update(patient, { where: { id } })
        .then(result => {
            Patient.findById(id).then(updatedPatient => {
                response.status(200).send(updatedPatient);
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
        Patient.findById(id).then(patient => {
            patient.destroy();
            response.status(200).send();
        }).catch(error => {
            response.status(500).send(error);
        })
    
    },



}
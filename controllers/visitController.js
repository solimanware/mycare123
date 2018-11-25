const Visit = require('../models').visits;
const Patient = require('../models').patients;
const VisitsTests = require('../models').visits_tests;
const Tests = require('../models').tests;
const ItemsResultsValue = require('../models').items_results_value;
const TestItem =  require('../models').tests_items;
module.exports = {

    create: (request, response) => {
        request.body.created_at = new Date();
        request.body.updated_at = new Date();
        const testsIds = request.body.tests_ids || [];

        Visit.create(request.body)
            .then(visit => {
                const visitsTests = testsIds.map(test_id => ({
                    test_id,
                    visit_id: visit.id
                }));
                
                VisitsTests.bulkCreate(visitsTests)

                .then(resAfterCreateBulkVisitsTests => { // After create bulk test visits


                    VisitsTests.findAll({
                        where: {
                            visit_id: visit.id
                        },
                        attributes: ['id', 'test_id', 'visit_id']
                    }).then(visitTests=> {
                        //TODO Get test items
                        TestItem.findAll({
                            where:{
                                test_id: testsIds
                            }
                        }).then(items => {
                            
                            visitTests = visitTests.map(x => x.toJSON());
                            let data = [];
                            visitTests.forEach(visitTest => {
                                let obj = {};
                                items.forEach(item => {
                                    if(item.test_id == visitTest.test_id){
                                        obj = {
                                            visit_test_id: visitTest.id,
                                            item_id: item.id
                                        }
                                        data.push(obj)
                                    }
                                });
                            });

                            ItemsResultsValue.bulkCreate(data).then(afterCreateResults => {
                                response.status(200).send(afterCreateResults)

                            }).catch(e => {
                                console.log('error on insert bulk for items results values ', e)
                            })

                         }).catch(e => {
                             console.log('error on get test items: ', e);
                             
                         })
                       


                    }).catch(e => {
                        console.log('error: ' , e);
                        
                    })
                })
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
                console.log(1, error)
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
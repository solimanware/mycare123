const bcrypt = require('bcrypt');
const models = require('../models');
const User = models.users;
const passwordSalt = process.env.PASSWORD_SALT || 10;

module.exports = {

    login: (request, response) => {
        let {mobile_number, password}  = request.body;
        User.findAll({
            where: {mobile_number}
        })
            .then(result => {
                
                
                res = bcrypt.compareSync(password, result[0].password);

                response.status(200).send(res);
            })
            .catch(error => {
                console.log(1, error)
                response.status(500).send(error);
            });
    }
}
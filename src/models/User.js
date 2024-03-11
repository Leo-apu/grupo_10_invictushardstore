const fs = require('fs');
const path = require('path');

const User = {

	fileName:  path.resolve(__dirname, '../data/usersDB.json'),
	
	getData: function () {
		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8')); 
	},

	// Devuelve todos los usuarios
	findAll: function () {
		return this.getData();
	},

	generateId: function () {
		let allUsers = this.findAll();
		let lastUser = allUsers.pop();
		if (lastUser) {  
			return parseInt(lastUser.id) + 1
		}
		return 1; 
	},

	create: function (userData) {
		let allUsers = this.findAll();
		let newUser = {
			id: this.generateId(),
			...userData 
		}
		allUsers.push(newUser);
		fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null,  ' '));
		return newUser;
	},
	findByPk: function (id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find( oneUser => oneUser.id === id);
        return userFound;
    },

	findByField: function (field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find( oneUser => oneUser[field] === text);
        return userFound;
    }
	
}

module.exports = User;
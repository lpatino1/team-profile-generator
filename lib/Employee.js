// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email, role){
        this.name=name;
        this.id = id;
        this.email = email;
        this.role = role;
    }

    getName(name){
        return this.name;
    }
    
    getEmail(email){
        return this.email;
    }

    getId(id){
        return this.id;
    }

    getRole(employee){
        //returns Employee
        return "Employee";
    }
}


module.exports = Employee;
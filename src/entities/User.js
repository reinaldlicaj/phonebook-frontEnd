class User {
    firstName;
    lastName;
    privateNumber;
    workNumber;
    id;
    constructor(id, firstName, lastName, privateNumber, workNumber) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.privateNumber = privateNumber;
        this.workNumber = workNumber;
    }
}

export default User;

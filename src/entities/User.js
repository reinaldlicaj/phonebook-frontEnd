import Numbers, { emptyNumber } from "./Numbers";

export const emptyUser = {
    id: null,
    firstName: "",
    lastName: "",
    numbers: [emptyNumber, emptyNumber],
};
class User {
    firstName;
    lastName;
    numbers;
    id;
    constructor(id, firstName, lastName, numbers) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.numbers = numbers.map((number) => {
            return new Numbers(number.number, number.numberType);
        });
    }
}

export default User;

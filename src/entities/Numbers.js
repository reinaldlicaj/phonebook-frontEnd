export const NUMBER_TYPES = {
    PERSONAL: "personal",
    WORK: "work",
};
export const emptyNumber = {
    number: "",
    numberType: NUMBER_TYPES.PERSONAL,
};
class Numbers {
    number;
    numberType;
    constructor(number, numberType) {
        this.number = number;
        this.numberType = numberType;
    }
}

export default Numbers;

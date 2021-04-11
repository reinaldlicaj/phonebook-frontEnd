import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, FormControl, Select, InputLabel, MenuItem } from "@material-ui/core/";

import { createUser, updateUser } from "../../services";
import { emptyUser } from "../../entities/User";

import { NUMBER_TYPES } from "../../entities/Numbers";

const useStyles = makeStyles((theme) => ({
    inputMaterial: {
        width: "100%",
    },
    modal: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,

        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
    },
    numberWrapper: {
        display: "grid",
        gridTemplateColumns: "3fr 1fr",
    },
}));

const EditModal = ({ users, setUsers, close, selectedUser }) => {
    const classes = useStyles();
    const isNew = !selectedUser.id && selectedUser.firstName === "" && selectedUser.lastName === "";
    const [userSelected, setUserSelected] = useState(!isNew ? selectedUser : emptyUser);

    const createOrUpdate = () => {
        !isNew ? handleUpdate() : handleCreate();
    };

    const handleCreate = async () => {
        const id = await createUser(userSelected);
        setUsers([...users, {...userSelected, id}]);
        debugger;
        close();
    };
    const handleUpdate = async () => {
        await updateUser(userSelected);
        const updatedUsers = users.map((user) => {
            if (user.id === userSelected.id) return userSelected;
            return user;
        });
        setUsers([...updatedUsers]);
        close();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserSelected((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleNumberChange1 = (e) => {
        const { value } = e.target;

        setUserSelected({
            ...userSelected,
            numbers: [
                {
                    number: value,
                    numberType: userSelected.numbers[0].numberType,
                },
                userSelected.numbers[1],
            ],
        });
    };

    const handleNumberChange2 = (e) => {
        const { value } = e.target;

        setUserSelected({
            ...userSelected,
            numbers: [
                userSelected.numbers[0],
                {
                    number: value,
                    numberType: userSelected.numbers[1].numberType,
                },
            ],
        });
    };

    const handleFirstNumberChange = (e) => {
        setUserSelected({
            ...userSelected,
            numbers: [
                {
                    number: userSelected.numbers[0].number,
                    numberType: e.target.value,
                },
                userSelected.numbers[1],
            ],
        });
    };

    const handleSecondNumberChange = (e) => {
        setUserSelected({
            ...userSelected,
            numbers: [
                userSelected.numbers[0],
                {
                    number: userSelected.numbers[1].number,
                    numberType: e.target.value,
                },
            ],
        });
    };

    return (
        <div className={classes.modal}>
            <TextField
                name="firstName"
                className={classes.inputMaterial}
                label="First Name"
                onChange={handleChange}
                value={userSelected.firstName}
            />
            <br />
            <TextField
                name="lastName"
                className={classes.inputMaterial}
                label="Last Name"
                onChange={handleChange}
                value={userSelected.lastName}
            />
            <br />
            <div className={classes.numberWrapper}>
                <TextField
                    name="firstNumber"
                    className={classes.inputMaterial}
                    label="First Number"
                    onChange={handleNumberChange1}
                    value={userSelected.numbers[0].number}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Number Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={userSelected.numbers[0].numberType}
                        onChange={handleFirstNumberChange}
                    >
                        <MenuItem value={NUMBER_TYPES.PERSONAL}>Personal</MenuItem>
                        <MenuItem value={NUMBER_TYPES.WORK}>Work</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <br />
            <div className={classes.numberWrapper}>
                <TextField
                    name="secondNumber"
                    className={classes.inputMaterial}
                    label="Second Number"
                    onChange={handleNumberChange2}
                    value={userSelected.numbers[1].number}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Number Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={userSelected.numbers[1].numberType}
                        onChange={handleSecondNumberChange}
                    >
                        <MenuItem value={NUMBER_TYPES.PERSONAL}>Personal</MenuItem>
                        <MenuItem value={NUMBER_TYPES.WORK}>Work</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <br />
            <br />
            <div align="right">
                <Button color="primary" onClick={() => createOrUpdate()}>
                    Confirm
                </Button>
                <Button onClick={() => close()}>Cancel</Button>
            </div>
        </div>
    );
};

export default EditModal;

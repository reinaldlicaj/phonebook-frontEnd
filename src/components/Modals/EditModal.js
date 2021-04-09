import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core/";

import { createUser, updateUser } from "../../services";

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
}));

const EditModal = ({ users, setUsers, close, selectedUser }) => {
    const classes = useStyles();
    const [userSelected, setUserSelected] = useState(
        selectedUser.id !== ""
            ? selectedUser
            : {
                  firstName: "",
                  lastName: "",
                  privateNumber: "",
                  workNumber: "",
              }
    );

    const createOrUpdate = () => {
        userSelected.id === "" ? handleCreate() : handleUpdate();
    };

    const handleCreate = async () => {
        await createUser(userSelected);
        setUsers([...users, userSelected]);
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
            <TextField
                name="privateNumber"
                className={classes.inputMaterial}
                label="Private Number"
                onChange={handleChange}
                value={userSelected.privateNumber}
            />
            <br />
            <TextField
                name="workNumber"
                className={classes.inputMaterial}
                label="Work Number"
                onChange={handleChange}
                value={userSelected.workNumber}
            />
            <br />
            <br />
            <div align="right">
                <Button color="primary" onClick={() => createOrUpdate()}>
                    Insert
                </Button>
                <Button onClick={() => close()}>Cancel</Button>
            </div>
        </div>
    );
};

export default EditModal;

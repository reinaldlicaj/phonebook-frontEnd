import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core/";
import { deleteUser } from "../../services";

const useStyles = makeStyles((theme) => ({
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

const DeleteModal = ({ users, setUsers, close, selectedUser }) => {
    const classes = useStyles();

    const handleDelete = async () => {
        await deleteUser(selectedUser);
        setUsers(users.filter((user) => user.id !== selectedUser.id));
        close();
    };

    return (
        <div className={classes.modal}>
            <p>
                Are you sure you want to delete user : <b>{selectedUser && selectedUser.firstName}</b>
            </p>
            <div align="right">
                <Button color="secondary" onClick={handleDelete}>
                    Yes
                </Button>
                <Button onClick={() => close()}>No</Button>
            </div>
        </div>
    );
};

export default DeleteModal;

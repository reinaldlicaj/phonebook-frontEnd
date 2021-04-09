import { useEffect, useState } from "react";
import { getAllUsers } from "../services";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Modal,
    Button,
    TablePagination,
} from "@material-ui/core/";
import { Edit, Delete } from "@material-ui/icons";
import Navbar from "./Navbar";
import EditModal from "./Modals/EditModal";
import DeleteModal from "./Modals/DeleteModal";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
}))(TableRow);
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
    icons: {
        cursor: "pointer",
    },
    inputMaterial: {
        width: "100%",
    },
    root: {
        flexGrow: 1,
    },
}));

const emptyUser = {
    firstName: "",
    lastName: "",
    privateNumber: "",
    workNumber: "",
};

const App = () => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [modalInsert, setModalInsert] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [userSelected, setUserSelected] = useState(emptyUser);

    const openEditModal = () => {
        if (modalInsert) setUserSelected(emptyUser);
        setModalInsert(!modalInsert);
    };

    const openDeleteModal = () => {
        if (modalDelete) setUserSelected(emptyUser);
        setModalDelete(!modalDelete);
    };

    const selectUser = (user, isEdit) => {
        setUserSelected(user);
        isEdit ? openEditModal() : openDeleteModal();
    };

    useEffect(() => {
        const fetch = async () => {
            const usersResponse = await getAllUsers();
            setUsers(usersResponse);
        };
        fetch();
    }, []);

    return (
        <div>
            <div className={classes.root}>
                <Navbar search={setSearch} />
            </div>

            <br />

            <Button variant="contained" color="primary" onClick={openEditModal}>
                Add
            </Button>
            <br />
            <br />

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>First Name</StyledTableCell>
                            <StyledTableCell align="right">Last Name</StyledTableCell>
                            <StyledTableCell align="right">Private Number</StyledTableCell>
                            <StyledTableCell align="right">Work Number</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users
                            .filter((user) => {
                                if (search === "") {
                                    return user;
                                } else if (user.firstName.toLowerCase().includes(search.toLowerCase())) {
                                    return user;
                                }
                            })
                            .map((user) => {
                                return (
                                    <StyledTableRow key={user.id}>
                                        <StyledTableCell component="th" scope="row">
                                            {user.firstName}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{user.lastName}</StyledTableCell>
                                        <StyledTableCell align="right">{user.privateNumber}</StyledTableCell>
                                        <StyledTableCell align="right">{user.workNumber}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                startIcon={<Edit />}
                                                onClick={() => selectUser(user, true)}
                                            >
                                                Edit{" "}
                                            </Button>
                                            &nbsp;&nbsp;&nbsp;
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                className={classes.button}
                                                startIcon={<Delete />}
                                                onClick={() => selectUser(user, false)}
                                            >
                                                Delete{" "}
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal open={modalInsert} onClose={openEditModal}>
                <EditModal users={users} setUsers={setUsers} close={openEditModal} selectedUser={userSelected} />
            </Modal>
            <Modal open={modalDelete} onClose={openDeleteModal}>
                <DeleteModal users={users} setUsers={setUsers} close={openDeleteModal} selectedUser={userSelected} />
            </Modal>
            <TablePagination
                component="div"
                count={100}
                page={""}
                onChangePage={""}
                rowsPerPage={""}
                onChangeRowsPerPage={""}
            />
        </div>
    );
};

export default App;

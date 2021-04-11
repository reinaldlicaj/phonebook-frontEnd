import { useEffect, useState } from "react";
import { getAllUsers } from "../services";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Button, TablePagination } from "@material-ui/core/";
import Navbar from "./Navbar";
import EditModal from "./Modals/EditModal";
import DeleteModal from "./Modals/DeleteModal";
import TableIndex from "./Table";
import { emptyUser } from "../entities/User";

const useStyles = makeStyles((theme) => ({
    app: {
        height: "100vh",
        maxHeight: "100vh",
        display: "grid",
        gridTemplateRows: "min-content min-content 1fr",
        gap: 10,
    },
    buttonWrapper: {
        display: "grid",
        justifyContent: "end",
        paddingRight: 15,
    },
    addButton: {
        width: 200,
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
    icons: {
        cursor: "pointer",
    },
    inputMaterial: {
        width: "100%",
    },
    root: {
        flexGrow: 1,
    },
    main: {
        padding: 15,
        paddingBottom: 0,
    },
}));

const App = () => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [modalInsert, setModalInsert] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [userSelected, setUserSelected] = useState(emptyUser);
    const [page, setPage] = useState(1);


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
            const usersResponse = await getAllUsers(page);
            console.log(usersResponse)
            setUsers(usersResponse);
        };
        fetch();
    }, [page]);

    return (
        <div className={classes.app}>
            <div className={classes.root}>
                <Navbar search={setSearch} />
            </div>
            <div className={classes.buttonWrapper}>
                <Button variant="contained" color="primary" onClick={openEditModal} className={classes.addButton}>
                    Add
                </Button>
            </div>
            <div className={classes.main}>
                <TableIndex users={users} selectUser={selectUser} search={search} setUsers={setUsers}/>
                <Modal open={modalInsert} onClose={openEditModal}>
                    <EditModal users={users} setUsers={setUsers} close={openEditModal} selectedUser={userSelected} />
                </Modal>
                <Modal open={modalDelete} onClose={openDeleteModal}>
                    <DeleteModal
                        users={users}
                        setUsers={setUsers}
                        close={openDeleteModal}
                        selectedUser={userSelected}
                    />
                </Modal>
                <TablePagination
                    component="div"
                    count={100}
                    page={page}
                    onChangePage={(e, newPage) => {
                        setPage(newPage);
                    }}
                    onpage
                    rowsPerPage={10}
                    onChangeRowsPerPage={""}
                />
            </div>
        </div>
    );
};

export default App;

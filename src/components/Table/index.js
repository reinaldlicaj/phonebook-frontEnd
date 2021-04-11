import { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
    TableCell,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
} from "@material-ui/core/";
import UserRow from "./Row";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#3f51b5",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

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
        maxHeight: "77vh",
        minHeight: "77vh",
    },
}));

const TableIndex = ({ users, selectUser, search, setUsers }) => {
    const classes = useStyles();
    const [order, setOrder] = useState("desc");
    const filteredUsers = users.filter((user) => {
        return user.firstName.toLowerCase().includes(search.toLowerCase());
    }).sort(() => order === "asc" ? 1 : -1);

    const orderUsers = () => {
        if (order === "asc") {
            setOrder("desc");
        } else {
            setOrder("asc");
        }
    };

    return (
        <TableContainer component={Paper} classes={{ root: classes.root }}>
            <Table className={classes.table} aria-label="customized table" stickyHeader variant="default">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <TableSortLabel  direction={order} onClick={orderUsers} />
                            First Name
                        </StyledTableCell>

                        <StyledTableCell align="right">Last Name</StyledTableCell>
                        <StyledTableCell align="right">First Number</StyledTableCell>
                        <StyledTableCell align="right">Second Number</StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredUsers.map((user) => {
                        return <UserRow user={user} selectUser={selectUser} />;
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableIndex;

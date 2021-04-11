
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { TableCell, TableRow, Button } from "@material-ui/core/";
import { Edit, Delete } from "@material-ui/icons";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#3f51b5",
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

const UserRow = ({user, selectUser}) => {
    const classes = useStyles()
    return (
        <StyledTableRow key={user.id}>
            <StyledTableCell component="th" scope="row">
                {user.firstName}
            </StyledTableCell>
            <StyledTableCell align="right">{user.lastName}</StyledTableCell>
            <StyledTableCell align="right">{user.numbers[0].number}</StyledTableCell>
            <StyledTableCell align="right">{user.numbers[1].number}</StyledTableCell>
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
};

export default UserRow
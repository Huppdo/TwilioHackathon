import { createMuiTheme } from '@material-ui/core/styles';
import lightBlue from "@material-ui/core/colors/lightBlue";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import Copyright from "./copyright";

const mainTheme = createMuiTheme({
    palette: {
        primary: lightBlue,
        secondary: blue,
        error: red,
    },
    status: {
        danger: 'orange',
    },
});

export default mainTheme;
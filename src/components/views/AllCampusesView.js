import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    fontType: 'bold',
    fontFamily: 'Courier, sans-serif', 
    fontSize: '35px', 
    color: '#CDDC39'
  },
  appBar:{
    backgroundColor: '#11153e',
    shadows: ['none'],
  },
  greeting:{
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: "50%",
    margin: "auto",
  },
  links:{
    textDecoration: 'none',
  }

}));

const AllCampusesView = (props) => {
  const classes = useStyles();
  if (!props.allCampuses.length) {
    return <div>There are no campuses.</div>;
  }
  return (
    <><AppBar position="static" elevation={0} className={classes.appBar}>
    <Toolbar>
      <Link variant="h6" className={classes.title} to={'/'} color="inherit" >
        Home
      </Link>

      <Link className={classes.links} to={'/campuses'} >
        <Button variant="contained" color="primary" style={{marginRight: '10px'}}>
          All Campuses
        </Button>
      </Link>

      <Link className={classes.links} to={'/students'} >
        <Button variant="contained" color="primary">
          All Students
        </Button>
      </Link>
    </Toolbar>
  </AppBar>
    <div>
      {props.allCampuses.map((campus) => (
        <div key={campus.id}>
          <Link to={`/campus/${campus.id}`}>
            <h1>{campus.name}</h1>
          </Link>
          <p>{campus.description}</p>
        </div>
      ))}
    </div></>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;
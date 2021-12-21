import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
  const {deleteCampus} = props;
  if (!props.allCampuses.length) {
    return <div>There are no campuses.
      <Link to={'/newcampus'}>
        <button>Add New Campus</button>
      </Link>
    </div>;
    
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
          <button onClick={() => deleteCampus(campus.id)}>Delete </button> 
        </div>
        
      ))}
      <Link to={`/newcampus`}>
        <button>Add New Student</button>
      </Link>
    </div></>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;
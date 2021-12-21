import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import EditCampusView from "../views/EditCampusView";
import { editCampusThunk, fetchCampusThunk } from "../../store/thunks";

class EditCampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      description: null,
      imageUrl: "",
      redirect: false,
      redirectId: null,
    };
  }

  componentDidMount() {
    this.props.fetchCampus(window.location.pathname.slice(-1));

    this.setState({
      name: this.props.campus.name,
      imageUrl: this.props.campus.imageUrl,
      address: this.props.campus.address,
      description: this.props.campus.description,
      redirect: false,
      redirectId: null,
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event, cid) => {
    event.preventDefault();

    let editedCampus = {
      name: this.state.name,
      imageUrl: this.state.imageUrl,
      address: this.state.address,
      description: this.state.description,
      id: cid,
    };

    await this.props.editCampus(editedCampus);

    this.setState({
      name: "",
      address: null,
      description: null,
      imageUrl: "",
      redirect: true,
      redirectId: cid,
    });
  };

  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/campus/${this.state.redirectId}`} />;
    }
    return (
      <EditCampusView
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        campus={this.props.campus}
      />
    );
  }
}

const mapState = (state) => {
  return {
    campus: state.campus,
  };
};

const mapDispatch = (dispatch) => {
  return {
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
    fetchCampus: (campus) => dispatch(fetchCampusThunk(campus)),
  };
};

export default connect(mapState, mapDispatch)(EditCampusContainer);
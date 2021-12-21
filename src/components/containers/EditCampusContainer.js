import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { editCampusThunk, fetchCampusThunk, editStudentThunk } from '../../store/thunks';


class EditCampusContainer extends Component {
    constructor(props){
        super(props);
        let toEdit = this.props.fetchCampus(this.props.match.params.id);
        this.state = {
          name: toEdit.name,
          address: toEdit.address,
          description: toEdit.description,
          imageURL: toEdit.imageURL,
          redirect: false,
          redirectId: toEdit.id,
          addstudent: "",
          removestudent: "",
        };
    }

    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleSubmit = async event => {
        event.preventDefault();

        let campus = {
            id: this.props.match.params.id,
            name: this.state.name,
            address: this.state.address,
            description: this.state.description,
            imageURL: this.state.imageURL,
        };

        await this.props.editCampus(campus);


        //// Add and remove students ////

        // Split input list into an array of IDs to add
        this.setState({"addstudent": this.state.addstudent.split(",")});

        // For each ID in the array, change their campus ID to this one
        await this.state.addstudent.forEach((char) => {
          let studier = {id: char, campusId: campus.id};
          this.props.editStudent(studier);
        });

        // Split input list into an array of IDs to remove
        this.setState({"removestudent": this.state.removestudent.split(",")});

        // For each ID in the array, remove their campus ID
        // Known bug: remove works from any campus, even if the student doesn't go there.
        await this.state.removestudent.forEach((char) => {
          let studier = {id: char, campusId: null};
          this.props.editStudent(studier);
        });

        // Reset state after updating
        this.setState({
          name: "",
          address: "",
          description: "",
          imageURL: "",
          students: null,
          redirect: true,
          redirectId: campus.id
        });
    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }

    render() {
        if(this.state.redirect) {
          return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
        }
        return (
          <EditCampusView
            handleChange = {this.handleChange}
            handleSubmit = {this.handleSubmit}
          />
        );
    }
}

const mapDispatch = (dispatch) => {
    return({
        editCampus: (campus) => dispatch(editCampusThunk(campus)),
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
        editStudent: (student) => dispatch(editStudentThunk(student)),
    })
}

export default connect(null, mapDispatch)(EditCampusContainer);
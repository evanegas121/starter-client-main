import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import { editStudentThunk, fetchStudentThunk } from '../../store/thunks';


class EditStudentContainer extends Component {
    constructor(props){
        super(props);
        let toEdit = this.props.fetchStudent(this.props.match.params.id);
        this.state = {
          firstname: toEdit.firstname,
          lastname: toEdit.lastname,
          email: toEdit.email,
          gpa: toEdit.gpa,
          campusId: toEdit.campusId,
          redirect: false,
          redirectId: toEdit.id
        };
    }

    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleSubmit = async event => {
        event.preventDefault();
        console.log(this.props.match.params.id);
        let student = {
            id: this.props.match.params.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            gpa: this.state.gpa,
            campusId: this.state.campusId
        };

        await this.props.editStudent(student);

        this.setState({
          firstname: "",
          lastname: "",
          email: "",
          gpa: null,
          campusId: null,
          redirect: true,
          redirectId: student.id,
        });
    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }

    render() {
        if(this.state.redirect) {
          return (<Redirect to={`/student/${this.state.redirectId}`}/>)
        }
        return (
          <EditStudentView
            handleChange = {this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        );
    }
}

const mapDispatch = (dispatch) => {
    return({
        editStudent: (student) => dispatch(editStudentThunk(student)),
        fetchStudent: (student) => dispatch(fetchStudentThunk(student)),
    })
}

export default connect(null, mapDispatch)(EditStudentContainer);
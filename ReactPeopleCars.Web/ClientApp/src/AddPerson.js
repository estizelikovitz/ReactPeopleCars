import React from 'react';
import { produce } from 'immer';
import axios from 'axios';
import { Link } from 'react-router-dom';


class AddPerson extends React.Component {
    state = {
        person: {
            firstName: '',
            lastName: '',
            age: ''
        }
    }

    onTextChange = e => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }

    onSubmitClick = async () => {
        await axios.post('/api/peoplecars/addperson', this.state.person);
        this.props.history.push('/');


    }

    render() {
        return (
            <>
                <br />
                <div >
                    <div className="row">
                        <div className="col-md-6 offset-md-3 card card-body bg-light">
                            <h2>Add a New Person</h2>
                            <input type="text" className="form-control" name="firstName" placeholder="First Name" onChange={this.onTextChange}/>
                            <br />
                            <input type="text" className="form-control" name="lastName" placeholder="Last Name" onChange={this.onTextChange} />
                            <br />
                            <input type="text" className="form-control" name="age" placeholder="Age" onChange={this.onTextChange}/>
                            <br />
                                <button className="btn btn-primary btn-lg btn-block" onClick={this.onSubmitClick}>Submit</button>
                        </div>
                    </div>
                </div>
            </>
        )

    }
}
export default AddPerson;
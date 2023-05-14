import React from 'react';
import { produce } from 'immer';
import axios from 'axios';
import { Link } from 'react-router-dom';


class AddCar extends React.Component {
    state = {
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        car: {
            make: '',
            model: '',
            year: '',
            personid: ''
        }
    }
    componentDidMount = async () => {
        const { id } = this.props.match.params;
        this.setState({ car: { personid: id } });
        const { data } = await axios.get(`/api/peoplecars/getpersonbyid`, { params: { id: id } });
        this.setState({ person: data });

    }
    onTextChange = e => {
        const copy = { ...this.state.car };
        copy[e.target.name] = e.target.value;
        this.setState({ car: copy });
    }

    onSubmitClick = async () => {
        await axios.post('/api/peoplecars/addcar', this.state.car);
        this.props.history.push('/');


    }
    render() {
        return (
            <>
                <br />
                <div className="container" >
                    <div>
                        <div className="row">
                            <div className="col-md-6 offset-md-3 card card-body bg-light">
                                <h2>Add a car for {this.state.person.firstName} {this.state.person.lastName}</h2>
                                <input type="text" className="form-control" name="make" placeholder="Make" onChange={this.onTextChange} />
                                <br />
                                <input type="text" className="form-control" name="model" placeholder="Model" onChange={this.onTextChange} />
                                <br />
                                <input type="text" className="form-control" name="year" placeholder="Year" onChange={this.onTextChange} />
                                <br />
                                <button className="btn btn-primary btn-lg btn-block" onClick={this.onSubmitClick} >Submit</button>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )

    }
}
export default AddCar;
import React from 'react';
import PersonRow from './PersonRow';
import axios from 'axios';
import { produce } from 'immer';

import { Link } from 'react-router-dom';


class Home extends React.Component {
    state = {
        people: [],
        cars: []
    }

    componentDidMount = () => {
        this.refreshPeople();
        //await this.getCars();
    }

    refreshPeople = async () => {
        const { data } = await axios.get('/api/peoplecars/getall');
        this.setState({ people: data });

    }
    //getCars = async () => {
    //    const { data } = await axios.get('/api/peoplecars/getcars');
    //    this.setState({ cars: data });
    //    console.log(this.state.cars);

    //}
    render() {
        return (
            <>
                <div className="container" >
                    <div >
                        <br/>
                        <div className="row">
                            <div className="col-md-10">
                                <input type="text" className="form-control form-control-lg" placeholder="Search People" >
                                </input>
                                <div className="col-md-6">
                                    <button className="btn btn-info btn-lg btn-block" >Clear</button>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-md-12" >

                                    <Link to="/addperson" >
                                        <button className="btn btn-success btn-lg btn-block">Add Person</button>
                                    </Link>
                                </div>
                            </div>
                            <table className="table table-hover table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Age</th>
                                        <th>Car Count</th>
                                        <th>Add Car</th>
                                        <th>Delete Cars</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.people.map(p =>
                                        <PersonRow person={p} key={ p.id} />)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default Home;
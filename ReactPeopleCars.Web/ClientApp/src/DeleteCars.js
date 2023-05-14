import React from 'react';
import { produce } from 'immer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CarRow from './CarRow';


class DeleteCars extends React.Component {
    state = {
        person: '',
        cars: []
    }
    componentDidMount = async () => {
        const { id } = this.props.match.params;
        this.setState({ person: { id: id } });
        const { data } = await axios.get('/api/peoplecars/getpersonbyid', { params: {id: id } });
        this.setState({ person: data });
        this.getCars();
    }

    getCars = async () => {
        const { id } = this.props.match.params;
        const { data } = await axios.get('/api/peoplecars/getcarsbyperson', { params: { personId: id } });
        this.setState({ cars: data });
    }

    onDeleteClick = async () => {
        const { id } = this.props.match.params;
        await axios.post(`/api/peoplecars/deletecars?personId=${id}` );
        this.props.history.push('/');
    }

    render() {
        return (
            <>
                <div className="container" >
                    <div >
                        <div className="row">
                            <div className="col-md-10">
                                <input type="text" className="form-control form-control-lg" placeholder="Search People" />
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-info btn-lg btn-block">Clear</button>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-12">
                                <table className="table table-hover table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Make</th>
                                            <th>Model</th>
                                            <th>Year</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.cars.map(c =>
                                            <CarRow car={c} key={c.id} />)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <h3>Are you sure you want to delete all of these cars?</h3>
                            </div>
                            <div className="col-md-6" >
                                <Link to='/'>
                                    <button className="btn btn-primary btn-lg btn-block" >No</button>
                                </Link>
                            </div>
                            <div className="col-md-6" >
                                <button className="btn btn-danger btn-lg btn-block" onClick={this.onDeleteClick} >Yes</button>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )

    }
}
export default DeleteCars;



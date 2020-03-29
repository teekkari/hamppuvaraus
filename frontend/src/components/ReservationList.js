import React from 'react';
import axios from 'axios';

class ReservationList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            reservations: [],
        }

        this.fetchReservations();
    }

    fetchReservations = () => {
        const postUrl = 'http://localhost:5000/hamppu/list';
        axios.get(postUrl)
            .then( (res) => this.setState({ reservations: res.data }) )
            .catch( (error) => null);
    }

    renderReservations() {

        let outputList = [];

        for (const res of this.state.reservations) {
            outputList.push(
                <li>
                    <h3>{res.name}</h3>
                    <p>Varaus ajalle {res.startDate} - {res.endDate}</p>
                </li>
            );
        }
        return(<ul>{outputList}</ul>);
    }

    render() {
        return (
            <>
                <h1>Varaukset</h1>
                {this.renderReservations()}
            </>
        );
    }
}

export default ReservationList;
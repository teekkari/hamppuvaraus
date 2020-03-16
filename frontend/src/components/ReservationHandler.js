import React from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';

class ReservationHandler extends React.Component {

    constructor() {
        super();
        this.state = {
            reserver : "",
            phone: "",
            startDate : null,
            endDate : null,
        };
    }

    fieldCallback = (fieldName, event) => {
        this.setState({
            [fieldName] : event.target.value
        });
    }

    calendarCallback = (fieldName, value) => {

        const dateString = value.toISOString().split("T")[0];
        this.setState({
            [fieldName] : dateString,
        });
    }

    sendReservation = () => {

        const postUrl = window.location.href + 'hamppu/uusi';

        console.log(postUrl);

        axios.post(postUrl, {
            name: this.state.reserver,
            phone: this.state.phone,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        });
    }

    render() {
        return (
        <div id="uusi-varaus" className="container">
            <h1>Uusi varaus</h1>
            <div id="uusi-varaus-form">
                <h2>Varauksen tiedot</h2>
                <div>
                    <label htmlFor="">Varaajan nimi</label><br/>
                    <input type="text" id="uusi-varaus-varaaja" name="uusi-varaus-varaaja" onChange={(event) => this.fieldCallback("reserver", event)}/>
                </div>
                <br/>

                <div>
                    <label htmlFor="uusi-varaus-puh">Puhelinnumero</label><br/>
                    <input type="text" id="uusi-varaus-puh" name="uusi-varaus-puh" onChange={(event) => this.fieldCallback("phone", event)}/>
                </div>

                <button className="btn" onClick={ () => console.log(this.state)}>Lukitse varaus</button>
            </div>
            <div>
                <h2>Varauksen alku</h2>
                <Calendar onClickDay={(value) => this.calendarCallback("startDate", value)}/>
            </div>
            <div>
                <h2>Varauksen loppu</h2>
                <Calendar onClickDay={(value) => this.calendarCallback("endDate", value)}/>
            </div>
        </div>);
    }
}

export default ReservationHandler;
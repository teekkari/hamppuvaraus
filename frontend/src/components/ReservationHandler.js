import React from 'react';
import Calendar from 'react-calendar';
import AnchorLink from 'react-anchor-link-smooth-scroll';
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

        console.log(value);

        const day = value.getDate();
        const month = value.getMonth() + 1;
        const year = value.getFullYear();

        const dateString = [year, month, day].join('-');

        //const dateString = value.toISOString().split("T")[0];

        console.log(dateString);
        this.setState({
            [fieldName] : dateString,
        });
    }

    sendReservation = () => {

        const postUrl = 'http://localhost:5000/hamppu/uusi';

        const params = {
            name: this.state.reserver,
            phone: this.state.phone,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        };

        axios.post(postUrl, params)
        .then( (res) => {
            alert("Varaus lisätty onnistuneesti.");
            window.location.reload(true);
            window.location.assign(window.location.href.split("#")[0] + "#main-front-page")
        })
        .catch( (error) => alert("Varauksessa tuli ongelma. Tarkasta varauksen tiedot ja yritä uudelleen."));
    }

    render() {
        return (
        <div id="uusi-varaus" className="container">
            <h1>Uusi varaus</h1>
            <div id="uusi-varaus-form">
                <h2>Varauksen tiedot</h2>
                <div>
                    <label htmlFor="">Varaajan nimi *</label><br/>
                    <input type="text" id="uusi-varaus-varaaja" name="uusi-varaus-varaaja" onChange={(event) => this.fieldCallback("reserver", event)}/>
                </div>
                <br/>

                <div className="bottom-spacer">
                    <label htmlFor="uusi-varaus-puh">Puhelinnumero</label><br/>
                    <input type="text" id="uusi-varaus-puh" name="uusi-varaus-puh" onChange={(event) => this.fieldCallback("phone", event)}/>
                </div>

                <button className="btn" onClick={this.sendReservation}>Lukitse varaus</button>
                <AnchorLink href="#main-front-page">
                    <button className="btn darker-bg">Takaisin</button>
                </AnchorLink>
            </div>
            <div>
                <h2>Varauksen alku *</h2>
                <Calendar onClickDay={(value) => this.calendarCallback("startDate", value)}/>
            </div>
            <div>
                <h2>Varauksen loppu *</h2>
                <Calendar onClickDay={(value) => this.calendarCallback("endDate", value)}/>
            </div>
        </div>);
    }
}

export default ReservationHandler;
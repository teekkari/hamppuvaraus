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

        //const postUrl = 'http://localhost:5000/hamppu/uusi';
        const postUrl = "http://" + window.location.host.split(":")[0] + ":5000/hamppu/uusi";

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
        .catch( (error) => {
            if (error.response.status === 400) {
                alert("Varauksesta puuttuu tietoja. Täytä varauksen alku, loppu ja varaajan nimi.");
            }

            if (error.response.status === 500) {
                alert("Varaus on päällekkäin olemassaolevien kanssa. Vaihda varauksen ajankohtaa.")
            }
        });
    }

    render() {
        return (
        <div id="uusi-varaus" className="container">
            <h1>Uusi varaus</h1>

            <div id="uusi-varaus-flex">

                <div id="uusi-varaus-form" className="container-side">
                    <h2>Varauksen tiedot</h2>
                    <div>
                        <label htmlFor="uusi-varaus-varaaja">Varaajan nimi *</label><br/>
                        <input type="text" id="uusi-varaus-varaaja" name="uusi-varaus-varaaja" onChange={(event) => this.fieldCallback("reserver", event)}/>
                    </div>

                    <div>
                        <label htmlFor="uusi-varaus-puh">Puhelinnumero</label><br/>
                        <input type="text" id="uusi-varaus-puh" name="uusi-varaus-puh" onChange={(event) => this.fieldCallback("phone", event)}/>
                    </div>

                    <button className="btn bottom-spacer" onClick={this.sendReservation}>Lukitse varaus</button>
                    <AnchorLink href="#main-front-page" offset="20">
                        <button className="btn darker-bg">Takaisin</button>
                    </AnchorLink>
                </div>
                <div id="uusi-varaus-kalenterit-flex">
                    <div className="container-side">
                        <h2>Varauksen alku *</h2>
                        <Calendar onClickDay={(value) => this.calendarCallback("startDate", value)}/>
                    </div>
                    <div className="container-side">
                        <h2>Varauksen loppu *</h2>
                        <Calendar onClickDay={(value) => this.calendarCallback("endDate", value)}/>
                    </div>
                </div>

            </div>
        </div>);
    }
}

export default ReservationHandler;
import React from 'react';
import Calendar from 'react-calendar';


class ReservationHandler extends React.Component {

    constructor() {
        super();
        this.state = {
            reserver : "",
        };
    }

    render() {
        return (
        <div id="uusi-varaus" class="container">
            <div id="uusi-varaus-form">
                <h1>Uusi varaus</h1>
                <div>
                    <label for="">Varaajan nimi</label><br/>
                    <input type="text" id="uusi-varaus-varaaja" name="uusi-varaus-varaaja"/>
                </div>
                <br/>

                <div>
                    <label for ="">Varauksen lisätiedot</label><br/>
                    <textarea></textarea>
                </div>

                <button class="btn">Lukiste varaus</button>
            </div>
            <div>
                <h2>Varauksen alku</h2>
                <Calendar/>
            </div>
            <div>
                <h2>Varauksen loppu</h2>
                <Calendar/>
            </div>
        </div>);
    }
}

export default ReservationHandler;
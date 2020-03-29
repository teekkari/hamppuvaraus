import React from "react";
import Calendar from 'react-calendar';

import './ReservationCalendar.css';


class ReservationCalendar extends React.Component {
    constructor(props) {
        super(props);

        /*
            reservedDates: List[ List[2] ]
            each element is a 2d-array, range of the dates
        */
        this.state = {
            reservedDates : [
                [new Date(2020, 0, 3), new Date(2020, 0, 5)],
                [new Date(2020, 0, 10), new Date(2020, 0, 11)],
            ]
        }
    }

    getTileClass = (cobj) => {

        const { activeStartDate, date, view } = cobj;

        if (view !== 'month') return;

        for (let x in this.state.reservedDates) {

            const [startDate, endDate] = this.state.reservedDates[x];

            if (startDate <= date && date <= endDate) {
                return "calendar-tile-reserved";
            }
        }

        return "calendar-tile-free";
    }

    render() {
        return (
            <div>
                <Calendar className="varauskalenteri-calendar" tileClassName={this.getTileClass}/>

                <hr/>

                <div className="example-day">
                    <img alt="esimerkki vapaa päivä" src={ require("../img/vapaa_pv_esim.png") } />
                    <span>Vapaa päivä</span>

                    <img className="example-day-img" alt="esimerkki varattu päivä" src={ require("../img/varattu_pv_esim.png")  } />
                    <span>Varattu päivä</span>
                </div>
            </div>
        );
    }
}

export default ReservationCalendar;
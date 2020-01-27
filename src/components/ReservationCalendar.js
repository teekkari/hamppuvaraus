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
                [new Date(2020, 0, 2), new Date(2020, 0, 5)],
                [new Date(2020, 0, 10), new Date(2020, 0, 10)],
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
                <Calendar tileClassName={this.getTileClass}/>
            </div>
        );
    }
}

export default ReservationCalendar;
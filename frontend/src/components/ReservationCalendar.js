import React from "react";
import Calendar from 'react-calendar';
import axios from 'axios';

import './ReservationCalendar.css';


class ReservationCalendar extends React.Component {
    constructor(props) {
        super(props);

        /*
            reservedDates: List[ List[2] ]
            each element is a 2d-array, range of the dates
        */
        this.state = {
            loading: true,
            reservedDates : []
        }

        this.fetchReservedDates();
    }

    getTileClass = (cobj) => {
        const { activeStartDate, date, view } = cobj;

        if (view !== 'month') return;

        for (let x in this.state.reservedDates) {

            let [startDate, endDate] = this.state.reservedDates[x];
            startDate = parseInt(startDate.getFullYear().toString() + startDate.getMonth().toString().padStart(2, '0') + startDate.getDate().toString().padStart(2, '0'));
            endDate = parseInt(endDate.getFullYear().toString() + endDate.getMonth().toString().padStart(2, '0') + endDate.getDate().toString().padStart(2, '0'));

            const cdate = parseInt(date.getFullYear().toString() + date.getMonth().toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0'));


            if (startDate <= cdate && cdate <= endDate) {
                return "calendar-tile-reserved";
            }

        }

        return "calendar-tile-free";
    }

    fetchReservedDates = () => {
        const postUrl = "http://" + window.location.host.split(":")[0] + ":5000/hamppu/list";
        axios.get(postUrl)
            .then( (res) => { this.setState({
                                loading: false,
                                reservedDates: this.processFetched(res.data)
                            });
            }).catch( (error) => null);
    }

    processFetched = (data) => {

        let processed = [];

        for (const obj of data) {
            processed.push([new Date(obj.startDate), new Date(obj.endDate)]);
        }

        return processed;

    }

    render() {

        if (this.state.loading) {
            return <div>Loading ...</div>;
        } else {
            return (
                <div>
                    <Calendar className="varauskalenteri-calendar" tileClassName={this.getTileClass}/>

                    <hr/>

                    <div className="example-day">
                        <img alt="esimerkki vapaa päivä" src={ require("../img/vapaa_pv_esim.png") } />
                        <span>Vapaa päivä</span>
                    </div>
                    <div className="example-day">
                        <img className="example-day-img" alt="esimerkki varattu päivä" src={ require("../img/varattu_pv_esim.png")  } />
                        <span>Varattu päivä</span>
                    </div>
                </div>
            );
        }
    }
}

export default ReservationCalendar;
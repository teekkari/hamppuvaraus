import React from "react";
import { api } from "../util/api";

class ReservationList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      reservations: [],
    };

    this.fetchReservations();
  }

  fetchReservations = () => {
    api
      .get("/hamppu/list")
      .then((res) => this.setState({ reservations: res.data }))
      .catch((error) => null);
  };

  renderReservations() {
    let outputList = [];
    const currentDate = new Date(); //.toISOString().split("T")[0];

    for (const res of this.state.reservations) {
      if (new Date(res.startDate) < currentDate) {
        continue;
      }

      const startDate =
        res.startDate.split("-")[2] + "." + res.startDate.split("-")[1] + ".";
      const endDate =
        res.endDate.split("-")[2] + "." + res.endDate.split("-")[1] + ".";
      outputList.push(
        <li>
          <h3>{res.name}</h3>
          <p>
            Varaus ajalle{" "}
            <b>
              {startDate} - {endDate}
            </b>
          </p>
        </li>
      );
    }

    if (outputList.length === 0) {
      return <div className="info-box">Ei tulevia varauksia.</div>;
    } else {
      return <ul>{outputList}</ul>;
    }
  }

  render() {
    return (
      <>
        <h1>Tulevat varaukset</h1>
        {this.renderReservations()}
      </>
    );
  }
}

export default ReservationList;

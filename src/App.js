import React from 'react';

import Calendar from 'react-calendar';
import AnchorLink from 'react-anchor-link-smooth-scroll'

import ReservationHandler from './components/ReservationHandler.js';


import './App.css';

function App() {
  return (
    <main id="main-front-page">

        <section id="varauslista-container">

          <div id="varauslista" class="container">
            <h1>Varaukset</h1>

            <ul>
              <li>
                <h3>Severi</h3>
                <p>Varaus ajalle 1/2/2020 - 3/2/2020</p>
              </li>
              <li>
                <h3>Lauri</h3>
                <p>Varaus ajalle 15/2/2020 - 15/2/2020</p>
              </li>
              <li>
                <h3>Isoäiti</h3>
                <p>Varaus ajalle 3/3/2020 - 10/3/2020</p>
              </li>
            </ul>

            <AnchorLink offset="-5" href="#uusi-varaus-container"><button class="btn" id="uusi-varaus-btn">Tee uusi varaus</button></AnchorLink>

          </div>

        </section>

        <section id="varauskalenteri-container" class="dark-bg">

          <div id="varauskalenteri" class="container">
            <h1>Kalenteri</h1>
            <Calendar />
          </div>
        </section>


        <section id="uusi-varaus-container" class="dark-bg">
            <ReservationHandler />
        </section>
    </main>
  );
}

export default App;

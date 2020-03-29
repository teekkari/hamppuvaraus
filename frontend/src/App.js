import React from 'react';

import AnchorLink from 'react-anchor-link-smooth-scroll'

import ReservationHandler from './components/ReservationHandler.js';
import ReservationCalendar from './components/ReservationCalendar.js';
import ReservationList from './components/ReservationList.js';


import './App.css';

function App() {
  return (
    <main id="main-front-page">

        <header className="primary-bg">
          <h1>Hamppukallio</h1>
        </header>

        <section id="varauslista-container" className="light-bg">


          <div id="varauslista" className="container">

            <ReservationList />

          </div>
          
          <div id="uusivaraus-nappi">
                    <AnchorLink offset="-5" href="#uusi-varaus-container"><button className="btn primary-bg" id="uusi-varaus-btn">Tee uusi varaus</button></AnchorLink>
          </div>

        </section>

        <section id="varauskalenteri-container" className="dark-bg">

          <div id="varauskalenteri" className="container">
            <h1>Kalenteri</h1>
            <ReservationCalendar />
          </div>
        </section>


        <section id="uusi-varaus-container" className="dark-bg">
            <ReservationHandler />
        </section>
    </main>
  );
}

export default App;

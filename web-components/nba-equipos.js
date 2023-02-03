const template1 = document.createElement('template');
template1.innerHTML = `
    <style>

    </style>

    <div>
        <label>Conferencias:</label>
        <select class="tSelConferencias">
            <option selected disabled>Elige una conferencia</option>
        </select>
    </div>

    <div>
        <label>Equipos:</label>
        <select class="tSelEquipos">
            <option selected disabled>Elige un equipo</option>
        </select>
    </div>
`;

class NBAEquipos extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template1.content.cloneNode(true));
    }

    connectedCallback() {
        this.retrieveConferences();
        const nSelConferencias = this.shadowRoot.querySelector('.tSelConferencias');
        nSelConferencias.onchange = e => this.retrieveTeamsByConference(e);
    }

    async retrieveConferences() {
        try {
            const response = await fetch('http://127.0.0.1/practica_nba/rest.php?conferencias', { method: 'GET' });
            const data = await response.json();
            this.fillConferences(data);
        } catch(e) {
            console.error(e);
        }
    }

    fillConferences(conferences) {
        const nSelConferencia = this.shadowRoot.querySelector('.tSelConferencias');
        conferences.forEach(conference => {
            const nOpt = document.createElement('option');
            nOpt.value = conference.Conferencia;
            nOpt.innerText = conference.Conferencia;
            nSelConferencia.appendChild(nOpt);
        });
    }

    async retrieveTeamsByConference(e) {
        const conference = e.target.value;
        try {
            const response = await fetch(`http://127.0.0.1/practica_nba/rest.php?conferencia=${conference}`, { method: 'GET' });
            const data = await response.json();
            this.fillTeamsByConference(data);
        } catch(e) {
            console.error(e);
        }
    }

    fillTeamsByConference(teams) {
        const nSelEquipos = this.shadowRoot.querySelector('.tSelEquipos');
        nSelEquipos.innerHTML = '<option selected disabled>Elige un equipo</option>';
        teams.forEach(team => {
            const nOpt = document.createElement('option');
            nOpt.value = team.Nombre;
            nOpt.innerText = team.Nombre;
            nSelEquipos.appendChild(nOpt);
        });
    }
}

customElements.define("nba-equipos", NBAEquipos);
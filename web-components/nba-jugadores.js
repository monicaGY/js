const template2 = document.createElement('template');
template2.innerHTML = `
    <style>
        
    </style>
    <label>Jugadores:</label>
    <select class="tSelJugadores">
        <option selected disabled>Elige un jugador</option>
    </select>
`;

class NBAJugadores extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template2.content.cloneNode(true));
    }

    connectedCallback() {
        const nSelEquipos = document.querySelector('nba-equipos').shadowRoot.querySelector('.tSelEquipos');
        nSelEquipos.onchange = e => this.retrievePlayersByTeam(e);
    }

    async retrievePlayersByTeam(e) {
        const team = e.target.value;
        try {
            const response = await fetch(`http://127.0.0.1/practica_nba/rest.php?equipo=${team}`, { method: 'GET' });
            const data = await response.json();
            this.fillPlayers(data);
        } catch(e) {
            console.error(e);
        }
    }

    fillPlayers(players) {
        const nSelJugadores = this.shadowRoot.querySelector('.tSelJugadores');
        nSelJugadores.innerHTML = '<option selected disabled>Elige un jugador</option>';
        players.forEach(player => {
            const nOpt = document.createElement('option');
            nOpt.value = player.codigo;
            nOpt.innerText = player.Nombre;
            nSelJugadores.appendChild(nOpt);
        });
    }
}
customElements.define("nba-jugadores", NBAJugadores);
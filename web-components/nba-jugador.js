const template3 = document.createElement('template');
template3.innerHTML = `
    <style>
        .tDivJugador {
            max-width: max-content;
        }

        .tDivJugador > div {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        .info-name {
            text-align: right;
            font-weight: bold;
            text-transform: uppercase;
        }

        table, tr, td, th {
            outline: solid 1px black;
            text-align: center;
        }

        td, th {
            padding: 0.5rem;
        }
    </style>

    
    <div class="tipo-datos">
        <label>Datos del jugador:</label>
        <div>
            <input type="radio" name="jugador" id="datos-fisicos">
            <label for="datos-fisicos">Datos Físicos</label>
        </div>
        <div>
            <input type="radio" name="jugador" id="datos-estadisticos">
            <label for="datos-estadisticos">Estadísticas</label>
        </div>
    </div>

    <div class="tDivJugador"></div>
`;

class NBAJugador extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template3.content.cloneNode(true));
    }

    connectedCallback() {
        this.player = '';
        const nSelJugadores = document.querySelector('nba-jugadores').shadowRoot.querySelector('.tSelJugadores');
        const nDivJugador = this.shadowRoot.querySelector('.tDivJugador');
        const nInpDatosFisicos = this.shadowRoot.querySelector('#datos-fisicos');
        const nInpDatosEstadisticos = this.shadowRoot.querySelector('#datos-estadisticos');
        
        nSelJugadores.onchange = e => {
            this.player = e.target.value;
            nInpDatosFisicos.checked = false;
            nInpDatosEstadisticos.checked = false;
            nDivJugador.innerHTML = '';

            nInpDatosFisicos.onchange = async e => {
                const info = await this.retrievePlayerPhysicalInfo(this.player);
                this.fillPlayerPhysicalInfo(info[0]);
            }
            
            nInpDatosEstadisticos.onchange = async e => {
                const info = await this.retrievePlayerStatisticalInfo(this.player);
                this.fillPlayerStatisticalInfo(info);
            }
        }

    }

    async retrievePlayerPhysicalInfo(player) {
        try {
            const response = await fetch(`http://127.0.0.1/practica_nba/rest.php?jugadorF=${player}`, { method: 'GET' });
            const data = await response.json();
            return data;
        } catch(e) {
            console.error(e);
        }
    }

    async retrievePlayerStatisticalInfo(player) {
        try {
            const response = await fetch(`http://127.0.0.1/practica_nba/rest.php?jugadorS=${player}`, { method: 'GET' });
            const data = await response.json();
            return data;
        } catch(e) {
            console.error(e);
        }
    }

    fillPlayerPhysicalInfo(info) {
        const nDivJugador = this.shadowRoot.querySelector('.tDivJugador');
        nDivJugador.innerHTML = '';
        for (const row in info) {
            const nDiv = document.createElement('div');
            
            const nLabel1 = document.createElement('label');
            nLabel1.innerText = row;
            nLabel1.classList.add('info-name')
            nDiv.appendChild(nLabel1);

            const nLabel2 = document.createElement('label');
            nLabel2.innerText = info[row];
            nDiv.appendChild(nLabel2);

            nDivJugador.appendChild(nDiv);
        };
    }

    fillPlayerStatisticalInfo(info) {
        const nDivJugador = this.shadowRoot.querySelector('.tDivJugador');
        nDivJugador.innerHTML = '';

        const nTab = document.createElement('table');
        nTab.innerHTML = `
            <tr>
                <th>Temporada</th>
                <th>Puntos por partido</th>
                <th>Asistencias por partido</th>
                <th>Tapones por partido</th>
                <th>Rebotes por partido</th>
            </tr>
        `;
        for (const row of info) {
            const nTr = document.createElement('tr');
            
            const nTdTemporada = document.createElement('td');
            nTdTemporada.innerText = row.temporada;
            nTr.appendChild(nTdTemporada);

            const nTdPuntos = document.createElement('td');
            nTdPuntos.innerText = row.Puntos_por_partido;
            nTr.appendChild(nTdPuntos);

            const nTdAsistencias = document.createElement('td');
            nTdAsistencias.innerText = row.Puntos_por_partido;
            nTr.appendChild(nTdAsistencias);

            const nTdTapones = document.createElement('td');
            nTdTapones.innerText = row.Puntos_por_partido;
            nTr.appendChild(nTdTapones);

            const nTdRebotes = document.createElement('td');
            nTdRebotes.innerText = row.Puntos_por_partido;
            nTr.appendChild(nTdRebotes);

            nTab.appendChild(nTr);
        };
        nDivJugador.appendChild(nTab);
    }
}
customElements.define("nba-jugador", NBAJugador);
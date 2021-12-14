import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-memory-game',
    templateUrl: './memory-game.component.html',
    styleUrls: ['./memory-game.component.scss']
})
export class MemoryGameComponent implements OnInit {

    public tarjetas: string[];
    private iconos: string[];
    private selecciones: HTMLElement[];
    constructor() { }

    public ngOnInit(): void {
        this.iconos = [];
        this.selecciones = [];

        this.generarTablero()
    }

    public generarTablero(): void {
        this.cargarIconos();
        this.selecciones = [];
        let tablero = document.getElementById("tablero");

        if (tablero !== null && tablero !== undefined) {
            this.tarjetas = [];
            for (let i = 0; i < 12; i++) {
                this.tarjetas.push(this.iconos[0]);

                //Insertamos dos inconos para que sean parejas
                if (i % 2 == 1) {
                    this.iconos.splice(0, 1)
                }
            }
            this.tarjetas.sort(() => Math.random() - 0.5); //Para que las tarjetas aparezcan de manera aleatoria
        }
    }

    public seleccionarTarjeta(tarjeta: HTMLElement): void {
        console.log("seleccionarTarjeta");
        if (this.selecciones.length == 2) return;

        if (tarjeta.style.transform != "rotateY(180deg)") {
            tarjeta.style.transform = "rotateY(180deg)";
            this.selecciones.push(tarjeta);
        }

        if (this.selecciones.length == 2) {
            this.deseleccionar();
        }
    }

    private deseleccionar(): void {
        console.log("deseleccionar");

        const primeraSeleccionada = this.selecciones[0];
        const segundaSeleccionada = this.selecciones[1];
        setTimeout(() => {
            console.log(this.selecciones);

            let trasera1 = document
                .getElementById(primeraSeleccionada.id.replace("tarjeta","trasera"));
            let trasera2 = document
                .getElementById(segundaSeleccionada.id.replace("tarjeta","trasera"));

            if (trasera1 !== null && trasera1 !== undefined &&
                trasera2 !== null && trasera2 !== undefined)
            {
                //Si no coinciden
                if (trasera1.innerHTML != trasera2.innerHTML) {
                    let tarjeta1 = primeraSeleccionada;
                    let tarjeta2 = segundaSeleccionada;
                    tarjeta1.style.transform = "rotateY(0deg)"
                    tarjeta2.style.transform = "rotateY(0deg)"
                } else { //Si coincide cambio color
                    trasera1.style.background = "green"
                    trasera2.style.background = "green"
                }
            }
            this.selecciones = [];
        }, 1000);
    }

    private cargarIconos() {
        //TODO: Llamar al API para pedir nuevo modelo de datos WORDS, filtrado por studentId
        this.iconos = [
            "assets/images/dict/hola.png",
            "assets/images/dict/si.png",
            "assets/images/dict/buenos-dias.png",
            "assets/images/dict/buenas-tardes.png",
            "assets/images/dict/adios.png",
            "assets/images/dict/nombre.png"
        ]
    }
}

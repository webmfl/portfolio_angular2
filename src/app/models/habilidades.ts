export class Habilidades {
    
    especialidad: string;
    puntaje: string;
    segmento: string;

    constructor({ especialidad, puntaje, segmento }: { especialidad: string; puntaje: string; segmento: string; }) {
    
        this.especialidad = especialidad;
        this.puntaje = puntaje;
        this.segmento = segmento;
    }
}
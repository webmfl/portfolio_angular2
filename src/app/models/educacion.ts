export class Educacion {
    
    detalle: string;
    institucion: string;
    titulo: string;

    constructor({ detalle, institucion, titulo }: { detalle: string; institucion: string; titulo: string; }) {
    
        this.detalle = detalle;
        this.institucion = institucion;
        this.titulo = titulo;
    }
}
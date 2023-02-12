export class Experiencia {
    
    detalle: string;
    empresa: string;
    periodo: string;

    constructor({ detalle, empresa, periodo }: { detalle: string; empresa: string; periodo: string; }) {
    
        this.detalle = detalle;
        this.empresa = empresa;
        this.periodo = periodo;
    }
}

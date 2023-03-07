export class Proyectos {
    
    nombre: string;
    enlace: string;
    descripcion: string;

    constructor({ nombre, enlace, descripcion }: { nombre: string; enlace: string; descripcion: string; }) {
    
        this.nombre=nombre;
        this.enlace=enlace;
        this.descripcion=descripcion;
    }
}
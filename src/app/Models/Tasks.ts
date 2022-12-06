export interface TaskI {
    Nombre: string,
    Descripcion: string,
    Fecha: string,
    Importancia: string,
    Fecha_Realizada: string,
    Estatus: 0,
    User: string
};

export interface CompletedTaskI {
    Tareas: TaskI[],
    msg: string,
    ok: boolean
}
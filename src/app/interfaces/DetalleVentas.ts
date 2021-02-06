export interface DetalleVentas{
    id_orden_pertenece: number,
    id_producto: number,
    nombre_producto: string,
    precio_producto: number;
    cantidad_producto: number, 
    stock_producto?: number,
    subtotal: number,
    descuento_producto?: number,

}
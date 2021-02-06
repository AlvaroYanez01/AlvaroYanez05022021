export interface DetalleVentas{
    Id_Orden_Pertenece: number,
    Id_Producto: number,
    Nombre_Producto: string,
    Precio_Producto: number;
    Cantidad_Producto: number, 
    Stock_Producto?: number,
    Subtotal: number,
    Descuento_Producto?: number
}
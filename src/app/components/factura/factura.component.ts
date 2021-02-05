import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

    // array de todos los items
    private allItemsClientes: any = [];
    private allItemsProductos: any = [];
    // paginacion
    pagerClientes: any = {};
    pagerProductos: any = {};
  
    forma: FormGroup;
    productos: any = [];
    clientes: any = [];
    carritoVentas: any = [];
    ventas: any = [];
    id_Cliente: number;
    editField: number;
    productosAux: any = [];
    disponible: boolean;
    loading: boolean;
    loadingD: boolean;
  
    totalVenta: number;
    desc: number;
  
    private id_sucursal;
    private id_usuario;
    abonoNoValido: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  generarVenta(){

  }

  cancelarVenta(){

  }

  obtenerDatosProductos(){

  }

    //Actualizar cantidad venta en table
    updateList(idProductoSucursal: number, id: number, property: string, event: any) {
      let editField = event.target.textContent;
      if(parseInt(editField) === 0){
        editField = 1;
        document.getElementById(id.toString()).textContent="1";
        this.calcularVenta();
      }
  
/*       this.productosServices.getStockProducto(idProductoSucursal).subscribe(
        resp =>{
          var n = resp[0].cantidad_producto;
          //console.log('stock: ' + n);
          //console.log('cantidad: ' + editField);
          if(editField <= parseInt(n.toString())){
            this.disponible = true;
          }else{
            this.disponible = false;
          }
  
          if(!this.disponible){
            //console.log('No dispone de esa cantidad');
            Swal.fire( 
            'Cantidad no disponible',
            'Solo dispone de: ' + n,
            'error')
            document.getElementById(id.toString()).textContent="1";
  
          }else{
            this.carritoVentas[id][property] = editField;
            this.calcularVenta();
          }
  
        }
      ) */
      
   
  
    }

    calcularVenta(){

    }

    remove(id: any) {
      this.carritoVentas.splice(id, 1);
      this.calcularVenta();
      //console.log(this.carritoVentas.length);
      if(this.carritoVentas.length == 0){
      document.getElementById('btn_GenerarVenta').setAttribute('disabled', 'disabled');
      document.getElementById('btn_Cancelar').setAttribute('disabled', 'disabled');
      (document.getElementById('txt_Subtotal') as HTMLInputElement).value = "";
      (document.getElementById('txt_Iva') as HTMLInputElement).value =  "";
      (document.getElementById('txt_Descuento') as HTMLInputElement).value = ""; 
      (document.getElementById('txt_Total') as HTMLInputElement).value =  "";
      (document.getElementById('txt_Descuento') as HTMLInputElement).disabled = true; 
     // this.descuento = 0;
      this.desc = 0;
      }
    }
  

}

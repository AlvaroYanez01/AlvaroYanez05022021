import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PagerService } from '../../services/pager.service';
import { ClientesService } from '../../services/clientes.service';
import { ProductosService } from '../../services/productos.service';
import { DetalleVentas } from '../../interfaces/DetalleVentas';
import { Venta } from '../../interfaces/Venta';
import Swal from 'sweetalert2';
import { OrdenService } from '../../services/orden.service';

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

  constructor(private fb: FormBuilder,
    private pagerService: PagerService,
    private clienteServices: ClientesService,
    private productoServices: ProductosService,
    private ventaServices: OrdenService) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.ObtenerDatosClientes();
  }

    //Crear formulario
  crearFormulario(){
    this.forma = this.fb.group({
      id: [''],
      compania: [''],
      cliente: [''],
      cantidad: ['']
    });

  }

    //Asignar pagina
    setPageProductos(page: number) {
      // Obtener paginar del servicio
      this.pagerProductos = this.pagerService.getPager(this.allItemsProductos.length, page);
  
      // Obtener pagina actual de todas las paginas
      this.productos = this.allItemsProductos.slice(this.pagerProductos.startIndex, this.pagerProductos.endIndex + 1);
      //console.log(this.productos);
    }
    
    //Asignar pagina
    setPageClientes(page: number) {
      // Obtener paginar del servicio
      this.pagerClientes = this.pagerService.getPager(this.allItemsClientes.length, page);
  
      // Obtener pagina actual de todas las paginas
      this.clientes = this.allItemsClientes.slice(this.pagerClientes.startIndex, this.pagerClientes.endIndex + 1);
      //console.log(this.clientes);
    }

    
  //Obtener datos
  ObtenerDatosClientes(){
    this.clienteServices.getClientes().subscribe( resp => {
      this.allItemsClientes = resp;
      console.log(resp);
        this.loading = false;
        //Inicializar en la pagina 1        
          this.setPageClientes(1);
    }); 
  }
    
  //Seleccionar cliente
  seleccionarCliente(cliente: any){
    console.log(cliente);
    this.id_Cliente = cliente.Id_Cliente;
    this.forma.reset({
      id: cliente.Id_Cliente,
      compania: cliente.Nombre_Compania,
      cliente: cliente.Nombre_Cliente
    })

  }


    //Seleccionar producto y agregar a carrito venta
    p: DetalleVentas[] = [];
    seleccionarProducto(producto){
      //console.log(producto.codigo_producto);
      console.log(producto);
      let existe: boolean = false;
  
      if(this.carritoVentas.length === 0 ){
         let prod: DetalleVentas = {
          Id_Orden_Pertenece: 0,
          Id_Producto: producto.Id_Producto,
          Nombre_Producto: producto.Nombre_Producto, 
          Precio_Producto: producto.Precio_Producto,
          Cantidad_Producto: 1,
          Subtotal: 0
        }
          this.p.push(prod);
          this.carritoVentas = this.p;
/*           document.getElementById('btn_GenerarVenta').removeAttribute('disabled');
          document.getElementById('btn_Cancelar').removeAttribute('disabled');
          document.getElementById('txt_Descuento').removeAttribute('disabled');   */
      }else{
  
        for(let i in this.carritoVentas){
          console.log(this.carritoVentas[i]["id_producto"]);
          let codigoTemp = this.carritoVentas[i]["id_producto"];
          if(codigoTemp === producto.codigo_producto ){
            console.log('Ya existe');
            existe = true;
            break;
          }else{
            existe = false;
          }
        }
        
        if(!existe){
           let prod: DetalleVentas = {
            Id_Orden_Pertenece: 0,
            Id_Producto: producto.Id_Producto,
            Nombre_Producto: producto.Nombre_Producto, 
            Precio_Producto: producto.Precio_Producto,
            Cantidad_Producto: 1,
            Subtotal: 0
          }
            this.p.push(prod);
            this.carritoVentas = this.p; 
        
        }
  
      }
  
      this.calcularVenta();
      
    }


    generarVenta(){
  
        var hoy = new Date();
        var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  
        document.getElementById('btn_GenerarVenta').setAttribute('disabled', 'disabled');
        //console.log(this.desc);
        let venta: Venta = {
          Id_Orden: 0,
          Id_Cliente: this.id_Cliente.toString(),
          Id_Empleado: 1,
        }
    
        Swal.fire({
          title: 'Nueva venta',
          text: `¿Está seguro que desea generar la venta?`,
          icon: 'question',
          showConfirmButton: true,
          showCancelButton: true
        }).then( resp => {
  
    
    
          if(resp.value){
            this.loadingD = true;
            console.log(venta);
            this.ventaServices.postOrden(venta).subscribe(
              res => { 
                console.log(res)
                   // Posteo de la información
              
                   Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Se genero la venta con éxito',
                    showConfirmButton: false,
                    timer: 2000
                  })
                 

                  
                this.loadingD = false;
                this.forma.reset();
                this.carritoVentas = [];
                this.p = [];
                //this.controlInicio();
                (document.getElementById('txt_Subtotal') as HTMLInputElement).value = "";
                (document.getElementById('txt_Iva') as HTMLInputElement).value =  "";
                //(document.getElementById('txt_Descuento') as HTMLInputElement).value = ""; 
                (document.getElementById('txt_Total') as HTMLInputElement).value =  "";
                (document.getElementById('txt_Descuento') as HTMLInputElement).disabled = true;
                //this.descuento = 0; 
  
                console.log(resp);
                this.abonoNoValido = false;
    
              },
              err => console.log(err)
    
  /*             Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrio un error y no se generar la venta, intentelo más tarde'
              }).then( resp => {
                this.loadingD = false;
                this.forma.reset();
                this.carritoVentas = [];
                this.p = [];
                this.controlInicio();
                (document.getElementById('txt_Subtotal') as HTMLInputElement).value = "";
                (document.getElementById('txt_Iva') as HTMLInputElement).value =  "";
                (document.getElementById('txt_Descuento') as HTMLInputElement).value = ""; 
                (document.getElementById('txt_Total') as HTMLInputElement).value =  "";
                (document.getElementById('txt_Descuento') as HTMLInputElement).disabled = true; 
                this.descuento = 0;
                this.abonoNoValido = false;
              })  */
    
            );
          
          }
    
        });
  
  
      
  
  
    }

  cancelarVenta(){

  }

  obtenerDatosProductos(){
    this.productoServices.getProductos().subscribe( resp => {
      this.allItemsProductos = resp;
      console.log(resp);
        this.loading = false;
        //Inicializar en la pagina 1        
          this.setPageProductos(1);
    });
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
  

    //Buscar
  buscarCliente(termino: string){ 
    //console.log(termino);
    //this.bienes=this.bienesAuxs;

    if(termino != ''){
      const result = this.allItemsClientes.filter(cliente => 
      cliente.cedula_persona.search(termino)==0 
      || cliente.nombres_persona.toUpperCase().search(termino.toUpperCase())==0 
      || cliente.apellidos_persona.toUpperCase().search(termino.toUpperCase())==0
      || cliente.email_persona.toUpperCase().search(termino.toUpperCase())==0
      || cliente.telefono_persona.search(termino)==0 );
    //this.sucursales=result;

    this.pagerClientes = this.pagerService.getPager(result.length, 1);

    // get current page of items
    this.clientes = result.slice(this.pagerClientes.startIndex, this.pagerClientes.endIndex + 1);

    //console.log(this.sucursales);
    }else{
      this.setPageClientes(1);
    }
  }

  buscarProducto(termino: string){ 
    //console.log(termino);

    if(termino != ''){
      const result = this.allItemsProductos.filter(producto => 
        producto.codigo_producto.toUpperCase().search(termino.toUpperCase())==0 
      || producto.nombre_producto.toUpperCase().search(termino.toUpperCase())==0 
      || producto.nombre_color.toUpperCase().search(termino.toUpperCase())==0
      || producto.nombre_talla.toUpperCase().search(termino.toUpperCase())==0
      || producto.nombre_marca.toUpperCase().search(termino.toUpperCase())==0
      || producto.nombre_categoria.toUpperCase().search(termino.toUpperCase())==0
      || producto.cantidad_producto.search(termino)==0
      || producto.precio_producto.search(termino)==0 );


    this.pagerProductos = this.pagerService.getPager(result.length, 1);

    // get current page of items
    this.productos = result.slice(this.pagerProductos.startIndex, this.pagerProductos.endIndex + 1);
    //console.log(this.productos);

    //console.log(this.sucursales);
    }else{
      this.setPageProductos(1);
    }
  }

}

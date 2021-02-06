import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Venta } from '../interfaces/Venta';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  
  constructor(private http: HttpClient) { }

  postOrden(venta: Venta) {
    return this.http.post<Venta>(`${environment.url}/orden`, venta)
  }


}

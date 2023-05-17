import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataPesquisaModel} from "../../models/DataPesquisaModel";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  url: string = 'https://localhost:7172/ControleGastos';

  constructor(private httpClient: HttpClient) { }

  GetLancamentosAnteriores(dataPesquisaModel: DataPesquisaModel): Observable<any>{
    return this.httpClient.post(this.url + "/Lancamentos/Anterior", dataPesquisaModel)
  }
}

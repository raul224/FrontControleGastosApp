import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataPesquisaModel} from "../../models/DataPesquisaModel";
import {LancamentoModel} from "../../models/LancamentoModel";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  url: string = 'https://localhost:7172/ControleGastos';

  constructor(private httpClient: HttpClient) { }

  GetLancamentosAnteriores(dataPesquisaModel: DataPesquisaModel): Observable<any>{
    return this.httpClient.post(this.url + "/Lancamentos/Anterior", dataPesquisaModel)
  }

  GetLancamentos(id: string): Observable<LancamentoModel[]>{
    return this.httpClient.get<LancamentoModel[]>(this.url + "/Lancamentos" + id)
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataPesquisaModel} from "../../models/DataPesquisaModel";
import {LancamentoModel} from "../../models/LancamentoModel";
import {LancamentoCadastroModel} from "../../models/LancamentoCadastroModel";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  url: string = 'https://localhost:7172/ControleGastos/Lancamentos';

  constructor(private httpClient: HttpClient) { }

  GetLancamentosAnteriores(dataPesquisaModel: DataPesquisaModel): Observable<any>{
    return this.httpClient.post(this.url + "/Anterior", dataPesquisaModel)
  }

  GetLancamentos(id: string): Observable<LancamentoModel[]>{
    var params = new HttpParams().append("id", id)
    return this.httpClient.get<LancamentoModel[]>(this.url,
    {
      params: params
    })
  }

  CadastraLancamento(lancamentoCadastro: LancamentoCadastroModel): Observable<any>{
    return this.httpClient.post(this.url, lancamentoCadastro)
  }
}

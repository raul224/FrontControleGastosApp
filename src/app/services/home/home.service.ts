import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { dataRangeModel } from "../../models/dataRangeModel";
import { flowModel } from "../../models/flowModel";
import { flowCadastroModel } from "../../models/flowCadastroModel";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  url: string = 'https://localhost:7172/Balance/Flows';

  constructor(private httpClient: HttpClient) { }

  GetLancamentosAnteriores(dataRangeModel: dataRangeModel): Observable<any>{
    return this.httpClient.post(this.url + "/Preview", dataRangeModel)
  }

  GetLancamentos(id: string): Observable<flowModel[]>{
    return this.httpClient.get<flowModel[]>(this.url + "?userId=" + id)
  }

  CadastraLancamento(flowCadastro: flowCadastroModel): Observable<any>{
    return this.httpClient.post(this.url, flowCadastro)
  }
}

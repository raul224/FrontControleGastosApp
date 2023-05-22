import {Component, OnInit} from '@angular/core';
import {HomeService} from "../../services/home/home.service";
import {Router} from "@angular/router";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ConsultaAnteriorComponent} from "../DialogComponents/consulta-anterior/consulta-anterior.component";
import {LancamentoCadastroModel} from "../../models/LancamentoCadastroModel";
import {UsuarioModel} from "../../models/UsuarioModel";
import {LancamentoModel} from "../../models/LancamentoModel";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DialogService]
})
export class HomeComponent implements OnInit{
  logado: boolean = false;
  lancamentoCadastro: LancamentoCadastroModel = new LancamentoCadastroModel();
  usuario: UsuarioModel = new UsuarioModel();
  lancamentos: LancamentoModel[] = []
  ref: DynamicDialogRef | undefined;

  constructor(
  private homeService: HomeService,
  private router: Router,
  public dialogService: DialogService) {}

  ngOnInit(): void {
    var usuarioLogado = JSON.parse(localStorage.getItem("usuario") || "")
    console.log(usuarioLogado)
    if(usuarioLogado){
      this.usuario = usuarioLogado
      this.CarregarLancamentos()
    }else {
      alert("Por favor, efetuar o login")
      this.router.navigate([""])
    }
  }

  show(){
    this.ref = this.dialogService.open(ConsultaAnteriorComponent, {
      data: {
        usuario: this.usuario
      }
    })
  }

  private CarregarLancamentos(): any{
    this.homeService.GetLancamentos(this.usuario.Id)
      .subscribe({
      next:(response) => {
        this.lancamentos.concat(response)
      },
      error:(error) => {
        alert("Erro ao carregamento dos lancamentos, favor tentar novamente")
      }})
  }

  CadastraLancamento(): any{
    this.lancamentoCadastro.UsuarioId = this.usuario.Id

    this.homeService.CadastraLancamento(this.lancamentoCadastro)
      .subscribe({
      next:(response) =>{
        this.CarregarLancamentos()
      },
      error:(error) =>{
        alert("Erro no cadastro do lancamento, tente novamente")
      }})
  }
}

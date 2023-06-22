import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {ToolbarModule} from "primeng/toolbar";
import { FlowPreviewComponent } from './components/DialogComponents/consulta-anterior/flow-preview.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    MenubarModule,
    ToolbarModule,
    DropdownModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    FlowPreviewComponent
  ],
  providers: [HttpClientModule, provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }

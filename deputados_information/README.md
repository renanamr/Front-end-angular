# Deputados Information
Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 18.2.5.

#### Temas abordados:
+  **1.** RxJs: Uso de funções pipe, catchError, of e Observer;
+  **2.** HttpClient: Solicitações https a API (Uso do GET);
+  **3.** Otimização de imagens: Uso da diretiva NgOptimizedImage;
+  **4.** Pipe: Opções para formatar o texto.
+  **5.** Deferrable Views: @defer, @placehold e @loading.

## 0. Inicialização do projeto
Para iniciar crie um projeto para exercitar os conceitos. Para isso use o comando a seguir:

**Atenção:** Ao criar o projeto escolha utilizar o modelo `SCSS` para estilização.

```bash
ng  new  deputados_information
```

Nesse projeto iremos utilizar uma estrutura mais profissional, organizando seus componentes em pastas mais específicas, e antes mesmo de iniciar os novos temas será necessário implementar bastante código. Então, preste bem atenção aos próximos passos.

### 0.1 Bootstrap
Para utilização do `Bootstrap` é necessário realizar a instalação no projeto. Para isso execute o código abaixo:
```bash
npm  install  bootstrap
```

No arquivo `angular.json`, adicione o SCSS do Bootstrap:
```json
"styles": [
	"node_modules/bootstrap/dist/css/bootstrap.min.scss",
	"src/styles.scss"
],
```

Para poder usar o bootstrap com scss em nosso projeto, precisamos adicionar o `@import` assim como feito no código abaixo, isso em nossa classe **style.scss**. Alem disso, iremos sobrescrever os theme padrão do bootstrap com nossa *primary* e *secondary colors*.
```scss
$primary: #0056b3; // Azul escuro para o fundo principal
$secondary: #003a75; // Azul mais escuro para a barra inferior

@import  'bootstrap/scss/bootstrap.scss';

// Classe para logo no header
.logo {
	height: 50px;
}
```

### 0.2 Criando os models do projeto
Para organizar nosso projeto iremos criar dois `models` que irão conter a representação dos nosso objetos do sistema. 

Dentro da pasta **src/app** adicione uma pasta chamada **models**, e nela crie um arquivo typescript chamado **deputado_details.ts**. Dentro do arquivo insira o código abaixo:

```typescript
export  interface  IDeputadoDetails {
  nomeCivil:  string;
  dataNascimento:  string;
  ultimoStatus: {
    siglaUf:  string,
    situacao:  string,
  }
}

export  class  DeputadoDetails {
  public  nomeCivil:  string;
  public  dataNascimento:  string;

  public  siglaUf  :  string;
  public  situacao:  string;

  constructor(data:  IDeputadoDetails) {
    this.nomeCivil  =  data.nomeCivil;
    this.dataNascimento  =  data.dataNascimento;
    this.siglaUf  =  data.ultimoStatus.siglaUf;
    this.situacao  =  data.ultimoStatus.situacao;
  }
}
```

Na mesma pasta, crie também um arquivo typescript chamado **deputado.ts**. Dentro do arquivo insira o código abaixo:

```typescript
import { DeputadoDetails } from  "./deputado_details";

export  interface  IDeputado {
  id:  number;
  nome:  string;
  siglaPartido:  string;
  urlFoto:  string;
  seguido?:  boolean; // Campo opcional
}

export  class  Deputado {
  public  id:  number;
  public  nome:  string;
  public  siglaPartido:  string;
  public  urlFoto:  string;
  public  seguido:  boolean;

  public  details!  :  DeputadoDetails  |  null;

  constructor(data:  IDeputado) {
    this.id  =  data.id;
    this.nome  =  data.nome;
    this.siglaPartido  =  data.siglaPartido;
    this.urlFoto  =  data.urlFoto;
    this.seguido  =  data.seguido  ??  false;
  }


  // Método para criar uma lista de Deputados a partir de uma lista de objetos JSON
  static  fromList(jsonArray:  IDeputado[]):  Deputado[] {
    return  jsonArray.map(item  =>  new  Deputado(item));
  }
}
```

Agora já temos todos os nossos modelos criados.

### 0.3 Criando os componentes compartilhados do projeto

Para esse projeto iremos construir três componentes gerais: **loading**, **alert-error** e **header**. Então, dentro da pasta **src/app** adicione uma pasta chamada **components**, será nela que iremos manter nossos componentes.

Dentro da pasta **src/app/components**, use os comandos abaixo para gerar os três componentes.
```bash
ng g c header
ng g c loading
ng g c alert-error
```

Primeiramente, vamos alterar nosso componente **alert-error**, ele servirá para informar ao usuário uma mensagem caso ocorra qualquer erro ao recuperar os dados dos deputados. Então, iremos modificar o arquivo **alert-error.component.html** o sobrescrevendo com o código abaixo:
```html
<div  class="alert alert-danger"  role="alert">
  <div  class="text-center">
    Ops... Ocorreu um erro ao recuperar os dados.
  </div>
</div>
```

Para o componente **header** também só iremos modificar o seu html. Então, modifique o arquivo **header.component.html** o sobrescrevendo com o código abaixo:
```html
<div  class="bg-primary text-white">
  <div  class="container d-flex align-items-center py-2">
    <img  src="https://www.camara.leg.br/midias/image/2022/03/marca-camara-preferencial-cores.png"
      alt="Logotipo Câmara dos Deputados"  class="logo me-3"  />
  </div>
  <div  class="bg-secondary">
    <div  class="container d-flex align-items-center py-2">
      <span>Dados recuperados via API: dadosabertos.camara.leg.br</span>
    </div>
  </div>
</div>
```

Por fim, para o componente **loading** iremos sobrescrever o arquivo **loading.component.html** com o código abaixo:
```html
<div  class="d-flex justify-content-center align-items-center m-5">
  <div  class="spinner-border text-primary"  role="status">
    <span  class="visually-hidden">Loading...</span>
  </div>
</div>
```

Além de modificar o html, também precisaremos adicionar uma estilização ao arquivo **loading.component.scss**, o código é descrito abaixo:
```scss
.spinner-border {
  width: 3rem;
  height: 3rem;
}
```

Com isso, finalizamos nossos componentes compartilhados

### 0.4 Criando paginas e modificando app.component
Nosso projeto terá basicamente duas páginas. A primeira página terá a função de listar os deputados da câmera, e a segunda terá a responsabilidade de demonstrar informações mais detalhadas de um deputado selecionado.

Para isso, dentro da pasta **src/app** adicione uma pasta chamada **pages**, ela será responsável por agrupar as páginas do nosso projeto.

Dentro da página **pages** use os comandos abaixo para criar nossos componentes que irão representar as páginas do sistema:
```bash
ng g c deputados-list
ng g c deputado-details
```

Agora já temos nossas duas páginas construídas, suas personalizações e funções serão desenvolvidas mais a frete no projeto, por enquanto só precisaremos de suas definições.

O próximo passo será inserir código em nosso **app.component** para que possa demonstrar nosso header, bem como as sub-rotas que serão criadas posteriormente. Para iniciar sobrescreva o arquivo **app.component.ts** com o código abaixo:
```typescript
import { Component } from  '@angular/core';
import { RouterOutlet } from  '@angular/router';
import { HeaderComponent } from  "./components/header/header.component";

@Component({
selector:  'app-root',
standalone:  true,
imports: [RouterOutlet, HeaderComponent],
templateUrl:  './app.component.html',
styleUrl:  './app.component.scss'
})
export  class  AppComponent {}
```

Agora, sobrescreva o arquivo **app.component.html** com o código abaixo:
```html
<app-header></app-header>
<router-outlet/>
```

#### Verificação parcial
Para verificar se seu projeto está igual a este, você pode usar o comando **git** abaixo:
```bash
git  checkout  493ca60
```

### 0.5 Configurando as rotas

Para finalizar nossas configurações iremos adicionar o modelo de rotas no nosso sistema. Para isso, basta sobrescrever o arquivo **app.routes.ts**, localizado na pasta `src/app`, com o código abaixo:
```typescript
import { Routes } from  '@angular/router';
import { DeputadoDetailsComponent } from  './pages/deputado-details/deputado-details.component';
import { DeputadosListComponent } from  './pages/deputados-list/deputados-list.component';

export  const  routes:  Routes  = [
  {
    path:  'deputados',
    title:  "Deputados",
    component:  DeputadosListComponent
  },
  {
    path:  'detalhes/:id',
    title:  "Ficha do deputado",
    component:  DeputadoDetailsComponent
  },
  { path:  '', redirectTo:  '/deputados', pathMatch:  'full' }
];
```


### 0.6 Componente auxiliar (Deputado card)
Para este projeto também iremos construir um componente auxiliar para representar os cards dos deputados que serão listados. Esse componente é exclusivo para a page **deputado-list**, por isso não iremos cria-lo dentro da página *components* geral.

Quando se tem esse tipo de caso o ideal é criar uma pasta **components** dentro da pasta referente a página ao qual ele vai interagir. Em nosso caso iremos criar a pasta dentro do caminho **src/app/pages/deputado-list**. Logo, nosso componente **deputado-card**, deverá ser criado dentro do caminho **src/app/pages/deputado-list/components**, se utilizando do código abaixo:
```bash
ng g c deputado-card
```

Uma vez criado o componente precisamos sobrescrever o arquivo **deputado-card.component.ts** com o código:
```typescript
import { Component, EventEmitter, Input, Output} from  '@angular/core';
import { Deputado } from  '../../../../models/deputado';
import { RouterLink } from  '@angular/router'; 

@Component({
  selector:  'app-deputado-card',
  standalone:  true,
  imports: [RouterLink],
  templateUrl:  './deputado-card.component.html',
  styleUrl:  './deputado-card.component.scss'
})
export  class  DeputadoCardComponent {
  @Input({required:  true}) deputado!  :  Deputado;

  @Output() eventChageSeguir  =  new  EventEmitter<Deputado>();

  onChangeSeguir() :  void{
    this.eventChageSeguir.emit(this.deputado);
  }
}
```

Depois, sobrescreva o arquivo **card.component.html** com o código abaixo:
```html
<div class="card deputado-card d-flex flex-row">
  <div  class="image-container">
    <img
      [src]="deputado.urlFoto"
      alt="Foto de {{  deputado.nome  }}"
      class="deputado-photo"
    />
  </div>
  <div  class="card-body">
    <h5  class="card-title">{{  deputado.nome  }}</h5>
    <p  class="card-text">{{  deputado.siglaPartido  }}</p>
    <div  class="d-flex justify-content-between">
      <button
        class="btn"
        [class.btn-primary]="!deputado.seguido"
        [class.btn-danger]="deputado.seguido"
        (click)="onChangeSeguir()"
      >
        {{  deputado.seguido  ?  'Deixar de Seguir'  :  'Seguir'  }}
      </button>
      <button  class="btn btn-outline-info"  [routerLink]="['/detalhes', deputado.id]">
        Ver Detalhes
      </button>
    </div>
  </div>
</div>
```

Por fim, no arquivo **card.component.scss** iremos adicionar a estilização descrita abaixo:
```scss
.deputado-card {
  display: flex;
  align-items: center;
  padding: 10px;
  transition: transform  0.3s, box-shadow  0.3s;

  &:hover {
  transform: translateY(-5px);
  box-shadow: 0  5px  15px  rgba(0, 0, 0, 0.1);
  }

  .image-container {
  flex-shrink: 0;
  margin-right: 15px;
  width: 80px;
  height: 80px;

  .deputado-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  /* Deixa a foto circular */
  border: 2px  solid  #ddd;
  }
  }

  .card-body {
  flex-grow: 1;

  .btn {
  font-size: 0.9rem;

  &.btn-primary {
  background-color: #007bff;
  border-color: #007bff;

  &:hover {
  background-color: #0056b3;
  border-color: #004085;
  }
  }

  &.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;

  &:hover {
  background-color: #bd2130;
  border-color: #a71d2a;
  }
  }
  }
  }
}
```

Com isso, finalizamos a construção da primeira parte do projeto.
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

Com isso, finalizamos a construção da primeira parte do projeto. Caso tenha ficado em dúvida sobre alguma parte do código aconselho revisitar os projetos anteriores e/ou os slides das aulas anteriores, pois o foco do projeto é inserir os novos conceitos que serão debatidos nos próximos tópicos.

#### Verificação parcial
Para verificar se seu projeto está igual a este, você pode usar o comando **git** abaixo:
```bash
git  checkout  54c8e5d
```

## 1. RxJS

O  **RxJS**  (Reactive Extensions for JavaScript) é uma biblioteca usada no Angular para trabalhar com  **fluxos de dados assíncronos** (Programação Reativa). Ele permite que você  **crie, combine e manipule dados**  que chegam ao longo do tempo. Pode se dizer que ele ajuda a "observar" eventos e  reagir  a eles, como se fosse um  **canal**  onde dados vão passando, e você pode fazer algo com eles a qualquer momento.

Para o nosso projeto usaremos o RxJS para organizar as respostas de solicitações de dados feita a API. Neste tópico não iremos demonstrar a utilização via implementação de código, isso será demonstrado junto a implementação do HttpClient.

Para que você possa entender melhor quando vermos códigos do RxJS, são descritas abaixo algumas funções que são comuns e usaremos em nosso projeto: 

- `Observable`
	-   É a  **base do RxJS**: um canal onde dados fluem;
	-  Pode ser definido como tipo de uma variável ou retorno de uma função;
	-  É usado para  **esperar respostas de APIs** e possibilitar o tratamento dos dados recuperados.

- `.pipe`
	-  É usado para **encadear operadores** (como `map`,  `catchError`, etc.) em um fluxo de dados do `Observable`;
	-  É uma função presente no `Observable`, que organiza os operadores e facilita a leitura do código.

- `catchError`
	-  Usado dentro da função `.pipe` do `Observable`;
	- Quando ocorre um erro, ele permite  **tratar**  ou  **substituir o erro**  por outro valor ou ação.
	- Exemplo: Se a chamada de API falhar, você pode usar  `catchError`  para mostrar uma mensagem amigável ou retornar dados padrão.

- `map`
	-  Usado dentro da função `.pipe` do `Observable`;
	-   Transforma os dados que estão passando no fluxo.
	-   Exemplo: Recebe os dados da API no modelo **JSON** e transforma em um objeto do sistema.

- `tap`
	-  Usado dentro da função `.pipe` do `Observable`;
	-  Executa uma ação  **sem alterar os dados**  do fluxo, e é chamado sempre que há uma alteração de dados do `Observable` .
	-   Exemplo: Usado para  **debug**, como exibir no console o que está acontecendo.

-  `throwError`
	-   Cria um erro no fluxo, que será recuperado via `catchError`.	
	-   Exemplo: Quando algo dá errado, você pode usar  `throwError`  para avisar o sistema.

-  `of`
	-   Cria um Observable que  **emite valores fixos**.
	-   Exemplo: Usado para simular dados ou retornar um valor contido em uma variável sem necessitar a consulta a API.

**Atenção:** Lembrem desses conceitos, pois serão úteis no desenvolvimento de soluções reais, bem como no entendimento do código descrito no próximo tópico.

## 2. HttpClient
O **HttpClient** é uma ferramenta essencial para fazer **requisições HTTP**. Ele permite que o sistema **se comunique com APIs** para enviar ou receber dados, sendo crucial para sistemas que precisam de informações externas. Em nosso caso, precisamos obter as informações dos deputados da API da câmera dos deputados do Brasil.

A API que será utilizada por esse projeto pode ser utilizado por todos sem necessidade de cadastro. Os endpoints podem ser visto em sua documentação disponível no site: [https://dadosabertos.camara.leg.br/swagger/api.html](https://dadosabertos.camara.leg.br/swagger/api.html)

### 2.1 Configurando o HttpClient
Para poder utilizar a biblioteca é necessário adicionar ao arquivo **app.config.ts** um *provider* chamado **provideHttpClient()**, como demonstrado abaixo:
```typescript
export  const  appConfig:  ApplicationConfig  = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing:  true }),
    provideRouter(routes)
  ]
};
```

Com isso será possível chamar o HttpClient via injeção de dependência em nossos componentes ou **services**.

### 2.2 Implementação de requisições
O `HttpClient` deve ser usado no _Service_ para deixar o código mais organizado, fácil de entender e reaproveitável. Para isso, iremos criar uma pasta chamada **services** dentro do caminho **src/app** e dentro dela um arquivo **deputado.service.ts**.

Sobrescreva o arquivo **deputado.service.ts** com o código abaixo:
```typescript
import { Injectable } from  '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Observable, throwError, of } from  'rxjs';
import { Deputado } from  '../models/deputado';
import { catchError, map, tap } from  'rxjs/operators';
import { DeputadoDetails} from  '../models/deputado_details';

@Injectable({
  providedIn:  'root',
})
export  class  DeputadoService {
  constructor(private  http:  HttpClient) {}

  private  apiBaseUrl  =  'https://dadosabertos.camara.leg.br/api/v2';

  private  deputados  :  Deputado[] |  null  =  null;


  getDeputados() :  Observable<Deputado[]> {
    if(this.deputados  ==  null){
      return  this.fetchDeputados().pipe(
        tap(data  => {this.deputados  =  data}),
      );
    }

    return  of(this.deputados);
  }

  getDeputadoById(id:  number):  Observable<Deputado> {
    let  deputado  =  this.deputados!.find((deputado) =>  deputado.id  ===  id);

    // Se o deputado não foi encontrado, retorna um erro
    if (!deputado) {
      return  throwError(() =>  new  Error('Deputado não encontrado'));
    }

    // Se os detalhes já existem, retorna o deputado como um Observable
    if (deputado.details) {
      return  of(deputado);
    }

    return  this.getDeputadoDetalhes(id).pipe(
      map((detalhes) => {
        deputado.details  =  detalhes;
        return  deputado;
      })
    );
  }

  // Muda o status do "Seguir" do deputado
  onChangeSeguir(deputado:  Deputado):  void {
    deputado.seguido  =  !deputado.seguido;

    let  deputadoLocal  =  this.deputados!.find((other) =>  other.id  ===  deputado.id);
    deputadoLocal!.seguido  =  deputado.seguido;
  }


  // USECASE: Requisição para buscar a lista de deputados
  private  fetchDeputados():  Observable<Deputado[]> {
    // Especifica o retorno JSON
    const  headers  =  new  HttpHeaders({
      Accept:  'application/json',
    });
    
    return  this.http
    .get<any>(
      `${this.apiBaseUrl}/deputados`,
      {
        headers,
        params: {
          itens:  '12',
          ordem:  'ASC',
          ordenarPor:  'nome',
        },
      },
    )
    .pipe(
      catchError((error) => {
        return  of({ error:  true, message:  'Erro ao carregar a lista de deputados.' });
      }),
      map((response) =>  Deputado.fromList(response.dados),
    ));
  }

  // USECASE: Requisição para buscar os detalhes de um deputado
  private  getDeputadoDetalhes(id:  number):  Observable<DeputadoDetails> {
    // Especifica o retorno JSON
    const  headers  =  new  HttpHeaders({
      Accept:  'application/json',
    });

    return  this.http.get<any>(`${this.apiBaseUrl}/deputados/${id}`, { headers }).pipe(
      catchError((error) => {
        return  of({ error:  true, message:  'Erro ao carregar os detalhes do deputado.' });
      }),
      map((response) =>  new  DeputadoDetails(response.dados)),
    );
  }
}
```
Note alguns detalhes importantes do código:

- Inicialização do `HttpClient`:
	- Ela é feita via injeção de dependência pelo construtor do *Service*.

- `.get()`
	-   É utilizado para realizar requisições do tipo HTTP GET, que buscam dados de um servidor e recuperam as informações;
	- A função pode receber alguns parâmetros como o `headers` e o `params` que serão descritos a seguir;
	-   `<any>`: Indica o tipo de dados que será recuperado no GET, é possível criar uma *interface* para organizar os dados a serem recebidos;
    -   `Observable`: É o tipo retornado pela função.

- `headers`
	-   São informações adicionais enviadas junto com a requisição HTTP. Normalmente usadas para passar informações como as credenciais do OAUTH ou tipo de retorno da API;
	-   No código, os cabeçalhos especificam que o servidor deve retornar dados no formato JSON, já que a API da câmera pode enviar dados no formato JSON ou XML.

- `params`
	-   Permite passar parâmetros de consulta (query params) na URL de forma mais organizada;
	-   No código usamos para conectar o endpoint solicitado aos parâmetros. Esses parâmetros são automaticamente concatenados na URL final como  `?itens=12&ordem=ASC&ordenarPor=nome`.

**Observação:** O HttpClient não possui somente a função `get`, vocês poderiam utilizar qualquer uma das funções estabelecidas no padrão de APIs REST.

**Observação 2:** Note que no código usamos as funções do RxJS como o `pipe` e outras para tratar as informações retornadas pelo `Observable` do http.
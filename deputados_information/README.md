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
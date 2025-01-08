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

### Bootstrap
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

### Criando os models do projeto
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
# User Managment
Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 18.2.5.

#### Temas abordados:
+  **1.** **Rotas:** Definição e configuração de rotas, RouterOutlet e RouterLink
+  **2.** **Form:** Reactive Forms e Validações;
+  **3.** Criação e uso de **Services**;

## 0. Inicialização do projeto

Para iniciar crie um projeto como feito no comando abaixo:
```bash
ng new user_management
```

#### Criando os componentes:

Para o projeto iremos construir três componentes, mas antes disso iremos construir dentro da pasta **src/app** duas novas pasta, uma chamada **components** e outra chamada **pages**.

**Dentro da pasta components** execute o comando abaixo, para gerar nosso componente **Header**:
```bash
ng g c header
```

**Dentro da pasta pages** iremos construir dois componentes, primeiramente para criar o componente **UserForm** execute o comando:
```bash
ng g c user-form
```

Ainda **dentro da pasta pages**, para criar o componente **UserList** execute o comando:
```bash
ng g c user-list
```

Pronto, já estamos com todos os componentes e criados e pronto para uso.

#### Criando o model user

Dentro da pasta **src/app** adicione uma pasta chamada **models**, e nela crie um arquivo typescript chamado **user.ts**. Dentro do arquivo insira o código abaixo:

```typescript
export  class  User{
  id:  number;
  name:  string;
  cpf:  string;
  email:  string;

  constructor(user  :  IUser){
    this.cpf  =  user.cpf;
    this.email  =  user.email;
    this.name  =  user.name;
    this.id  =  user.id;
  }
}

interface  IUser{
  id:  number;
  name:  string;
  cpf:  string;
  email:  string;
}
```
Este classe servirá para representarmos os usuários do nosso sistema.


#### Inicializando o bootstrap

Para utilização do `Bootstrap` é necessário realizar a instalação no projeto. Para isso execute o código abaixo:
```bash
npm install bootstrap
```

No arquivo `angular.json`, adicione o CSS do Bootstrap:
```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
],
``` 

#### Adicionando código ao componente Header

Antes de começar a implementação dos nossos novos conceitos implemente o código abaixo sobrescrevendo o código da classe **header.component.ts**:
```typescript
import { Component } from  '@angular/core';
import { RouterLink } from  '@angular/router';

@Component({
  selector:  'app-header',
  standalone:  true,
  imports: [RouterLink],
  templateUrl:  './header.component.html',
  styleUrl:  './header.component.css'
})
export  class  HeaderComponent {}
```

Além disso, implemente o código abaixo sobrescrevendo o código da classe **header.component.html**:
```html
<nav  class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div  class="container">
    <a  class="navbar-brand">Gerenciador de Usuários</a>
    <div  class="collapse navbar-collapse"  id="navbarNav">
      <ul  class="navbar-nav ms-auto">
        <li  class="nav-item">
          <a  class="nav-link"  routerLink="/users"  routerLinkActive="active">Listagem de Usuários</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

#### Verificando andamento...
Para verificar se seu projeto está igual a este, você pode usar o comando **git** abaixo:
```bash
git checkout a2ce276
```

Agora, vamos aos novos conceitos 😁

## 1. Routes

Rotas são elementos importantes em aplicações Angular por possibilitar a criação de estruturas dinâmicas que podem ser renderizadas em seu site. 
Para implementar o modelo de rotas no projeto *standalone* é necessário:
1. Definir as rotas para os componentes;
2. Usar o RouterOutlet;
3. Usar RouterLink.

### 1.1 Definição das rotas

Primeiramente iremos definir as rotas do nosso site, para isso sobrescreva o arquivo **app.routes.ts** com o código abaixo:
```typescript
import { Routes } from  '@angular/router';
import { UserListComponent } from  './pages/user-list/user-list.component';
import { UserFormComponent } from  './pages/user-form/user-form.component';

export  const  routes:  Routes  = [
  {
    path:  'users',
    title:  "Usuários",
    component:  UserListComponent
  },
  {
    path:  'add-user',
    title:  "Criar Usuário",
    component:  UserFormComponent
  },
  {
    path:  'edit-user/:id',
    title:  "Editar Usuário",
    component:  UserFormComponent
  },
  { path:  '', redirectTo:  '/users', pathMatch:  'full' }
];
```
No código definimos as rotas possíveis do site dentro da lista **routes**. Essa variável possibilita identificar todas as rotas que o sistema terá. Além disso, você pode definir **rotas de redirecionamento** como na última linha, que redirecionam o usuário do caminho inicial para o `/users`.

### 1.2 RouterOutlet
O `RouterOutlet` no Angular atua como um ponto de âncora onde componentes são exibidos de acordo com a rota ativa. Ele permite a navegação entre páginas sem recarregar a aplicação. Desta forma, ele permite também a criação de uma navegação interna, sobrescrevendo os componentes internos de uma tela.

Para usar o `RouterOutlet` precisamos inicialmente importa-lo em nosso componente. Para isso sobrescreva o arquivo **app.component.ts** como demonstrado abaixo:
```typescript
import { Component } from  '@angular/core';
import { RouterOutlet } from  '@angular/router';
import { HeaderComponent } from  './components/header/header.component';

@Component({
  selector:  'app-root',
  standalone:  true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl:  './app.component.html',
  styleUrl:  './app.component.css'
})
export  class  AppComponent {}
```
Uma vez importado, basta utilizar o elemento `<router-outlet>` em nosso html. Para isso sobrescreva o arquivo **app.component.html** como demonstrado abaixo:
```html
<app-header/>
<router-outlet/>
```

#### Verificando andamento...
Para verificar se seu projeto está igual a este, você pode usar o comando **git** abaixo:
```bash
git checkout e32b63b
```

### 1.3 RouterLink
O `RouterLink` é uma diretiva que nos possibilita realizar a navegação para diversas rotas de nosso site ao interagir com elementos html.

Para usar o `RouterLink` precisamos inicialmente importa-lo em nosso componente. Para isso sobrescreva o arquivo **user-list.component.ts** como demonstrado abaixo:
```typescript
import { Component } from  '@angular/core';
import { RouterLink } from  '@angular/router';
import { User } from  '../../models/user';

@Component({
  selector:  'app-user-list',
  standalone:  true,
  imports: [RouterLink],
  templateUrl:  './user-list.component.html',
  styleUrl:  './user-list.component.css'
})
export  class  UserListComponent{
  users:  User[] = [
    new  User({id:  1, name:  "Renan", cpf:  "000", email:  "renan.morais@ifrn.edu.br"})
  ];
}
```
Além da importação do `RouterLink` criamos uma lista de usuários chamada **users** que servirá para nos ajudar a demonstrar uma das opções de navegação.

Para usar a diretiva nos elementos html basta colocar o `routerLink` em nosso elemento html e informar o caminho a ser acessado. Exemplo: `routerLink="/add-user"`.

Para demonstrar a utilização vamos sobrepor o código do arquivo **user-list.component.html** como demonstrado abaixo:
```html
<div  class="container mt-4">
  <div  class="d-flex justify-content-between align-items-center">
    <h2>Lista de Usuários</h2>
    <a  routerLink="/add-user"  class="btn btn-primary mb-3">Adicionar Usuário</a>
  </div>

  <ul  class="list-group">
    @for (user  of  users; track  $index) {
    <li  class="list-group-item d-flex justify-content-between align-items-center">
      <span>{{  user.name  }} - {{  user.email  }}</span>
      <a  [routerLink]="['/edit-user', user.id]"  class="btn btn-outline-secondary btn-sm">Editar</a>
    </li>
    }
  </ul>
</div>
```

#### Verificando andamento...
Para verificar se seu projeto está igual a este, você pode usar o comando **git** abaixo:
```bash
git checkout 7ad0599
```

## 2. Form
O uso de formulários em projetos web é base para comunicação entre o cliente e o servidor, possibilitando operações como cadastros e buscas. Porém, para um bom uso do elemento sempre é necessário validar dados de usuários de forma eficiente, garantindo interatividade e segurança nas aplicações.
Em projetos Angular o processo de implementação de *Forms* é simplificado com o uso do `Reactive Forms` e `Validating forms`, elementos que iremos aprender a seguir.

### 2.1 Reactive Forms
Reactive Forms é um elemento para criar e gerenciar formulários de maneira reativa e programática. Ele é utilizado juntamente com o `FormGroup` e `FormControl`, permitindo validação dinâmica, monitoramento de mudanças em tempo real e maior controle sobre o estado e os valores do formulário no código.

Para sua utilização é necessário importar os elementos como demonstrado abaixo:
```typescript
import { ReactiveFormsModule, FormGroup, FormControl } from  '@angular/forms';
```

O `FormGroup` e `FormControl` são elementos que trabalham juntos para o controle dos formulários, sendo ambos implementados no componente typescript. Os elementos servem para:
+ **FormGroup**: É o agrupamento de `FormControl`, que juntos representam o formulário;
+ **FormControl**: Representa um único campo de entrada no formulário (um *input*).


Para demonstrar a definição dos elementos vamos sobrepor o código do arquivo **user-form.component.ts** como demonstrado abaixo:
```typescript
import { Component} from  '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from  '@angular/forms';
import { Router } from  '@angular/router';
import { User } from  '../../models/user';

@Component({
  selector:  'app-user-form',
  standalone:  true,
  imports: [ReactiveFormsModule],
  templateUrl:  './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export  class  UserFormComponent{
  userForm: FormGroup;
  editMode = false;
  userId: number | null = null;

  constructor(private  router:  Router,) {
    this.userForm = new FormGroup({
      name: new FormControl(''),
      cpf: new FormControl(''),
      email: new FormControl(''),
    });
  }

  onSubmit():  void {
    const  user:  User  =  new  User({
      id:  this.userId!,
      name:  this.userForm.value.name,
      email:  this.userForm.value.email,
      cpf:  this.userForm.value.cpf,
    });
  }
}
```
Note que inicializamos os valores dos `FormControl` dentro do nosso construtor, sendo eles inicializamos com um texto vazio. Mas você poderia escrever algum texto na inicialização do elemento. (Faremos isso mais na frente no projeto).

Nossos elementos foram criados, mas não estão ainda vinculados ao html, para isso é necessário criar um element `<form>` e passar os parâmetros como baixo:
```html
<form  [formGroup]="userForm"  (ngSubmit)="onSubmit()">
```
O `[formGroup]` fará a vinculação ao nosso agrupamento criado no componente, já o `(ngSubmit)` permite vincular uma função de submissão do formulário.

Para vincular aos inputs é necessário utilizar o modelo abaixo:
```html
<input formControlName="cpf"/>
```
O parâmetro `formControlName` irá vincular o nosso input html ao `FormControl` criado no componente, para isso é necessário que os nomes sejam iguais.

Para o nosso projeto vamos sobrepor o código do arquivo **user-form.component.html** como demonstrado abaixo:
```html
<div  class="container mt-4">
  <h2>{{  editMode  ?  'Editar Usuário'  :  'Adicionar Usuário'  }}</h2>
  <form  [formGroup]="userForm"  (ngSubmit)="onSubmit()">
    <div  class="mb-3">
      <label  for="name"  class="form-label">Nome</label>
      <input  type="text"  id="name"  class="form-control"  formControlName="name"  />
    </div>

    <div  class="mb-3">
      <label  for="email"  class="form-label">Email</label>
      <input  type="email"  id="email"  class="form-control"  formControlName="email"  />
    </div>

    <div  class="mb-3">
      <label  for="cpf"  class="form-label">CPF</label>
      <input  type="text"  id="cpf"  class="form-control"  formControlName="cpf"  />
    </div>

    <button  type="submit"  class="btn btn-primary">
      {{  editMode  ?  'Atualizar'  :  'Adicionar'  }}
    </button>
  </form>
</div>
```

#### Verificando andamento...
Para verificar se seu projeto está igual a este, você pode usar o comando **git** abaixo:
```bash
git checkout e7ff710
```

### 2.2 Validating forms
Validação de campos é essencial para a garantir a qualidade dos dados salvos nos sistemas, evitando alguns erros de informações fora de padrão ou dados vazio para campos de identificação. 
O Angular possibilita usarmos validações de formulários de uma forma muito simples, ao usarmos `Reactive Forms`, basta adicionarmos os `Validators` nos `FormControls` como mostrado abaixo:
```typescript
name:  new  FormControl('', Validators.required),
email:  new  FormControl('', [Validators.required, Validators.email]),
```
Veja que pode ser usado como uma verificação simples ou a partir de uma lista da `Validators`.

Em nosso projeto iremos adicionar parte do nosso  `constructor` e função `onSubmit()` do **user-form.component.ts** como demonstrado abaixo:
```typescript
constructor(private router: Router,) {
  this.userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
}

onSubmit():  void {
  if (this.userForm.valid) {
    const user: User = new  User({
      id: this.userId!,
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      cpf: this.userForm.value.cpf,
    });
    this.router.navigate(['/users']);
  }
}
```

Com isso adicionamos as validações ao nosso formulário, obrigando que todos sejam preenchidos e que o input de e-mail seja definido como o padrão de e-mail exige. Mas há um detalhe interessante, além de definir as validações é necessário fazer a chamada da função `valid` para saber se realmente todos os campos foram do `FormGroup` foram validados, por isso adicionamos a chamada **this.userForm.valid** em uma estrutura condicional.

Outro detalhe interessante do código é: `this.router.navigate(['/users'])`. Essa é uma forma de usarmos o sistema de navegação do nosso sistema por meio de funções no Typescript.


Para melhorarmos ainda mais a segurança e usabilidade podemos usar os elementos de validação do Forms diretamente em nosso botão, desabilitando o `onSubmit` até que o formulário esteja com todos os dados válidos. 

Para usar essa funcionalidade iremos implementar o código abaixo no nosso  **user-form.component.html**, substituindo apenas o button anterior.
```html
<button type="submit" class="btn btn-primary" [disabled]="userForm.invalid">
{{ editMode ? 'Atualizar' : 'Adicionar' }}
</button>
```

#### 2.2.1 Validating forms - validações programáveis
O Angular também permite criar `Validators` próprios. Para isso basta que a função seja definida com o tipo de retorno `ValidationErrors  |  null` e receber como parâmetro uma variável do tipo `AbstractControl`.

Para nosso projeto vamos criar um validador próprio para no CPF, para validar que ele siga as regras estabelecidas pelo CPF brasileiro. Para isso, cria a pasta **validators** dentro da pasta **src/app**, e nessa pasta crie o arquivo **cpf_validator.ts**.

No arquivo **cpf_validator.ts** adicione o código abaixo:
```typescript
import { AbstractControl, ValidationErrors } from  '@angular/forms';

export  function  cpfValidator(control:  AbstractControl):  ValidationErrors  |  null {
  const  cpf  =  control.value?.replace(/\D/g, ''); // Remove caracteres não numéricos

  if (!cpf  ||  cpf.length  !==  11  || /^(\d)\1{10}$/.test(cpf)) {
    return { cpfInvalid:  'CPF inválido' };
  }

  // Validação dos dígitos verificadores
  let  sum  =  0;
  for (let  i  =  0; i  <  9; i++) {
    sum  +=  parseInt(cpf.charAt(i)) * (10  -  i);
  }

  let  firstDigit  = (sum  *  10) %  11;
  if (firstDigit  ===  10  ||  firstDigit  ===  11) firstDigit  =  0;
  if (firstDigit  !==  parseInt(cpf.charAt(9))) {
    return { cpfInvalid:  'CPF inválido' };
  }

  sum  =  0;
  for (let  i  =  0; i  <  10; i++) {
    sum  +=  parseInt(cpf.charAt(i)) * (11  -  i);
  }
  
  let  secondDigit  = (sum  *  10) %  11;
  if (secondDigit  ===  10  ||  secondDigit  ===  11) secondDigit  =  0;
  if (secondDigit  !==  parseInt(cpf.charAt(10))) {
    return { cpfInvalid:  'CPF inválido' };
  }

  return  null; // CPF válido
}
```

Para usarmos nosso validator basta importar o arquivo no componente e passar a função como uma opção na lista de `Validators` do `FormControl`. Faremos isso em nosso projeto no arquivo **user-form.component.ts**, como mostrado abaixo:
```typescript
cpf: new FormControl('', [Validators.required, cpfValidator]),
```

#### Verificando andamento...
Para verificar se seu projeto está igual a este, você pode usar o comando **git** abaixo:
```bash
git checkout be8ffd4
```

## 3. Service

Os **Services** são essenciais nos projetos Angular, pois possibilitam centralizar e reutilizar lógicas de negócios e manipulação de dados, promovendo organização e facilidade de manutenção. Eles também possibilitam o compartilhamento de informações entre componentes, seguindo o princípio da injeção de dependência.

Para a introdução do nosso conceito não iremos realizar consultas a APIs, mas nos projetos futuros usaremos tal artificio via Service.

### 3.1 Criando o Service

A criação do Service é muito simples, podemos gera-lo por meio de um comando no terminal do projeto. Mas antes de criarmos em nosso projeto o Service, iremos criar uma pasta chamada **services** dentro do caminho **src/app**.
Agora, dentro da pasta service use o comando abaixo para gerar nosso service:
```bash
ng g s user_service
```

Dentro do arquivo **user_service.ts** sobrescreva-o com o código abaixo:
```typescript
import { Injectable } from  "@angular/core";
import { User } from  "../models/user";

@Injectable({
  providedIn:  'root'
})
export  class  UserService {
  private  users:  User[] = [];
  private  currentId  =  1;

  getUsers():  User[] {
    return  this.users;
  }
  
  addUser(user:  User):  void {
    user.id  =  this.currentId++;
    this.users.push(user);
  }

  getUserById(id:  number):  User  |  undefined {
    return  this.users.find(user  =>  user.id  ===  id);
  }
  
  updateUser(updatedUser:  User):  void {
    const  index  =  this.users.findIndex(user  =>  user.id  ===  updatedUser.id);
    if (index  !==  -1) {
      this.users[index] =  updatedUser;
    }
  }
}
```

A definição dos nossos services é feita via diretiva `@Injectable`. Dentro da diretiva é possível descrever um parâmetro chamado `providedIn`, seu objetivo é delimitar o escopo de compartilhamento/utilização do serviço. Em nosso caso o serviço está descrito como `root`, isso indicia que ele pode ser utilizado em qualquer parte do projeto, mas poderia restringi-lo a um pacote específico.

Para usarmos os serviços dentro dos componentes é muito simples, basta **instancia-los via injeção de dependência**. Para realizar o processo basta criar uma váriável dentro do construtor com a tipagem do serviço. 
Para o nosso projeto vamos adicionar o serviço no arquivo **user-list.component.ts**, sendo assim, iremos sobrescrever a variável users criada anteriormente e adicionar o construtor como abaixo:
```typescript
users: User[];

constructor(private userService: UserService) {
  this.users = this.userService.getUsers();
}
```

Agora a lista de usuários do componente está vinculado ao nosso serviço, porém ainda precisamos vincular o nosso cadastro de usuários a listagem. Para isso iremos fazer o mesmo processo no arquivo **user-form.component.ts**.

No arquivo **user-form.component.ts**, vamos sobrescrever nosso `constructor` declarado adicionando o nosso serviço, e também iremos sobrescrever a função `onSubmit()` para registrar os usuários no **UserService**:
```typescript
constructor(
  private router: Router,
  private route: ActivatedRoute,
  private userService: UserService,
) {
  this.userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    cpf: new FormControl('', [Validators.required, cpfValidator]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
}

onSubmit():  void {
  if (this.userForm.valid) {
    const user: User = new User({
      id: this.userId!,
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      cpf: this.userForm.value.cpf,
    });

    if (this.editMode) {
      this.userService.updateUser(user);
    } else {
      this.userService.addUser(user);
    }

    this.router.navigate(['/users']);
  }
}
```
Note que agora é possível visualizar todos os usuários cadastrados na tela de listagem, pois eles agora estão sendo compartilhados via **UserService**. Em nosso construtor também adicionamos o parâmetro `ActivatedRoute`, mas isso eu explicarei como o usaremos mais para frente do projeto.

#### Verificando andamento...
Para verificar se seu projeto está igual a este, você pode usar o comando **git** abaixo:
```bash
git checkout 2718e5e
```

### 3.2 Adicionando funções de ciclo de vida do componente
Agora que conseguimos compartilhar nossas informações de usuários via `UserService` podemos concluir nosso projeto possibilitando também a edição dos usuários. Porém, para isso precisamos conseguir recuperar o id informado na url para que possamos recuperar o usuário, e será nesse momento que entraremos com o `ActivatedRoute`, bem como iremos aprender a usar as funções de ciclo de vida do componente, para que ao inicializar a tela possamos recuperar os dados.

Para iniciar teremos que implementar uma função chamada **ngOnInit** ela é uma função especial do ciclo de vida de um componente, então adicione no nosso arquivo o  **user-form.component.ts** a função abaixo:
```typescript
ngOnInit():  void {
  this.route.paramMap.subscribe(params  => {
    this.userId  =  +params.get('id')!;
    if (this.userId) {
      this.editMode  =  true;
      const  user  =  this.userService.getUserById(this.userId);
      if (user) {
        this.userForm.patchValue(user);
      }
    }
  });
}
```
Essa função é capaz de a partir da variável **route**, que é do tipo `ActivatedRoute`, pegar a url atual do site e consultar o **id** informado nela. Desta forma, podemos a partir do **id** realizar uma consulta ao **UserService**, para buscar os dados do usuário e inseri-los dentro do **userForm** via função `patchValue`.

Ao executar o projeto, você irá perceber que mesmo adicionando a função `ngOnInit` os dados do usuário na edição não estão sendo apresentados na tela. Isso ocorre porque precisamos implementar a interface `OnInit` em nosso componente, e para isso basta sobrescrever a declaração da classe ** UserFormComponent** como abaixo: 
```typescript
export  class  UserFormComponent implements OnInit {
```
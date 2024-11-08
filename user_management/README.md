# User Managment
Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 18.2.5.

#### Temas abordados:
+  **1.** **Rotas:** Definição e configuração de rotas, RouterOutlet e RouterLink
+  **2.** **Form:** Utilização do @IF, @For e @Let;
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

### 1.3 RouterLink


## 2. Form

## 3. Service
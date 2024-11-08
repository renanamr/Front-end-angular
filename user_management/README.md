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
git checkout 
```

Agora, vamos aos novos conceitos 😁

## 1. Routes

### 1.1 Definição das rotas

### 1.2 RouterOutlet

### 1.3 RouterLink


## 2. Form

## 3. Service
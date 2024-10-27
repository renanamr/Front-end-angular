# ListTask
Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 18.2.5.

#### Temas abordados:

+  **1.** Comunicação Template Componente: Interpolação, *Property binding* e *Event Binding*;

+  **2.** Control Flow: Utilização do @IF, @For e @Let;

+  **3.** Definição de Input e Output;

+  **4.** Utilização do Bootstrap nos projetos Angular.

  

## 0. Inicialização do projeto

Para iniciar crie um projeto para exercitar os conceitos. Para isso use o comando a seguir:

```bash
ng  new  list_task
```

**Observação:** Para esse projeto usaremos somente o componente AppComponent (que já é criado automaticamente) e o ItemTaskComponent. Pois o foco do projeto é exemplificar os conceitos, porém em uma execução real é ideal criar vários componentes para organizar melhor a estrutura.

#### Criando o componente ItemTask:

Para criar os nossos componentes abra o terminal no diretório do projeto, e execute o comando abaixo para chegar até a página correta aonde devem ser criados os componentes.

```bash
cd  src/app
```

Nela execute o comando:

```bash
ng  g  c  item-task
```

Pronto, já estamos com todos os componentes e criados e pronto para uso.


  #### Criando model Task:
  Para auxiliar a atividade iremos usar uma **class Task**. para isso, crie dentro do diretório **src** uma pasta chamada **models** onde iremos criar nossas classes de representação de modelos.

Dentro da pasta criada, gere um **novo arquivo** chamado **task.ts**. Dentro dele insira o seguinte código:
```typescript
export  class  Task {
	name:  string;
	isComplete:  boolean;

	constructor(task  :  ITask) {
		this.name  =  task.name;
		this.isComplete  =  task.isComplete;
	}
}

interface  ITask{
	name:  string;
	isComplete:  boolean;
}
```

A classe Task irá representar nossa informação no sistema, e a interface ITask é uma forma de iniciarmos os valores do nosso construtor da classe Task por meio de parâmetros nomeados.

**Agora podemos começar os estudos**

## 1. Comunicação Template Componente

Para a estruturação do projeto vamos criar algumas variáveis e métodos que serão usados no decorrer do projeto. Para isso, **escreva o código abaixo sobrescrevendo o arquivo item-tas.component.ts** padrão gerado no projeto.

```typescript
import { Component } from  '@angular/core';
import { Task } from  '../../models/task';

@Component({
	selector:  'app-item-task',
	standalone:  true,
	imports: [],
	templateUrl:  './item-task.component.html',
	styleUrl:  './item-task.component.css'
})
export  class  ItemTaskComponent {
	task = new Task({name:  "Renan", isCompleted:  true});

	changeStatusTask() {
		this.task.isCompleted = !this.task.isCompleted;
	}
}
```

Agora, vamos  **escrever o código abaixo sobrescrevendo o app.component.ts** localizado no diretório **src/app**:
```typescript
import { Component } from  '@angular/core';
import { ItemTaskComponent } from  "./item-task/item-task.component";

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [ItemTaskComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export  class  AppComponent {}
```

Para finalizar,  **escreva o código abaixo sobrescrevendo o app.component.html** localizado no diretório **src/app**:
```html
<div>
	<div>
		<h3>Lista de Tarefas</h3>
	</div>
	<app-item-task></app-item-task>
</div>
```
Agora, vamos aos novos conceitos 😁

### 1.1 Interpolação

### 1.2 *Property binding*

### 1.3 *Event Binding*
  

## 2. Control Flow

 
## 3. Input e Output
  

## 4. Bootstrap
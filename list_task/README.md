# ListTask
Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 18.2.5.

#### Temas abordados:
+  **1.** Comunicação Template Componente: Interpolação, *Property binding* e *Event Binding*;
+  **2.** Definição de Input e Output;
+  **3.** Control Flow: Utilização do @IF, @For e @Let;
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
	task = new Task({name:"Componentes Angular", isCompleted:false});
	
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

Usado para **inserir valores/expressões no template html**, com isso é possível conectar os dados das variáveis presentes no componente com às páginas html. Para isso, usa-se o símbolo `{{ }}`.

Adicione no arquivo **item-task.component.html** o código abaixo para fazer uso da interpolação.
```html
<li>
	<div>
		<h5> {{ task.name }}</h5>
	</div>
	<button>{{ task.isCompleted ? 'Reabrir' : 'Finalizar' }}</button>
</li>
```

Ao examinar o código vemos dois possíveis usos para a interpolação, sendo elas:
 1. **Demonstrar dados da variável:** No item `h5` é utilizado para demonstrar o valor do campo `name` presente na variável `task` que foi definida no *component*.
 2. **Dados a partir de expressões:**  No item `button` é utilizado para executar uma expressão, a qual escreve o texto do botão de acordo com o valor do campo `isCompleted` da variável `task`.


#### Verificando andamento...
Para verificar se seu projeto está igual a este, você pode usar o comando **git** abaixo dentro desse repositório e observar os documentos dele.
```bash
git checkout 3395145
```

### 1.2 *Property binding*

Usado para **definição de valores para propriedades de elementos html**, assim sendo possível a partir de variáveis do *component* modificar dinamicamente os *styles* dos componentes html, bem como links de imagens etc . Para isso, usa-se o símbolo `[ ]`.

Adicione no arquivo **item-task.component.html** o código abaixo, **modificando o elemento h5 já existente**.
```html
<h5 [style.color]="task.isCompleted  ?  'gray'  :  'black'"> 
	{{ task.name }}
</h5>
```

Com a adição do *Property binding* a cor do texto do `h5` vira dependente do valor do campo `isCompleted`, sendo definido por uma expressão com funcionalidade similar ao visto na interpolação. 
Além disso, é possível passar  também somente uma variável que contenha apenas o valor da cor, como por exemplo:
```html
<h5 [style.color]="corTexto"> {{ task.name }}</h5>
```
**Atenção:** Para o código acima funcionar é necessário criar a variável `corTexto` dentro arquivo **item-task.component.ts**. E não usaremos esse modelo por enquanto em nosso projeto.

### 1.3 *Event Binding*
Usado para **permitir a execução de funções com base nas ações do usuário**, assim gerando uma comunicação por parte do html para o nosso *component* typescript. Para isso, usa-se o símbolo `( )`.

Adicione no arquivo **item-task.component.html** o código abaixo, **modificando o elemento button já existente**.
```html
<button (click)="changeStatusTask()">
	{{ task.isCompleted ? 'Reabrir' : 'Finalizar' }}
</button>
```

Com a adição do *Event Binding* possibilitamos que ao **clicar no button** a função `changeStatusTask()` seja executa. Isso ocorre porque definimos a operação `(click)` no nosso botão, mas poderíamos usar outros tipos de ação definidas pelo html como o `(hover)` para executar a função caso o usuário passe o mouse por cima do elemento. 


#### Verificando andamento...
Concluímos a primeira parte do projeto, e para verificar se seu projeto está igual a este, você pode usar o comando **git** abaixo:
```bash
git checkout e7b96e2
```

## 2. Input e Output

Muitas vezes quando estamos desenvolvendo projetos se faz necessário que nossos componentes troquem informações. Infelizmente, com o que aprendemos até agora isso não seria possível, pois só compartilhamos informações dentro do componente e seu template.

Para resolver esse problema e possibilitar esse compartilhamento de dados aprenderemos a usar o `@input` e o `@output` e assim construir aplicações mais dinâmicas.

Antes de ver o conceito na prática precisaremos modificar o **AppComponent**. Então sobrescreva o **app.component.ts** com o código abaixo, para que possamos usar a lista para atividade:
```typescript
import { Component } from '@angular/core';
import { ItemTaskComponent } from "./item-task/item-task.component";
import { Task } from '../models/task';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ItemTaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  taskList : Array<Task> = [
    new Task({ name: 'Estudar Angular', isCompleted: false }),
    new Task({ name: 'Praticar TypeScript', isCompleted: true }),
	new Task({ name: 'Ler sobre Web Development', isCompleted: false })
  ];
}
```
Agora, vamos aos conceitos 😁
  
 
### 2.1 Input
A propriedade `Input` é utilizada quando queremos **receber informações em um componente**, assim o componente que o importar será responsável por mandar esses dados.
**Observação:** O componente que utiliza o input é chamado de componente filho, já o que envia os dados é chamado de componente pai.

Para podermos usar o `Input` primeiramente precisaremos importa-lo no componente que desejarmos, no nosso caso será dentro do **item-task.component.ts**. Para isso, adicione a linha abaixo, sobrescrevendo a importação já existente do `@angular/core`:
```typescript
import { Component, Input } from '@angular/core';
```

Após a importação poderemos adicionar realmente o input, substituindo nossa antiga variável `task` pelo modelo com input, para que assim possamos usar o componente para qualquer task que quisermos. Para isso, adicione o *decorator* do **@Input** no **item-task.component.ts** assim como mostrado abaixo:
```typescript
//...
export class ItemTaskComponent {
  @Input({required: true}) task! : Task;
//...
}
```
Note que nele **declaramos um parâmetro opcional** chamado `required`. Esse parâmetro quando marcado como true, obriga que o componente pai passe a informação. Outro detalhe é o símbolo `!` utilizado após o nome da variável **task**, ele serve para informar que a variável **nunca será Null**.

Agora, precisamos passar as informações em nosso template do AppComponent, para o componente ItemTaskComponent. Para isso sobreessreva seu arquivo **item-task.component.html** com o código abaixo: 
```html
<div>
  <div>
    <h3>Lista de Tarefas</h3>
  </div>

  <div>
    <app-item-task  [task]="taskList[0]"></app-item-task>
    <app-item-task  [task]="taskList[1]"></app-item-task>
    <app-item-task  [task]="taskList[2]"></app-item-task>
  </div>
</div>
```

Note que para passarmos as informações para nosso componente estamos utilizando o conceito de *Property binding*. Isto ocorre porque o input transforma nossa variável *task* em um parâmetro do item `app-item-task`. 

Agora conseguimos a partir da definição de um único componente, gerar diversos itens de tarefas diferentes seguindo um mesmo modelo de *template*. E essa é a grande vantagem no uso do da propriedade Input.

### 2.2 Output
A propriedade `Output` é utilizada quando queremos **enviar informações de um componente para seu componente pai**, assim o componente que o importar poderá receber esses dados.

O uso *Output está atrelado ao disparo de eventos, ao quais são definidos partir de um atributo **EventEmitter**, que precisa ser instanciado para utilização.

Para podermos usar o `Output` primeiramente precisaremos importa-lo no componente que desejarmos, no nosso caso será dentro do **item-task.component.ts**. Para isso, adicione a linha abaixo, sobrescrevendo a importação já existente do `@angular/core`:

```typescript
import { Component, Input, EventEmitter, Output } from '@angular/core';
```

Após a importação poderemos adicionar realmente o output. Para isso, adicione o *decorator* do **@Output** e o **EventEmitter** no **item-task.component.ts** assim como mostrado abaixo:
```typescript
/...
export  class  ItemTaskComponent {
  /...
  @Output() eventChageStatusTask = new EventEmitter<Task>();

  changeStatusTask() {
    this.task.isCompleted = !this.task.isCompleted;
    this.eventChageStatusTask.emit(this.task);
  }
}
```

Algum detalhes da implementação são:
1. **Definição da variável:** Para definição é necessário usar o decorator `@Output` bem como instanciar a variável com o tipo EventEmitter. (Note que o item entre <> define o tipo de parâmetro que será passado).
2. **Chamada do evento:** Para chamar o evento se utiliza a variável definida se utilizando o método `emit`, passando entre `()` o valor do parâmetro que será utilizado pela função.

Antes de realmente utilizar nosso Output, iremos adicionar a variável `tasksCompleted` e a função `changeCompleteTask`, no **app.component.ts**. Assim como definido abaixo:
```typescript
/...
export  class  AppComponent {
  /...
  tasksCompleted : number = 1;

  changeCompleteTask(task: Task) {
    if(task.isCompleted){
      this.tasksCompleted++;
    }else{
      this.tasksCompleted--;
    }
  }
}
```

Agora, precisamos passar as informações em nosso template do AppComponent, para o componente ItemTaskComponent. Para isso sobreessreva seu arquivo **item-task.component.html** com o código abaixo: 
```html
<div>
  <div>
    <h3>{{"Lista de Tarefas - " + tasksCompleted + "/" + taskList.length}}</h3>
  </div>

  <div>
    <app-item-task 
      [task]="taskList[0]"
      (eventChageStatusTask)="changeCompleteTask($event)"/>
    <app-item-task 
      [task]="taskList[1]"
      (eventChageStatusTask)="changeCompleteTask($event)"/>
    <app-item-task 
      [task]="taskList[2]"
      (eventChageStatusTask)="changeCompleteTask($event)"/>
  </div>
</div>
```
Note que para passarmos as funções para nosso componente estamos utilizando o conceito de *Event binding*. 


## 3. Control Flow

O *Control Flow* (Fluxo de controle) é uma ferramenta muito útil para construção de interfaces dinâmicas, que possibilitam gerar estruturas para verificação e demonstração de partes da tela *HTML*, bem como possibilita o reaproveitamento de código para construção de elementos *HTML*.


### 3.1 Usando @For

### 3.2 Usando @If

### 3.3 Usando @Let

## 4. Bootstrap
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

Adicione no arquivo **item-task.component.html** o código abaixo, **modificando o elemento h5 já existente **.
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
  

#### Verificando andamento...
Concluímos a primeira parte do projeto, e para verificar se seu projeto está igual a este, você pode usar o comando **git** abaixo:
```bash
git checkout 
```

## 2. Control Flow

 
## 3. Input e Output
  

## 4. Bootstrap
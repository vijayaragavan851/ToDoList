const add = document.getElementById("add");
const input = document.getElementById("toDo"); // i get the Html element by using the DOM concept using id Method
const taskContainer = document.getElementById("taskContainer");
const taskArr = [];

function addTask()
{
      const task = input.value;
      let taskLen=task.length;
      let spc = 0;
      let obj={};

      if(task.length === 0){
            return alert("please Enter Some task...");
      }
      
      for(i=0;i<taskLen;i++){
            if(task[i] === " "){spc +=1;}
      }

      if(spc != taskLen){    
           obj.value = task;
           obj.isCompleted = false; 
           obj.taskId = taskId();
           taskArr.push(obj);
           setTask();
           createElement(obj);
           input.value ="";
      }
      else {
            alert("Please Enter the task Correctly..");
      }      
}


function createElement(userInput){
      const newElement = document.createElement("div");  
      newElement.setAttribute("id",userInput.taskId)
       if(userInput.isCompleted === false){newElement.setAttribute("class","task");}
       else{newElement.setAttribute("class","task completed")}
       newElement.innerText = userInput.value;
       newElement.addEventListener("click",taskEventHandler);
       newElement.addEventListener("dblclick",removeElement);
       taskContainer.append(newElement);      
}


function enter(event){
      if(event.keyCode === 13){ addTask(); }
}

function getTask(){
     let strgTask = localStorage.getItem("task");
     if(!strgTask) {return};
     strgTask= JSON.parse(strgTask); 
     for(i=0;i<strgTask.length;i++){ 
        taskArr.push(strgTask[i])
       createElement(strgTask[i]);
     }
}

getTask();

function setTask(){
      localStorage.setItem("task",JSON.stringify(taskArr));
}

function taskEventHandler(){
      this.classList.toggle("completed");
      const id = this.id;
      for(obj of taskArr){
            if(obj.taskId === id){ obj.isCompleted=!obj.isCompleted;}
      }
      setTask();
}

function taskId(){
      const date  = new Date();
      const year=date.getFullYear().toString();
      const month=date.getMonth().toString();
      const toDate=date.getDate().toString();
      const hour=date.getHours().toString();
      const minute=date.getMinutes().toString();
      const sec=date.getSeconds().toString();
      const millisec=date.getMilliseconds().toString();
      const id = year + month + toDate + hour + minute + sec + millisec;
      return id;
}

function removeElement()
{
      this.remove();
      const id = this.id ;
      for(index in taskArr){   
             if(taskArr[index].taskId === id){taskArr.splice(index,1);} 
      }
      setTask();

}
add.addEventListener("click",addTask);
input.addEventListener("keyup",enter)






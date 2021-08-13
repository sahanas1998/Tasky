const taskcontainer =document.querySelector(".task_container")
console.log(taskcontainer)

let globalStore =[];

const newCard =({id,imageurl,tasktitle,tasktype,taskdescription})=>`<div class="col-md-6 col-lg-4">
<div class="cards">
    <div class="card-header d-flex  justify-content-end gap-2"  id=${id}>
        <button type="button" class="btn btn-outline-primary"><i class="fas fa-pencil-alt"></i></button>
        <button type="button" class="btn btn-outline-danger"  id=${id}  onclick="deleteCard.apply(this.arguments)"><i class="fas fa-trash-alt" ></i></button>
    </div>
    <div class="card-body">
        <img src=${imageurl} class="card-img-top" alt="rose" hight="1280px"  width="720">
        <h5 class="card-title">${tasktitle}</h5>
      <p class="card-text">${taskdescription}</p>
      <span class="badge bg-primary">${tasktype}</span>
    </div>
    <div class="card-footer text-muted d-flex  justify-content-end">
        <button type="button" class="btn btn-outline-primary">Open Task</button>
    </div>
  </div>
</div>`

const  loadInitialTaskCards=()=>{
    //  access  local storage
    const  getInitialData=localStorage.getItem("Tasky");
    if(!getInitialData) return;
    //  covert stringified-object to  object
    const  {cards}=JSON.parse(getInitialData);
    // map around the array to generate HTML ccaard annnnd  inject it  to DOM
    cards.map((card)=>{
        const  createNewCard=newCard(card);
        taskcontainer.insertAdjacentHTML("beforeend",createNewCard);
        globalStore.push(card);
    });
};
const saveChages =()=>{
    const taskData={
        id  :`${Date.now()}`,
        imageurl  :document.getElementById("imageurl").value,
        tasktitle :document.getElementById("tasktitle").value,
        tasktype :document.getElementById("tasktype").value,
        taskdescription :document.getElementById("taskdescription").value
    };
    const createcard=newCard(taskData);

    taskcontainer.insertAdjacentHTML("beforeend",createcard);
    globalStore.push(taskData);
    localStorage.setItem("Tasky",JSON.stringify({cards:globalStore}));
};

const  deleteCard=(event)=>{
    event=window.event;
    const targetID=event.target.id;
    const tagname=event.target.tagName;
    const newUpateArray=globalStore.filter(
        (cardObject)=>cardObject.id!==targetID
    );
    globalStore=newUpateArray;
    localStorage.setItem("Tasky",JSON.stringify({cards:globalStore}));

    if(tagname==="BUTTON"){
        return taskcontainer.removeChild(
            event.target.parentNode.parentNode.parentNode
        );
        
    }
    return taskcontainer.removeChild(
        event.target.parentNode.parentNode.parentNode.parentNode
    );
};


  
  
  
  
  
  
  

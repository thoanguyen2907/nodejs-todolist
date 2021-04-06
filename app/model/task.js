const fs = require("fs"); 

const readAllTask = ()=> {
        const buffer = fs.readFileSync("task.json"); 
        const taskString = buffer.toString(); 
        console.log(buffer); 
        const taskJson = JSON.parse(taskString)
        return taskJson; 
};
const createTask = (title, description)=> {
  const newTask = {
        id: Math.round(Math.random()).toString(), 
        title,
        description
  }
  let taskList = readAllTask(); 
  taskList = [...taskList, newTask]; 
 fs.writeFileSync("task.json", JSON.stringify(taskList));
 return newTask; 

};
const readDetailTask = (id) => {
    let taskList = readAllTask(); 
    const task = taskList.find((item)=> item.id === id); 
    if (task){
        return task;
    }
};

const updateTask = (id, title, description) => {
    let taskList = readAllTask(); 
    const index = taskList.findIndex((item)=> item.id == id); 
 
    if (index !== -1){
        let oldTask = taskList[index]; 
        let newTask = {...oldTask, title, description}
        taskList[index] = newTask; 
        fs.writeFileSync("task.json", JSON.stringify(taskList));
        return newTask; 
    } else {
       return false; 
    }
}; 
const deleteTask = (id) => {
    let taskList = readAllTask(); 
    const index = taskList.findIndex((item)=> item.id == id); 
 
    if (index !== -1){
        taskList = taskList.splice(index,1); 
        fs.writeFileSync("task.json", JSON.stringify(taskList));
        return true; 
    } else {
       return false; 
    }
}; 



module.exports = {
    readAllTask,
    createTask, 
    readDetailTask, 
    updateTask,
    deleteTask
}
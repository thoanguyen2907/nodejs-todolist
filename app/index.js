
//import yargs from 'yargs';//es6

const yargs = require('yargs'); 

const fs = require("fs"); //file system (build in nodejs)
const {readAllTask, createTask, readDetailTask, updateTask, deleteTask} = require("./model/task");

//tạo lệnh test
//node app/index.js test
yargs.command({
    command: "test", 
    handler: () => {
        console.log("test"); 
    }
}); 
//CRUD
//create
yargs.command({
    command: "create",
    builder: {
    title: {
        type: "string",
       
    }, 
    description: {
        type: "string",
    }
    
    },
    handler: (args)=>{
        const {title, description} = args; 
        const newTask = createTask(title,description); 
        console.log("đã tạo mới công việc thành công !!!", newTask); 
    }
})
//update
yargs.command({
    command: "update",
    builder: {
        title: {
            id: "string",
           
        },
        title: {
            type: "string",
           
        }, 
        description: {
            type: "string",
        }       
        },
    handler: (args)=>{
        const {id, title, description} = args; 
        const taskUpdated =   updateTask(id, title, description); 

        if(taskUpdated) {
            console.log("task updated : ", taskUpdated);
        } else {
            console.log("Not Found")
        }
    }
});
//read
yargs.command({
    command: "read",
    builder: {
        id: {
            type: "string"
        }
    },
    handler: (args)=>{
        const {id} = args; 
        const task = readDetailTask(id); 
        if(task) {
            console.log("task: ", task); 
        } else {
            console.log("task not found"); 
        }
        
    }
});
//read-all
yargs.command({
    command: "read-all",
    handler: (args)=>{
        const result = readAllTask(); 
     
    }
});
//delete
yargs.command({
    command: "delete",
    builder: {
        title: {
            id: "string",
           
        }}
        ,

    handler: (args)=>{
        const {id} = args; 
        const indexDelete = deleteTask(id); 
        if(indexDelete) {
            console.log("Deleted  !! ",indexDelete )
        } else {
            console.log("Not found")
        }
    } 
})


//lưu lại các lệnh vừa tạo
yargs.parse(); 
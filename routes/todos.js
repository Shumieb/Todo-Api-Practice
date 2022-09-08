const router = require("express").Router()
const { v4 } = require("uuid");
const checkAuth = require("../middleware/checkAuth");

let todos = [];

router.get("", checkAuth, (req, res) =>{
    return res.json(todos);
})

router.get("/:id", checkAuth, (req, res) =>{
    const { id } = req.params;
    const todo = todos.find(todo => todo.id === id);
    return res.json(todo);
})

router.post("", checkAuth, (req, res)=>{
    const { title } = req.body;
    const todo = {
        id: v4(),
        title,
        completed: false
    };

    todos.push(todo);
    return res.json(todo);
})

router.put("/:id", checkAuth, (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex(todo => todo.id === id);
    todos[todoIndex].completed = !todos[todoIndex].completed;
    return res.json(todos[todoIndex])
})

router.delete("/:id", checkAuth, (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id !== id);
    return res.json(todos);    
})

module.exports = router
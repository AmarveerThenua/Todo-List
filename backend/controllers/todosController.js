import Todos from '../models/Todos.js'

const addTodo = async (req, res) => {
    const { title, description, userId } = req.body

    try {
        if (!title || !description || !userId) {
            return res.status(400).json({
                message: "Title, description and userId are required"
            });
        }

        const newTodo = await Todos.create({
            title,
            description,
            user: userId
        })

        res.status(201).json({
            message: "Todo created Successfully",
            todo: newTodo
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }


}

const getTodos = async (req, res) => {
    const { userId } = req.params;
    try {
        if (!userId) {
            return res.status(400).json({
                message: "User id required"
            })
        }

        const todos = await Todos.find({
            user: userId
        }).sort({ createdAt: -1 })
        res.status(200).json({
            message: "Todos fetched successfully",
            todos
        })

    } catch (error) {
        console.log(error)
    }
}

const deleteTodo = async (req, res) => {
    const { todoId } = req.params;

    try {
        if (!todoId) {
            return res.status(400).json({
                message: "Todo ID is required"
            });
        }

        const response = await Todos.findByIdAndDelete(todoId);

        if (!response) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        return res.status(200).json({
            message: "Todo deleted successfully",
            todo: response
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


const completedTodo = async (req, res) => {
    const { todoId } = req.params
    if (!todoId) {
        return res.status(400).json({
            message: "Todo Id required"
        })
    }

    try {
        const todo = await Todos.findByIdAndUpdate(
            todoId,
            {
                completed: true
            },
            {
                new: true
            }
        )

        return res.status(200).json({
            message: "Todo completed successfully",
            todo
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const editTodo = async (req, res) => {
    const { todoId } = req.params;
    const { title, description } = req.body
    if (!todoId) {
        return res.status(400).json({
            message: "Todo Id required"
        })
    }

    const checkTodo = await Todos.findById(todoId)

    if(title == checkTodo.title && description == checkTodo.description){
        return res.status(400).json({
            message:"No changes detected."
        })
    }

    try {
        
        const todo = await Todos.findByIdAndUpdate(
            todoId,
            {
                title,
                description
            },
            {
                new: true
            }
        )
        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        return res.status(200).json({
            message: "Todo updated successfully",
            todo
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    addTodo,
    getTodos,
    deleteTodo,
    completedTodo,
    editTodo
}
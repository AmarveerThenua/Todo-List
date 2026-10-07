import mongoose from "mongoose"


const todosSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum:["Pending","Progress","Completed"],
            default: "Pending"
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps:true
    }
)


const Todos = mongoose.model("Todos", todosSchema)

export default Todos;
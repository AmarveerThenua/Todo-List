import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Filters from "./Dashboard/Filters";
const Dashboard = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editTodoId, setEditTodoId] = useState(null);
    const [todos, setTodos] = useState([]);
    const [resMessage, setResMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [removeTodo, setRemoveTodo] = useState("");
    const [filter, setFilter] = useState("all");

    // Form validation state
    const [formError, setFormError] = useState({
        title: "",
        description: ""
    });

    const token = localStorage.getItem("token");

    const BASE_URL = "http://localhost:3000/api/todos";

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchData = async () => {
            const user = JSON.parse(localStorage.getItem("user"));

            if (!user) {
                navigate("/signin");
                return;
            }

            try {
                const response = await axios.get(
                    `${BASE_URL}/gettodos/${user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setTodos(response.data.todos);
            } catch (error) {
                console.log(error);

                setErrorMessage(
                    error.response?.data?.message || "Something went wrong"
                );

                setTimeout(() => {
                    setErrorMessage("");
                }, 800);
            }
        };

        fetchData();
    }, [navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();

        // Clear previous form errors
        setFormError({
            title: "",
            description: ""
        });

        // Form validation
        if (!title.trim() && !description.trim()) {
            setFormError({
                title: "Title is required",
                description: "Description is required"
            });
            return;
        }

        if (!title.trim()) {
            setFormError({
                title: "Title is required",
                description: ""
            });
            return;
        }

        if (!description.trim()) {
            setFormError({
                title: "",
                description: "Description is required"
            });
            return;
        }

        if (editTodoId) {
            try {
                const response = await axios.patch(
                    `${BASE_URL}/edit/${editTodoId}`,
                    {
                        title,
                        description
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setTodos((prevTodos) => {
                    return prevTodos.map((todo) => {
                        return todo._id == editTodoId
                            ? response.data.todo
                            : todo;
                    });
                });

                setResMessage(response.data.message);

                setTitle("");
                setDescription("");
                setEditTodoId(null);

                setTimeout(() => {
                    setResMessage("");
                }, 800);

            } catch (error) {
                console.log(error);

                setErrorMessage(
                    error.response?.data?.message || "Something went wrong"
                );

                setTimeout(() => {
                    setErrorMessage("");
                }, 800);
            }

        } else {
            try {
                const response = await axios.post(
                    `${BASE_URL}/addtodo`,
                    {
                        title,
                        description,
                        userId: user.id
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setTodos((prevTodos) => [
                    response.data.todo,
                    ...prevTodos
                ]);

                setResMessage(response.data.message);

                setTimeout(() => {
                    setResMessage("");
                }, 800);

                setTitle("");
                setDescription("");

            } catch (error) {
                console.log(error);

                setErrorMessage(
                    error.response?.data?.message || "Something went wrong"
                );

                setTimeout(() => {
                    setErrorMessage("");
                }, 800);
            }
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token")
        navigate("/signin");
    };

    const deleteTodo = async (todoId) => {
        try {
            const response = await axios.delete(
                `${BASE_URL}/delete/${todoId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setTodos((prevTodos) =>
                prevTodos.filter((todo) => todo._id !== todoId)
            );

            if (todoId === editTodoId) {
                setEditTodoId(null);
                setTitle("");
                setDescription("");
            }

            setRemoveTodo(response.data.message);

            setTimeout(() => {
                setRemoveTodo("");
            }, 800);

        } catch (error) {
            console.log(error);

            setErrorMessage(
                error.response?.data?.message || "Something went wrong"
            );

            setTimeout(() => {
                setErrorMessage("");
            }, 800);
        }
    };

    const updateTodoStatus = async (todoId, status) => {
        try {
            const response = await axios.patch(
                `${BASE_URL}/status/${todoId}`,
                {
                    status
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setTodos((preTodos) => {
                return preTodos.map((todo) => {
                    return todo._id == todoId
                        ? response.data.todo
                        : todo;
                });
            });

            setResMessage(response.data.message);

            setTimeout(() => {
                setResMessage("");
            }, 800);

        } catch (error) {
            console.log(error);

            setErrorMessage(
                error.response?.data?.message || "Something went wrong"
            );

            setTimeout(() => {
                setErrorMessage("");
            }, 800);
        }
    };

    const editTodo = (todoId) => {
        const todo = todos.find((todo) => todo._id == todoId);

        setEditTodoId(todoId);
        setTitle(todo.title);
        setDescription(todo.description);

        setFormError({
            title: "",
            description: ""
        });
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === "pending") {
            return todo.status === "Pending";
        }

        if (filter === "progress") {
            return todo.status === "Progress"
        }

        if (filter === "completed") {
            return todo.status === "Completed";
        }
        return true;
    })

    return (
        <div className="min-h-screen bg-gray-100">

            {resMessage && (
                <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-8 py-4 rounded-lg shadow-lg text-center">
                    {resMessage}
                </div>
            )}

            {errorMessage && (
                <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-8 py-4 rounded-lg shadow-lg text-center">
                    {errorMessage}
                </div>
            )}

            {removeTodo && (
                <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-8 py-4 rounded-lg shadow-lg text-center">
                    {removeTodo}
                </div>
            )}

            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    <h1 className="text-2xl font-bold text-blue-600">
                        TodoApp
                    </h1>

                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate("/profile")}
                            className="px-4 py-2 text-sm font-medium text-green-600 border border-green-200 rounded-lg hover:bg-green-100 transition cursor-pointer">
                            <FontAwesomeIcon icon={faUser} />Profile
                        </button>

                        <button
                            onClick={logout}
                            className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
                        </button>
                    </div>

                </div>
            </nav>

            {/* Main */}
            <main className="max-w-7xl mx-auto px-6 py-8">

                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        My Todos
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Manage your daily tasks and stay productive.
                    </p>
                </div>

                {/* Add Todo */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">

                    <h3 className="text-xl font-semibold text-gray-800 mb-5">
                        {editTodoId ? "Edit Todo" : "Add New Todo"}
                    </h3>

                    <form
                        onSubmit={submitHandler}
                        className="space-y-4"
                    >

                        {/* Title */}
                        <div>
                            <input
                                required
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);

                                    setFormError((prev) => ({
                                        ...prev,
                                        title: ""
                                    }));
                                }}
                                type="text"
                                placeholder="Todo title"
                                className={`w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${formError.title
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    }`}
                            />

                            {formError.title && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formError.title}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <textarea
                                required
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);

                                    setFormError((prev) => ({
                                        ...prev,
                                        description: ""
                                    }));
                                }}
                                rows="4"
                                placeholder="Todo description"
                                className={`w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none ${formError.description
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    }`}
                            />

                            {formError.description && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formError.description}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer font-semibold active:scale-98 hover:bg-blue-700 transition"
                        >
                            {editTodoId ? "Update Todo" : "+ Add Todo"}
                        </button>

                    </form>

                </div>

                {/* Todo Header */}
                <div className="flex items-center justify-between mb-5">

                    <h3 className="text-xl font-semibold text-gray-800">
                        Your Todos
                    </h3>
                    <div className="flex gap-4 items-center">
                        <Filters onFilterChange={setFilter} />
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {filteredTodos.length} Todos
                        </span>
                    </div>


                </div>

                {/* Todo Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                    {todos.length === 0 ? (
                        <div className="col-span-full min-h-62.5 flex items-center justify-center">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-gray-700">
                                    No Todos Yet
                                </h3>

                                <p className="mt-2 text-gray-500">
                                    Please add a todo to get started.
                                </p>
                            </div>
                        </div>
                    ) : (

                        filteredTodos.map((todo) => (

                            <div
                                key={todo._id}
                                className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition"
                            >

                                {/* Card Header */}
                                <div className="flex items-start justify-between gap-3">

                                    <h4 className="text-lg font-semibold text-gray-800">
                                        {todo.title}
                                    </h4>

                                    <span
                                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${todo.status == "Completed"
                                            ? "bg-green-100 text-green-700"
                                            :
                                            todo.status === "Progress"
                                                ? "bg-blue-100 text-blue-800"
                                                : "bg-yellow-100 text-yellow-700"

                                            }`}
                                    >
                                        {todo.status === "Progress"
                                            ? "Progress"
                                            : todo.status === "Completed"
                                                ? "Completed"
                                                : "Pending"
                                        }
                                    </span>

                                </div>

                                {/* Description */}
                                <p className="text-gray-500 text-sm mt-3 leading-relaxed flex justify-between">
                                    <span>
                                        {todo.description}
                                    </span>

                                    <span className="whitespace-nowrap">
                                        {new Date(todo.updatedAt).toLocaleString(
                                            "en-IN",
                                            {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true
                                            }
                                        )}
                                    </span>
                                </p>

                                {/* Buttons */}
                                <div className="flex gap-2 mt-6">

                                    <button
                                        disabled={todo.status === "Completed"}
                                        onClick={() => {
                                            if (todo.status === "Pending") {
                                                updateTodoStatus(todo._id, "Progress")
                                            }
                                            else if (todo.status === "Progress") {
                                                updateTodoStatus(todo._id, "Completed")
                                            }
                                        }}
                                        className={`whitespace-nowrap cursor-po flex-1 py-2 border border-green-500 text-green-600 rounded-lg text-sm font-medium hover:bg-green-50 transition 
                                            ${todo.status === "Completed"
                                                ? "border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed"
                                                : "border-green-500 text-green-600 hover:bg-green-50 cursor-pointer"
                                            }
                                            `}
                                    >
                                        <FontAwesomeIcon icon={faSquareCheck} /> {
                                            todo.status === "Pending"
                                                ? "Start Todo"
                                                : todo.status === "Progress"
                                                    ? "Complete Todo"
                                                    : "Completed"

                                        }
                                    </button>

                                    <button
                                        onClick={() => {
                                            editTodo(todo._id);
                                        }}
                                        className="cursor-po flex-1 py-2 border border-blue-500 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition"
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} /> Edit
                                    </button>

                                    <button
                                        onClick={() => deleteTodo(todo._id)}
                                        className="cursor-po flex-1 py-2 border border-red-500 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition"
                                    >
                                        <FontAwesomeIcon icon={faTrashCan} /> Delete
                                    </button>

                                </div>

                            </div>
                        ))
                    )}

                </div>

            </main >
        </div >
    );
};

export default Dashboard;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'

const Profile = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [responseMessage, setResponseMessage] = useState("")


    const BASE_URL = `http://localhost:3000/api/user`;

    const editProfile = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.patch(`${BASE_URL}/update/${user._id}`,
                { name })

            console.log(response)
            setResponseMessage(response.data.message)

            localStorage.setItem("user", JSON.stringify(response.data.updatedUser))
            setIsEditing(false)
            setTimeout(() => {
                setResponseMessage('')
            }, 1000);


        } catch (error) {
            console.log(error)

        }
    }

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

                    <h1 className="text-2xl font-bold text-blue-600">
                        TodoApp
                    </h1>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} /> Back
                    </button>

                </div>
            </nav>
            {responseMessage && <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-8 py-4 rounded-lg shadow-lg text-center">
                {responseMessage}
            </div>}
            {/* Profile */}
            <main className="max-w-3xl mx-auto px-6 py-10">


                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                    {/* Profile Header */}
                    <div className="bg-blue-600 px-6 py-8 text-center">

                        <div className="w-24 h-24 mx-auto rounded-full bg-white flex items-center justify-center text-blue-600 text-4xl">
                            <FontAwesomeIcon icon={faUser} />
                        </div>

                        <h2 className="text-2xl font-bold text-white mt-4">
                            {user?.name || "User"}
                        </h2>

                        <p className="text-blue-100 mt-1">
                            {user?.email || "No email available"}
                        </p>

                    </div>

                    {/* Profile Information */}
                    <div className="p-6">

                        <h3 className="text-xl font-semibold text-gray-800 mb-6">
                            Profile Information
                        </h3>
                        <form onSubmit={editProfile}>
                            <div className="space-y-5">

                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">
                                        Name
                                    </label>

                                    <input
                                        name="name"
                                        id="name"
                                        type="text"
                                        value={name}
                                        readOnly={!isEditing}
                                        onChange={(e) => {
                                            setName(e.target.value)
                                        }}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        value={user?.email || ""}
                                        readOnly
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 outline-none"
                                    />
                                </div>

                               
                            </div>
                            <div className="flex justify-between">
                                <div className="mt-8">
                                    <button type="button"
                                        onClick={() => {
                                            setIsEditing(!isEditing)
                                            setName(user.name)
                                        }}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
                                    >
                                        {isEditing ? "Cancel" : "Edit Profile"}
                                    </button>
                                </div>
                                {isEditing && <div className="mt-8">
                                    <button type="submit"
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer">
                                        Save
                                    </button>
                                </div>}
                            </div>
                        </form>


                    </div>

                </div>

            </main>

        </div>
    );
};

export default Profile;
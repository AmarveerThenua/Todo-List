import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <Link
            to="/"
            className="text-2xl font-bold text-blue-600"
          >
            TodoApp
          </Link>

          {
            !user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/signin"
                  className="px-5 py-2 text-gray-700 font-medium hover:text-blue-600 transition"
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Dashboard
                </Link>

                <button
                  className="px-5 py-2 text-red-600 font-medium border border-red-200 rounded-lg hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </div>
            )
          }

        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">

          <div className="max-w-3xl mx-auto text-center">

            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
              Simple. Fast. Productive.
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Organize Your Tasks.
              <span className="text-blue-600">
                {" "}Get Things Done.
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-500 leading-relaxed">
              Keep track of your daily tasks, manage your
              responsibilities, and stay productive with a
              simple and powerful Todo App.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

              <Link
                to="/signup"
                className="px-7 py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition active:scale-95"
              >
                Start for Free
              </Link>

              <Link
                to="/signin"
                className="px-7 py-3.5 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Sign In
              </Link>

            </div>

          </div>

        </section>

        {/* Features */}
        <section className="bg-white border-y border-gray-200">

          <div className="max-w-7xl mx-auto px-6 py-16">

            <div className="text-center mb-12">

              <h2 className="text-3xl font-bold text-gray-800">
                Everything You Need
              </h2>

              <p className="mt-3 text-gray-500">
                Simple tools to help you manage your tasks.
              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Feature 1 */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-xl text-2xl">
                  ✓
                </div>

                <h3 className="mt-5 text-xl font-semibold text-gray-800">
                  Manage Todos
                </h3>

                <p className="mt-2 text-gray-500">
                  Create and organize your daily tasks
                  in one simple place.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-xl text-2xl">
                  ✓
                </div>

                <h3 className="mt-5 text-xl font-semibold text-gray-800">
                  Track Progress
                </h3>

                <p className="mt-2 text-gray-500">
                  Mark tasks as completed and keep track
                  of your progress.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="w-12 h-12 flex items-center justify-center bg-purple-100 text-purple-600 rounded-xl text-2xl">
                  ⚡
                </div>

                <h3 className="mt-5 text-xl font-semibold text-gray-800">
                  Stay Productive
                </h3>

                <p className="mt-2 text-gray-500">
                  Focus on what matters and get your
                  important tasks done.
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-6 py-20 text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Ready to Get Organized?
          </h2>

          <p className="mt-4 text-gray-500">
            Create your account and start managing your todos today.
          </p>

          <Link
            to="/signup"
            className="inline-block mt-7 px-8 py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Create Free Account
          </Link>

        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">

          <p className="text-sm">
            © 2026 TodoApp. All rights reserved.
          </p>

          <p className="text-sm">
            Built with React & Node.js
          </p>

        </div>
      </footer>

    </div>
  );
};

export default Home;
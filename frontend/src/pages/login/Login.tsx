import React from 'react'

export const Login = () => {
  return (
    <div className="min-w-full min-h-screen flex items-center justify-center bg-dark-purple">
      <div className="bg-elegant-black p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl text-center text-white mb-4">Welcome to Castle Ravenloft</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-white">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full rounded border bg-transparent p-2 text-white focus:outline-none focus:border-blood-red"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-white">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full rounded border bg-transparent p-2 text-white focus:outline-none focus:border-blood-red"
            />
          </div>
          <button
            type="submit"
            className="font-bold w-full bg-blood-red text-white py-2 rounded hover:bg-dusty-rose"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

import React from 'react';

export const Navbar = () => {
  return (
    <nav className="bg-gray-900 border-b border-gray-700">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          {/* Left: Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8 rounded-full"
                src="Logo(1).png"
                alt="MANDLACX Logo"
              />
            </div>
            <h1 className="text-white text-xl font-bold ml-2">MANDLACX</h1>
          </div>

          {/* Center: Navigation Links */}
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-center">
            <div className="flex space-x-4">
              {[
                { label: 'Dashboard', icon: '📊' },
                { label: 'Cameras', icon: '🎥' },
                { label: 'Scenes', icon: '🏞️' },
                { label: 'Incidents', icon: '🚨' },
                { label: 'Users', icon: '👥' }
              ].map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <span className="mr-1">{item.icon}</span> {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: User Profile */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="bg-gray-800 flex items-center px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User Avatar"
              />
              <div className="ml-3 text-left">
                <div className="text-white text-sm font-medium">Mohammed Iljhas</div>
                <div className="text-gray-400 text-xs">iljhas@mandlacx.com</div>
              </div>
              <svg
                className="ml-2 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

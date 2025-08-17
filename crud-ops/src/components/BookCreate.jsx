import { useState } from "react";

export default function BookCreate({ onCreate }) {
  const [title, setTitle] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const formOnSubmit = (event) => {
    event.preventDefault();
    if (title.trim()) {
      onCreate(title);
      setTitle("");
      setIsExpanded(false);
    }
  };

  const changeHandle = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/80 backdrop-blur border-t border-gray-200 dark:border-slate-800 shadow-2xl z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          {!isExpanded ? (
            <button
              onClick={() => setIsExpanded(true)}
              className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:to-secondary-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2 shadow-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Add New Book</span>
            </button>
          ) : (
            <form onSubmit={formOnSubmit} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 flex items-center">
                  <span className="text-xl mr-2">📚</span>
                  Add a New Book
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsExpanded(false);
                    setTitle("");
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="book-title"
                    className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2"
                  >
                    Book Title
                  </label>
                  <input
                    id="book-title"
                    type="text"
                    onChange={changeHandle}
                    value={title}
                    placeholder="Enter the book title..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-500 bg-white dark:bg-slate-900 shadow-sm"
                    autoFocus
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={!title.trim()}
                    className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:transform-none flex items-center space-x-2 shadow"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span>Add Book</span>
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-400">
                Tip: Press Enter to add quickly
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

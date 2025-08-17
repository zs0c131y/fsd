import { useState } from "react";

export default function BookEdit({ book, onSubmit }) {
  const [title, setTitle] = useState(book.title);

  const onHandleSubmit = (event) => {
    event.preventDefault();
    if (title.trim()) {
      onSubmit(book.id, title);
    }
  };

  const changeHandle = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div className="flex-1 flex flex-col justify-center">
      <form onSubmit={onHandleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor={`edit-${book.id}`}
            className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2"
          >
            Edit Book Title
          </label>
          <input
            id={`edit-${book.id}`}
            type="text"
            onChange={changeHandle}
            value={title}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 shadow-sm bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-500"
            placeholder="Enter book title..."
            autoFocus
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={!title.trim()}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-1 shadow"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Save</span>
          </button>
        </div>
      </form>
    </div>
  );
}

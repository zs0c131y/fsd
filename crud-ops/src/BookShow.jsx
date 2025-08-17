import { useState } from "react";
import BookEdit from "./components/BookEdit";

export default function BookShow({ book, onDelete, onEdit }) {
  const [showEdit, setShowEdit] = useState(false);

  const handleSubmit = (id, newTitle) => {
    onEdit(id, newTitle);
    setShowEdit(false);
  };

  const clickDeleteHandle = () => {
    onDelete(book.id);
  };

  const clickEditHandle = () => {
    setShowEdit(!showEdit);
  };

  let content = (
    <div className="flex-1 flex flex-col justify-center">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-slate-100 leading-tight line-clamp-3">
        {book.title}
      </h3>
    </div>
  );

  if (showEdit) {
    content = <BookEdit book={book} onSubmit={handleSubmit} />;
  }

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-slate-800 hover:border-primary-200 transform hover:-translate-y-1">
      {/* Book Icon */}
      <div className="absolute -top-4 left-4 h-10 w-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center shadow-sm ring-1 ring-primary-200/60">
        📚
      </div>

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={clickEditHandle}
          className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200 border border-blue-100"
          title="Edit book"
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>

        <button
          onClick={clickDeleteHandle}
          className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200 border border-red-100"
          title="Delete book"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="pt-6 pb-3 min-h-[120px] flex flex-col">{content}</div>

      {/* Book ID */}
      <div className="text-xs text-gray-400 dark:text-slate-500 font-mono">
        ID: {book.id}
      </div>
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

export default function App() {
  const [books, setBooks] = useState([]);
  // initialize dark mode from localStorage or system preference
  const initialDark = useMemo(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (stored === "dark") return true;
    if (stored === "light") return false;
    return (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }, []);
  const [dark, setDark] = useState(initialDark);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch (e) {
        void e;
      }
    } else {
      root.classList.remove("dark");
      try {
        localStorage.setItem("theme", "light");
      } catch (e) {
        void e;
      }
    }
  }, [dark]);

  const editBookById = (id, newtitle) => {
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, title: newtitle };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  const deleteBookById = (id) => {
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });
    setBooks(updatedBooks);
  };

  const bookCreate = (title) => {
    const updatedBooks = [
      ...books,
      { id: Math.round(Math.random() * 9999), title: title },
    ];
    setBooks(updatedBooks);
    //console.log(books);
  };
  return (
    <div className="min-h-screen text-gray-900 dark:text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 dark:bg-slate-800/90 border-b border-gray-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary-100 text-primary-700 shadow-inner">
                📚
              </span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-slate-100 tracking-tight">
                  My Library
                </h1>
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  Manage your book collection
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setDark((d) => !d)}
                className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                title={dark ? "Switch to light" : "Switch to dark"}
              >
                {dark ? <span>🌙</span> : <span>☀️</span>}
              </button>
              <div className="px-3 py-1.5 rounded-full bg-primary-600/10 text-primary-700 border border-primary-200 dark:border-primary-300/40">
                <span className="font-semibold">{books.length}</span>
                <span className="ml-1 text-sm">books</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {books.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto h-24 w-24 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center text-5xl mb-6 shadow-inner">
              📖
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-2">
              No books yet
            </h3>
            <p className="text-gray-500 dark:text-slate-400 mb-8">
              Add your first book to get started!
            </p>
            <p className="text-sm text-gray-400 dark:text-slate-500">
              Use the Add New Book button below
            </p>
          </div>
        ) : (
          <BookList
            books={books}
            onDelete={deleteBookById}
            onEdit={editBookById}
          />
        )}
      </main>

      {/* Create Book Section - Fixed at bottom */}
      <BookCreate onCreate={bookCreate} />
      <div className="h-24" />
    </div>
  );
}

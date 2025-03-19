// src/pages/Bible/BibleView.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

// A static list of Bible books with chapter counts.
// Expand this list as needed.
const bibleBooks = [
  { name: "Genesis", chapters: 50 },
  { name: "Exodus", chapters: 40 },
  { name: "John", chapters: 21 },
  { name: "Romans", chapters: 16 },
  // ... add more books here
];

const BibleView = () => {
  const [version, setVersion] = useState("KJV");
  const [selectedBook, setSelectedBook] = useState("John");
  const [chapter, setChapter] = useState("3");
  const [chapterText, setChapterText] = useState("");
  const [verses, setVerses] = useState([]); // array of verse objects
  const [selectedVerse, setSelectedVerse] = useState("1"); // verse number (as string)
  const [loading, setLoading] = useState(false);
  const [showEntireChapter, setShowEntireChapter] = useState(true);

  const fetchChapter = async () => {
    setLoading(true);
    try {
      // bible-api.com endpoint expects a passage like "John 3"
      // and an optional translation query parameter.
      const passage = `${selectedBook} ${chapter}`;
      const url = `https://bible-api.com/${encodeURIComponent(
        passage
      )}?translation=${version.toLowerCase()}`;
      const response = await axios.get(url);
      // The response returns an object with:
      // - text: the entire chapter as a single string,
      // - verses: an array of verse objects (each has .text, .verse, etc.)
      setChapterText(response.data.text || "No text found.");
      setVerses(response.data.verses || []);
      if (response.data.verses && response.data.verses.length > 0) {
        setSelectedVerse("1");
      }
    } catch (error) {
      console.error("Error fetching chapter:", error);
      setChapterText("Error fetching chapter");
      setVerses([]);
    } finally {
      setLoading(false);
    }
  };

  // When version, book, or chapter changes, re-fetch the chapter.
  useEffect(() => {
    fetchChapter();
    // Reset selected verse when chapter changes.
    setSelectedVerse("1");
  }, [version, selectedBook, chapter]);

  // Create chapter options based on the selected book.
  const selectedBookData = bibleBooks.find((b) => b.name === selectedBook);
  const chapterOptions = selectedBookData
    ? Array.from({ length: selectedBookData.chapters }, (_, i) =>
        (i + 1).toString()
      )
    : [];

  // Create verse options from the verses array.
  const verseOptions = verses.map((_, i) => (i + 1).toString());

  return (
    <div className="p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Bible</h1>

      {/* Dropdowns for Version, Book, Chapter, and Verse */}
      <div className="flex flex-wrap items-end gap-4 mb-4">
        <div>
          <label className="block text-gray-700 font-semibold">Version</label>
          <select
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="KJV">KJV</option>
            <option value="ESV">ESV</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Book</label>
          <select
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            {bibleBooks.map((bookObj) => (
              <option key={bookObj.name} value={bookObj.name}>
                {bookObj.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Chapter</label>
          <select
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-20"
          >
            {chapterOptions.map((chap) => (
              <option key={chap} value={chap}>
                {chap}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Verse</label>
          <select
            value={selectedVerse}
            onChange={(e) => setSelectedVerse(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-20"
          >
            {verseOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={fetchChapter}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Load
        </button>
      </div>

      {/* Toggle to show Entire Chapter vs. Single Verse */}
      <div className="mb-4">
        <button
          onClick={() => setShowEntireChapter(true)}
          className={`px-4 py-2 rounded-l ${
            showEntireChapter
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-gray-300 transition`}
        >
          Entire Chapter
        </button>
        <button
          onClick={() => setShowEntireChapter(false)}
          className={`px-4 py-2 rounded-r ${
            !showEntireChapter
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-gray-300 transition`}
        >
          Verse Only
        </button>
      </div>

      {/* Display Bible Text */}
      {loading ? (
        <p>Loading...</p>
      ) : showEntireChapter ? (
        <pre className="whitespace-pre-wrap text-gray-800 leading-6">
          {chapterText}
        </pre>
      ) : (
        <div className="p-4 border rounded">
          <h2 className="font-bold mb-2">Verse {selectedVerse}</h2>
          <p className="text-gray-800">
            {verses[parseInt(selectedVerse, 10) - 1]?.text || "No verse found."}
          </p>
        </div>
      )}
    </div>
  );
};

export default BibleView;

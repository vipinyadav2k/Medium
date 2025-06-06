import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handlePublish = async () => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      navigate("/signin");
      return;
    }

    const response = await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      { title, content: description },
      { headers: { Authorization: jwt } }
    );

    navigate(`/blog/${response.data.id}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Appbar />
      <div className="flex justify-center pt-10 px-4">
        <div className="w-full max-w-3xl space-y-6">
          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 text-lg font-medium text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Give your blog a title..."
          />

          {/* Text Editor */}
          <TextEditor onChange={(e) => setDescription(e.target.value)} />

          {/* Publish Button */}
          <button
            onClick={handlePublish}
            type="submit"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
          >
            Publish Post
          </button>
        </div>
      </div>
    </div>
  );
};

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="w-full">
      <label htmlFor="editor" className="sr-only">
        Blog content
      </label>
      <textarea
        onChange={onChange}
        id="editor"
        rows={12}
        className="w-full p-4 text-base text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        placeholder="Start writing your story..."
        required
      />
    </div>
  );
}

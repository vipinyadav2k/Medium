import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [mainImage, setMainImage] = useState<string>("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setMainImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handlePublish = async () => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      navigate("/signin");
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content: description,
          mainImage,
        },
        { headers: { Authorization: jwt } }
      );
      navigate(`/blog/${response.data.id}`);
    } catch (err) {
      alert("Failed to publish. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-white to-indigo-100 text-gray-900 font-sans">
      <Appbar />
      <div className="flex justify-center pt-16 px-6 sm:px-12 md:px-16">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-indigo-200 p-10">
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-8 p-5 text-3xl font-extrabold tracking-wide text-indigo-900 placeholder-indigo-400 bg-indigo-50 border border-indigo-300 rounded-xl shadow-inner focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-500 transition"
            placeholder="Give your blog a bold title..."
          />

          {/* Image Upload */}
          <div className="mb-10 space-y-4">
            <label
              htmlFor="image-upload"
              className="block text-indigo-700 font-semibold text-lg cursor-pointer select-none"
            >
              📸 Upload Main Image
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-indigo-700 file:mr-5 file:py-3 file:px-6
                file:rounded-xl file:border-0
                file:bg-indigo-100 file:text-indigo-800
                hover:file:bg-indigo-200
                focus:outline-none focus:ring-2 focus:ring-indigo-300
                transition cursor-pointer"
            />
            {mainImage && (
              <img
                src={mainImage}
                alt="Preview"
                className="w-full max-h-80 object-cover rounded-2xl border border-indigo-300 shadow-lg transition-transform hover:scale-105"
              />
            )}
          </div>

          {/* Blog Content */}
          <TextEditor onChange={(e) => setDescription(e.target.value)} />

          {/* Publish Button */}
          <div className="pt-8">
            <button
              onClick={handlePublish}
              type="submit"
              className="w-full py-4 text-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl shadow-xl hover:from-indigo-700 hover:to-indigo-900 focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-transform active:scale-95"
              disabled={!title.trim() || !description.trim()}
              title={
                !title.trim() || !description.trim()
                  ? "Please add title and content before publishing"
                  : "Publish your post"
              }
            >
              🚀 Publish Post
            </button>
          </div>
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
      <label
        htmlFor="editor"
        className="block mb-3 text-indigo-700 font-semibold text-xl"
      >
        ✍️ Your Story
      </label>
      <textarea
        onChange={onChange}
        id="editor"
        rows={14}
        className="w-full p-6 text-lg text-indigo-900 placeholder-indigo-400 bg-indigo-50 border border-indigo-300 rounded-2xl shadow-inner resize-none focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-500 transition"
        placeholder="Start writing your story here..."
        required
      />
    </div>
  );
}

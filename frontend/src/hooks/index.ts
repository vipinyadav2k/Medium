import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export interface Blog {
  content: string;
  title: string;
  id: number;
  author: {
    name: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/signin");
    return; // Stop further execution if no token
  }

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization:token,
        },
      })
      .then((response) => {
        setBlog(response.data.blog);
        console.log(response.data.blog);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
  };
};
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();


  const token = localStorage.getItem("token");


  if (!token) {
    navigate("/signin");
    return; // Stop further execution if no token
  }

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setBlogs(response.data.blog);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
};

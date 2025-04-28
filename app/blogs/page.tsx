"use client";
import { useState, useEffect } from "react";
interface Blog {
    id: number;
    user: string;
  }

  interface data{
    data: Blog[];
    status: number;
  }
function Page() {
  const [blogs, setBlogs] = useState<data>();
  const fetchBlogs = async () => {
    const res = await fetch("/api/blogs");

    const data = await res.json();
    console.log(data);
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  console.log(blogs);

 
  return (
    <>
      {blogs?.data?.map((element) => (
        <div className="flex bg-gray-200 text-white" >
        <div className="bg-gray-300">{element.user}</div>  
        <div className="bg-gray-300">{element.id}</div>  
        </div>
      ))}
      <p>hello</p>
    </>
  );
}

export default Page;

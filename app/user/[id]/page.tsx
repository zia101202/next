
const BlogPost =async ({ params }:any) => {
  const { id } =await params;
  console.log(params);
  console.log(id);

    const postUser=async()=>{
     const res=await fetch("http://localhost:3001/api/user", {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data=await res.json()
      console.log(data);
      return data
      
    }

   const data= await postUser()
   console.log(data);

  return (
    <>
   
      <p>This is Backend Data</p>
      <h1>{data.user}</h1></>
    

    
  );
};

export default BlogPost;
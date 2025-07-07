import React , {useState , useEffect} from "react";
import service from "../appwrite/config";
import { PostCard } from "../components";

function AllPost() {
    const [posts , setPosts] = useState([])
    useEffect(() => {
        service.getPosts([]).then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        }).catch((error) => {
                 console.log("Error fetching posts:" ,error);
        })
    }, [])


    return (
           <div className='w-full py-8'>
      <div className='flex flex-wrap justify-center items-center gap-10 '>
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.$id}
            $id={post.$id}
            title={post.title}
            featuredImage={post.featuredImage}
             
             
             />
          ))
        ) : (
          <p>Loading posts...</p>
        )}
          </div>
      </div> 
    )
}

export default AllPost
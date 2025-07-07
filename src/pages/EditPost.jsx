import React , {useState , useEffect} from "react";
import service from "../appwrite/config";
import { useNavigate , useParams } from "react-router-dom";
import { PostFrom } from "../components";


function EditePost() {

    const [post , setPost] = useState(null)
    const {postId} = useParams()
    const navigate  = useNavigate()

    useEffect(() => {
        if (postId) {
            service.getPost(postId).then((post) => {
                if(post){
                    setPost(post)
                }
            })

        } else {
            navigate ('/')
        }
    },[postId , navigate ])


    return post ? (
        <div className="py-8">

        <PostFrom  post={post}/>

        </div>
    ) : null
}



export default EditePost

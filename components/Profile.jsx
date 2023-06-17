import PromptCard from "./PromptCard";
import { useSession } from 'next-auth/react';


const Profile = ({ name, desc, data,  handleEdit, handleDelete}) => {
  const {data: session } = useSession();
  if(!session?.user){
    return (
      <h1>Please sign in first</h1>
    )
  }
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
      {data.map((post) => {
        return (<PromptCard 
                 key={post._id}
                 post = {post}
                 handleEdit={() => handleEdit && handleEdit(post)}
                 handleDelete={() => handleDelete && handleDelete(post)}
               />)
      })}
    </div>
    </section>
  )
}

export default Profile
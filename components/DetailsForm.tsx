interface PostProp{
    id?:string;
    body:string;
    comments:string[];
    userId?:string;
    likedIds?:string[];
    image:null | string;
    user:{id:string;name:string};





}


const DetailsForm = ({id,body,comments,userId,likedIds}:PostProp) => {
    console.log(body)
  return (
    <div className="flex flex-col text-yellow-500">
        <p>posts</p>
        <p className="text-lg">{body}</p>

    </div>
  )
}

export default DetailsForm
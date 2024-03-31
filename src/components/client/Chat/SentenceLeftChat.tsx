import { Link } from "react-router-dom";

const SentenceLeftChat = () => {
  return (
    <>
      <div className="flex my-2">
        <Link to="/auth">
          <div className="rounded-full">
            <img
              className="h-12 w-12 bg-cover"
              src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
              alt=""
            />
          </div>
        </Link>
        <div className="max-w-[65%] bg-slate-100 rounded-md px-4 py-1 pb-3">
          <div>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla,
            eius. Alias, consectetur. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Deserunt, nihil obcaecati? Rem, error esse. Natus
            expedita ex quam harum earum ducimus odio!
          </div>
          <div className="text-xs text-gray-500 text-right pr-8">12:00PM</div>
        </div>
      </div>
    </>
  );
};

export default SentenceLeftChat;

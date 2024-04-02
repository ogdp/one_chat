import ChatInput from "./ChatInput";
import SentenceLeftChat from "./SentenceLeftChat";
import SentenceRightChat from "./SentenceRightChat";

const ChatBox = () => {
  return (
    <>
      <section>
        <main className="overflow-x-hidden overflow-scroll h-[82vh] px-3 pb-8">
          <SentenceLeftChat
            name="Le Duc"
            uid="1"
            content="dshafjkdkjshf"
            time="12:00PM"
            avatar_url={[
              "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
            ]}
          />
          <SentenceLeftChat
            name="Le Duc"
            uid="1"
            content="dshafjkdkjshf"
            time="12:00PM"
            avatar_url={[
              "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
            ]}
          />
          <SentenceLeftChat
            name="Le Duc"
            uid="1"
            content="dshafjkdkjshf"
            time="12:00PM"
            avatar_url={[
              "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
            ]}
          />
          <SentenceLeftChat
            name="Le Duc"
            uid="1"
            content="dshafjkdkjshf"
            time="12:00PM"
            avatar_url={[
              "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
            ]}
          />
          <SentenceRightChat
            name="Le Duc"
            uid="1"
            content="dshafjkdkjshf"
            time="12:00PM"
            avatar_url={[
              "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
            ]}
          />
          <SentenceRightChat
            name="Le Duc"
            uid="1"
            content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla, eius. Alias, consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, nihil obcaecati? Rem, error esse. Natus expedita ex quam harum earum ducimus odio!"
            time="12:00PM"
            avatar_url={[
              "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
            ]}
          />
          <SentenceRightChat
            name="Le Duc"
            uid="1"
            content="dshafjkdkjshf"
            time="12:00PM"
            avatar_url={[
              "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
            ]}
          />
        </main>
        <ChatInput />
      </section>
    </>
  );
};

export default ChatBox;

type AvatarProps = {
  imageUser: string | undefined;
};

const Avatar = ({ imageUser }: AvatarProps) => {
  return (
    <>
      <img
        width={50}
        alt="Avatar"
        src={imageUser || "/user.jpg"}
        className="p-1 rounded-full"
      />
    </>
  );
};

export default Avatar;

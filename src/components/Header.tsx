import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 pt-8 pb-4">
      <div className="text-left">
        <h1 
          className="text-3xl font-bold cursor-pointer"
          onClick={() => navigate('/')}
        >
          <span className="text-primary">influencer</span>
          <span className="text-white text-2xl">$$$</span>
          <span className="text-primary">.com</span>
        </h1>
      </div>
    </div>
  );
};

export { Header };
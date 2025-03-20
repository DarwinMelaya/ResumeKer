import { useNavigate } from "react-router-dom";
import { useState } from "react";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl text-center space-y-12 animate-fade-in">
        <div className="space-y-6">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 tracking-tight">
            Welcome to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              ResumeKer
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Create professional resumes that stand out.{" "}
            <span className="font-medium">In minutes, not hours.</span>
          </p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <button
            onClick={handleGetStarted}
            onKeyDown={(e) => e.key === "Enter" && handleGetStarted()}
            className="group relative px-8 py-4 bg-gray-900 text-white font-medium rounded-lg
              transform transition-all duration-200 hover:scale-[1.02] focus:outline-none 
              focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-70 
              disabled:cursor-not-allowed flex items-center justify-center gap-2 
              min-w-[200px] hover:bg-gray-800"
            tabIndex={0}
            aria-label="Get started with ResumeKer"
            disabled={isLoading}
          >
            <span className="relative z-10">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Get Started</span>
                  <svg
                    className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Add this CSS to your global styles or create a new style tag
const styles = `
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
  }
`;

export default WelcomePage;

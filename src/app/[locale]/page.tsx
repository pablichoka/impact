import LanguageSelector from "@components/custom/LanguageSelector";
import LoginForm from "@components/custom/LoginForm";

export default function Home() {
  return (
    <>
      <div className="fixed top-4 left-4 z-50">
        <LanguageSelector />
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Welcome to the App</h1>
        <p className="text-lg mb-8">Please log in to continue</p>
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <p className="text-gray-600 mb-4">
            Please enter your credentials below:
          </p>
          <div className="mb-4">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { BackgroundBeams } from "../../components/ui/background-beams.jsx";
import LampDemo from "../../components/LampDemo.jsx";
import logo from "../../assets/Logo.png";
import detectEthereumProvider from '@metamask/detect-provider';
import axios from 'axios';
import MetamaskLogo from '../../assets/MetaMaskLogo.png'

 function SignupPage() {
  const [username, setUsername] = useState('');
  const [email , SetEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const checkMetaMask = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        console.log('MetaMask is installed!');
      } else {
        console.log('MetaMask is not installed. Please install it to use this feature.');
      }
    };
    checkMetaMask();
  }, []);

  const handleMetaMaskLogin = async () => {

    if(username.length==0 || email.length==0){
      console.log("Enter values first");
      return;
    }
    else{

    const provider = await detectEthereumProvider();
    if (provider) {
      try {
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        try{
          await axios.post(`http://localhost:2000/api/login`, 
          { walletAddress : accounts[0],
            email : email,
            username : username,
          });
          localStorage.setItem("walletAddress", accounts[0])
          navigate('/app/home');
        }
        catch(err){
          console.log(err);
        }
        console.log('Connected account:', accounts[0]);
        SetEmail('');
        setUsername('');
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this feature.');
    }
  }
  };

  const handleSubmit = () => {
    if (!agreed) {
      alert("Please agree to the Terms & Conditions.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black relative overflow-hidden">
      <BackgroundBeams />

      <header className="absolute top-[-20px] left-0 w-full flex justify-center items-center p-4 text-white z-20">
        <h1 className="text-3xl mt-7 font-bold text-cyan-300">Code Crafters</h1>
      </header>

      <LampDemo />
      <div 
        className="absolute left-1/2 transform -translate-x-1/2 z-10"
        style={{ top: "calc(50% - 250px)" }} 
      >
        <img src={logo} alt="Code Crafters Logo" className="w-32 h-32 opacity-80" />
      </div>

      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[screen] h-[30vh] bg-gradient-to-b from-cyan-500 to-transparent opacity-30 blur-3xl"></div>
      
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg max-w-md w-full border border-cyan-500 relative mt-[-50px] z-20 transition-all duration-300">
        {  (
          <>
            <h2 className="text-white text-3xl font-bold text-center mb-1">Welcome to <span className="text-custom-blue">UEB</span></h2>
            <p className="text-gray-400 text-center mb-6">Sign up to get started</p>

            <div className="space-y-4">
              <input type='text'
                onChange={(e)=>setUsername(e.target.value)}
                value={username}
                placeholder="Enter your Name" 
                className="bg-transparent w-96 text-white placeholder-gray-400 border border-cyan-500 hover:border-cyan-600 focus:ring-cyan-500 transition-colors rounded-lg p-2" 
              />
              <br></br>
              <input type="email" 
              onChange={(e)=>SetEmail(e.target.value)}
                value={email}
                placeholder="Enter your Email" 
                className="bg-transparent w-96 text-white placeholder-gray-400 border border-cyan-500 hover:border-cyan-600 focus:ring-cyan-500 transition-colors rounded-lg p-2" 
              />
              
              <Button 
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-lg flex items-center justify-center transition-colors"
                onClick={()=>{
                  handleMetaMaskLogin();
                }}
              >
                {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : "Sign in with MetaMask"}
              </Button>
              
              <button 
                className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
                onClick={() => window.open('https://metamask.io/', '_blank')}
              >
                <img src={MetamaskLogo} alt="MetaMask" className="w-5 h-5" /> New to MetaMask? Create an Account
              </button>

              <p className="text-center text-gray-400 mt-4">
                Already have an account? <a href="#" className="text-cyan-400 hover:underline">Login</a>
              </p>
            </div>
          </>
        )}
      </div>

      <footer className="absolute bottom-0 w-full text-center text-gray-400 p-4 z-20">
        <p>&copy; 2025 Code Crafters. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default SignupPage;

"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Scale, Eye, EyeOff, ArrowLeft, Shield, Lock, CheckCircle, Users, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { useAuth } from '@/context/LoginContext';
import TermsAndConditionsModal from '../components/Terms'
import { set } from 'date-fns';
import Link from 'next/link';
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [terms, setTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useRouter()
  const valid_emails = ['jagath@lawsuvidha.in', 'hanuman@lawsuvidha.in', 'rohith@lawsuvidha.in', 'narmada@lawsuvidha.in', 'pradeep@lawsuvidha.in']
  const valid_passwords = ['Founder@1', 'D003@dataengineer', 'D004@dataengineer', 'Advc@001', 'Advc@002']

    const {loginUser}:any=useAuth()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
  
    if (!email || !password) {
      setError('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }
    if (!terms) {
      setError("Please agree to the Terms and Conditions before signing in.");
      setIsSubmitting(false);
      return;
    }
  
    try {
      const response = await loginUser(email, password); // Use the new loginUser function
  
      const { status, data: userData, message, token, rtoken } = response;
      // console.log('refreshToken is ', rtoken);
  
      if (status === 'success') {
        // The context now handles setting the login state, so you don't need these lines here
        // setLogin(true);
        // setId(userData.email);
        // setName(userData.email);
        navigate.replace('/personal_dashboard' );
      } else if (status === 'first_time') {
        navigate.replace('/signup');
      } else if (status === 'password_mismatch') {
        setError('Incorrect password. Please try again.');
      } else if (status === 'error') {
        setError(message || 'Login failed.');
      } else {
        setError('Unexpected response from server.');
      }
  
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setIsSubmitting(false);
      setPassword('');
    }
  };
  
  
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-black via-white-200 to-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white/20 rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border-2 border-white/20 rounded-full"></div>
          <div className="absolute bottom-32 left-40 w-16 h-16 border-2 border-white/20 rounded-full"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            {/* <div className=" absolute w-14 h-14 bg-white flex items-center rounded-lg  justify-center top-40 left-7">
                
                <img src="/jpicon4.png" alt="img" className="w-14 h-14 rounded-lg" />
              </div> */}
            <h1 className="text-4xl font-bold mb-4">Legal Practice Management</h1>
            <p className="text-xl text-blue-100 mb-8">Secure, professional, and compliant legal tech platform for modern law firms</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Bank-Level Security</h3>
                <p className="text-blue-100 text-sm">End-to-end encryption and compliance</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Collaborative Workspace</h3>
                <p className="text-blue-100 text-sm">Seamless team collaboration tools</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Trusted by Attorneys</h3>
                <p className="text-blue-100 text-sm">Industry-leading legal platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 lg:p-8">

          <Link href='/' className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group">
            <>
              <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </></Link>
          <div className="lg:hidden">
            <img src='/jpicon4.png' className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        {/* Login Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <div className="lg:hidden w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <img src='/jpicon4.png' className="w-12 h-12 text-blue-600" />
              </div>
              <div className="text-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-900">Welcome Back</h2>
                <p className="text-gray-600 mt-2">Sign in to access your account</p>
                <span className="block mt-1 text-xs text-gray-700">* Only advocates are permitted to sign in</span>
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-6 border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  className="w-full h-14 px-4 pt-6 pb-2 border-2 border-gray-400 rounded-lg hover:border-blue-700 "
                  placeholder=" "
                  autoComplete="email"
                  required
                />
                <Label
                  htmlFor="email"
                  className={`absolute left-4 transition-all duration-200 pointer-events-none ${emailFocused || email
                      ? 'top-2 text-xs text-blue-700 font-medium'
                      : 'top-4 text-base text-gray-400'
                    }`}
                >
                  Email Address
                </Label>
              </div>

              {/* Password Field */}
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  className="w-full h-14 px-4 pt-6 pb-2 pr-12 rounded-lg bg-white border-2 border border-gray-400 hover:border-blue-700"
                  placeholder=" "
                  autoComplete="current-password"
                  required
                />
                <Label
                  htmlFor="password"
                  className={`absolute left-4 transition-all duration-200 pointer-events-none ${passwordFocused || password
                      ? 'top-2 text-xs text-blue-700 font-medium'
                      : 'top-4 text-base text-gray-400'
                    }`}
                >
                  Password
                </Label>
                <button
                  type="button"
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <Link href='/'>Forgot Password</Link>

              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={terms}
                  onCheckedChange={(checked) => setTerms(checked as boolean)}
                  className="mt-1 rounded border-gray-300"
                />
                <Label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                  I agree to the{' '}
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 underline transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowTerms(true);
                    }}
                  >
                    Terms and Conditions
                  </button>
                  {' '}and{' '}
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 underline transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Privacy Policy would be shown here');
                    }}
                  >
                    Privacy Policy
                  </button>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-black hover:bg-blue-700 text-white font-medium transition-colors focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 rounded-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing you in...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Sign In
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link href='/signup' className='text-blue-500'> Subscribe</Link>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500">
                🔒 This platform uses enterprise-grade security and is compliant with legal industry standards including GDPR and CCPA.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      {showTerms && (
        <TermsAndConditionsModal
          onClose={() => setShowTerms(false)}
          onAccept={() => {
            setTerms(true);
            setShowTerms(false);
          }}
        />
      )}
    </div>
  );
}

export default LoginForm
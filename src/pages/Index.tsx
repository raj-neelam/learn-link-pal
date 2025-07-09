
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users, BookOpen, Calendar, MessageCircle, Star, ArrowRight } from 'lucide-react';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { ProfileSetup } from '@/components/profile/ProfileSetup';
import { MatchesDashboard } from '@/components/matches/MatchesDashboard';

const Index = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleSignIn = (userData: any) => {
    setIsSignedIn(true);
    setUser(userData);
    // Check if user has completed profile setup
    // This would typically be an API call
    setHasProfile(false);
  };

  const handleProfileComplete = () => {
    setHasProfile(true);
  };

  if (isSignedIn && !hasProfile) {
    return <ProfileSetup onComplete={handleProfileComplete} user={user} />;
  }

  if (isSignedIn && hasProfile) {
    return <MatchesDashboard user={user} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">StudyMate</span>
            </div>
            <GoogleSignInButton onSignIn={handleSignIn} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Find Your Perfect
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}Study Partner
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Connect with compatible study partners who match your skills, goals, and schedule. 
            Our AI-powered matching system helps you find the ideal collaboration partners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GoogleSignInButton onSignIn={handleSignIn} size="lg" />
            <Button variant="outline" size="lg" className="text-gray-700 hover:text-gray-900">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How StudyMate Works</h2>
          <p className="text-lg text-gray-600">Simple steps to find your ideal study partners</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Create Your Profile</CardTitle>
              <CardDescription>
                Tell us about your skills, learning goals, and study preferences
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Get Matched</CardTitle>
              <CardDescription>
                Our AI analyzes compatibility and suggests the best study partners for you
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Start Studying</CardTitle>
              <CardDescription>
                Connect with your matches and begin collaborative learning sessions
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose StudyMate?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Smart Scheduling</h3>
                    <p className="text-gray-600">Match with partners who share your availability</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">AI-Powered Matching</h3>
                    <p className="text-gray-600">Advanced algorithms find your perfect study companions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MessageCircle className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h3 font-semibold text-gray-900">Real-time Notifications</h3>
                    <p className="text-gray-600">Get instant alerts when you have new matches</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
                <p className="mb-6">Join thousands of students who've found their perfect study partners</p>
                <GoogleSignInButton onSignIn={handleSignIn} variant="secondary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6" />
                <span className="text-lg font-bold">StudyMate</span>
              </div>
              <p className="text-gray-400">
                Connecting students for collaborative learning experiences.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Smart Matching</li>
                <li>Profile Creation</li>
                <li>Real-time Chat</li>
                <li>Schedule Coordination</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">University</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Student Resources</li>
                <li>Academic Support</li>
                <li>Campus Life</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StudyMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;


import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Target, Clock, Plus, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ProfileSetupProps {
  onComplete: () => void;
  user: any;
}

export const ProfileSetup = ({ onComplete, user }: ProfileSetupProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [goals, setGoals] = useState('');
  const [preferences, setPreferences] = useState({
    studyTimes: [] as string[],
    communicationStyle: '',
    subjects: '',
    location: ''
  });

  const studyTimeOptions = [
    'Early Morning (6-9 AM)',
    'Morning (9-12 PM)',
    'Afternoon (12-5 PM)',
    'Evening (5-8 PM)',
    'Night (8-11 PM)',
    'Late Night (11+ PM)',
    'Weekends'
  ];

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleTimePreference = (time: string, checked: boolean) => {
    if (checked) {
      setPreferences({
        ...preferences,
        studyTimes: [...preferences.studyTimes, time]
      });
    } else {
      setPreferences({
        ...preferences,
        studyTimes: preferences.studyTimes.filter(t => t !== time)
      });
    }
  };

  const handleSubmit = async () => {
    if (skills.length === 0 || !goals.trim() || preferences.studyTimes.length === 0) {
      toast({
        title: "Please complete all required fields",
        description: "We need your skills, goals, and study preferences to find great matches.",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call to save profile
    toast({
      title: "Profile created successfully!",
      description: "We're finding your perfect study partners now."
    });

    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  const nextStep = () => {
    if (currentStep === 1 && skills.length === 0) {
      toast({
        title: "Add at least one skill",
        description: "This helps us match you with compatible partners.",
        variant: "destructive"
      });
      return;
    }
    if (currentStep === 2 && !goals.trim()) {
      toast({
        title: "Please describe your learning goals",
        description: "This helps us find partners with similar objectives.",
        variant: "destructive"
      });
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {user.name}!</h1>
            <p className="text-lg text-gray-600">Let's set up your profile to find perfect study partners</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Step {currentStep} of 3</span>
              <span className="text-sm text-gray-600">{Math.round((currentStep / 3) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1: Skills */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <CardTitle>Your Skills & Expertise</CardTitle>
                </div>
                <CardDescription>
                  What subjects or skills do you excel in? These will help us match you with partners who need your expertise.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="skill-input">Add a skill</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      id="skill-input"
                      placeholder="e.g., Python, Calculus, Essay Writing"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <Button onClick={addSkill} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {skills.length > 0 && (
                  <div>
                    <Label>Your Skills</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="flex items-center space-x-1">
                          <span>{skill}</span>
                          <button onClick={() => removeSkill(skill)} className="ml-1">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button onClick={nextStep}>Next Step</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Goals */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  <CardTitle>Learning Goals</CardTitle>
                </div>
                <CardDescription>
                  What do you want to learn or achieve? This helps us find partners with complementary or similar goals.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="goals">Describe your learning objectives</Label>
                  <Textarea
                    id="goals"
                    placeholder="e.g., Master machine learning algorithms, improve public speaking, prepare for medical school exams..."
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    rows={4}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="subjects">Subjects you're focusing on</Label>
                  <Input
                    id="subjects"
                    placeholder="e.g., Computer Science, Biology, Business"
                    value={preferences.subjects}
                    onChange={(e) => setPreferences({...preferences, subjects: e.target.value})}
                    className="mt-2"
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>Previous</Button>
                  <Button onClick={nextStep}>Next Step</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Preferences */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  <CardTitle>Study Preferences</CardTitle>
                </div>
                <CardDescription>
                  When and how do you prefer to study? This ensures we match you with compatible partners.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Preferred study times (select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {studyTimeOptions.map((time) => (
                      <div key={time} className="flex items-center space-x-2">
                        <Checkbox
                          id={time}
                          checked={preferences.studyTimes.includes(time)}
                          onCheckedChange={(checked) => handleTimePreference(time, checked as boolean)}
                        />
                        <Label htmlFor={time} className="text-sm">{time}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="communication">Preferred communication style</Label>
                  <Input
                    id="communication"
                    placeholder="e.g., Video calls, in-person meetings, text chat"
                    value={preferences.communicationStyle}
                    onChange={(e) => setPreferences({...preferences, communicationStyle: e.target.value})}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="location">Study location preference</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Library, Coffee shops, Online only"
                    value={preferences.location}
                    onChange={(e) => setPreferences({...preferences, location: e.target.value})}
                    className="mt-2"
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>Previous</Button>
                  <Button onClick={handleSubmit} className="bg-gradient-to-r from-blue-600 to-purple-600">
                    Complete Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

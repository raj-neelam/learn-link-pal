
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell, Users, MessageCircle, Calendar, Star, Heart, X, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface MatchesDashboardProps {
  user: any;
}

interface Match {
  id: string;
  name: string;
  avatar: string;
  skills: string[];
  goals: string;
  compatibility: number;
  studyTimes: string[];
  subjects: string[];
  status: 'pending' | 'matched' | 'declined';
}

export const MatchesDashboard = ({ user }: MatchesDashboardProps) => {
  const { toast } = useToast();
  const [matches, setMatches] = useState<Match[]>([]);
  const [activeTab, setActiveTab] = useState<'discover' | 'connections'>('discover');

  // Mock data - in a real app, this would come from your backend
  useEffect(() => {
    const mockMatches: Match[] = [
      {
        id: '1',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b72313d8?w=100&h=100&fit=crop&crop=face',
        skills: ['React', 'JavaScript', 'UI/UX Design'],
        goals: 'Build a full-stack web application for final project',
        compatibility: 95,
        studyTimes: ['Evening (5-8 PM)', 'Weekends'],
        subjects: ['Computer Science', 'Web Development'],
        status: 'pending'
      },
      {
        id: '2',
        name: 'Marcus Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        skills: ['Python', 'Data Science', 'Machine Learning'],
        goals: 'Master advanced algorithms for software engineering interviews',
        compatibility: 88,
        studyTimes: ['Morning (9-12 PM)', 'Afternoon (12-5 PM)'],
        subjects: ['Computer Science', 'Mathematics'],
        status: 'pending'
      },
      {
        id: '3',
        name: 'Emily Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        skills: ['Calculus', 'Statistics', 'Research Methods'],
        goals: 'Prepare for graduate school entrance exams',
        compatibility: 82,
        studyTimes: ['Evening (5-8 PM)', 'Night (8-11 PM)'],
        subjects: ['Mathematics', 'Statistics'],
        status: 'matched'
      }
    ];
    
    setMatches(mockMatches);
  }, []);

  const handleConnect = (matchId: string) => {
    setMatches(prev => prev.map(match => 
      match.id === matchId ? { ...match, status: 'matched' } : match
    ));
    
    toast({
      title: "Connection request sent!",
      description: "We'll notify you when they respond.",
    });
  };

  const handleDecline = (matchId: string) => {
    setMatches(prev => prev.map(match => 
      match.id === matchId ? { ...match, status: 'declined' } : match
    ));
    
    toast({
      title: "Match declined",
      description: "We'll find you more compatible partners.",
    });
  };

  const pendingMatches = matches.filter(m => m.status === 'pending');
  const connectedMatches = matches.filter(m => m.status === 'matched');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">StudyMate</h1>
              <div className="flex space-x-1">
                <Button
                  variant={activeTab === 'discover' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('discover')}
                  size="sm"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Discover
                </Button>
                <Button
                  variant={activeTab === 'connections' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('connections')}
                  size="sm"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Connections ({connectedMatches.length})
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {activeTab === 'discover' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Matches</h2>
              <p className="text-gray-600">
                {pendingMatches.length} compatible study partners found
              </p>
            </div>

            {pendingMatches.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No new matches</h3>
                  <p className="text-gray-600">Check back later for new study partners!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {pendingMatches.map((match) => (
                  <Card key={match.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={match.avatar} alt={match.name} />
                          <AvatarFallback>{match.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{match.name}</CardTitle>
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-gray-600">{match.compatibility}% match</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {match.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Goals</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{match.goals}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Study Times</h4>
                        <div className="flex flex-wrap gap-1">
                          {match.studyTimes.slice(0, 2).map((time) => (
                            <Badge key={time} variant="outline" className="text-xs">
                              {time}
                            </Badge>
                          ))}
                          {match.studyTimes.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{match.studyTimes.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button
                          onClick={() => handleConnect(match.id)}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
                          size="sm"
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          Connect
                        </Button>
                        <Button
                          onClick={() => handleDecline(match.id)}
                          variant="outline"
                          size="sm"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'connections' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Study Partners</h2>
              <p className="text-gray-600">
                {connectedMatches.length} active study partnership{connectedMatches.length !== 1 ? 's' : ''}
              </p>
            </div>

            {connectedMatches.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No connections yet</h3>
                  <p className="text-gray-600 mb-4">Start connecting with potential study partners!</p>
                  <Button onClick={() => setActiveTab('discover')}>
                    Discover Matches
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {connectedMatches.map((match) => (
                  <Card key={match.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={match.avatar} alt={match.name} />
                            <AvatarFallback>{match.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{match.name}</CardTitle>
                          <p className="text-sm text-green-600 font-medium">Connected</p>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Common Subjects</h4>
                        <div className="flex flex-wrap gap-1">
                          {match.subjects.map((subject) => (
                            <Badge key={subject} variant="secondary" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button className="flex-1" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, Zap, Vote, Lightbulb, Search, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [currentPitch, setCurrentPitch] = useState(1);

  // Mock data for demonstration
  const stats = {
    totalParticipants: 24,
    totalVotes: 156,
    activePitches: 8,
    totalIdeas: 47
  };

  const currentPitcher = {
    id: 1,
    name: "Sarah Chen",
    idea: "EcoTrack - Carbon Footprint Tracker",
    description: "AI-powered app that helps individuals and companies track their carbon footprint in real-time",
    votes: 23,
    avatar: "SC"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">PitchVote</h1>
                <p className="text-sm text-gray-600">Hackathon 2024</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button onClick={() => navigate('/admin')} variant="outline">
                Admin Dashboard
              </Button>
              <Button onClick={() => navigate('/login')}>
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/60 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.totalParticipants}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/60 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Ideas</CardTitle>
              <Lightbulb className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.totalIdeas}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/60 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
              <Vote className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.totalVotes}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/60 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Pitches</CardTitle>
              <Trophy className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.activePitches}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Submit Ideas */}
          <Card className="bg-white/80 backdrop-blur-md border-white/30 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="h-6 w-6 mr-2 text-yellow-500" />
                Submit Your Ideas
              </CardTitle>
              <CardDescription>
                Share your innovative ideas for the hackathon. Minimum 3 ideas required.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-600">
                • Submit 3-5 innovative ideas<br/>
                • Choose relevant categories<br/>
                • Provide detailed descriptions
              </div>
              <Button 
                onClick={() => navigate('/create-idea')}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
              >
                Submit Ideas
              </Button>
            </CardContent>
          </Card>

          {/* Browse & Vote */}
          <Card className="bg-white/80 backdrop-blur-md border-white/30 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="h-6 w-6 mr-2 text-blue-500" />
                Browse & Vote
              </CardTitle>
              <CardDescription>
                Explore ideas from colleagues and cast your votes for the best ones.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-600">
                • Search through all submitted ideas<br/>
                • Filter by categories<br/>
                • Vote for your favorites
              </div>
              <Button 
                onClick={() => navigate('/browse-ideas')}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Browse Ideas
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Current Pitch Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pitcher Profile */}
          <Card className="bg-white/80 backdrop-blur-md border-white/30 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Now Pitching
                </Badge>
                <Badge variant="outline">
                  Pitch #{currentPitch}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {currentPitcher.avatar}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{currentPitcher.name}</h2>
                  <p className="text-gray-600">Innovation Engineer</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{currentPitcher.idea}</h3>
                <p className="text-gray-700 leading-relaxed">{currentPitcher.description}</p>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <Vote className="h-5 w-5 text-purple-600" />
                  <span className="text-lg font-semibold text-purple-600">{currentPitcher.votes} votes</span>
                </div>
                <Button 
                  onClick={() => navigate(`/vote/${currentPitcher.id}`)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Vote Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* QR Code & Voting */}
          <Card className="bg-white/80 backdrop-blur-md border-white/30 shadow-xl">
            <CardHeader>
              <CardTitle className="text-center">Quick Vote Access</CardTitle>
              <CardDescription className="text-center">
                Scan QR code or use the direct link below
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* QR Code Placeholder */}
              <div className="flex justify-center">
                <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-black/10 rounded mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">QR Code</p>
                    <p className="text-xs text-gray-500">Scan to vote</p>
                  </div>
                </div>
              </div>
              
              {/* Direct Link */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Direct voting link:</p>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 text-sm bg-white px-3 py-2 rounded border">
                    pitchvote.com/vote/sarah-chen
                  </code>
                  <Button size="sm" variant="outline">
                    Copy
                  </Button>
                </div>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                onClick={() => navigate(`/vote/${currentPitcher.id}`)}
              >
                Vote for This Idea
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <div className="inline-flex flex-wrap gap-4 justify-center">
            <Button 
              variant="outline" 
              onClick={() => navigate('/leaderboard')}
              className="bg-white/60 backdrop-blur-sm"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              View Leaderboard
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/browse-ideas')}
              className="bg-white/60 backdrop-blur-sm"
            >
              <Search className="h-4 w-4 mr-2" />
              Browse All Ideas
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/create-idea')}
              className="bg-white/60 backdrop-blur-sm"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              Submit Ideas
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

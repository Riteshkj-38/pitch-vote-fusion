
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Trophy, Play, Pause, SkipForward, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [isPresenting, setIsPresenting] = useState(true);
  const [currentPitchIndex, setCurrentPitchIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const pitches = [
    { id: 1, name: "Sarah Chen", idea: "EcoTrack - Carbon Footprint Tracker", votes: 23, status: "presenting" },
    { id: 2, name: "Mike Rodriguez", idea: "DevFlow - Code Review Assistant", votes: 18, status: "completed" },
    { id: 3, name: "Emily Park", idea: "HealthSync - Medical Data Platform", votes: 31, status: "upcoming" },
    { id: 4, name: "James Wilson", idea: "SmartHome AI Controller", votes: 15, status: "upcoming" },
    { id: 5, name: "Lisa Zhang", idea: "EduVR - Virtual Learning Platform", votes: 27, status: "upcoming" },
  ];

  const handleNextPitch = () => {
    if (currentPitchIndex < pitches.length - 1) {
      setCurrentPitchIndex(currentPitchIndex + 1);
    }
  };

  const handlePreviousPitch = () => {
    if (currentPitchIndex > 0) {
      setCurrentPitchIndex(currentPitchIndex - 1);
    }
  };

  const filteredPitches = pitches.filter(pitch => 
    pitch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pitch.idea.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage hackathon presentations and voting</p>
            </div>
            <Button onClick={() => navigate('/')} variant="outline">
              Back to Main
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Control Panel */}
        <Card className="bg-white/80 backdrop-blur-md border-white/30 shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2" />
              Presentation Controls
            </CardTitle>
            <CardDescription>
              Control the current presentation and manage the voting flow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Pitch Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Current Presenter</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{pitches[currentPitchIndex]?.name}</span>
                    <Badge variant={isPresenting ? "default" : "secondary"}>
                      {isPresenting ? "Presenting" : "Paused"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{pitches[currentPitchIndex]?.idea}</p>
                  <div className="flex items-center text-sm text-purple-600">
                    <Trophy className="h-4 w-4 mr-1" />
                    {pitches[currentPitchIndex]?.votes} votes
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Controls</h3>
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => setIsPresenting(!isPresenting)}
                      variant={isPresenting ? "destructive" : "default"}
                      className="flex-1"
                    >
                      {isPresenting ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Pause Voting
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Resume Voting
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      onClick={handlePreviousPitch}
                      disabled={currentPitchIndex === 0}
                      variant="outline"
                      className="flex-1"
                    >
                      Previous
                    </Button>
                    <Button 
                      onClick={handleNextPitch}
                      disabled={currentPitchIndex === pitches.length - 1}
                      className="flex-1"
                    >
                      <SkipForward className="h-4 w-4 mr-2" />
                      Next Pitch
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pitch Management */}
        <Card className="bg-white/80 backdrop-blur-md border-white/30 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  All Pitches
                </CardTitle>
                <CardDescription>
                  Manage all hackathon presentations and view voting results
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search pitches..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPitches.map((pitch, index) => (
                <div 
                  key={pitch.id}
                  className={`p-4 rounded-lg border transition-all ${
                    index === currentPitchIndex 
                      ? 'bg-blue-50 border-blue-200 shadow-sm' 
                      : 'bg-white border-gray-200 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-lg">{pitch.name}</span>
                        <Badge 
                          variant={
                            pitch.status === "presenting" ? "default" :
                            pitch.status === "completed" ? "secondary" : 
                            "outline"
                          }
                        >
                          {pitch.status}
                        </Badge>
                        {index === currentPitchIndex && (
                          <Badge variant="destructive">Current</Badge>
                        )}
                      </div>
                      <p className="text-gray-600 mt-1">{pitch.idea}</p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="flex items-center text-purple-600">
                          <Trophy className="h-4 w-4 mr-1" />
                          <span className="font-semibold">{pitch.votes}</span>
                        </div>
                        <span className="text-sm text-gray-500">votes</span>
                      </div>
                      
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setCurrentPitchIndex(index)}
                      >
                        Set Current
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin;

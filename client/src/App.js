import React, { useState, useEffect } from 'react';
import { Trophy, Lock, Unlock, TrendingUp, Users, DollarSign, Calendar, Star, Gift, Target, CheckCircle, Award } from 'lucide-react';

const CareerSimulator = () => {
  const [selectedPath, setSelectedPath] = useState(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [unlockedRewards, setUnlockedRewards] = useState([]);
  const [timeFrame, setTimeFrame] = useState(12); // months
  const [showTimeCapsule, setShowTimeCapsule] = useState(false);
  const [timeCapsuleMessage, setTimeCapsuleMessage] = useState('');
  const [savedCapsules, setSavedCapsules] = useState([]);

  const careerPaths = {
    'web-dev': {
      title: 'Web Development',
      icon: '🌐',
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-gradient-to-r from-blue-50 to-purple-50',
      roadmap: [
        'HTML/CSS Fundamentals',
        'JavaScript Essentials',
        'React/Vue Framework',
        'Backend Development',
        'Database Management',
        'DevOps & Deployment',
        'Advanced Frameworks',
        'System Architecture'
      ],
      projections: {
        6: { salary: '$45,000', role: 'Junior Developer', projects: 'Landing Pages, Simple Apps' },
        12: { salary: '$65,000', role: 'Frontend Developer', projects: 'E-commerce Sites, SPAs' },
        18: { salary: '$85,000', role: 'Full-Stack Developer', projects: 'Complex Web Apps, APIs' },
        24: { salary: '$110,000', role: 'Senior Developer', projects: 'Enterprise Solutions, Team Lead' }
      },
      community: 2800000,
      growth: '+15%'
    },
    'ai-ml': {
      title: 'AI & Machine Learning',
      icon: '🤖',
      color: 'from-green-500 to-teal-600',
      bgColor: 'bg-gradient-to-r from-green-50 to-teal-50',
      roadmap: [
        'Python Fundamentals',
        'Math & Statistics',
        'Machine Learning Basics',
        'Deep Learning',
        'Computer Vision',
        'NLP & LLMs',
        'MLOps & Deployment',
        'AI Research & Innovation'
      ],
      projections: {
        6: { salary: '$55,000', role: 'ML Intern', projects: 'Data Analysis, Simple Models' },
        12: { salary: '$85,000', role: 'ML Engineer', projects: 'Prediction Models, Automation' },
        18: { salary: '$125,000', role: 'Senior ML Engineer', projects: 'AI Products, Deep Learning' },
        24: { salary: '$160,000', role: 'AI Research Scientist', projects: 'Cutting-edge AI, Publications' }
      },
      community: 1200000,
      growth: '+35%'
    },
    'blockchain': {
      title: 'Blockchain Development',
      icon: '⛓️',
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-gradient-to-r from-orange-50 to-red-50',
      roadmap: [
        'Blockchain Fundamentals',
        'Solidity Programming',
        'Smart Contracts',
        'DApp Development',
        'DeFi Protocols',
        'NFT Development',
        'Layer 2 Solutions',
        'Blockchain Architecture'
      ],
      projections: {
        6: { salary: '$60,000', role: 'Junior Blockchain Dev', projects: 'Simple Smart Contracts' },
        12: { salary: '$95,000', role: 'Blockchain Developer', projects: 'DApps, Token Systems' },
        18: { salary: '$140,000', role: 'Senior Blockchain Dev', projects: 'DeFi Protocols, DAOs' },
        24: { salary: '$180,000', role: 'Blockchain Architect', projects: 'Enterprise Blockchain, Consulting' }
      },
      community: 450000,
      growth: '+50%'
    },
    'mobile-dev': {
      title: 'Mobile Development',
      icon: '📱',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-gradient-to-r from-purple-50 to-pink-50',
      roadmap: [
        'Mobile UI/UX Basics',
        'React Native/Flutter',
        'Native Development',
        'State Management',
        'API Integration',
        'App Store Optimization',
        'Performance Optimization',
        'Cross-platform Mastery'
      ],
      projections: {
        6: { salary: '$50,000', role: 'Junior Mobile Dev', projects: 'Simple Apps, Prototypes' },
        12: { salary: '$75,000', role: 'Mobile Developer', projects: 'Feature-rich Apps, Publishing' },
        18: { salary: '$100,000', role: 'Senior Mobile Dev', projects: 'Complex Apps, Team Lead' },
        24: { salary: '$130,000', role: 'Mobile Architect', projects: 'Enterprise Apps, Frameworks' }
      },
      community: 1800000,
      growth: '+20%'
    }
  };

  const rewardMilestones = [
    { progress: 25, title: 'First Steps', icon: '🎯', reward: 'Beginner Badge + Study Plan' },
    { progress: 50, title: 'Halfway Hero', icon: '🚀', reward: 'Progress Certificate + Portfolio Template' },
    { progress: 75, title: 'Almost There', icon: '💪', reward: 'Advanced Resources + Mentorship Match' },
    { progress: 100, title: 'Path Master', icon: '👑', reward: 'Completion Certificate + Job Ready Badge' }
  ];

  const updateProgress = (newProgress) => {
    setCurrentProgress(newProgress);
    
    // Check for new rewards
    rewardMilestones.forEach(milestone => {
      if (newProgress >= milestone.progress && !unlockedRewards.includes(milestone.progress)) {
        setUnlockedRewards([...unlockedRewards, milestone.progress]);
      }
    });
  };

  const saveTimeCapsule = () => {
    if (timeCapsuleMessage.trim()) {
      const newCapsule = {
        id: Date.now(),
        message: timeCapsuleMessage,
        createdAt: new Date().toLocaleDateString(),
        unlockAt: currentProgress + 20, // Unlock after 20% more progress
        domain: selectedPath,
        isUnlocked: false
      };
      setSavedCapsules([...savedCapsules, newCapsule]);
      setTimeCapsuleMessage('');
      setShowTimeCapsule(false);
    }
  };

  const unlockCapsule = (capsuleId) => {
    setSavedCapsules(savedCapsules.map(capsule => 
      capsule.id === capsuleId ? { ...capsule, isUnlocked: true } : capsule
    ));
  };

  if (!selectedPath) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Career Path Simulator
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your path and visualize your future success. Set goals, track progress, and unlock rewards along your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(careerPaths).map(([key, path]) => (
              <div
                key={key}
                onClick={() => setSelectedPath(key)}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <div className={`${path.bgColor} rounded-3xl p-8 shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-white`}>
                  <div className="text-center">
                    <div className="text-6xl mb-4">{path.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{path.title}</h3>
                    <div className="flex justify-center items-center gap-6 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{(path.community / 1000000).toFixed(1)}M+ devs</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp size={16} />
                        <span>{path.growth} growth</span>
                      </div>
                    </div>
                    <div className={`bg-gradient-to-r ${path.color} text-white py-3 px-6 rounded-full font-semibold group-hover:shadow-lg transition-all duration-300`}>
                      Start Your Journey →
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentPath = careerPaths[selectedPath];
  const currentProjection = currentPath.projections[timeFrame] || currentPath.projections[24];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {currentPath.icon} {currentPath.title} Journey
            </h1>
            <p className="text-gray-600">Track your progress and unlock your potential</p>
          </div>
          <button
            onClick={() => setSelectedPath(null)}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition-colors"
          >
            ← Change Path
          </button>
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Progress Tracker */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Your Learning Path</h2>
              <div className="text-right">
                <div className="text-3xl font-bold text-indigo-600">{currentProgress}%</div>
                <div className="text-sm text-gray-500">Complete</div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className={`bg-gradient-to-r ${currentPath.color} h-3 rounded-full transition-all duration-500 ease-out`}
                  style={{ width: `${currentProgress}%` }}
                ></div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {currentPath.roadmap.map((skill, index) => {
                  const isCompleted = (currentProgress / 100) * currentPath.roadmap.length > index;
                  return (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-green-50 border-green-200 text-green-800' 
                          : 'bg-gray-50 border-gray-200 text-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isCompleted ? <CheckCircle size={16} className="text-green-600" /> : <Target size={16} />}
                        <span className="text-sm font-medium">{skill}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-4">
              <input
                type="range"
                min="0"
                max="100"
                value={currentProgress}
                onChange={(e) => updateProgress(Number(e.target.value))}
                className="flex-1"
              />
              <input
                type="number"
                min="0"
                max="100"
                value={currentProgress}
                onChange={(e) => updateProgress(Number(e.target.value))}
                className="w-20 px-3 py-1 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Future Projection */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Your Future in {timeFrame} months</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <DollarSign className="text-green-600" size={24} />
                <div>
                  <div className="text-2xl font-bold text-green-600">{currentProjection.salary}</div>
                  <div className="text-sm text-gray-500">Expected Salary</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Award className="text-blue-600" size={24} />
                <div>
                  <div className="text-lg font-semibold text-gray-800">{currentProjection.role}</div>
                  <div className="text-sm text-gray-500">Job Title</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Star className="text-purple-600" size={24} />
                <div>
                  <div className="text-sm font-medium text-gray-800">{currentProjection.projects}</div>
                  <div className="text-xs text-gray-500">Project Types</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Frame
              </label>
              <select
                value={timeFrame}
                onChange={(e) => setTimeFrame(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value={6}>6 months</option>
                <option value={12}>1 year</option>
                <option value={18}>1.5 years</option>
                <option value={24}>2 years</option>
              </select>
            </div>
          </div>
        </div>

        {/* Rewards & Time Capsule */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Rewards */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Trophy className="text-yellow-500" />
              Milestone Rewards
            </h3>
            
            <div className="space-y-4">
              {rewardMilestones.map((milestone) => {
                const isUnlocked = unlockedRewards.includes(milestone.progress);
                const isReached = currentProgress >= milestone.progress;
                
                return (
                  <div
                    key={milestone.progress}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      isUnlocked 
                        ? 'bg-green-50 border-green-200' 
                        : isReached 
                        ? 'bg-yellow-50 border-yellow-200 animate-pulse' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{milestone.icon}</div>
                        <div>
                          <div className="font-semibold text-gray-800">{milestone.title}</div>
                          <div className="text-sm text-gray-600">{milestone.reward}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isUnlocked ? (
                          <Unlock className="text-green-600" size={20} />
                        ) : (
                          <Lock className="text-gray-400" size={20} />
                        )}
                        <span className="text-sm font-medium">{milestone.progress}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Time Capsule */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Gift className="text-purple-500" />
              Time Capsule
            </h3>
            
            {!showTimeCapsule ? (
              <button
                onClick={() => setShowTimeCapsule(true)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 mb-4"
              >
                📝 Leave a Message to Future You
              </button>
            ) : (
              <div className="mb-4">
                <textarea
                  value={timeCapsuleMessage}
                  onChange={(e) => setTimeCapsuleMessage(e.target.value)}
                  placeholder="Write a message to your future self when you reach the next milestone..."
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={saveTimeCapsule}
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Save Capsule
                  </button>
                  <button
                    onClick={() => setShowTimeCapsule(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {savedCapsules.map((capsule) => {
                const canUnlock = currentProgress >= capsule.unlockAt;
                
                return (
                  <div
                    key={capsule.id}
                    className={`p-4 rounded-lg border-2 ${
                      capsule.isUnlocked 
                        ? 'bg-green-50 border-green-200' 
                        : canUnlock 
                        ? 'bg-yellow-50 border-yellow-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">Created: {capsule.createdAt}</span>
                      {capsule.isUnlocked ? (
                        <Unlock className="text-green-600" size={16} />
                      ) : canUnlock ? (
                        <button
                          onClick={() => unlockCapsule(capsule.id)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition-colors"
                        >
                          Unlock Now!
                        </button>
                      ) : (
                        <Lock className="text-gray-400" size={16} />
                      )}
                    </div>
                    {capsule.isUnlocked ? (
                      <p className="text-gray-800 italic">"{capsule.message}"</p>
                    ) : (
                      <p className="text-gray-500">🔒 Unlock at {capsule.unlockAt}% progress</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerSimulator;
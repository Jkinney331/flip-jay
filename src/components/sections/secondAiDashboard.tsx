
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon, BarChart3, Zap, MousePointer2, Target, Globe, BookOpen, MessageSquare, Brain, Activity, Search, Lightbulb, Phone } from 'lucide-react';
import { LiquidButton } from '../ui/Liquid-button';

interface DashboardScreen {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface MouseClickerProps {
  onScreenChange: (screenId: string) => void;
  currentScreen: string;
}

function MouseClicker({ onScreenChange, currentScreen }: MouseClickerProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  
  const clickSpots = [
    { x: 25, y: 35, screen: 'tasks', delay: 0 },
    { x: 70, y: 45, screen: 'data', delay: 4000 },
    { x: 30, y: 75, screen: 'reasoning', delay: 8000 },
    { x: 75, y: 85, screen: 'agents', delay: 12000 }
  ];
  
  useEffect(() => {
    const moveToNextSpot = () => {
      clickSpots.forEach((spot, index) => {
        setTimeout(() => {
          setPosition({ x: spot.x, y: spot.y });
          setTimeout(() => {
            setIsClicking(true);
            onScreenChange(spot.screen);
            setTimeout(() => setIsClicking(false), 200);
          }, 800);
        }, spot.delay);
      });
    };
    
    moveToNextSpot();
    const interval = setInterval(moveToNextSpot, 16000);
    
    return () => clearInterval(interval);
  }, [onScreenChange]);
  
  return (
    <motion.div
      className="absolute z-20 pointer-events-none"
      animate={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        animate={{
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ duration: 0.1 }}
        className="relative"
      >
        <MousePointer2 className="w-6 h-6 text-blue-600 drop-shadow-lg" />
        {isClicking && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute -top-2 -left-2 w-8 h-8 border-2 border-blue-400 rounded-full"
          />
        )}
      </motion.div>
    </motion.div>
  );
}

const dashboardScreens: DashboardScreen[] = [
  {
    id: 'tasks',
    title: 'Task Management',
    content: (
      <div className="space-y-3 h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Task Hub</h3>
              <p className="text-xs text-muted-foreground">12 active • 3 pending</p>
            </div>
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/20 border border-emerald-500/20 p-2 rounded-lg">
            <div className="text-xs text-emerald-700 dark:text-emerald-300 mb-1">Completed</div>
            <div className="text-lg font-bold text-emerald-800 dark:text-emerald-200">247</div>
          </div>
          <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/20 border border-amber-500/20 p-2 rounded-lg">
            <div className="text-xs text-amber-700 dark:text-amber-300 mb-1">Running</div>
            <div className="text-lg font-bold text-amber-800 dark:text-amber-200">12</div>
          </div>
          <div className="bg-gradient-to-br from-red-500/10 to-red-600/20 border border-red-500/20 p-2 rounded-lg">
            <div className="text-xs text-red-700 dark:text-red-300 mb-1">Failed</div>
            <div className="text-lg font-bold text-red-800 dark:text-red-200">3</div>
          </div>
        </div>

        {/* Active Tasks */}
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg hover:border-blue-500/40 transition-colors cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div>
                <div className="text-xs font-medium text-foreground">Analyze competitor pricing</div>
                <div className="text-xs text-muted-foreground">Started 2m ago</div>
              </div>
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">73%</div>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg hover:border-green-500/40 transition-colors cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <div className="text-xs font-medium text-foreground">Scrape social media data</div>
                <div className="text-xs text-muted-foreground">Started 5m ago</div>
              </div>
            </div>
            <div className="text-xs text-green-600 dark:text-green-400 font-medium">91%</div>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg hover:border-amber-500/40 transition-colors cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <div>
                <div className="text-xs font-medium text-foreground">Generate market report</div>
                <div className="text-xs text-muted-foreground">Queued</div>
              </div>
            </div>
            <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">0%</div>
          </div>
        </div>

        {/* Task Queue */}
        <div className="mt-4 p-2 bg-gradient-to-r from-slate-500/10 to-slate-600/10 border border-slate-500/20 rounded-lg">
          <div className="text-xs font-medium text-foreground mb-2">Queue Status</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Waiting:</span>
              <span className="text-amber-600 dark:text-amber-400">7</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Priority:</span>
              <span className="text-red-600 dark:text-red-400">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Est. Time:</span>
              <span className="text-foreground">12m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Workers:</span>
              <span className="text-green-600 dark:text-green-400">4/6</span>
            </div>
          </div>
        </div>

        {/* Recent Completions */}
        <div className="mt-4">
          <div className="text-xs font-medium text-foreground mb-2">Recently Completed</div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Market analysis report</span>
              <span className="text-green-600 dark:text-green-400">2m ago</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Content scraping job</span>
              <span className="text-green-600 dark:text-green-400">5m ago</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 hover:border-blue-500/50 px-3 py-2 rounded-lg text-xs font-medium text-foreground transition-colors">
            Create Task
          </button>
          <button className="flex-1 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 hover:border-emerald-500/50 px-3 py-2 rounded-lg text-xs font-medium text-foreground transition-colors">
            View All
          </button>
        </div>
      </div>
    )
  },
  {
    id: 'data',
    title: 'Data Analytics',
    content: (
      <div className="space-y-3 h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Data Hub</h3>
              <p className="text-xs text-muted-foreground">2.4M records • Live sync</p>
            </div>
          </div>
          <div className="text-xs bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 px-2 py-1 rounded-full">
            <span className="text-purple-700 dark:text-purple-300">Real-time</span>
          </div>
        </div>

        {/* Data Sources */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              <span className="text-xs text-foreground font-medium">Web Scraping API</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">847K</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center gap-2">
              <BookOpen className="w-3 h-3 text-green-600 dark:text-green-400" />
              <span className="text-xs text-foreground font-medium">Research Papers</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">1.2M</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-3 h-3 text-orange-600 dark:text-orange-400" />
              <span className="text-xs text-foreground font-medium">Social Media</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">391K</span>
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/20 border border-indigo-500/20 p-2 rounded-lg">
            <div className="text-xs text-indigo-700 dark:text-indigo-300 mb-1">Accuracy</div>
            <div className="text-lg font-bold text-indigo-800 dark:text-indigo-200">94.2%</div>
            <div className="text-xs text-green-600 dark:text-green-400">+2.1%</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/20 border border-pink-500/20 p-2 rounded-lg">
            <div className="text-xs text-pink-700 dark:text-pink-300 mb-1">Processing</div>
            <div className="text-lg font-bold text-pink-800 dark:text-pink-200">147ms</div>
            <div className="text-xs text-green-600 dark:text-green-400">-15ms</div>
          </div>
        </div>

        {/* Data Pipeline Status */}
        <div className="mt-4 p-2 bg-gradient-to-r from-slate-500/10 to-slate-600/10 border border-slate-500/20 rounded-lg">
          <div className="text-xs font-medium text-foreground mb-2">Pipeline Status</div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Ingestion Rate</span>
              <span className="text-foreground">2.3K/min</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Storage Used</span>
              <span className="text-foreground">847GB</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Cache Hit Rate</span>
              <span className="text-emerald-600 dark:text-emerald-400">96.8%</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-4">
          <div className="text-xs font-medium text-foreground mb-2">Recent Activity</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <span className="text-muted-foreground">Twitter API sync completed</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span className="text-muted-foreground">Research papers indexed</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30 hover:border-purple-500/50 px-3 py-2 rounded-lg text-xs font-medium text-foreground transition-colors">
            Export Data
          </button>
          <button className="flex-1 bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-500/30 hover:border-pink-500/50 px-3 py-2 rounded-lg text-xs font-medium text-foreground transition-colors">
            Analytics
          </button>
        </div>
      </div>
    )
  },
  {
    id: 'reasoning',
    title: 'AI Reasoning',
    content: (
      <div className="space-y-3 h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Reasoning Engine</h3>
              <p className="text-xs text-muted-foreground">Chain of thought • Live</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Activity className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">Active</span>
          </div>
        </div>

        {/* Reasoning Chain */}
        <div className="space-y-2">
          <div className="relative">
            <div className="absolute left-2 top-6 bottom-0 w-px bg-gradient-to-b from-green-500 to-transparent"></div>
            <div className="flex items-start gap-2 p-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
              <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center mt-0.5 relative z-10">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-foreground">Data Collection</div>
                <div className="text-xs text-muted-foreground">Analyzing 1.2M data points</div>
                <div className="text-xs text-green-600 dark:text-green-400 font-medium">95% confidence</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute left-2 top-6 bottom-0 w-px bg-gradient-to-b from-green-500 to-transparent"></div>
            <div className="flex items-start gap-2 p-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
              <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center mt-0.5 relative z-10">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-foreground">Pattern Analysis</div>
                <div className="text-xs text-muted-foreground">Identifying market trends</div>
                <div className="text-xs text-green-600 dark:text-green-400 font-medium">88% confidence</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute left-2 top-6 bottom-0 w-px bg-gradient-to-b from-amber-500 to-transparent"></div>
            <div className="flex items-start gap-2 p-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg">
              <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center mt-0.5 relative z-10 animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-foreground">Decision Making</div>
                <div className="text-xs text-muted-foreground">Processing reasoning chain</div>
                <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">76% confidence</div>
              </div>
            </div>
          </div>
        </div>

        {/* Confidence Metrics */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/20 border border-blue-500/20 p-2 rounded-lg">
            <div className="text-xs text-blue-700 dark:text-blue-300 mb-1">Accuracy</div>
            <div className="text-lg font-bold text-blue-800 dark:text-blue-200">92%</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/20 border border-purple-500/20 p-2 rounded-lg">
            <div className="text-xs text-purple-700 dark:text-purple-300 mb-1">Speed</div>
            <div className="text-lg font-bold text-purple-800 dark:text-purple-200">2.1s</div>
          </div>
        </div>

        {/* Model Information */}
        <div className="mt-4 p-2 bg-gradient-to-r from-slate-500/10 to-slate-600/10 border border-slate-500/20 rounded-lg">
          <div className="text-xs font-medium text-foreground mb-2">Model Details</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Version:</span>
              <span className="text-foreground">v2.1.4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Parameters:</span>
              <span className="text-foreground">7B</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Context:</span>
              <span className="text-foreground">32K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Temperature:</span>
              <span className="text-foreground">0.7</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 hover:border-emerald-500/50 px-3 py-2 rounded-lg text-xs font-medium text-foreground transition-colors">
            View Chain
          </button>
          <button className="flex-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 hover:border-amber-500/50 px-3 py-2 rounded-lg text-xs font-medium text-foreground transition-colors">
            Debug
          </button>
        </div>
      </div>
    )
  },
  {
    id: 'agents',
    title: 'Agent Hub',
    content: (
      <div className="space-y-3 h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Agent Hub</h3>
              <p className="text-xs text-muted-foreground">4 active • 2 idle</p>
            </div>
          </div>
          <div className="text-xs bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 px-2 py-1 rounded-full">
            <span className="text-orange-700 dark:text-orange-300">Live</span>
          </div>
        </div>

        {/* Agent Cards */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-lg hover:border-purple-500/40 transition-colors cursor-pointer">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-purple-700 rounded flex items-center justify-center">
              <BarChart3 className="w-3 h-3 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium text-foreground">Data Analyst Agent</div>
              <div className="text-xs text-muted-foreground">Processing • 98% success rate</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">45ms</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg hover:border-orange-500/40 transition-colors cursor-pointer">
            <div className="w-6 h-6 bg-gradient-to-br from-orange-600 to-orange-700 rounded flex items-center justify-center">
              <Lightbulb className="w-3 h-3 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium text-foreground">Creative Agent</div>
              <div className="text-xs text-muted-foreground">Generating • 92% success rate</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">2.3s</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-lg hover:border-emerald-500/40 transition-colors cursor-pointer">
            <div className="w-6 h-6 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded flex items-center justify-center">
              <Search className="w-3 h-3 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium text-foreground">Research Agent</div>
              <div className="text-xs text-muted-foreground">Idle • 94% success rate</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <span className="text-xs text-muted-foreground">---</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg hover:border-blue-500/40 transition-colors cursor-pointer">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded flex items-center justify-center">
              <Phone className="w-3 h-3 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium text-foreground">Communication Agent</div>
              <div className="text-xs text-muted-foreground">Monitoring • 96% success rate</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">123ms</span>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/20 border border-green-500/20 p-2 rounded-lg">
            <div className="text-xs text-green-700 dark:text-green-300 mb-1">Avg Success</div>
            <div className="text-lg font-bold text-green-800 dark:text-green-200">95%</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/20 border border-blue-500/20 p-2 rounded-lg">
            <div className="text-xs text-blue-700 dark:text-blue-300 mb-1">Avg Response</div>
            <div className="text-lg font-bold text-blue-800 dark:text-blue-200">187ms</div>
          </div>
        </div>

        {/* Resource Usage */}
        <div className="mt-4 space-y-2">
          <div className="text-xs font-medium text-foreground mb-2">Resource Usage</div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">CPU Usage</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="w-[68%] h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              </div>
              <span className="text-foreground">68%</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Memory</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="w-[42%] h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
              </div>
              <span className="text-foreground">42%</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Network</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="w-[85%] h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
              </div>
              <span className="text-foreground">85%</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 hover:border-orange-500/50 px-3 py-2 rounded-lg text-xs font-medium text-foreground transition-colors">
            Deploy Agent
          </button>
          <button className="flex-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 hover:border-blue-500/50 px-3 py-2 rounded-lg text-xs font-medium text-foreground transition-colors">
            Monitor
          </button>
        </div>
      </div>
    )
  }
];

interface AgentDashboardShowcaseProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const AgentDashboardShowcase: React.FC<AgentDashboardShowcaseProps> = ({
  title = "AI Agent Platform",
  subtitle = "Complete Intelligence Suite",
  description = "Experience the full power of our AI platform with four integrated centers working together seamlessly.",
  primaryButtonText = "Book Demo",
  secondaryButtonText = "Learn More",
  onPrimaryClick = () => console.log("Primary button clicked"),
  onSecondaryClick = () => console.log("Secondary button clicked")
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('tasks');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setCurrentScreen('tasks');
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-background py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/25" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center space-y-16">
          <motion.div 
            className="text-center space-y-8 max-w-4xl"
            initial={{ opacity: 0, y: -30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full border border-border shadow-lg"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-foreground">
                Live Platform Demo
              </span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {title}
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {subtitle}
              </span>
            </motion.h1>
          </motion.div>

          <motion.div 
            className="relative w-full max-w-6xl"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full h-[600px] lg:h-[700px] flex items-center justify-center">
              <motion.div 
                className="relative w-full max-w-2xl h-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <MouseClicker onScreenChange={setCurrentScreen} currentScreen={currentScreen} />
                
                {/* Dashboard Screen - Liquid Glass Effect */}
                <div className="relative w-full h-full bg-white/20 dark:bg-slate-900/20 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 dark:border-slate-700/30 p-6 overflow-hidden">
                  {/* Liquid Glass Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl" />
                  <div className="absolute inset-0 bg-gradient-to-tl from-emerald-500/3 via-transparent to-cyan-500/3 rounded-3xl" />
                  
                  {/* Live Indicator */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-foreground/80 font-medium">Live Dashboard</span>
                  </div>

                  {/* Current Screen Title */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-white/10 dark:bg-slate-800/10 backdrop-blur-sm border border-white/20 dark:border-slate-700/20 px-3 py-1 rounded-full">
                      <span className="text-xs text-foreground/80 font-medium">
                        {dashboardScreens.find(s => s.id === currentScreen)?.title}
                      </span>
                    </div>
                  </div>

                  {/* Screen Content */}
                  <div className="pt-12 pb-4 h-full">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentScreen}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="w-full h-full"
                      >
                        {dashboardScreens.find(s => s.id === currentScreen)?.content}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                
                <motion.div 
                  className="absolute -top-6 -right-6 w-16 h-16 bg-blue-500/20 rounded-full blur-xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute -bottom-8 -left-8 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"
                  animate={{ 
                    scale: [1.2, 1, 1.2],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="text-center space-y-8 max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>

            <LiquidButton>
            <button
              onClick={onPrimaryClick}
              className="group inline-flex items-center justify-center gap-3 px-8 py-3 dark:text-white text-black bg-transparent font-semibold cursor-pointer text-lg"
            >
              {primaryButtonText}
              <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            </LiquidButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function DemoOne() {
  return (
    <AgentDashboardShowcase
      title="AI Agent Platform"
      subtitle="Complete Intelligence Suite"
      description="Experience the full power of our AI platform with four integrated centers working together seamlessly to deliver unmatched intelligence and automation."
      primaryButtonText="Book Demo"
      onPrimaryClick={() => console.log("Book demo clicked")}
    />
  );
}
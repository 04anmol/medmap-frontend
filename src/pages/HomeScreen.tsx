import React, { useEffect, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, LogOut, Edit, CirclePlus, Ambulance, Wind, Droplets, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import QuickAccessCards from '@/components/QuickAccessCards';
import PageTransition from '@/components/PageTransition';
// Logo served from public folder

const HomeScreen = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/demo');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  // Hero carousel slides
  const heroSlides = [
    { value: '12k+', label: 'People assisted', color: 'bg-emerald-500', border: 'border-emerald-500', text: 'text-emerald-600', Icon: Ambulance },
    { value: '2.4k', label: 'Ambulances dispatched', color: 'bg-cyan-600', border: 'border-cyan-600', text: 'text-cyan-600', Icon: Wind },
    { value: '310+', label: 'Hospitals connected', color: 'bg-red-500', border: 'border-red-500', text: 'text-red-500', Icon: Building },
    { value: '95%', label: 'Satisfaction', color: 'bg-amber-500', border: 'border-amber-500', text: 'text-amber-500', Icon: Droplets },
  ];

  const [slideIndex, setSlideIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <PageTransition>
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        {/* Logo and User Initial */}
        <div className="flex items-center space-x-3">
          <img 
            src={"/Untitled_design-removebg-preview.png"}
            alt="MedMap Logo" 
            className="w-14 h-14 object-contain"
          />
          <Button
            variant="ghost"
            onClick={handleProfile}
            className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg p-0 shadow-lg"
          >
            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
          </Button>
        </div>

        {/* Profile/Logout */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-muted-foreground hover:text-destructive transition-colors"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </Button>
      </div>

      {/* Main Content */}
      <div className="px-6">
        {/* Greeting */}
        <div className="mb-8 animate-slide-up text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-muted-foreground">
            Stay safe and connected
          </p>
        </div>

        {/* Map Screen */}
        <div className="mb-1 animate-fade-in-delayed">
          <Card className="card-medmap bg-gradient-to-br from-primary to-primary/80 rounded-t-3xl rounded-b-none overflow-hidden p-3">
            <div className="h-80 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden rounded-t-3xl">
              {/* Map Grid Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-8 grid-rows-6 h-full">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="border border-gray-300"></div>
                  ))}
                </div>
              </div>
              
              {/* Roads */}
              <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-400 opacity-30"></div>
              <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-400 opacity-30"></div>
              <div className="absolute top-0 bottom-0 left-1/4 w-1 bg-gray-400 opacity-30"></div>
              <div className="absolute top-0 bottom-0 left-3/4 w-1 bg-gray-400 opacity-30"></div>
              
              {/* Current Location Marker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg"></div>
                <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg animate-ping absolute top-0 left-0"></div>
              </div>
              
              {/* Service Markers */}
              {/* Hospital */}
              <div className="absolute top-1/6 left-1/6">
                <div className="w-3 h-3 bg-red-500 rounded-full border border-white shadow-md"></div>
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-1 py-0.5 rounded whitespace-nowrap">
                  Hospital
                </div>
              </div>
              
              {/* Ambulance Station */}
              <div className="absolute top-1/3 right-1/4">
                <div className="w-3 h-3 bg-orange-500 rounded-full border border-white shadow-md"></div>
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs px-1 py-0.5 rounded whitespace-nowrap">
                  Ambulance
                </div>
              </div>
              
              {/* Pharmacy */}
              <div className="absolute bottom-1/4 left-1/3">
                <div className="w-3 h-3 bg-green-500 rounded-full border border-white shadow-md"></div>
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-1 py-0.5 rounded whitespace-nowrap">
                  Pharmacy
                </div>
              </div>
              
              {/* Emergency Center */}
              <div className="absolute bottom-1/6 right-1/6">
                <div className="w-3 h-3 bg-purple-500 rounded-full border border-white shadow-md"></div>
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white text-xs px-1 py-0.5 rounded whitespace-nowrap">
                  Emergency
                </div>
              </div>
              
              {/* Blood Bank */}
              <div className="absolute top-2/3 left-1/4">
                <div className="w-3 h-3 bg-pink-500 rounded-full border border-white shadow-md"></div>
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white text-xs px-1 py-0.5 rounded whitespace-nowrap">
                  Blood Bank
                </div>
              </div>
              
              {/* Map Title */}
              <div className="absolute top-2 left-2">
                <p className="text-primary font-medium text-sm">Services around {user?.city || 'New York'}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Current Location */}
        <Card className="card-medmap bg-gradient-to-br from-primary to-primary/80 text-primary-foreground mb-4 animate-fade-in-delayed rounded-t-none rounded-b-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MapPin className="w-6 h-6 mr-3" />
              <div>
                <h3 className="font-semibold">Current Location</h3>
                <p className="text-sm opacity-90">{user?.city || 'New York'}, {user?.state || 'NY'}</p>
              </div>
            </div>
            <div className="w-3 h-3 glow-location"></div>
          </div>
        </Card>

        {/* Swippable SOS Button */}
        <div className="mb-6 animate-fade-in-delayed">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-500 to-red-600">
            {/* Background - Hidden behind swipe */}
            <div className="flex items-center justify-between p-4 opacity-0">
              {/* Emergency Logo */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Ambulance className="w-6 h-6 text-white" />
                </div>
                <div className="text-white">
                  <h3 className="font-semibold text-lg">Emergency</h3>
                  <p className="text-sm opacity-90">Swipe to call SOS</p>
                </div>
              </div>
              
              {/* SOS Text */}
              <div className="flex items-center space-x-2">
                <span className="text-white font-bold text-xl tracking-wider">SOS</span>
                <div 
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/sos');
                  }}
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Swipeable Overlay with Effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-between p-4 cursor-pointer transition-transform duration-300 ease-out touch-pan-x"
              style={{ transform: 'translateX(0)' }}
              ref={(el) => {
                if (el) {
                  el.dataset.swipeOverlay = 'true';
                }
              }}
              onTouchStart={(e) => {
                const touch = e.touches[0];
                const startX = touch.clientX;
                const element = e.currentTarget;
                const container = element.parentElement;
                
                const handleTouchMove = (e: TouchEvent) => {
                  const touch = e.touches[0];
                  const currentX = touch.clientX;
                  const deltaX = currentX - startX;
                  const maxSwipe = element.offsetWidth * 0.8;
                  
                  if (deltaX > 0 && deltaX < maxSwipe) {
                    // Move the content with the swipe - content stays visible
                    element.style.transform = `translateX(${deltaX}px)`;
                    
                    // Add swipe effect - gradient transition from red to green
                    const revealWidth = Math.min(deltaX, element.offsetWidth);
                    const revealPercent = (revealWidth / element.offsetWidth) * 100;
                    
                    // Create or update swipe effect with gradient
                    let swipeEffect = container?.querySelector('.swipe-effect') as HTMLElement;
                    if (!swipeEffect) {
                      swipeEffect = document.createElement('div');
                      swipeEffect.className = 'swipe-effect absolute inset-0 rounded-2xl';
                      container?.appendChild(swipeEffect);
                    }
                    
                    // Update gradient based on swipe progress
                    const redIntensity = Math.max(0, 100 - revealPercent);
                    const greenIntensity = Math.min(100, revealPercent);
                    swipeEffect.style.background = `linear-gradient(to right, 
                      hsl(${redIntensity * 0.5}, 100%, 50%) 0%, 
                      hsl(${redIntensity * 0.5 + greenIntensity * 0.3}, 100%, 50%) 50%, 
                      hsl(${greenIntensity * 0.3}, 100%, 50%) 100%)`;
                    
                    // Add swipe trail effect
                    let trailEffect = container?.querySelector('.swipe-trail') as HTMLElement;
                    if (!trailEffect) {
                      trailEffect = document.createElement('div');
                      trailEffect.className = 'swipe-trail absolute top-0 bottom-0 w-1 bg-white/30 rounded-full';
                      trailEffect.style.left = `${deltaX}px`;
                      container?.appendChild(trailEffect);
                    } else {
                      trailEffect.style.left = `${deltaX}px`;
                    }
                  }
                };
                
                const handleTouchEnd = () => {
                  const currentTransform = element.style.transform;
                  const translateX = parseInt(currentTransform.replace('translateX(', '').replace('px)', '') || '0');
                  
                  if (translateX > element.offsetWidth * 0.6) {
                    // Swipe completed - navigate to SOS
                    element.style.transform = `translateX(${element.offsetWidth}px)`;
                    setTimeout(() => navigate('/sos'), 300);
                  } else {
                    // Reset position
                    element.style.transform = 'translateX(0)';
                    
                    // Remove swipe effects
                    const swipeEffect = container?.querySelector('.swipe-effect');
                    const trailEffect = container?.querySelector('.swipe-trail');
                    swipeEffect?.remove();
                    trailEffect?.remove();
                  }
                  
                  document.removeEventListener('touchmove', handleTouchMove);
                  document.removeEventListener('touchend', handleTouchEnd);
                };
                
                document.addEventListener('touchmove', handleTouchMove);
                document.addEventListener('touchend', handleTouchEnd);
              }}
              onMouseDown={(e) => {
                const startX = e.clientX;
                const element = e.currentTarget;
                const container = element.parentElement;
                
                const handleMouseMove = (e: MouseEvent) => {
                  const currentX = e.clientX;
                  const deltaX = currentX - startX;
                  const maxSwipe = element.offsetWidth * 0.8;
                  
                  if (deltaX > 0 && deltaX < maxSwipe) {
                    // Move the content with the swipe - content stays visible
                    element.style.transform = `translateX(${deltaX}px)`;
                    
                    // Add swipe effect - gradient transition from red to green
                    const revealWidth = Math.min(deltaX, element.offsetWidth);
                    const revealPercent = (revealWidth / element.offsetWidth) * 100;
                    
                    // Create or update swipe effect with gradient
                    let swipeEffect = container?.querySelector('.swipe-effect') as HTMLElement;
                    if (!swipeEffect) {
                      swipeEffect = document.createElement('div');
                      swipeEffect.className = 'swipe-effect absolute inset-0 rounded-2xl';
                      container?.appendChild(swipeEffect);
                    }
                    
                    // Update gradient based on swipe progress
                    const redIntensity = Math.max(0, 100 - revealPercent);
                    const greenIntensity = Math.min(100, revealPercent);
                    swipeEffect.style.background = `linear-gradient(to right, 
                      hsl(${redIntensity * 0.5}, 100%, 50%) 0%, 
                      hsl(${redIntensity * 0.5 + greenIntensity * 0.3}, 100%, 50%) 50%, 
                      hsl(${greenIntensity * 0.3}, 100%, 50%) 100%)`;
                    
                    // Add swipe trail effect
                    let trailEffect = container?.querySelector('.swipe-trail') as HTMLElement;
                    if (!trailEffect) {
                      trailEffect = document.createElement('div');
                      trailEffect.className = 'swipe-trail absolute top-0 bottom-0 w-1 bg-white/30 rounded-full';
                      trailEffect.style.left = `${deltaX}px`;
                      container?.appendChild(trailEffect);
                    } else {
                      trailEffect.style.left = `${deltaX}px`;
                    }
                  }
                };
                
                const handleMouseUp = () => {
                  const currentTransform = element.style.transform;
                  const translateX = parseInt(currentTransform.replace('translateX(', '').replace('px)', '') || '0');
                  
                  if (translateX > element.offsetWidth * 0.6) {
                    // Swipe completed - navigate to SOS
                    element.style.transform = `translateX(${element.offsetWidth}px)`;
                    setTimeout(() => navigate('/sos'), 300);
                  } else {
                    // Reset position
                    element.style.transform = 'translateX(0)';
                    
                    // Remove swipe effects
                    const swipeEffect = container?.querySelector('.swipe-effect');
                    const trailEffect = container?.querySelector('.swipe-trail');
                    swipeEffect?.remove();
                    trailEffect?.remove();
                  }
                  
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                };
                
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
              }}
            >
              {/* Emergency Logo */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Ambulance className="w-6 h-6 text-white" />
                </div>
                <div className="text-white">
                  <h3 className="font-semibold text-lg">Emergency</h3>
                  <p className="text-sm opacity-90">Swipe to call SOS</p>
                </div>
              </div>
              
              {/* SOS Text */}
              <div className="flex items-center space-x-2">
                <span className="text-white font-bold text-xl tracking-wider">SOS</span>
                <div 
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/sos');
                  }}
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Swipe Indicator */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full animate-pulse pointer-events-none">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Stats Cards Carousel */}
        <div className="mb-6 animate-fade-in-delayed">
          <h2 className="text-lg font-semibold text-foreground mb-4">Emergency Statistics</h2>
          <div className="relative overflow-hidden">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory px-4">
              {/* Card 1: Response Time */}
              <div className="flex-shrink-0 w-80 snap-center">
                <Card className="card-medmap bg-gradient-to-br from-teal-500 to-teal-600 text-white h-80 p-6">
                  <div className="h-full flex flex-col">
                    <h3 className="text-sm font-semibold mb-2">RESPONSE TIME</h3>
                    <div className="text-3xl font-bold mb-2">2.4 min</div>
                    <p className="text-sm opacity-90 mb-4">Average emergency response time across all districts</p>
                    <div className="flex-1 flex items-end">
                      <div className="w-full bg-white/20 rounded-lg p-3">
                        <div className="flex justify-between text-xs mb-2">
                          <span>Last 24h</span>
                          <span>2.1 min</span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2">
                          <div className="bg-white h-2 rounded-full" style={{width: '85%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Card 2: Active Ambulances */}
              <div className="flex-shrink-0 w-80 snap-center">
                <Card className="card-medmap bg-gradient-to-br from-orange-500 to-orange-600 text-white h-80 p-6">
                  <div className="h-full flex flex-col">
                    <h3 className="text-sm font-semibold mb-2">ACTIVE AMBULANCES</h3>
                    <div className="text-3xl font-bold mb-2">47</div>
                    <p className="text-sm opacity-90 mb-4">Currently deployed emergency vehicles</p>
                    <div className="flex-1 flex items-end">
                      <div className="w-full bg-white/20 rounded-lg p-3">
                        <div className="flex justify-between text-xs mb-2">
                          <span>Available</span>
                          <span>12</span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2">
                          <div className="bg-white h-2 rounded-full" style={{width: '25%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Card 3: Emergency Calls */}
              <div className="flex-shrink-0 w-80 snap-center">
                <Card className="card-medmap bg-gradient-to-br from-red-500 to-red-600 text-white h-80 p-6">
                  <div className="h-full flex flex-col">
                    <h3 className="text-sm font-semibold mb-2">EMERGENCY CALLS</h3>
                    <div className="text-3xl font-bold mb-2">156</div>
                    <p className="text-sm opacity-90 mb-4">Calls received in the last 24 hours</p>
                    <div className="flex-1 flex items-end">
                      <div className="w-full bg-white/20 rounded-lg p-3">
                        <div className="flex justify-between text-xs mb-2">
                          <span>Critical</span>
                          <span>23</span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2">
                          <div className="bg-white h-2 rounded-full" style={{width: '15%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Card 4: Hospital Beds */}
              <div className="flex-shrink-0 w-80 snap-center">
                <Card className="card-medmap bg-gradient-to-br from-blue-500 to-blue-600 text-white h-80 p-6">
                  <div className="h-full flex flex-col">
                    <h3 className="text-sm font-semibold mb-2">HOSPITAL BEDS</h3>
                    <div className="text-3xl font-bold mb-2">89%</div>
                    <p className="text-sm opacity-90 mb-4">ICU bed occupancy rate</p>
                    <div className="flex-1 flex items-end">
                      <div className="w-full bg-white/20 rounded-lg p-3">
                        <div className="flex justify-between text-xs mb-2">
                          <span>Available</span>
                          <span>11%</span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2">
                          <div className="bg-white h-2 rounded-full" style={{width: '89%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Card 5: Blood Supply */}
              <div className="flex-shrink-0 w-80 snap-center">
                <Card className="card-medmap bg-gradient-to-br from-purple-500 to-purple-600 text-white h-80 p-6">
                  <div className="h-full flex flex-col">
                    <h3 className="text-sm font-semibold mb-2">BLOOD SUPPLY</h3>
                    <div className="text-3xl font-bold mb-2">67%</div>
                    <p className="text-sm opacity-90 mb-4">Blood bank inventory level</p>
                    <div className="flex-1 flex items-end">
                      <div className="w-full bg-white/20 rounded-lg p-3">
                        <div className="flex justify-between text-xs mb-2">
                          <span>Critical</span>
                          <span>O-</span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2">
                          <div className="bg-white h-2 rounded-full" style={{width: '67%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Card 6: Success Rate */}
              <div className="flex-shrink-0 w-80 snap-center">
                <Card className="card-medmap bg-gradient-to-br from-green-500 to-green-600 text-white h-80 p-6">
                  <div className="h-full flex flex-col">
                    <h3 className="text-sm font-semibold mb-2">SUCCESS RATE</h3>
                    <div className="text-3xl font-bold mb-2">94.2%</div>
                    <p className="text-sm opacity-90 mb-4">Emergency response success rate</p>
                    <div className="flex-1 flex items-end">
                      <div className="w-full bg-white/20 rounded-lg p-3">
                        <div className="flex justify-between text-xs mb-2">
                          <span>This Month</span>
                          <span>+2.1%</span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2">
                          <div className="bg-white h-2 rounded-full" style={{width: '94%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Duplicate cards for infinite loop */}
              {/* Card 1: Response Time (Duplicate) */}
              <div className="flex-shrink-0 w-80 snap-center">
                <Card className="card-medmap bg-gradient-to-br from-teal-500 to-teal-600 text-white h-80 p-6">
                  <div className="h-full flex flex-col">
                    <h3 className="text-sm font-semibold mb-2">RESPONSE TIME</h3>
                    <div className="text-3xl font-bold mb-2">2.4 min</div>
                    <p className="text-sm opacity-90 mb-4">Average emergency response time across all districts</p>
                    <div className="flex-1 flex items-end">
                      <div className="w-full bg-white/20 rounded-lg p-3">
                        <div className="flex justify-between text-xs mb-2">
                          <span>Last 24h</span>
                          <span>2.1 min</span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2">
                          <div className="bg-white h-2 rounded-full" style={{width: '85%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Card 2: Active Ambulances (Duplicate) */}
              <div className="flex-shrink-0 w-80 snap-center">
                <Card className="card-medmap bg-gradient-to-br from-orange-500 to-orange-600 text-white h-80 p-6">
                  <div className="h-full flex flex-col">
                    <h3 className="text-sm font-semibold mb-2">ACTIVE AMBULANCES</h3>
                    <div className="text-3xl font-bold mb-2">47</div>
                    <p className="text-sm opacity-90 mb-4">Currently deployed emergency vehicles</p>
                    <div className="flex-1 flex items-end">
                      <div className="w-full bg-white/20 rounded-lg p-3">
                        <div className="flex justify-between text-xs mb-2">
                          <span>Available</span>
                          <span>12</span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2">
                          <div className="bg-white h-2 rounded-full" style={{width: '25%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Card 3: Emergency Calls (Duplicate) */}
              <div className="flex-shrink-0 w-80 snap-center">
                <Card className="card-medmap bg-gradient-to-br from-red-500 to-red-600 text-white h-80 p-6">
                  <div className="h-full flex flex-col">
                    <h3 className="text-sm font-semibold mb-2">EMERGENCY CALLS</h3>
                    <div className="text-3xl font-bold mb-2">156</div>
                    <p className="text-sm opacity-90 mb-4">Calls received in the last 24 hours</p>
                    <div className="flex-1 flex items-end">
                      <div className="w-full bg-white/20 rounded-lg p-3">
                        <div className="flex justify-between text-xs mb-2">
                          <span>Critical</span>
                          <span>23</span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2">
                          <div className="bg-white h-2 rounded-full" style={{width: '15%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Card 4: Hospital Beds (Duplicate) */}
              <div className="flex-shrink-0 w-80 snap-center">
                <Card className="card-medmap bg-gradient-to-br from-blue-500 to-blue-600 text-white h-64 p-6">
                  <div className="h-full flex flex-col">
                    <h3 className="text-sm font-semibold mb-2">HOSPITAL BEDS</h3>
                    <div className="text-3xl font-bold mb-2">89%</div>
                    <p className="text-sm opacity-90 mb-4">ICU bed occupancy rate</p>
                    <div className="flex-1 flex items-end">
                      <div className="w-full bg-white/20 rounded-lg p-3">
                        <div className="flex justify-between text-xs mb-2">
                          <span>Available</span>
                          <span>11%</span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2">
                          <div className="bg-white h-2 rounded-full" style={{width: '89%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Card 5: Blood Supply (Duplicate) */}
              <div className="flex-shrink-0 w-80 snap-center">
                <Card className="card-medmap bg-gradient-to-br from-purple-500 to-purple-600 text-white h-64 p-6">
                  <div className="h-full flex flex-col">
                    <h3 className="text-sm font-semibold mb-2">BLOOD SUPPLY</h3>
                    <div className="text-3xl font-bold mb-2">67%</div>
                    <p className="text-sm opacity-90 mb-4">Blood bank inventory level</p>
                    <div className="flex-1 flex items-end">
                      <div className="w-full bg-white/20 rounded-lg p-3">
                        <div className="flex justify-between text-xs mb-2">
                          <span>Critical</span>
                          <span>O-</span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2">
                          <div className="bg-white h-2 rounded-full" style={{width: '67%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Card 6: Success Rate (Duplicate) */}
              <div className="flex-shrink-0 w-80 snap-center">
                <Card className="card-medmap bg-gradient-to-br from-green-500 to-green-600 text-white h-64 p-6">
                  <div className="h-full flex flex-col">
                    <h3 className="text-sm font-semibold mb-2">SUCCESS RATE</h3>
                    <div className="text-3xl font-bold mb-2">94.2%</div>
                    <p className="text-sm opacity-90 mb-4">Emergency response success rate</p>
                    <div className="flex-1 flex items-end">
                      <div className="w-full bg-white/20 rounded-lg p-3">
                        <div className="flex justify-between text-xs mb-2">
                          <span>This Month</span>
                          <span>+2.1%</span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2">
                          <div className="bg-white h-2 rounded-full" style={{width: '94%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <QuickAccessCards />
      </div>

    </div>
    </PageTransition>
  );
};

export default HomeScreen;
const isBot = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return true;
  }

  try {
    const userAgent = navigator.userAgent.toLowerCase();
    
    const botPatterns = [
      'googlebot',
      'bingbot',
      'slurp',
      'duckduckbot',
      'baiduspider',
      'yandexbot',
      'sogou',
      'exabot',
      'facebot',
      'ia_archiver',
      'crawler',
      'spider',
      'bot',
      'headless',
      'phantom',
      'selenium',
      'webdriver',
      'preview'
    ];
    
    // Primary check - user agent
    const isUserAgentBot = botPatterns.some(pattern => 
      userAgent.includes(pattern)
    );
    
    // FIXED: More strict webdriver check
    // Only consider it a bot if webdriver is TRUE (not just present)
    const hasWebdriver = navigator.webdriver === true;
    
    // Phantom check
    const hasPhantom = 'callPhantom' in window || '_phantom' in window;
    
    return isUserAgentBot || hasWebdriver || hasPhantom;
  } catch (error) {
    console.error('Bot detection error:', error);
    return false;
  }
};

export default isBot;
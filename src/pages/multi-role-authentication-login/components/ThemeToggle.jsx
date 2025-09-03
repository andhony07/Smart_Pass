import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';


const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')?.matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement?.classList?.toggle('dark', shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement?.classList?.toggle('dark', newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      iconName={isDark ? "Sun" : "Moon"}
      className="text-muted-foreground hover:text-foreground"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    />
  );
};

export default ThemeToggle;
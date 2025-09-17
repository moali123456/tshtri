// app/_components/loading-provider/LoadingProvider.jsx
"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const LoadingContext = createContext(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const loadingStartTime = useRef(null);
  const hideTimeoutRef = useRef(null);

  const setLoading = useCallback((loading) => {
    setIsLoading(loading);
  }, []);

  const navigateWithLoader = useCallback((url) => {
    // Don't show loader if we're already on this page
    if (pathname === url) return;
    
    // Clear any existing timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    
    setIsLoading(true);
    loadingStartTime.current = Date.now();
    router.push(url);
  }, [router, pathname]);

  // Hide loading when pathname changes (navigation completed)
  useEffect(() => {
    if (isLoading && loadingStartTime.current) {
      const elapsedTime = Date.now() - loadingStartTime.current;
      const minimumLoadingTime = 3000; // 3 seconds minimum
      
      if (elapsedTime >= minimumLoadingTime) {
        // If minimum time has passed, hide immediately
        setIsLoading(false);
        loadingStartTime.current = null;
      } else {
        // Wait for remaining time
        const remainingTime = minimumLoadingTime - elapsedTime;
        hideTimeoutRef.current = setTimeout(() => {
          setIsLoading(false);
          loadingStartTime.current = null;
          hideTimeoutRef.current = null;
        }, remainingTime);
      }
    }
    
    // Cleanup timeout on unmount
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    };
  }, [pathname, isLoading]);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, navigateWithLoader }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/100 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};

import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TagManager from 'react-gtm-module';
import { useEffect } from "react";
import CookieConsent from "./components/CookieConsent";
import { PostCardSkeleton } from './components/SkeletonLoader';
import ErrorBoundary from './components/ErrorBoundary'; // Import ErrorBoundary
import Index from './pages/Index';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Categories from './pages/Categories';
import CategoryPosts from './pages/CategoryPosts';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Search from './pages/Search';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import TodayPosts from './pages/TodayPosts';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

const queryClient = new QueryClient();

const App = () => {
    useEffect(() => {
        const tagManagerArgs = {
            gtmId: import.meta.env.VITE_GTAG_ID,
        };
        TagManager.initialize(tagManagerArgs);
    }, []);

    return (
        <>
             <div className="flex items-center justify-center h-screen bg-gray-100 px-4 text-center">
      <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 leading-relaxed">
        ⚠ We're currently working on something great. <br />
        This website is under construction — please check back soon!
      </h3>
    </div>
{/*             <CookieConsent />
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    <Toaster/>
                    <Sonner/>
                    <BrowserRouter>
                        <Navigation />
                        <ErrorBoundary>
                            <Suspense fallback={<div className="flex-grow w-full"><PostCardSkeleton /></div>}>
                                <Routes>
                                    <Route path="/" element={<Index/>}/>
                                    <Route path="/blog" element={<Blog/>}/>
                                    <Route path="/categories" element={<Categories/>}/>
                                    <Route path="/category/:categorySlug" element={<CategoryPosts/>}/>
                                    <Route path="/today" element={<TodayPosts/>}/>
                                    <Route path="/about" element={<AboutPage/>}/>
                                    <Route path="/contact" element={<ContactPage/>}/>
                                    <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
                                    <Route path="/search" element={<Search/>}/>
                                    <Route path="/admin" element={<Admin/>}/>
                                    <Route path="/blog/:slug" element={<BlogPost/>}/>
                                    <Route path="*" element={<NotFound/>}/>
                                </Routes>
                            </Suspense>
                        </ErrorBoundary>
                        <Footer />
                    </BrowserRouter>
                </TooltipProvider>
            </QueryClientProvider> */}
        </>
    );
};

export default App;

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TagManager from 'react-gtm-module';
import { useEffect } from "react";
import CookieConsent from "./components/CookieConsent";
import { PostCardSkeleton } from './components/SkeletonLoader';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Footer from './components/Footer';
import Navigation from './components/Navigation';

// Lazy load page components
const Index = lazy(() => import('./pages/Index'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Categories = lazy(() => import('./pages/Categories'));
const CategoryPosts = lazy(() => import('./pages/CategoryPosts'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Search = lazy(() => import('./pages/Search'));
const Admin = lazy(() => import('./pages/Admin'));
const NotFound = lazy(() => import('./pages/NotFound'));
const TodayPosts = lazy(() => import('./pages/TodayPosts'));

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
            <CookieConsent />
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    <Toaster/>
                    <Sonner/>
                    <BrowserRouter>
                        <Navigation />
                        <Suspense fallback={<PostCardSkeleton />}>
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
                        <Footer />
                    </BrowserRouter>
                </TooltipProvider>
            </QueryClientProvider>
        </>
    );
};

export default App;

import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Categories from "./pages/Categories";
import CategoryPosts from "./pages/CategoryPosts";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Search from "./pages/Search";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import TagManager from 'react-gtm-module';
import {useEffect} from "react";
import CookieConsent from "./components/CookieConsent";
import TodayPosts from "./pages/TodayPosts";


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
                        <Routes>
                            <Route path="/" element={<Index/>}/>
                            <Route path="/blog" element={<Blog/>}/>
                            <Route path="/categories" element={<Categories/>}/>
                            <Route path="/category/:categorySlug" element={<CategoryPosts/>}/>
                            <Route path="/today" element={<TodayPosts/>}/>
                            <Route path="/about" element={<About/>}/>
                            <Route path="/contact" element={<Contact/>}/>
                            <Route path="/search" element={<Search/>}/>
                            <Route path="/admin" element={<Admin/>}/>
                            <Route path="/blog/:slug" element={<BlogPost/>}/>
                            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </BrowserRouter>
                </TooltipProvider>
            </QueryClientProvider>
        </>
    )
};

export default App;

import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";

function App() {
    useEffect(() => {
        const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
        window.__lenis = lenis;
        let raf;
        const loop = (time) => {
            lenis.raf(time);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
            window.__lenis = null;
        };
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <Toaster position="top-center" richColors />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

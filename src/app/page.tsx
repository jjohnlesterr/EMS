"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Zap,
  Camera,
  Cpu,
  Sparkles,
  ShieldCheck,
  BatteryCharging,
  Flame,
  Star,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Play,
  RotateCcw,
  Smartphone,
  Layers,
  Globe,
  Lock,
  Volume2,
  Tv,
  Gift,
  Clock,
  ThumbsUp,
  Percent,
  Check,
  ShoppingBag,
  Info,
  X
} from "lucide-react";

export default function NovaLandingPage() {
  // Countdown timer for launch flash sale
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Camera lens active tab
  const [activeLens, setActiveLens] = useState<"ultra" | "main" | "tele" | "space">("main");

  // Performance benchmark active tab
  const [activePerfTab, setActivePerfTab] = useState<"fps" | "cooling" | "charging">("fps");

  // Customizer State
  const [selectedModel, setSelectedModel] = useState<"pro-x" | "pro">("pro-x");
  const [selectedColor, setSelectedColor] = useState<"violet" | "titanium" | "cyan" | "onyx">("violet");
  const [selectedStorage, setSelectedStorage] = useState<"256GB" | "512GB" | "1TB">("512GB");
  const [includeBudsBundle, setIncludeBudsBundle] = useState<boolean>(true);
  const [includeCarePlan, setIncludeCarePlan] = useState<boolean>(false);

  // Trade-In Calculator State
  const [tradeInBrand, setTradeInBrand] = useState<string>("apple");
  const [tradeInModel, setTradeInModel] = useState<string>("iphone15pro");
  const [tradeInCondition, setTradeInCondition] = useState<"flawless" | "good" | "fair">("flawless");
  const [isTradeInApplied, setIsTradeInApplied] = useState<boolean>(true);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");

  // Trade-in valuation calculation
  const getTradeInValue = () => {
    let base = 0;
    if (tradeInBrand === "apple") {
      if (tradeInModel === "iphone15pro") base = 650;
      else if (tradeInModel === "iphone14pro") base = 480;
      else base = 350;
    } else if (tradeInBrand === "samsung") {
      if (tradeInModel === "s24ultra") base = 680;
      else if (tradeInModel === "s23ultra") base = 450;
      else base = 320;
    } else {
      base = 280;
    }

    if (tradeInCondition === "good") base *= 0.85;
    if (tradeInCondition === "fair") base *= 0.65;
    return Math.round(base);
  };

  const tradeInCredit = isTradeInApplied ? getTradeInValue() : 0;

  // Base pricing
  const basePrice = selectedModel === "pro-x" ? 1199 : 899;
  const storageAddon = selectedStorage === "256GB" ? 0 : selectedStorage === "512GB" ? 120 : 250;
  const careAddon = includeCarePlan ? 99 : 0;
  const finalPrice = Math.max(0, basePrice + storageAddon + careAddon - tradeInCredit);

  const colors = {
    violet: { name: "Cosmic Violet", hex: "#9333ea", bg: "bg-purple-600", desc: "Iridescent aerospace ceramic with violet prism reflections" },
    titanium: { name: "Cyber Titanium", hex: "#64748b", bg: "bg-slate-400", desc: "Precision brushed Grade 5 alloy with anti-smudge nano coating" },
    cyan: { name: "Aurora Cyan", hex: "#06b6d4", bg: "bg-cyan-500", desc: "Deep oceanic gradient with shimmering laser holographic layer" },
    onyx: { name: "Phantom Onyx", hex: "#1e293b", bg: "bg-neutral-900", desc: "Stealth satin matte obsidian with diamond-cut chamfered edges" }
  };

  const lensData = {
    ultra: {
      title: "50MP Ultra-Wide Macro",
      specs: "122° Field of View · f/2.2 Aperture · 2.5cm Super Macro",
      desc: "Capture epic landscapes or extreme close-up textures with zero edge distortion and automated edge-straightening AI.",
      iso: "ISO 50 · 1/2000s · 14mm"
    },
    main: {
      title: "200MP Quantum Main Array",
      specs: "1/1.14″ Custom Sensor · f/1.69 · 16-in-1 Super Pixel Binning · 5-Axis OIS",
      desc: "Our largest sensor ever. Delivers stunning dynamic range in pitch-black night skies with zero motion blur and crystal clarity.",
      iso: "ISO 100 · 1/500s · 24mm"
    },
    tele: {
      title: "5X Periscope Optical Zoom",
      specs: "120mm Equivalent · 50MP Sensor · Sensor-Shift 3D Stabilization",
      desc: "True optical clarity from across the stadium. Dual-prism stabilization keeps your 4K 60FPS video rock-steady.",
      iso: "ISO 200 · 1/800s · 120mm"
    },
    space: {
      title: "100X Space AI SuperZoom",
      specs: "Generative Neural Upscaling · AI Detail Reconstruction",
      desc: "See crater details on the moon. Neural AI reconstructs textures at molecular fidelity while eliminating atmospheric jitter.",
      iso: "AI Multi-Frame · 2400mm"
    }
  };

  return (
    <main className="min-h-screen bg-[#05070d] text-slate-100 tech-grid-bg">
      
      {/* 1. TOP FLASH SALE ANNOUNCEMENT BANNER */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-500 text-white text-xs font-semibold py-2 px-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] uppercase tracking-wider flex items-center gap-1">
              <Gift className="w-3 h-3 text-yellow-300 animate-bounce" />
              Launch Special
            </span>
            <span className="hidden sm:inline font-medium">
              Pre-order NOVA Pro X today & get FREE Nova Buds Pro ($249 Value) + up to $800 Instant Trade-In Credit!
            </span>
            <span className="sm:hidden font-medium">Free Buds Pro ($249) + $800 Trade-In!</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 font-mono bg-black/40 px-2 py-0.5 rounded text-[11px]">
              <Clock className="w-3 h-3 text-cyan-300" />
              <span>Ends in: {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}</span>
            </div>
            <a href="#customizer" className="bg-white text-slate-900 px-2.5 py-0.5 rounded text-[11px] font-bold hover:bg-yellow-300 transition-colors">
              Claim Offer
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER NAVIGATION */}
      <header className="sticky top-8 z-40 w-full border-b border-white/10 bg-[#05070d]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <div className="w-full h-full bg-[#070a12] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="font-display font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                NOVA <span className="text-gradient-cyan-purple">PRO X</span>
              </div>
              <div className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">Quantum 5G</div>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#camera" className="hover:text-cyan-400 transition-colors">200MP Camera</a>
            <a href="#performance" className="hover:text-cyan-400 transition-colors">Performance & Gaming</a>
            <a href="#ai" className="hover:text-cyan-400 transition-colors">Quantum AI</a>
            <a href="#tradein" className="hover:text-cyan-400 transition-colors">Trade-In</a>
            <a href="#reviews" className="hover:text-cyan-400 transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ</a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="#tradein"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-all"
            >
              <Percent className="w-3.5 h-3.5 text-cyan-400" />
              <span>Trade-In Calculator</span>
            </a>

            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 flex items-center gap-2 hover:scale-[1.02]"
            >
              <span>Order Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative pt-12 pb-24 lg:pt-16 lg:pb-32 px-6 max-w-7xl mx-auto">
        
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/20 via-purple-600/20 to-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto space-y-6 relative z-10">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>THE 2026 QUANTUM AI FLAGSHIP IS HERE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-white leading-[1.05]">
            Beyond Flagship. <br className="hidden sm:inline" />
            <span className="text-gradient-cyan-purple">Pure Quantum Power.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Unleash the world’s first 200MP Quad-Matrix camera, Snapdragon 8 Gen 4 Extreme with 45 TOPS NPU, and a breathtaking 165Hz Curved AMOLED display.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#customizer"
              className="px-8 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-xl shadow-cyan-500/20 transition-all flex items-center gap-3 hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Pre-Order From $999</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            <a
              href="#camera"
              className="px-6 py-4 rounded-xl font-semibold text-sm bg-slate-900/80 hover:bg-slate-800 border border-white/15 text-slate-200 backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              <span>Watch 4K Cinematic Reveal</span>
            </a>
          </div>

          {/* Rating Proof Banner */}
          <div className="pt-2 flex items-center justify-center gap-4 text-xs text-slate-400">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400" />
              ))}
            </div>
            <span className="font-semibold text-slate-200">4.9 / 5.0 Rating</span>
            <span className="text-slate-600">•</span>
            <span>Over 18,500 Global Pre-Orders</span>
          </div>

        </div>

        {/* Hero Visual Billboard with Floating Feature Badges */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          
          <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl glass-card neon-glow-cyan group">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/images/nova_hero.jpg"
                alt="NOVA PRO X Flagship smartphone commercial showcase"
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />
            </div>

            {/* Glowing Accent Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-transparent to-transparent opacity-80" />

            {/* Floating Glass Highlight Cards */}
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              
              <div className="p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 hover:border-cyan-400/50 transition-all">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase mb-1">
                  <Camera className="w-4 h-4" />
                  <span>200MP Quad</span>
                </div>
                <div className="text-xs text-slate-300">100X Space AI SuperZoom</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 hover:border-purple-400/50 transition-all">
                <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase mb-1">
                  <Cpu className="w-4 h-4" />
                  <span>Snapdragon 8 Gen 4</span>
                </div>
                <div className="text-xs text-slate-300">4.32GHz Octa-Core NPU</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 hover:border-indigo-400/50 transition-all">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase mb-1">
                  <Tv className="w-4 h-4" />
                  <span>165Hz AMOLED</span>
                </div>
                <div className="text-xs text-slate-300">3,200 Nits Peak HDR</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 hover:border-yellow-400/50 transition-all">
                <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase mb-1">
                  <BatteryCharging className="w-4 h-4" />
                  <span>120W HyperCharge</span>
                </div>
                <div className="text-xs text-slate-300">0 to 100% in 18 Mins</div>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* 4. CAMERA REVOLUTION (INTERACTIVE LENS SWITCHER) */}
      <section id="camera" className="py-24 border-t border-white/10 bg-[#080c16] relative">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold">
              <Camera className="w-3.5 h-3.5 text-purple-400" />
              <span>PRO-GRADE OPTICS REIMAGINED</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight">
              200MP Quad-Matrix. <br />
              <span className="text-gradient-cyan-purple">Cinematic in every frame.</span>
            </h2>
            <p className="text-base text-slate-300">
              Co-engineered with master optical technicians. Four specialized focal lengths powered by our quantum neural image signal processor.
            </p>
          </div>

          {/* Interactive Lens Switcher Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveLens("ultra")}
              className={`px-5 py-3 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
                activeLens === "ultra"
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 scale-105"
                  : "bg-slate-900 border border-white/10 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <span>0.5x Ultra-Wide (50MP)</span>
            </button>

            <button
              onClick={() => setActiveLens("main")}
              className={`px-5 py-3 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
                activeLens === "main"
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 scale-105"
                  : "bg-slate-900 border border-white/10 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <span>1.0x Quantum Main (200MP)</span>
            </button>

            <button
              onClick={() => setActiveLens("tele")}
              className={`px-5 py-3 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
                activeLens === "tele"
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 scale-105"
                  : "bg-slate-900 border border-white/10 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <span>5.0x Periscope (50MP)</span>
            </button>

            <button
              onClick={() => setActiveLens("space")}
              className={`px-5 py-3 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
                activeLens === "space"
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 scale-105"
                  : "bg-slate-900 border border-white/10 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>100x Space AI Zoom</span>
            </button>
          </div>

          {/* Camera Stage Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Optical Cutaway Image */}
            <div className="lg:col-span-7 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 shadow-2xl glass-card group">
                <Image
                  src="/images/nova_camera.jpg"
                  alt="NOVA Pro X 200MP Quad Camera Array with Optical Lens Breakdown"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />

                {/* Real-time Lens Spec Tag */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-400/40 text-cyan-300 font-mono text-xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Active Sensor: {lensData[activeLens].title}</span>
                </div>

                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-slate-300 font-mono text-xs">
                  {lensData[activeLens].iso}
                </div>
              </div>
            </div>

            {/* Right Lens Deep-Dive Details */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-white/10 shadow-xl space-y-4">
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Lens Architecture
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {lensData[activeLens].title}
                </h3>
                <div className="text-sm font-semibold text-purple-300 bg-purple-950/40 p-3 rounded-lg border border-purple-500/20">
                  {lensData[activeLens].specs}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {lensData[activeLens].desc}
                </p>
              </div>

              {/* 3 Quick Optics Feature Bullets */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300">
                    <strong className="text-white">8K 60FPS Dolby Vision HDR</strong> — Master recording with 12-bit color depth and real-time audio zoom directionality.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300">
                    <strong className="text-white">Quantum Night Vision 3.0</strong> — Zero noise reduction artifacts even in 0.01 lux moonlight conditions.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300">
                    <strong className="text-white">ProRAW 16-bit Export</strong> — Seamless integration with Adobe Lightroom and DaVinci Resolve.
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. PERFORMANCE & GAMING ENGINE */}
      <section id="performance" className="py-24 border-t border-white/10 bg-[#05070d] relative">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>UNLEASH RAW BENCHMARK DOMINANCE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight">
              Snapdragon 8 Gen 4 Extreme. <br />
              <span className="text-gradient-cyan-purple">Zero Throttling. All Power.</span>
            </h2>
            <p className="text-base text-slate-300">
              Built on 3nm architecture with 4.32GHz Oryon CPU cores, Adreno 830 GPU with hardware Ray Tracing, and dual-pump Cryo-Vapor cooling.
            </p>
          </div>

          {/* Performance Benchmark Matrix Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 hover:border-cyan-400/50 transition-all shadow-xl space-y-4 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Flame className="w-6 h-6" />
              </div>
              <div className="text-3xl font-display font-black text-white">
                120 FPS <span className="text-xs text-cyan-400 font-mono">ROCK SOLID</span>
              </div>
              <div className="text-base font-bold text-slate-200">Hardware Ray Tracing Engine</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Play AAA open-world titles at native 2K resolution with dynamic global illumination, soft shadows, and zero frame drops during intense 4-hour sessions.
              </p>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full w-[94%]" />
              </div>
              <div className="text-[11px] font-mono text-slate-400 flex justify-between">
                <span>Performance Score: 2,480,000+</span>
                <span className="text-cyan-400">Top 1% Global</span>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 hover:border-indigo-400/50 transition-all shadow-xl space-y-4 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Zap className="w-6 h-6" />
              </div>
              <div className="text-3xl font-display font-black text-white">
                -12°C <span className="text-xs text-indigo-400 font-mono">COOLER CORE</span>
              </div>
              <div className="text-base font-bold text-slate-200">3,800mm² Cryo-Vapor Chamber</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dual capillary vapor loop dissipates heat across the aerospace titanium frame 400% faster than traditional graphite thermal pads.
              </p>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 h-full w-[88%]" />
              </div>
              <div className="text-[11px] font-mono text-slate-400 flex justify-between">
                <span>Thermal Dissipation</span>
                <span className="text-indigo-400">14.8 W/m·K</span>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 hover:border-purple-400/50 transition-all shadow-xl space-y-4 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <BatteryCharging className="w-6 h-6" />
              </div>
              <div className="text-3xl font-display font-black text-white">
                18 Mins <span className="text-xs text-purple-400 font-mono">TO 100%</span>
              </div>
              <div className="text-base font-bold text-slate-200">120W Dual-Cell GaN HyperCharge</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                6,000 mAh silicon-carbon high-density battery powers through 2 full days of heavy usage. 50W wireless flash charging compatible.
              </p>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-full w-[100%]" />
              </div>
              <div className="text-[11px] font-mono text-slate-400 flex justify-between">
                <span>1,600 Charge Cycles</span>
                <span className="text-purple-400">80% Health @ 4 Yrs</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. QUANTUM ON-DEVICE AI SUITE */}
      <section id="ai" className="py-24 border-t border-white/10 bg-[#080c16] relative">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>NOVA AI 4.0 INTELLIGENCE</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                AI that runs locally on your device.
              </h2>

              <p className="text-base text-slate-300 leading-relaxed">
                Powered by a 45 TOPS neural processing unit, NOVA AI operates completely offline. Your conversations, photos, and personal data never leave your phone.
              </p>

              <div className="space-y-4 pt-2">
                
                <div className="p-4 rounded-xl bg-slate-900 border border-white/10 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Live Call Two-Way Translator</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Speak freely with anyone worldwide. Real-time synthesized voice translation across 48 languages in phone calls with zero cloud lag.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-white/10 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Generative Magic Photo Studio</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Erase unwanted background strangers, re-light portraits with studio rim lighting, and generate expanded borders with a single tap.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-white/10 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">100% Local Zero-Cloud Privacy</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Quantum Secure Enclave hardware protects biometrics and encryption keys against quantum brute-force attacks.
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Right: Interactive AI Assistant Simulator Card */}
            <div className="lg:col-span-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-white/15 shadow-2xl glass-card relative space-y-6">
                
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="font-mono text-xs text-cyan-300 uppercase tracking-wider">Nova Neural Core Active</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">45.2 TOPS · 0ms Cloud Latency</span>
                </div>

                {/* Simulated Chat Bubble */}
                <div className="space-y-4 font-sans text-sm">
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      You
                    </div>
                    <div className="p-3.5 rounded-2xl rounded-tl-none bg-slate-800 text-slate-200 border border-white/10 max-w-sm text-xs">
                      “Summarize today’s 45-minute board meeting recording and extract all 5 assigned action items with deadlines.”
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
                      AI
                    </div>
                    <div className="p-4 rounded-2xl rounded-tl-none bg-cyan-950/40 border border-cyan-500/30 text-slate-200 space-y-2 text-xs">
                      <div className="text-cyan-300 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        Meeting Summary Ready (Processed in 0.42s)
                      </div>
                      <p className="text-slate-300">
                        1. Q3 Budget approved ($4.2M)<br />
                        2. Supply chain supplier audit by Oct 14<br />
                        3. European carrier certification launch Nov 02
                      </p>
                    </div>
                  </div>

                </div>

                {/* AI Mic & Action Bar */}
                <div className="p-3 bg-slate-900 rounded-xl border border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                    <span>Multimodal Listening</span>
                  </div>
                  <span className="text-cyan-400 font-bold">Ask anything in 48 languages</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. INTERACTIVE CUSTOMIZER & SPEC CONFIGURATOR */}
      <section id="customizer" className="py-24 border-t border-white/10 bg-[#05070d] relative">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CUSTOMIZE YOUR FLAGSHIP</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Choose your power.
            </h2>
            <p className="text-base text-slate-300">
              Select your edition, finish, and storage. Instant worldwide insured express shipping included.
            </p>
          </div>

          {/* Configurator Panel */}
          <div className="bg-slate-950 border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-10 glass-card">
            
            {/* Step 1: Select Model Edition */}
            <div className="space-y-4">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                01. Select Flagship Edition
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <button
                  onClick={() => setSelectedModel("pro-x")}
                  className={`p-5 rounded-2xl text-left border transition-all ${
                    selectedModel === "pro-x"
                      ? "border-cyan-400 bg-cyan-950/30 ring-2 ring-cyan-400/40"
                      : "border-white/10 bg-slate-900/60 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-display font-bold text-white">NOVA Pro X</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">RECOMMENDED</span>
                  </div>
                  <div className="text-xs text-slate-300 mt-2 space-y-0.5">
                    <div>6.8″ 165Hz Curved AMOLED · 200MP Quad Array</div>
                    <div className="text-slate-400">6,000 mAh Battery · 120W HyperCharge</div>
                  </div>
                  <div className="text-base font-bold text-cyan-400 mt-4">$1,199 USD</div>
                </button>

                <button
                  onClick={() => setSelectedModel("pro")}
                  className={`p-5 rounded-2xl text-left border transition-all ${
                    selectedModel === "pro"
                      ? "border-cyan-400 bg-cyan-950/30 ring-2 ring-cyan-400/40"
                      : "border-white/10 bg-slate-900/60 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-display font-bold text-white">NOVA Pro</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">COMPACT</span>
                  </div>
                  <div className="text-xs text-slate-300 mt-2 space-y-0.5">
                    <div>6.4″ 144Hz Flat AMOLED · 108MP Triple Array</div>
                    <div className="text-slate-400">5,200 mAh Battery · 80W Fast Charge</div>
                  </div>
                  <div className="text-base font-bold text-cyan-400 mt-4">$899 USD</div>
                </button>

              </div>
            </div>

            {/* Step 2: Select Colorway */}
            <div className="space-y-4">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                02. Choose Finish — <span className="text-white">{colors[selectedColor].name}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                
                {Object.entries(colors).map(([key, col]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedColor(key as keyof typeof colors)}
                    className={`p-4 rounded-xl text-left border transition-all ${
                      selectedColor === key
                        ? "border-cyan-400 bg-white/5 ring-1 ring-cyan-400"
                        : "border-white/10 bg-slate-900/40 hover:border-white/20"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full ${col.bg} mb-2 border border-white/20 shadow-md`} />
                    <div className="font-bold text-sm text-white">{col.name}</div>
                  </button>
                ))}

              </div>
            </div>

            {/* Step 3: Select Storage Capacity */}
            <div className="space-y-4">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                03. Solid-State Storage Capacity
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                <button
                  onClick={() => setSelectedStorage("256GB")}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    selectedStorage === "256GB"
                      ? "border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-400"
                      : "border-white/10 bg-slate-900/40 hover:border-white/20"
                  }`}
                >
                  <div className="font-bold text-sm text-white">256 GB UFS 4.1</div>
                  <div className="text-xs text-slate-400 mt-1">Included in base price</div>
                </button>

                <button
                  onClick={() => setSelectedStorage("512GB")}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    selectedStorage === "512GB"
                      ? "border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-400"
                      : "border-white/10 bg-slate-900/40 hover:border-white/20"
                  }`}
                >
                  <div className="font-bold text-sm text-white">512 GB UFS 4.1</div>
                  <div className="text-xs text-cyan-400 mt-1">+$120 · MOST POPULAR</div>
                </button>

                <button
                  onClick={() => setSelectedStorage("1TB")}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    selectedStorage === "1TB"
                      ? "border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-400"
                      : "border-white/10 bg-slate-900/40 hover:border-white/20"
                  }`}
                >
                  <div className="font-bold text-sm text-white">1 TB Extreme NVMe</div>
                  <div className="text-xs text-slate-400 mt-1">+$250 · Content Creators</div>
                </button>

              </div>
            </div>

            {/* Launch Bundles & Care */}
            <div className="space-y-3 pt-2">
              <label className="flex items-center justify-between p-4 bg-purple-950/20 border border-purple-500/30 rounded-xl cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeBudsBundle}
                    onChange={(e) => setIncludeBudsBundle(e.target.checked)}
                    className="w-4 h-4 rounded text-purple-600 focus:ring-0 bg-slate-900 border-white/20"
                  />
                  <div>
                    <div className="font-bold text-sm text-white flex items-center gap-2">
                      <span>Include Free Nova Buds Pro Wireless Earbuds</span>
                      <span className="text-[10px] bg-yellow-400 text-black px-1.5 py-0.5 rounded font-black">$249 FREE</span>
                    </div>
                    <div className="text-xs text-slate-400">Active Noise Cancelling 52dB with Spatial Audio</div>
                  </div>
                </div>
                <div className="text-xs font-mono text-green-400 font-bold">$0.00</div>
              </label>

              <label className="flex items-center justify-between p-4 bg-slate-900/40 border border-white/10 rounded-xl cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeCarePlan}
                    onChange={(e) => setIncludeCarePlan(e.target.checked)}
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-0 bg-slate-900 border-white/20"
                  />
                  <div>
                    <div className="font-bold text-sm text-white">NovaCare+ 2-Year Full Accidental Damage Protection</div>
                    <div className="text-xs text-slate-400">Unlimited screen repairs, battery replacements, and VIP express courier</div>
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-300 font-bold">+$99</div>
              </label>
            </div>

            {/* Live Pricing Summary & Pre-Order Button */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-xs text-slate-400 uppercase font-mono">Total Estimated Price</div>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-4xl font-display font-extrabold text-white tracking-tight">
                    ${finalPrice.toLocaleString()} USD
                  </span>
                  {isTradeInApplied && tradeInCredit > 0 && (
                    <span className="text-sm font-mono text-green-400 font-bold">
                      (Includes -${tradeInCredit} Trade-in Credit)
                    </span>
                  )}
                </div>
                <div className="text-xs text-cyan-400 mt-1 font-mono">
                  ✓ Free Insured Worldwide Express · 30-Day Money-Back Guarantee
                </div>
              </div>

              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full sm:w-auto px-10 py-4.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-3 hover:scale-105"
              >
                <span>Proceed to Fast Checkout</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 8. INSTANT TRADE-IN CALCULATOR */}
      <section id="tradein" className="py-24 border-t border-white/10 bg-[#080c16] relative">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-300 text-xs font-bold">
              <Percent className="w-3.5 h-3.5 text-green-400" />
              <span>UP TO $800 INSTANT VALUE</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Trade in your old phone.
            </h2>
            <p className="text-base text-slate-300">
              Get an instant appraisal. We send you a prepaid return box, and the discount is deducted immediately from today’s pre-order.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-950 border border-white/15 shadow-2xl glass-card space-y-8">
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase">1. Brand</label>
                <select
                  value={tradeInBrand}
                  onChange={(e) => setTradeInBrand(e.target.value)}
                  className="w-full mt-2 p-3.5 rounded-xl bg-slate-900 border border-white/15 text-white font-sans text-sm focus:outline-none focus:border-cyan-400"
                >
                  <option value="apple">Apple iPhone</option>
                  <option value="samsung">Samsung Galaxy</option>
                  <option value="google">Google Pixel</option>
                  <option value="other">Other Brand</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 uppercase">2. Model</label>
                <select
                  value={tradeInModel}
                  onChange={(e) => setTradeInModel(e.target.value)}
                  className="w-full mt-2 p-3.5 rounded-xl bg-slate-900 border border-white/15 text-white font-sans text-sm focus:outline-none focus:border-cyan-400"
                >
                  {tradeInBrand === "apple" ? (
                    <>
                      <option value="iphone15pro">iPhone 15 Pro / Max</option>
                      <option value="iphone14pro">iPhone 14 Pro / Max</option>
                      <option value="iphone13">iPhone 13 / 12 Series</option>
                    </>
                  ) : tradeInBrand === "samsung" ? (
                    <>
                      <option value="s24ultra">Galaxy S24 Ultra / Plus</option>
                      <option value="s23ultra">Galaxy S23 Ultra</option>
                      <option value="s22">Galaxy S22 Series</option>
                    </>
                  ) : (
                    <>
                      <option value="pixel8">Pixel 8 Pro / Pixel 7</option>
                      <option value="other">Other Flagship Model</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 uppercase">3. Condition</label>
                <select
                  value={tradeInCondition}
                  onChange={(e) => setTradeInCondition(e.target.value as any)}
                  className="w-full mt-2 p-3.5 rounded-xl bg-slate-900 border border-white/15 text-white font-sans text-sm focus:outline-none focus:border-cyan-400"
                >
                  <option value="flawless">Flawless (No Scratches)</option>
                  <option value="good">Good (Minor Wear)</option>
                  <option value="fair">Fair (Cracked / Heavy Wear)</option>
                </select>
              </div>

            </div>

            {/* Calculated Credit Highlight Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-green-950/40 via-cyan-950/30 to-purple-950/40 border border-green-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-green-400 font-bold uppercase">Estimated Trade-In Credit</div>
                <div className="text-3xl font-display font-extrabold text-white mt-1">
                  ${getTradeInValue()} USD Credit
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Applied immediately towards your NOVA Pro X order today.
                </div>
              </div>

              <button
                onClick={() => setIsTradeInApplied(true)}
                className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-400 text-slate-950 font-bold text-xs font-mono transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Apply To My Cart</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 9. GLOBAL TECH REVIEWS & TESTIMONIALS */}
      <section id="reviews" className="py-24 border-t border-white/10 bg-[#05070d] relative">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span>CRITICAL ACCLAIM</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              What the world is saying.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-slate-200 leading-relaxed italic">
                “The 200MP Quad camera is unmatched. The 100x Space Zoom actually yields usable details that beat every other 2026 flagship.”
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">Marcus Vance</div>
                  <div className="text-xs text-slate-400">Senior Editor, TechRadar Pro</div>
                </div>
                <span className="text-xs font-mono text-cyan-400">Score: 9.8/10</span>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-slate-200 leading-relaxed italic">
                “120W charging has completely transformed how I use my phone. 18 minutes in the morning and I have 2 days of battery life.”
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">Elena Rostova</div>
                  <div className="text-xs text-slate-400">Lead Tech Reviewer, VergeWire</div>
                </div>
                <span className="text-xs font-mono text-cyan-400">Score: 10/10</span>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-slate-200 leading-relaxed italic">
                “On-device local AI translation is instantaneous. I conducted whole negotiations in Tokyo without ever touching cloud services.”
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">David Chen</div>
                  <div className="text-xs text-slate-400">Verified Global Buyer</div>
                </div>
                <span className="text-xs font-mono text-green-400">Verified Purchase</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 10. FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="py-24 border-t border-white/10 bg-[#080c16] relative">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-300">
              Everything you need to know about compatibility, warranty, and pre-order shipping.
            </p>
          </div>

          <div className="space-y-4">
            
            {[
              {
                q: "Will NOVA Pro X work with my wireless carrier?",
                a: "Yes! NOVA Pro X is unlocked globally and supports all major 5G sub-6GHz and mmWave bands for Verizon, AT&T, T-Mobile, Vodafone, EE, Docomo, and over 140 international carriers."
              },
              {
                q: "What is included inside the box?",
                a: "Your package includes the NOVA Pro X handset, a 120W GaN SuperCharger brick, braided 6A USB-C to USB-C cable, a custom anti-shock silicone case, and the free promotional Nova Buds Pro."
              },
              {
                q: "What is the return and warranty policy?",
                a: "Every unit comes with a 30-day no-questions-asked money-back guarantee and a comprehensive 2-year manufacturer warranty covering parts, labor, and battery health."
              },
              {
                q: "When will pre-orders begin dispatching?",
                a: "Batch 01 pre-orders will ship directly via insured FedEx/DHL Express starting in Q4 2026. You will receive tracking numbers immediately upon dispatch."
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-slate-900/80 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left font-bold text-white flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                >
                  <span className="text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 transition-transform duration-300 shrink-0 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* 11. FAST CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl">
          <div className="relative w-full max-w-lg bg-slate-950 border border-white/20 rounded-3xl p-8 shadow-2xl space-y-6">
            
            {!orderComplete ? (
              <>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <span className="font-display font-extrabold text-xl text-white">Review Pre-Order</span>
                  </div>
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Cart Summary */}
                <div className="space-y-3 p-4 rounded-2xl bg-slate-900/80 border border-white/10 text-xs font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span>Selected Model:</span>
                    <strong className="text-white">{selectedModel === "pro-x" ? "NOVA Pro X" : "NOVA Pro"} ({colors[selectedColor].name})</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Storage:</span>
                    <strong className="text-white">{selectedStorage}</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Bundled Earbuds:</span>
                    <strong className="text-green-400">FREE Nova Buds Pro ($249 Value)</strong>
                  </div>
                  {includeCarePlan && (
                    <div className="flex justify-between text-slate-300">
                      <span>Care Protection:</span>
                      <strong className="text-white">NovaCare+ 2-Yr (+$99)</strong>
                    </div>
                  )}
                  {isTradeInApplied && tradeInCredit > 0 && (
                    <div className="flex justify-between text-green-400 border-t border-white/10 pt-2 font-bold">
                      <span>Trade-in Credit:</span>
                      <span>-${tradeInCredit} USD</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-display font-extrabold text-white border-t border-white/10 pt-2">
                    <span>Total Due Today:</span>
                    <span className="text-cyan-400">${finalPrice.toLocaleString()} USD</span>
                  </div>
                </div>

                {/* Shipping info */}
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-mono text-slate-400">Full Name</label>
                    <input
                      type="text"
                      placeholder="Alex Morgan"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400">Email for Tracking & Confirmation</label>
                    <input
                      type="email"
                      placeholder="alex.morgan@email.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <button
                  disabled={!customerName || !customerEmail}
                  onClick={() => setOrderComplete(true)}
                  className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    customerName && customerEmail
                      ? "bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white shadow-lg shadow-cyan-500/25 hover:opacity-95 cursor-pointer"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  <span>Confirm Pre-Order Allocation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="py-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500 text-green-400 flex items-center justify-center mx-auto animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-display font-extrabold text-white">
                  Order Confirmed! 🎉
                </h3>
                <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Congratulations <span className="text-white font-bold">{customerName}</span>! Your allocation for <span className="text-cyan-400 font-bold">NOVA Pro X</span> is secured under reference <span className="font-mono text-purple-400 font-bold">#NOVA-2026-X88</span>.
                </p>
                <div className="text-xs font-mono text-slate-400">
                  Confirmation receipt and trade-in return kit sent to <strong>{customerEmail}</strong>.
                </div>
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setOrderComplete(false);
                  }}
                  className="px-8 py-3 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-yellow-300 transition-colors"
                >
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* 12. FOOTER */}
      <footer className="border-t border-white/10 bg-[#030408] py-16 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5 space-y-4">
              <div className="font-display font-extrabold text-white text-lg tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>NOVA PRO X</span>
              </div>
              <p className="max-w-sm text-slate-400 leading-relaxed">
                The next-generation quantum smartphone. Redefining mobile computational photography, on-device AI intelligence, and gaming performance.
              </p>
            </div>

            <div className="md:col-span-2 space-y-2">
              <div className="text-white font-bold text-xs uppercase mb-3">Products</div>
              <div><a href="#customizer" className="hover:text-cyan-400">NOVA Pro X (6.8″)</a></div>
              <div><a href="#customizer" className="hover:text-cyan-400">NOVA Pro (6.4″)</a></div>
              <div><a href="#customizer" className="hover:text-cyan-400">Nova Buds Pro</a></div>
              <div><a href="#customizer" className="hover:text-cyan-400">120W GaN Charger</a></div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <div className="text-white font-bold text-xs uppercase mb-3">Technology</div>
              <div><a href="#camera" className="hover:text-cyan-400">200MP Quad Optics</a></div>
              <div><a href="#performance" className="hover:text-cyan-400">Snapdragon 8 Gen 4</a></div>
              <div><a href="#ai" className="hover:text-cyan-400">Quantum AI 4.0</a></div>
              <div><a href="#performance" className="hover:text-cyan-400">Cryo-Vapor Cooling</a></div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <div className="text-white font-bold text-xs uppercase mb-3">Support & Guarantees</div>
              <div>30-Day Money-Back Policy</div>
              <div>2-Year Comprehensive Warranty</div>
              <div>Global 5G Carrier Support</div>
              <div>7 Years OS & Security Updates</div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <div>© 2026 NOVA TECHNOLOGIES GLOBAL CORP. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-300">Privacy Policy</a>
              <a href="#" className="hover:text-slate-300">Terms of Sale</a>
              <a href="#" className="hover:text-slate-300">Security & Regulatory</a>
            </div>
          </div>

        </div>
      </footer>

    </main>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Cpu, 
  BrainCircuit, 
  TrendingUp, 
  Briefcase, 
  Network, 
  Atom, 
  Compass, 
  History, 
  Palette, 
  Heart, 
  Zap, 
  BookOpen, 
  Award, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  X, 
  Bookmark, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Trash2, 
  HelpCircle, 
  Send, 
  Volume2, 
  RefreshCw, 
  Flame,
  Search,
  BookMarked,
  Layers,
  HelpCircle as QuestionIcon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  SECTORS_DATA, 
  VOCABULARY_LIST, 
  CROSS_SECTOR_CHALLENGES, 
  Sector, 
  Topic, 
  Vocabulary, 
  CrossSectorChallenge,
  QuizQuestion 
} from "../lib/sectorsData";

// Helper to map icon names to Lucide Icon components
const iconMap: Record<string, any> = {
  Cpu,
  BrainCircuit,
  TrendingUp,
  Briefcase,
  Network,
  Atom,
  Compass,
  History,
  Palette,
  Heart
};

export default function NexusApp() {
  // --- Persistent States (persisted via localStorage) ---
  const [xp, setXp] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [streak, setStreak] = useState<number>(0);
  const [lastStreakClaimed, setLastStreakClaimed] = useState<string>("");
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [savedVocab, setSavedVocab] = useState<string[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [lastReadTopicId, setLastReadTopicId] = useState<string>("apa_itu_api");

  // --- UI Interactive States ---
  const [activeTab, setActiveTab] = useState<"map" | "dashboard" | "ai_chat" | "tree">("map");
  const [selectedSectorId, setSelectedSectorId] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [learnMode, setLearnMode] = useState<"Santai" | "Menengah" | "Serius">("Santai");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Quiz tracking
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizResults, setQuizResults] = useState<{ correctCount: number; passed: boolean } | null>(null);

  // Cross-sector challenge states
  const [activeChallenge, setActiveChallenge] = useState<CrossSectorChallenge | null>(null);
  const [challengeAnswer, setChallengeAnswer] = useState<number | null>(null);
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);

  // Vocabulary Popover state
  const [hoveredVocab, setHoveredVocab] = useState<Vocabulary | null>(null);
  const [vocabPopoverPos, setVocabPopoverPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showVocabDeck, setShowVocabDeck] = useState<boolean>(false);

  // AI Chat states
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: "Halo! Saya adalah **NEXUS AI**. Saya di sini untuk membantu kamu melihat bagaimana seluruh ilmu pengetahuan saling berhubungan. Tanyakan apa saja tentang keterkaitan Teknologi, AI, Sains, Filsafat, atau Ekonomi!"
    }
  ]);
  const [chatInput, setChatInput] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [isThinkingEnabled, setIsThinkingEnabled] = useState<boolean>(false);

  // Dynamic Connection Bridge Explanation
  const [bridgeExplanation, setBridgeExplanation] = useState<string | null>(null);
  const [isBridgeLoading, setIsBridgeLoading] = useState<boolean>(false);

  // Time-saver quick learn modal
  const [quickLearnTime, setQuickLearnTime] = useState<number | null>(null); // null, 5, 15, 30

  const chatEndRef = useRef<HTMLDivElement>(null);

  // --- Load localStorage data ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedXp = localStorage.getItem("nexus_xp");
      const savedLevel = localStorage.getItem("nexus_level");
      const savedStreak = localStorage.getItem("nexus_streak");
      const savedLastStreak = localStorage.getItem("nexus_last_streak");
      const savedCompletedTopics = localStorage.getItem("nexus_completed_topics");
      const savedCompletedQuizzes = localStorage.getItem("nexus_completed_quizzes");
      const savedSavedVocab = localStorage.getItem("nexus_saved_vocab");
      const savedEarnedBadges = localStorage.getItem("nexus_earned_badges");
      const savedLastRead = localStorage.getItem("nexus_last_read");

      setTimeout(() => {
        if (savedXp) setXp(parseInt(savedXp));
        if (savedLevel) setLevel(parseInt(savedLevel));
        if (savedStreak) setStreak(parseInt(savedStreak));
        if (savedLastStreak) setLastStreakClaimed(savedLastStreak);
        if (savedCompletedTopics) setCompletedTopics(JSON.parse(savedCompletedTopics));
        if (savedCompletedQuizzes) setCompletedQuizzes(JSON.parse(savedCompletedQuizzes));
        if (savedSavedVocab) setSavedVocab(JSON.parse(savedSavedVocab));
        if (savedEarnedBadges) setEarnedBadges(JSON.parse(savedEarnedBadges));
        if (savedLastRead) setLastReadTopicId(savedLastRead);
      }, 0);
    }
  }, []);

  // --- Save to localStorage on states update ---
  const saveState = (key: string, value: any) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
    }
  };

  const addXp = (amount: number, reason: string) => {
    setXp((prevXp) => {
      const nextXp = prevXp + amount;
      const nextLevel = Math.floor(nextXp / 1000) + 1;
      
      saveState("nexus_xp", nextXp);
      
      if (nextLevel > level) {
        setLevel(nextLevel);
        saveState("nexus_level", nextLevel);
        // Award level-up badge
        addBadge("Level-Up Legend", "Meningkat ke tingkat pemahaman berikutnya.");
      }
      return nextXp;
    });

    // Simple toast effect or notice
    const toast = document.createElement("div");
    toast.className = "fixed bottom-5 right-5 z-50 glass px-4 py-3 border-[#00d4ff] flex items-center gap-2 text-[#00d4ff] text-sm animate-bounce shadow-lg";
    toast.innerHTML = `<span class="font-bold">+${amount} XP</span> - ${reason}`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3500);
  };

  const addBadge = (badgeName: string, reason: string) => {
    setEarnedBadges((prev) => {
      if (prev.includes(badgeName)) return prev;
      const updated = [...prev, badgeName];
      saveState("nexus_earned_badges", updated);
      
      // Beautiful badge notification
      const toast = document.createElement("div");
      toast.className = "fixed bottom-20 right-5 z-50 glass px-5 py-4 border-[#fbbf24] bg-[#0f1f3d]/95 text-white text-sm rounded-xl max-w-sm shadow-2xl animate-pulse";
      toast.innerHTML = `
        <div class="flex items-start gap-3">
          <div class="text-[#fbbf24] text-xl">🏆</div>
          <div>
            <div class="font-bold text-[#fbbf24]">Badge Baru Didapatkan!</div>
            <div class="font-semibold text-gray-100 text-xs">${badgeName}</div>
            <div class="text-gray-400 text-[11px] mt-0.5">${reason}</div>
          </div>
        </div>
      `;
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 5000);

      return updated;
    });
  };

  // --- Scroll chat to bottom ---
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isAiLoading]);

  // --- Auto check and simulate claims ---
  const claimStreak = () => {
    const today = new Date().toDateString();
    if (lastStreakClaimed === today) {
      alert("Kamu sudah mengklaim streak harianmu hari ini! Kembali lagi besok.");
      return;
    }
    
    const nextStreak = streak + 1;
    setStreak(nextStreak);
    setLastStreakClaimed(today);
    saveState("nexus_streak", nextStreak);
    saveState("nexus_last_streak", today);
    addXp(150, "Klaim Streak Harian");

    if (nextStreak >= 3) {
      addBadge("Streak Builder", "Mempertahankan rutinitas belajar 3 hari berturut-turut.");
    }
  };

  // --- Vocabulary Actions ---
  const saveVocabWord = (wordId: string) => {
    setSavedVocab((prev) => {
      if (prev.includes(wordId)) return prev;
      const updated = [...prev, wordId];
      saveState("nexus_saved_vocab", updated);
      addXp(50, "Menyimpan Kosakata Baru");
      
      if (updated.length >= 5) {
        addBadge("Word Collector", "Menyimpan 5 kosakata interaktif ke dalam dek pribadi.");
      }
      return updated;
    });
  };

  const removeVocabWord = (wordId: string) => {
    setSavedVocab((prev) => {
      const updated = prev.filter((id) => id !== wordId);
      saveState("nexus_saved_vocab", updated);
      return updated;
    });
  };

  // --- Topic Completing ---
  const toggleTopicCompletion = (topicId: string, topicTitle: string, sectorId: string) => {
    setCompletedTopics((prev) => {
      const isCompleted = prev.includes(topicId);
      let updated: string[];
      if (isCompleted) {
        updated = prev.filter((id) => id !== topicId);
      } else {
        updated = [...prev, topicId];
        addXp(200, `Menyelesaikan bacaan "${topicTitle}"`);
        
        // Dynamic Bridge Builders tracking
        // Check if user completed lessons in 3 distinct sectors
        const distinctSectorsCompleted = new Set<string>();
        SECTORS_DATA.forEach(sec => {
          sec.topics.forEach(top => {
            if ([...prev, topicId].includes(top.id)) {
              distinctSectorsCompleted.add(sec.id);
            }
          });
        });
        if (distinctSectorsCompleted.size >= 3) {
          addBadge("Bridge Builder", "Mempelajari topik di 3 sektor berbeda.");
        }
      }
      saveState("nexus_completed_topics", updated);
      return updated;
    });
  };

  // --- Submit Lesson Quiz ---
  const handleQuizAnswerSelect = (qIndex: number, optionIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [qIndex]: optionIndex
    }));
  };

  const submitQuiz = (topic: Topic) => {
    let correctCount = 0;
    topic.quiz.forEach((q, index) => {
      if (quizAnswers[index] === q.correctIndex) {
        correctCount++;
      }
    });

    const passed = correctCount === topic.quiz.length;
    setQuizResults({ correctCount, passed });
    setQuizSubmitted(true);

    if (passed) {
      setCompletedQuizzes(prev => {
        if (prev.includes(topic.id)) return prev;
        const updated = [...prev, topic.id];
        saveState("nexus_completed_quizzes", updated);
        addXp(300, `Lulus Kuis Sempurna: ${topic.title}`);
        
        // If they did it in Serius mode
        if (learnMode === "Serius") {
          addBadge("Serius Scholar", "Menyelesaikan kuis topik dalam Mode Serius.");
        }
        return updated;
      });
    } else {
      addXp(50, "Mencoba Kuis Sektor");
    }
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizResults(null);
  };

  // --- Vocabulary tooltip triggers ---
  const handleVocabClick = (vocabId: string, event: React.MouseEvent) => {
    const vocab = VOCABULARY_LIST[vocabId.toLowerCase()];
    if (vocab) {
      setHoveredVocab(vocab);
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      setVocabPopoverPos({
        x: Math.min(window.innerWidth - 320, rect.left),
        y: rect.top + window.scrollY - 150
      });
    }
  };

  // Render text containing custom hoverable vocabulary
  const renderInteractiveText = (text: string) => {
    const vocabKeys = Object.keys(VOCABULARY_LIST);
    // Escape special characters and create regex matching whole words or terms
    const sortedKeys = [...vocabKeys].sort((a, b) => b.length - a.length);
    const regex = new RegExp(`\\b(${sortedKeys.join("|")})\\b`, "gi");

    const parts = text.split(regex);
    return parts.map((part, index) => {
      const matchedKey = sortedKeys.find((k) => k.toLowerCase() === part.toLowerCase());
      if (matchedKey) {
        const vocab = VOCABULARY_LIST[matchedKey];
        const isSaved = savedVocab.includes(vocab.id);
        return (
          <span 
            key={index}
            onClick={(e) => handleVocabClick(vocab.id, e)}
            className="cursor-pointer border-b-2 border-dotted border-[#00d4ff] text-[#00d4ff] hover:text-white hover:bg-[#00d4ff]/20 px-1 rounded transition-all font-medium"
            title="Klik untuk melihat definisi instan"
          >
            {part}
          </span>
        );
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  // --- Dynamic Connection Bridge Explainer via server-side Gemini ---
  const explainBridgeDynamically = async (sourceTitle: string, targetSectorName: string) => {
    setBridgeExplanation(null);
    setIsBridgeLoading(true);

    try {
      const response = await fetch("/app/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "explain_bridge",
          topicSource: sourceTitle,
          topicTarget: targetSectorName,
          thinking: isThinkingEnabled
        })
      });

      const data = await response.json();
      if (data.text) {
        setBridgeExplanation(data.text);
      } else {
        setBridgeExplanation("Maaf, gagal merumuskan jembatan pengetahuan secara dinamis. Silakan coba kembali.");
      }
    } catch (error) {
      console.error(error);
      setBridgeExplanation("Terjadi gangguan koneksi ke server NEXUS AI.");
    } finally {
      setIsBridgeLoading(false);
    }
  };

  // --- Conversational Chat via server-side Gemini ---
  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setChatInput("");
    setIsAiLoading(true);

    try {
      const payloadMessages = [...chatMessages, { role: "user", content: userMessage }];
      
      const response = await fetch("/app/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: payloadMessages,
          thinking: isThinkingEnabled
        })
      });

      const data = await response.json();
      if (data.text) {
        setChatMessages(prev => [...prev, { role: "assistant", content: data.text }]);
        addXp(30, "Bertanya ke NEXUS AI");
      } else {
        setChatMessages(prev => [...prev, { role: "assistant", content: "Mohon maaf, saya kesulitan merumuskan respons. Silakan ajukan pertanyaan lain." }]);
      }
    } catch (error) {
      console.error(error);
      setChatMessages(prev => [...prev, { role: "assistant", content: "Koneksi ke otak buatan terganggu. Silakan cek koneksi internetmu." }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  // --- Submit Cross-Sector Challenge ---
  const submitChallengeAnswer = (challenge: CrossSectorChallenge) => {
    if (challengeAnswer === null) return;
    setChallengeSubmitted(true);

    if (challengeAnswer === challenge.correctIndex) {
      addBadge(challenge.badgeName, `Lulus ${challenge.title}.`);
      addXp(500, `Menyelesaikan Tantangan Lintas Sektor: ${challenge.title}`);
    } else {
      addXp(100, "Mencoba Tantangan Lintas Sektor");
    }
  };

  // --- Calculate overall stats ---
  const getProgressPercent = () => {
    let totalTopics = 0;
    SECTORS_DATA.forEach(sec => totalTopics += sec.topics.length);
    if (totalTopics === 0) return 0;
    return Math.round((completedTopics.length / totalTopics) * 100);
  };

  const getSectorProgressPercent = (sector: Sector) => {
    if (sector.topics.length === 0) return 0;
    const completedInSector = sector.topics.filter(top => completedTopics.includes(top.id)).length;
    return Math.round((completedInSector / sector.topics.length) * 100);
  };

  // --- Locate Topic & Teleportation helper ---
  const handleTeleport = (sectorId: string, topicId?: string) => {
    setSelectedSectorId(sectorId);
    if (topicId) {
      setSelectedTopicId(topicId);
      setLastReadTopicId(topicId);
      saveState("nexus_last_read", topicId);
      resetQuiz();
      setBridgeExplanation(null);
    } else {
      setSelectedTopicId(null);
    }
    setActiveTab("map");
    // Scroll smoothly to bottom content
    setTimeout(() => {
      document.getElementById("sector-learn-zone")?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  // Helper to parse double asterisks for markdown-like bold text
  const parseMarkdownBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="text-[#00d4ff] font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  // --- Select Quick Learn Topic ---
  const triggerQuickLearn = (time: number) => {
    setQuickLearnTime(time);
    if (time === 5) {
      // API Santai
      handleTeleport("teknologi", "apa_itu_api");
      setLearnMode("Santai");
    } else if (time === 15) {
      // Internet Menengah
      handleTeleport("cara_kerja_dunia", "cara_kerja_internet");
      setLearnMode("Menengah");
    } else if (time === 30) {
      // Neural networks serious
      handleTeleport("ai_ml", "neural_networks_otak");
      setLearnMode("Serius");
    }
  };

  // Get dynamic recommend system based on last completed topic
  const getSmartRecommendations = () => {
    if (completedTopics.length === 0) {
      return [
        { id: "apa_itu_api", title: "Apa itu API? (Teknologi)", sectorId: "teknologi" },
        { id: "kosakata_pasar_finansial", title: "Kosakata Pasar (Ekonomi)", sectorId: "ekonomi" }
      ];
    }
    const last = completedTopics[completedTopics.length - 1];
    if (last === "apa_itu_api") {
      return [
        { id: "cara_kerja_internet", title: "Cara Kerja Internet (Cara Kerja Dunia)", sectorId: "cara_kerja_dunia" },
        { id: "model_bisnis", title: "Model Bisnis SaaS (Bisnis)", sectorId: "bisnis" }
      ];
    } else if (last === "neural_networks_otak") {
      return [
        { id: "psikologi_belajar", title: "Psikologi Kognitif Cara Belajar (Kehidupan)", sectorId: "kehidupan" },
        { id: "sains_dasar", title: "Fisika Dasar & Semikonduktor (Sains)", sectorId: "sains" }
      ];
    }
    return [
      { id: "neural_networks_otak", title: "Neural Networks & Otak (AI/ML)", sectorId: "ai_ml" },
      { id: "logika_argumentasi", title: "Logika & Cacat Berpikir (Filsafat)", sectorId: "filsafat" }
    ];
  };

  return (
    <div className="relative min-h-screen bg-[#0a0e1a] overflow-hidden text-[#f1f5f9] flex flex-col font-sans">
      
      {/* Background Neon Aura Globes */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-[#00d4ff]/15 rounded-full filter blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-[#a855f7]/15 rounded-full filter blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-20 left-1/4 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] bg-aura animate-aura-1 z-0" />
      <div className="absolute bottom-40 right-1/4 bg-gradient-to-r from-[#fbbf24] to-[#ec4899] bg-aura animate-aura-2 z-0" />

      {/* FIXED GLASS HEADER */}
      <header className="sticky top-4 z-40 glass mx-4 md:mx-8 px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10 shadow-xl shadow-[#000000]/40">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00d4ff] to-[#a855f7] flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-[#00d4ff]/20">
            N
            <div className="absolute inset-0 rounded-xl border border-white/20 animate-pulse" />
          </div>
          <div>
            <span className="font-display text-2xl font-black tracking-wider bg-gradient-to-r from-[#00d4ff] via-[#a855f7] to-[#fbbf24] bg-clip-text text-transparent glow-cyan">
              NEXUS
            </span>
            <div className="text-[9px] text-[#94a3b8] uppercase tracking-widest font-mono">Knowledge Ecosystem</div>
          </div>
        </div>

        {/* Level and XP gamification status */}
        <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm font-mono bg-black/30 px-3 py-1.5 rounded-full border border-white/5">
          {/* Flame streak indicator */}
          <button 
            onClick={claimStreak}
            className="flex items-center gap-1 bg-[#fbbf24]/15 hover:bg-[#fbbf24]/30 text-[#fbbf24] px-2.5 py-1 rounded-full border border-[#fbbf24]/30 transition-all cursor-pointer animate-pulse"
            title="Klaim Streak Harian Kamu!"
          >
            <Flame className="w-4 h-4 fill-[#fbbf24]" />
            <span className="font-bold">{streak} HARI</span>
          </button>

          {/* Level Tracker */}
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#a855f7]" />
            <span>LVL {level}</span>
            <div className="w-20 md:w-28 bg-white/10 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#00d4ff] to-[#a855f7] h-full transition-all duration-500"
                style={{ width: `${(xp % 1000) / 10}%` }}
              />
            </div>
            <span className="text-gray-400 text-xs">{(xp % 1000)}/1000 XP</span>
          </div>

          {/* Total XP */}
          <div className="text-gray-400">
            Total: <span className="text-[#00d4ff] font-bold">{xp} XP</span>
          </div>
        </div>

        {/* Global Toolbar Buttons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowVocabDeck(true)}
            className="relative p-2 rounded-lg glass-light border-white/10 hover:border-[#00d4ff] text-[#94a3b8] hover:text-[#00d4ff] transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
          >
            <BookMarked className="w-4 h-4" />
            <span>Deck ({savedVocab.length})</span>
          </button>
        </div>
      </header>

      {/* CORE HERO SEGMENT */}
      <section className="relative z-10 px-4 md:px-8 pt-10 pb-6 max-w-7xl mx-auto w-full text-center">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <span className="inline-block px-3 py-1 bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-[#00d4ff] text-xs font-mono font-bold rounded-full mb-4 uppercase tracking-widest">
            Knowledge Interconnected Ecosystem
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#f1f5f9] leading-tight">
            Semua Pengetahuan di Dunia Ini{" "}
            <span className="bg-gradient-to-r from-[#00d4ff] via-[#a855f7] to-[#fbbf24] bg-clip-text text-transparent glow-cyan">
              Saling Terhubung.
            </span>
          </h1>
          <p className="mt-4 text-[#94a3b8] text-sm sm:text-base md:text-lg font-light leading-relaxed">
            Pecahkan kotak pembatas mata pelajaran kaku. Jelajahi keterkaitan universal antara teknologi mikro, kecerdasan buatan, ekonomi moneter, alam sains, dan filsafat rasional.
          </p>

          {/* Fast selection options for learn paths */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                setActiveTab("map");
                const mapEl = document.getElementById("knowledge-map-anchor");
                mapEl?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white font-semibold shadow-lg shadow-[#00d4ff]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <Network className="w-4 h-4" />
              <span>Jelajahi Peta Pengetahuan</span>
            </button>

            {/* Quick time-saver learn selector */}
            <div className="flex items-center gap-1.5 bg-black/40 px-4 py-2 rounded-full border border-white/5">
              <Clock className="w-4 h-4 text-[#fbbf24]" />
              <span className="text-xs text-gray-400 mr-2">Waktu belajar saya:</span>
              <button 
                onClick={() => triggerQuickLearn(5)}
                className="px-2.5 py-1 text-xs font-semibold rounded-md bg-[#22c55e]/15 hover:bg-[#22c55e]/30 text-[#22c55e] transition-all cursor-pointer"
              >
                5 Menit
              </button>
              <button 
                onClick={() => triggerQuickLearn(15)}
                className="px-2.5 py-1 text-xs font-semibold rounded-md bg-[#fbbf24]/15 hover:bg-[#fbbf24]/30 text-[#fbbf24] transition-all cursor-pointer"
              >
                15 Menit
              </button>
              <button 
                onClick={() => triggerQuickLearn(30)}
                className="px-2.5 py-1 text-xs font-semibold rounded-md bg-[#a855f7]/15 hover:bg-[#a855f7]/30 text-[#a855f7] transition-all cursor-pointer"
              >
                30 Menit
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* MAIN LAYOUT DASHBOARD */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-8 pb-20 grid grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Main Views & Map Container */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          
          {/* NAVIGATION TAB CONTROLLER */}
          <div className="glass w-full p-1.5 flex gap-1 border-white/5 rounded-2xl">
            <button 
              onClick={() => setActiveTab("map")}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "map" 
                  ? "bg-gradient-to-r from-[#0f1f3d] to-[#00d4ff]/20 border border-[#00d4ff]/30 text-[#00d4ff]" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Network className="w-4 h-4" />
              <span>[1] Peta Pengetahuan</span>
            </button>
            <button 
              onClick={() => setActiveTab("tree")}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "tree" 
                  ? "bg-gradient-to-r from-[#0f1f3d] to-[#a855f7]/20 border border-[#a855f7]/30 text-[#a855f7]" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>[2] Pohon Pengetahuan ({getProgressPercent()}%)</span>
            </button>
            <button 
              onClick={() => setActiveTab("ai_chat")}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "ai_chat" 
                  ? "bg-gradient-to-r from-[#0f1f3d] to-[#fbbf24]/20 border border-[#fbbf24]/30 text-[#fbbf24]" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <BrainCircuit className="w-4 h-4" />
              <span>[3] Asisten NEXUS AI</span>
            </button>
          </div>

          {/* TAB 1: INTERACTIVE KNOWLEDGE MAP */}
          <div className={`${activeTab === "map" ? "block" : "hidden"}`}>
            <div id="knowledge-map-anchor" className="glass w-full border-white/10 p-4 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 pb-3 border-b border-white/5 gap-2">
                <div>
                  <h2 className="font-display text-xl font-black text-white flex items-center gap-2">
                    <span className="text-[#00d4ff]">🌐</span> NEXUS Knowledge Map
                  </h2>
                  <p className="text-xs text-gray-400">Klik sebuah simpul sektor untuk menyingkap jalur belajar yang saling terhubung</p>
                </div>
                
                {/* Search Bar inside Map */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Cari topik (API, Kuantum...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-[#00d4ff] transition-all"
                  />
                </div>
              </div>

              {/* DYNAMIC SVG CANVAS */}
              <div className="relative bg-[#070b14] border border-white/5 rounded-xl h-[420px] md:h-[520px] w-full overflow-hidden">
                {/* Connections Lines Grid */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1100 700" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="glowGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="glowGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="glowGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  {/* Draw pulsing connection threads */}
                  {SECTORS_DATA.map((source) => {
                    return source.connectedSectorIds.map((targetId) => {
                      const target = SECTORS_DATA.find(s => s.id === targetId);
                      if (!target) return null;
                      
                      const isHighlighted = selectedSectorId === source.id || selectedSectorId === targetId;
                      const isBothSelected = selectedSectorId && (selectedSectorId === source.id || selectedSectorId === targetId);

                      return (
                        <g key={`${source.id}-${targetId}`}>
                          {/* Outer Glow Line */}
                          <line
                            x1={source.x}
                            y1={source.y}
                            x2={target.x}
                            y2={target.y}
                            stroke={isHighlighted ? "url(#glowGrad1)" : "rgba(255, 255, 255, 0.05)"}
                            strokeWidth={isHighlighted ? 3 : 1}
                            className={`${isHighlighted ? "opacity-100" : "opacity-30"} transition-all duration-300`}
                          />
                          {/* Inner Moving Dashed Tracer */}
                          {isHighlighted && (
                            <line
                              x1={source.x}
                              y1={source.y}
                              x2={target.x}
                              y2={target.y}
                              stroke="#00d4ff"
                              strokeWidth={1.5}
                              strokeDasharray="8, 12"
                              className="animate-[dash_15s_linear_infinite]"
                              style={{
                                animation: "dash-anim 30s linear infinite"
                              }}
                            />
                          )}
                        </g>
                      );
                    });
                  })}
                </svg>

                {/* Draw HTML interactive Node Elements inside container */}
                <div className="absolute inset-0 w-full h-full" style={{ minWidth: "1000px" }}>
                  <svg className="hidden">
                    <style>{`
                      @keyframes dash-anim {
                        to { stroke-dashoffset: -1000; }
                      }
                    `}</style>
                  </svg>

                  {SECTORS_DATA.map((sector) => {
                    const IconComponent = iconMap[sector.icon] || Cpu;
                    const isSelected = selectedSectorId === sector.id;
                    const sectorProgress = getSectorProgressPercent(sector);

                    return (
                      <motion.div
                        key={sector.id}
                        onClick={() => setSelectedSectorId(sector.id)}
                        className={`absolute cursor-pointer flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 select-none z-20 ${
                          isSelected 
                            ? "bg-[#0f1f3d]/90 border-2 border-[#00d4ff] shadow-xl scale-110" 
                            : "bg-[#0f1f3d]/60 border border-white/10 hover:border-white/30 scale-100"
                        }`}
                        style={{
                          left: `${sector.x}px`,
                          top: `${sector.y}px`,
                          transform: "translate(-50%, -50%)",
                          boxShadow: isSelected ? `0 0 20px ${sector.color}40` : "none"
                        }}
                        whileHover={{ scale: isSelected ? 1.12 : 1.05 }}
                      >
                        {/* Circular Progress Gauge surrounding icon */}
                        <div className="relative w-11 h-11 flex items-center justify-center rounded-xl" style={{ backgroundColor: `${sector.color}15` }}>
                          <IconComponent className="w-6 h-6" style={{ color: sector.color }} />
                          {sectorProgress > 0 && (
                            <div 
                              className="absolute -bottom-1 -right-1 text-[9px] font-mono px-1 py-0.5 rounded bg-black/80 border text-white font-bold"
                              style={{ borderColor: sector.color }}
                            >
                              {sectorProgress}%
                            </div>
                          )}
                        </div>

                        {/* Node Label */}
                        <span className="mt-2 text-xs font-mono font-bold tracking-tight text-white">{sector.name}</span>
                        
                        {/* Connected indicators */}
                        {isSelected && (
                          <span className="text-[8px] text-cyan-400 font-mono tracking-widest mt-0.5 animate-pulse">ACTIVE NODE</span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Interactive map helper tooltip instructions overlay */}
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur px-3 py-1.5 rounded-lg border border-white/5 text-[10px] text-gray-400 max-w-sm pointer-events-none">
                  ⚡ <strong className="text-white">Tips:</strong> Klik sektor mana saja untuk menyingkap koneksi filamen data dengan sektor penunjang lainnya.
                </div>
              </div>
            </div>

            {/* SECTOR LISTS OR SEARCH RESULTS HIGHLIGHTS */}
            {searchQuery && (
              <div className="glass w-full border-white/10 p-5 mt-6">
                <h3 className="text-sm font-mono font-bold text-gray-400 mb-3">Hasil Pencarian untuk &quot;{searchQuery}&quot;:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SECTORS_DATA.flatMap(sec => 
                    sec.topics.filter(top => 
                      top.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      top.content.summary.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map(top => ({ sector: sec, topic: top }))
                  ).map(({ sector, topic }) => (
                    <div 
                      key={topic.id}
                      onClick={() => handleTeleport(sector.id, topic.id)}
                      className="glass glass-interactive p-4 border-white/5 cursor-pointer flex items-start gap-3"
                    >
                      <div className="p-2 rounded-lg bg-white/5 text-[#00d4ff]">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 font-mono uppercase tracking-widest">{sector.name}</div>
                        <h4 className="font-semibold text-white mt-1 text-sm">{topic.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EXPANDED ACTIVE SECTOR DETAILS CODES */}
            <div id="sector-learn-zone" className="mt-6">
              <AnimatePresence mode="wait">
                {selectedSectorId ? (
                  (() => {
                    const sector = SECTORS_DATA.find(s => s.id === selectedSectorId);
                    if (!sector) return null;
                    return (
                      <motion.div
                        key={sector.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="glass w-full border-white/10 p-6"
                      >
                        {/* Sector Header */}
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/5">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${sector.color}15`, border: `1px solid ${sector.color}40` }}>
                              {React.createElement(iconMap[sector.icon] || Cpu, { className: "w-8 h-8", style: { color: sector.color } })}
                            </div>
                            <div>
                              <div className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: sector.color }}>Sektor Belajar</div>
                              <h2 className="text-2xl font-display font-black text-white">{sector.name}</h2>
                            </div>
                          </div>

                          {/* Connection badges indicator */}
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mr-1">Sektor Terkait:</span>
                            {sector.connectedSectorIds.map(connId => {
                              const conn = SECTORS_DATA.find(s => s.id === connId);
                              if (!conn) return null;
                              return (
                                <button
                                  key={connId}
                                  onClick={() => setSelectedSectorId(connId)}
                                  className="px-2.5 py-1 text-[10px] font-semibold font-mono rounded bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 transition-all cursor-pointer"
                                >
                                  {conn.name}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <p className="mt-4 text-[#94a3b8] text-sm font-light leading-relaxed">{sector.description}</p>

                        {/* List of Sub-topics Cards Grid */}
                        <h3 className="mt-8 text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-3">Pilih Sub-topik Pembelajaran:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {sector.topics.map((topic) => {
                            const isRead = completedTopics.includes(topic.id);
                            const isQuizPassed = completedQuizzes.includes(topic.id);
                            const isActiveTopic = selectedTopicId === topic.id;

                            return (
                              <div
                                key={topic.id}
                                onClick={() => {
                                  setSelectedTopicId(topic.id);
                                  setLastReadTopicId(topic.id);
                                  saveState("nexus_last_read", topic.id);
                                  resetQuiz();
                                  setBridgeExplanation(null);
                                }}
                                className={`glass glass-interactive p-5 border-white/5 cursor-pointer text-left relative ${
                                  isActiveTopic 
                                    ? "bg-gradient-to-r from-[#0f1f3d] to-[#00d4ff]/10 border-[#00d4ff]" 
                                    : ""
                                }`}
                              >
                                {/* Top Indicators */}
                                <div className="flex items-center justify-between gap-2 mb-2">
                                  <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                                    Difficulty: {topic.difficulty}
                                  </span>

                                  {/* Progress flags */}
                                  <div className="flex items-center gap-1">
                                    {isRead && (
                                      <span className="text-[9px] font-mono text-[#22c55e] bg-[#22c55e]/10 border border-[#22c55e]/30 px-2 py-0.5 rounded flex items-center gap-0.5">
                                        <Check className="w-3 h-3" /> BACA
                                      </span>
                                    )}
                                    {isQuizPassed && (
                                      <span className="text-[9px] font-mono text-[#fbbf24] bg-[#fbbf24]/10 border border-[#fbbf24]/30 px-2 py-0.5 rounded flex items-center gap-0.5">
                                        <Award className="w-3 h-3" /> LULUS KUIS
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <h4 className="font-semibold text-white text-base group-hover:text-[#00d4ff] transition-all">
                                  {topic.title}
                                </h4>

                                <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                                  <span className="flex items-center gap-1 font-mono">
                                    <BookOpen className="w-3.5 h-3.5" /> 3 Mode Baca
                                  </span>
                                  <span className="text-[#00d4ff] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    Buka Topik <ArrowRight className="w-3 h-3" />
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* ACTIVE TOPIC CONTENT ARTICLE RENDER ZONE */}
                        {selectedTopicId && (() => {
                          const topic = sector.topics.find(t => t.id === selectedTopicId);
                          if (!topic) return null;
                          const isRead = completedTopics.includes(topic.id);
                          const isQuizPassed = completedQuizzes.includes(topic.id);

                          return (
                            <motion.div
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-8 border-t border-white/10 pt-8"
                            >
                              {/* Title block */}
                              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                                <div>
                                  <span className="text-xs font-mono font-bold text-[#00d4ff] tracking-widest uppercase">Materi Pembelajaran Utama</span>
                                  <h3 className="text-xl md:text-2xl font-display font-black text-white mt-1">{topic.title}</h3>
                                  <div className="flex flex-wrap items-center gap-2 mt-2">
                                    {topic.vocabIds.map(vId => (
                                      <span key={vId} className="text-[9px] font-mono font-semibold px-2 py-0.5 bg-white/5 border border-white/5 text-gray-400 rounded">
                                        #{VOCABULARY_LIST[vId]?.word || vId}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Read toggle completed checkbox */}
                                <button
                                  onClick={() => toggleTopicCompletion(topic.id, topic.title, sector.id)}
                                  className={`px-4 py-2.5 rounded-xl font-bold text-xs font-mono tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                                    isRead 
                                      ? "bg-[#22c55e]/15 border border-[#22c55e]/50 text-[#22c55e]" 
                                      : "bg-white/5 border border-white/10 text-white hover:border-[#00d4ff] hover:bg-[#00d4ff]/10"
                                  }`}
                                >
                                  {isRead ? <CheckCircle2 className="w-4 h-4 text-[#22c55e]" /> : <BookOpen className="w-4 h-4" />}
                                  <span>{isRead ? "Selesai Dibaca" : "Tandai Selesai Membaca"}</span>
                                </button>
                              </div>

                              {/* MODE LEVEL SELECTOR */}
                              <div className="glass-light p-1 rounded-xl flex gap-1 border-white/5 max-w-md mb-6">
                                {(["Santai", "Menengah", "Serius"] as const).map((mode) => (
                                  <button
                                    key={mode}
                                    onClick={() => setLearnMode(mode)}
                                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                      learnMode === mode 
                                        ? "bg-gradient-to-r from-[#0f1f3d] to-[#00d4ff]/25 border border-[#00d4ff]/30 text-white" 
                                        : "text-gray-400 hover:text-white"
                                    }`}
                                  >
                                    <span className={
                                      mode === "Santai" ? "text-green-400" :
                                      mode === "Menengah" ? "text-yellow-400" : "text-red-400"
                                    }>●</span>
                                    <span>MODE {mode.toUpperCase()}</span>
                                  </button>
                                ))}
                              </div>

                              {/* ARTICLE CONTEN BODY */}
                              <div className="glass p-6 border-white/5 rounded-2xl bg-[#0a1122]/80 shadow-inner prose prose-invert max-w-none text-left text-gray-200 text-sm md:text-base leading-relaxed font-light space-y-4">
                                {learnMode === "Santai" && (
                                  <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-green-400 font-mono text-xs font-bold uppercase tracking-widest bg-green-500/10 px-3 py-1 rounded border border-green-500/20 max-w-fit">
                                      🟢 Mode Santai: Ringkasan Cepat 3 Menit
                                    </div>
                                    <div className="whitespace-pre-line leading-relaxed">
                                      {renderInteractiveText(topic.content.summary)}
                                    </div>
                                  </div>
                                )}

                                {learnMode === "Menengah" && (
                                  <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-yellow-400 font-mono text-xs font-bold uppercase tracking-widest bg-yellow-500/10 px-3 py-1 rounded border border-yellow-500/20 max-w-fit">
                                      🟡 Mode Menengah: Studi Kasus Riil Dunia Nyata
                                    </div>
                                    <div className="whitespace-pre-line leading-relaxed">
                                      {renderInteractiveText(topic.content.caseStudy)}
                                    </div>
                                  </div>
                                )}

                                {learnMode === "Serius" && (
                                  <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded border border-red-500/20 max-w-fit">
                                      🔴 Mode Serius: Kajian Teoretis & Panduan Proyek
                                    </div>
                                    <div className="whitespace-pre-line leading-relaxed">
                                      {renderInteractiveText(topic.content.deepDive)}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* JEMBATAN PENGETAHUAN (KNOWLEDGE BRIDGE) SECTION */}
                              <div className="mt-8 border border-[#a855f7]/30 bg-gradient-to-r from-[#0f1f3d]/80 via-[#a855f7]/5 to-[#0f1f3d]/80 p-5 rounded-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#a855f7]/10 rounded-full blur-2xl pointer-events-none" />
                                
                                <div className="flex items-start gap-4">
                                  <div className="p-3 bg-[#a855f7]/20 border border-[#a855f7]/40 rounded-xl text-[#a855f7] flex-shrink-0 animate-pulse">
                                    <Layers className="w-6 h-6" />
                                  </div>
                                  <div className="text-left flex-grow">
                                    <span className="text-xs font-mono font-bold text-[#a855f7] uppercase tracking-widest">🌉 Jembatan Pengetahuan</span>
                                    <h4 className="font-semibold text-white mt-1 text-base">Bagaimana kaitan ilmu ini dengan sektor lain?</h4>
                                    
                                    {topic.jembatan.map((jmb, i) => {
                                      const targetSector = SECTORS_DATA.find(s => s.id === jmb.targetSectorId);
                                      if (!targetSector) return null;
                                      return (
                                        <div key={i} className="mt-3 bg-black/40 p-4 rounded-xl border border-white/5">
                                          <p className="text-xs text-[#94a3b8] font-light leading-relaxed">
                                            &ldquo;{jmb.bridgeReason}&rdquo;
                                          </p>
                                          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            {/* Teleport link */}
                                            <button
                                              onClick={() => handleTeleport(jmb.targetSectorId, jmb.targetTopicId)}
                                              className="text-xs font-bold text-[#a855f7] hover:text-[#00d4ff] flex items-center gap-1 transition-all cursor-pointer"
                                            >
                                              Lompat ke {targetSector.name} <ArrowRight className="w-3.5 h-3.5" />
                                            </button>

                                            {/* AI Explanation Button */}
                                            <button
                                              onClick={() => explainBridgeDynamically(topic.title, targetSector.name)}
                                              className="text-xs font-bold font-mono px-3 py-1.5 rounded-lg bg-[#a855f7]/20 border border-[#a855f7]/40 text-white hover:bg-[#a855f7]/40 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                                            >
                                              <Sparkles className="w-3 h-3 text-[#fbbf24]" />
                                              <span>Tanyakan Penjelasan Jembatan AI</span>
                                            </button>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* Dynamic AI explanation drawer inline */}
                                <AnimatePresence>
                                  {(isBridgeLoading || bridgeExplanation) && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="mt-4 pt-4 border-t border-white/5 text-left"
                                    >
                                      <div className="glass p-4 border-[#00d4ff]/30 bg-[#0f1f3d]/80 rounded-xl relative">
                                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00d4ff] mb-2">
                                          <Sparkles className="w-4 h-4 animate-spin" />
                                          <span>ANALISIS JEMBATAN OLEH NEXUS AI</span>
                                          {isThinkingEnabled && <span className="bg-[#fbbf24]/20 border border-[#fbbf24]/40 text-[#fbbf24] px-1.5 py-0.2 rounded text-[8px] tracking-widest font-mono">HIGH THINKING MODE</span>}
                                        </div>

                                        {isBridgeLoading ? (
                                          <div className="flex flex-col gap-2 py-4 items-center justify-center">
                                            <div className="w-6 h-6 border-2 border-t-transparent border-[#00d4ff] rounded-full animate-spin" />
                                            <p className="text-xs text-gray-400 animate-pulse font-mono">Gemini sedang menganalisis benang merah konseptual secara mendalam...</p>
                                          </div>
                                        ) : (
                                          <p className="text-xs text-gray-300 leading-relaxed font-light whitespace-pre-line">
                                            {parseMarkdownBold(bridgeExplanation || "")}
                                          </p>
                                        )}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>

                              {/* ADAPTIVE QUIZ SECTION */}
                              <div className="mt-8 border border-white/10 bg-black/30 p-6 rounded-2xl text-left">
                                <div className="flex items-center gap-3 pb-3 border-b border-white/5 mb-4">
                                  <div className="p-2.5 bg-[#fbbf24]/10 border border-[#fbbf24]/30 rounded-xl text-[#fbbf24]">
                                    <Zap className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-white text-base">Kuis Adaptif Sektor</h4>
                                    <p className="text-xs text-gray-400">Jawab seluruh pertanyaan dengan benar untuk meraih koin XP dan kelulusan topik</p>
                                  </div>
                                </div>

                                {quizSubmitted ? (
                                  <div className="p-6 bg-white/5 rounded-xl border border-white/5 text-center">
                                    <div className="text-4xl mb-2">
                                      {quizResults?.passed ? "🏆" : "💪"}
                                    </div>
                                    <h5 className="font-bold text-lg text-white">
                                      {quizResults?.passed ? "Selamat! Kamu Lulus Kuis!" : "Ayo Coba Lagi!"}
                                    </h5>
                                    <p className="text-xs text-gray-400 mt-1">
                                      Skor kamu: <span className="text-[#fbbf24] font-bold">{quizResults?.correctCount} / {topic.quiz.length} Benar</span>
                                    </p>

                                    {quizResults?.passed ? (
                                      <div className="mt-2 bg-[#22c55e]/15 text-[#22c55e] text-xs py-1 px-3 rounded-full inline-block border border-[#22c55e]/30">
                                        +300 XP Didapatkan & Cabang Pohon Tumbuh!
                                      </div>
                                    ) : (
                                      <p className="text-xs text-gray-500 mt-1">Pelajari materi di mode menengah atau serius untuk memahami konsep lebih baik.</p>
                                    )}

                                    <div className="mt-6 flex justify-center gap-3">
                                      <button
                                        onClick={resetQuiz}
                                        className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all cursor-pointer"
                                      >
                                        Ulangi Kuis
                                      </button>
                                      {quizResults?.passed && (
                                        <button
                                          onClick={() => {
                                            setActiveTab("tree");
                                            document.getElementById("tree-view-anchor")?.scrollIntoView({ behavior: "smooth" });
                                          }}
                                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#fbbf24] to-[#ec4899] text-white text-xs font-bold hover:scale-105 transition-all cursor-pointer"
                                        >
                                          Lihat Pohon Pengetahuan
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="space-y-6">
                                    {topic.quiz.map((q, qIdx) => (
                                      <div key={qIdx} className="bg-white/5 border border-white/5 p-4 rounded-xl">
                                        <span className="text-[10px] text-gray-400 font-mono">PERTANYAAN {qIdx + 1}</span>
                                        <p className="font-semibold text-white mt-1 text-sm">{q.question}</p>
                                        <div className="mt-3 grid grid-cols-1 gap-2.5">
                                          {q.options.map((opt, optIdx) => {
                                            const isSelected = quizAnswers[qIdx] === optIdx;
                                            return (
                                              <button
                                                key={optIdx}
                                                onClick={() => handleQuizAnswerSelect(qIdx, optIdx)}
                                                className={`w-full text-left py-2.5 px-4 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                                                  isSelected 
                                                    ? "bg-[#00d4ff]/15 border-[#00d4ff] text-white font-semibold" 
                                                    : "bg-black/20 border-white/5 text-gray-300 hover:border-white/15"
                                                }`}
                                              >
                                                {opt}
                                              </button>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    ))}

                                    <button
                                      onClick={() => submitQuiz(topic)}
                                      disabled={Object.keys(quizAnswers).length < topic.quiz.length}
                                      className={`w-full py-3 px-6 rounded-xl font-bold text-xs font-mono uppercase tracking-widest transition-all cursor-pointer ${
                                        Object.keys(quizAnswers).length === topic.quiz.length
                                          ? "bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white hover:scale-[1.01]"
                                          : "bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed"
                                      }`}
                                    >
                                      Kirim Jawaban Kuis
                                    </button>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          );
                        })()}
                      </motion.div>
                    );
                  })()
                ) : (
                  <div className="glass w-full border-white/5 p-12 text-center text-gray-400 flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-3xl">
                      🌐
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">Pilih Sektor dari Peta</h3>
                      <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">Silakan klik salah satu bulatan sektor di peta interaktif di atas untuk menampilkan sub-topik belajar, mode membaca, kuis, dan jembatan pengetahuan.</p>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* TAB 2: PERSONAL KNOWLEDGE TREE (visual branches SVG) */}
          <div className={`${activeTab === "tree" ? "block" : "hidden"}`}>
            <div id="tree-view-anchor" className="glass w-full border-white/10 p-6 relative text-left">
              <h2 className="font-display text-2xl font-black text-white flex items-center gap-2">
                <span className="text-[#a855f7]">🌳</span> Knowledge Tree Pribadi
              </h2>
              <p className="text-xs text-gray-400 mt-1">Saksikan ekosistem intelektualmu bertunas dan mekar seiring kamu meluluskan kuis di berbagai bidang keilmuan.</p>

              {/* STATS MATRIX SUMMARY */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="glass p-3 border-white/5 text-center">
                  <div className="text-lg font-bold text-[#00d4ff] font-mono">{getProgressPercent()}%</div>
                  <div className="text-[10px] text-gray-400">Total Progress</div>
                </div>
                <div className="glass p-3 border-white/5 text-center">
                  <div className="text-lg font-bold text-[#a855f7] font-mono">{completedTopics.length}</div>
                  <div className="text-[10px] text-gray-400">Topik Selesai</div>
                </div>
                <div className="glass p-3 border-white/5 text-center">
                  <div className="text-lg font-bold text-[#fbbf24] font-mono">{completedQuizzes.length}</div>
                  <div className="text-[10px] text-gray-400">Kuis Lulus</div>
                </div>
                <div className="glass p-3 border-white/5 text-center">
                  <div className="text-lg font-bold text-[#ec4899] font-mono">{earnedBadges.length}</div>
                  <div className="text-[10px] text-gray-400">Lencana Diraih</div>
                </div>
              </div>

              {/* DYNAMIC GROWING BRANCHES SVG */}
              <div className="relative bg-[#070b14] border border-white/5 rounded-2xl h-[420px] md:h-[500px] w-full mt-6 flex items-center justify-center overflow-hidden">
                <svg className="w-full h-full max-w-[600px] max-h-[500px]" viewBox="0 0 400 400">
                  {/* Central Trunk */}
                  <path 
                    d="M 200,380 C 190,320 180,280 200,240" 
                    fill="none" 
                    stroke="#4a2c11" 
                    strokeWidth="14" 
                    strokeLinecap="round" 
                  />
                  <path 
                    d="M 200,380 C 190,320 180,280 200,240" 
                    fill="none" 
                    stroke="#5a3818" 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                  />

                  {/* Sector Branches representing progress */}
                  {SECTORS_DATA.map((sector, index) => {
                    // Spread branches in coordinates radial pattern
                    const progress = getSectorProgressPercent(sector);
                    const angle = -160 + (index * 32); // distribute angles symmetrically
                    const length = 40 + (progress * 0.9); // grows longer with progress
                    const rad = (angle * Math.PI) / 180;
                    
                    const startX = 200;
                    const startY = 240;
                    const endX = startX + length * Math.cos(rad);
                    const endY = startY + length * Math.sin(rad);

                    const midX = startX + (length/2) * Math.cos(rad) + 15 * Math.sin(rad);
                    const midY = startY + (length/2) * Math.sin(rad) - 15 * Math.cos(rad);

                    const hasLeaves = progress > 0;

                    return (
                      <g key={sector.id} className="transition-all duration-1000">
                        {/* Branch body */}
                        <path
                          d={`M ${startX},${startY} Q ${midX},${midY} ${endX},${endY}`}
                          fill="none"
                          stroke="#5a3818"
                          strokeWidth={2 + (progress / 20)}
                          strokeLinecap="round"
                          className="transition-all duration-1000"
                        />
                        
                        {/* Progress glowing fiber */}
                        {progress > 0 && (
                          <path
                            d={`M ${startX},${startY} Q ${midX},${midY} ${endX},${endY}`}
                            fill="none"
                            stroke={sector.color}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            opacity={0.7}
                          />
                        )}

                        {/* Blossoming Leafs according to progress */}
                        {hasLeaves && (
                          <g>
                            {/* Main Flower Leaf */}
                            <circle
                              cx={endX}
                              cy={endY}
                              r={3 + (progress / 15)}
                              fill={sector.color}
                              className="animate-pulse"
                              opacity={0.8}
                              style={{
                                filter: `drop-shadow(0 0 6px ${sector.color})`
                              }}
                            />
                            {/* Smaller surrounding blossom leafs */}
                            {progress >= 50 && (
                              <>
                                <circle cx={endX - 8} cy={endY - 4} r="3" fill="#ffffff" opacity={0.6} />
                                <circle cx={endX + 6} cy={endY + 6} r="2.5" fill={sector.color} opacity={0.5} />
                              </>
                            )}
                          </g>
                        )}

                        {/* Text Label on edge of leaf blossoms */}
                        <text
                          x={endX + (angle > -90 && angle < 90 ? 8 : -8)}
                          y={endY + 4}
                          fill="#94a3b8"
                          fontSize="8"
                          fontFamily="monospace"
                          textAnchor={angle > -90 && angle < 90 ? "start" : "end"}
                          className="opacity-75 font-bold"
                        >
                          {sector.name} ({progress}%)
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Legend helper absolute inside tree block */}
                <div className="absolute top-3 right-3 glass p-3 border-white/5 text-[9px] font-mono text-gray-400 space-y-1 select-none">
                  <div className="font-bold text-white uppercase tracking-wider mb-1 border-b border-white/5 pb-0.5">Legend Pohon</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#00d4ff]" /> Teknologi</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#a855f7]" /> AI / ML</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#fbbf24]" /> Ekonomi</div>
                </div>
              </div>

              {/* COLLECTION OF LENCANA (BADGES) DESIGN DISPLAY */}
              <h3 className="mt-8 text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-3">Lencana Pencapaian:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { name: "Level-Up Legend", desc: "Meningkat ke tingkat pemahaman berikutnya.", icon: "⭐", color: "from-[#00d4ff] to-cyan-800" },
                  { name: "Bridge Builder", desc: "Mempelajari topik di 3 sektor berbeda.", icon: "🌉", color: "from-[#a855f7] to-purple-900" },
                  { name: "Word Collector", desc: "Menyimpan 5 kosakata ke deck pribadi.", icon: "📖", color: "from-[#fbbf24] to-amber-900" },
                  { name: "Socrates of Silicon", desc: "Menjawab kuis tantangan AI & Filsafat.", icon: "🧠", color: "from-[#ec4899] to-pink-900" },
                ].map((bdg, i) => {
                  const isEarned = earnedBadges.includes(bdg.name);
                  return (
                    <div 
                      key={i} 
                      className={`glass p-4 border border-white/5 rounded-2xl flex flex-col items-center justify-center text-center transition-all ${
                        isEarned 
                          ? `bg-gradient-to-b ${bdg.color}/20 border-white/20 scale-100` 
                          : "opacity-40 grayscale"
                      }`}
                    >
                      <div className="text-3xl mb-2">{bdg.icon}</div>
                      <h4 className="font-bold text-xs text-white">{bdg.name}</h4>
                      <p className="text-[10px] text-gray-400 mt-1 leading-tight">{bdg.desc}</p>
                      <div className="mt-3 text-[8px] font-mono font-bold tracking-widest uppercase">
                        {isEarned ? (
                          <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Claimed</span>
                        ) : (
                          <span className="text-gray-500">Locked</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* TAB 3: ASISTEN NEXUS AI CHATBOX */}
          <div className={`${activeTab === "ai_chat" ? "block" : "hidden"}`}>
            <div className="glass w-full border-white/10 p-5 text-left flex flex-col h-[550px]">
              
              {/* Chat Box Header info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/5 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#fbbf24]/10 border border-[#fbbf24]/30 flex items-center justify-center text-[#fbbf24] animate-pulse">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-black text-white">Asisten Belajar NEXUS AI</h2>
                    <p className="text-[10px] text-gray-400 font-mono">Powered by Gemini 3.5 Flash & 3.1 Pro</p>
                  </div>
                </div>

                {/* Enable high thinking toggle switch */}
                <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5">
                  <QuestionIcon className="w-4 h-4 text-[#fbbf24]" />
                  <span className="text-xs text-gray-400 font-mono">Pro Thinking Mode:</span>
                  <button
                    onClick={() => setIsThinkingEnabled(!isThinkingEnabled)}
                    className={`relative w-10 h-5.5 rounded-full transition-all duration-300 ${
                      isThinkingEnabled ? "bg-[#fbbf24]" : "bg-white/10"
                    }`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-black transition-all duration-300 ${
                      isThinkingEnabled ? "translate-x-4.5" : "translate-x-0"
                    }`} />
                  </button>
                </div>
              </div>

              {/* Scrollable messages container thread */}
              <div className="flex-grow overflow-y-auto py-4 space-y-4 pr-2 text-xs md:text-sm leading-relaxed">
                {chatMessages.map((msg, index) => {
                  const isUser = msg.role === "user";
                  return (
                    <div 
                      key={index} 
                      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[85%] px-4 py-3 rounded-2xl border ${
                        isUser 
                          ? "bg-[#0f1f3d]/60 border-[#00d4ff]/30 text-white rounded-tr-none" 
                          : "bg-white/5 border-white/10 text-gray-200 rounded-tl-none whitespace-pre-line"
                      }`}>
                        <div className="text-[9px] font-mono text-gray-500 uppercase tracking-wider mb-1">
                          {isUser ? "Kamu (Explorer)" : "NEXUS AI Educator"}
                        </div>
                        <div className="font-light">
                          {parseMarkdownBold(msg.content)}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Floating loading typing dots */}
                {isAiLoading && (
                  <div className="flex justify-start">
                    <div className="glass p-3 border-white/5 text-gray-400 text-xs rounded-2xl rounded-tl-none flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#fbbf24] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-[#fbbf24] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-[#fbbf24] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      <span className="text-[10px] text-gray-500 font-mono">Gemini sedang merangkai koneksi ilmu...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input interface box */}
              <div className="pt-3 border-t border-white/5 flex gap-2">
                <input
                  type="text"
                  placeholder={
                    isThinkingEnabled 
                      ? "Gunakan Mode Berpikir Kompleks (gemini-3.1-pro)..." 
                      : "Tanya apa saja (Contoh: Apa kaitan AI dan Biologi?)"
                  }
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendChatMessage();
                  }}
                  className="flex-grow bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-[#fbbf24] transition-all"
                />
                <button
                  onClick={sendChatMessage}
                  disabled={isAiLoading || !chatInput.trim()}
                  className="p-3 bg-gradient-to-r from-[#fbbf24] to-[#ec4899] hover:scale-105 active:scale-95 transition-all text-white rounded-xl flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Chat quick chips suggestion helpers */}
              <div className="mt-3 flex flex-wrap items-center gap-1.5 pb-1 select-none">
                <span className="text-[10px] text-gray-500 font-mono">Tanya Cepat:</span>
                {[
                  "Hubungan AI & Filsafat",
                  "Apa itu API Economy?",
                  "Sains semikonduktor",
                  "Kenapa kita lupa pelajaran?"
                ].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setChatInput(`Jelaskan bagaimana keterkaitan atau hubungan antara: ${chip}`)}
                    className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-[10px] text-gray-300 font-mono border border-white/5 transition-all cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Sidebar (Streak claim, smart feed, cross-sector challenges) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 text-left">
          
          {/* LANJUTKAN BELAJAR QUICK BOX */}
          {(() => {
            // Find last read topic
            let resumeTopic: Topic | null = null;
            let resumeSector: Sector | null = null;
            SECTORS_DATA.forEach(sec => {
              const matched = sec.topics.find(t => t.id === lastReadTopicId);
              if (matched) {
                resumeTopic = matched;
                resumeSector = sec;
              }
            });

            if (!resumeTopic || !resumeSector) return null;

            return (
              <div className="glass w-full border-white/10 p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#00d4ff]/5 rounded-full blur-xl pointer-events-none" />
                <span className="text-[10px] font-mono font-bold text-[#00d4ff] uppercase tracking-widest block">🎯 Lanjutkan Belajar</span>
                <h3 className="font-bold text-white mt-1 text-sm">{(resumeTopic as Topic).title}</h3>
                <div className="text-[11px] text-gray-400 mt-1 font-mono uppercase tracking-widest">Sektor: {(resumeSector as Sector).name}</div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5" /> Lanjut Baca
                  </div>
                  <button 
                    onClick={() => handleTeleport((resumeSector as Sector).id, (resumeTopic as Topic).id)}
                    className="p-1.5 rounded-lg bg-[#00d4ff]/20 hover:bg-[#00d4ff]/40 text-[#00d4ff] transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })()}

          {/* DYNAMIC JEMBATAN HARI INI BANNER */}
          <div className="glass w-full border-white/10 p-5 bg-gradient-to-br from-[#0f1f3d]/60 to-[#a855f7]/10 relative overflow-hidden">
            <span className="text-[10px] font-mono font-bold text-[#a855f7] uppercase tracking-widest block">🔗 Jembatan Hari Ini</span>
            <blockquote className="mt-2 text-xs text-gray-200 font-light leading-relaxed">
              {"\"Ternyata konsep "}<strong>{"'Supply Chain'"}</strong>{" di Bisnis memiliki kesamaan filosofis dengan cara kerja pengiriman paket data "}<strong>{"'DNS' & 'TCP/IP'"}</strong>{" di Internet! Keduanya adalah sirkulasi sistem yang mengatur pemecahan jalur utama untuk menghindari penumpukan beban lalu lintas logistik.\""}
            </blockquote>
            <div className="mt-4 text-right">
              <button
                onClick={() => handleTeleport("cara_kerja_dunia", "cara_kerja_internet")}
                className="text-[10px] font-bold text-[#a855f7] hover:text-[#00d4ff] flex items-center gap-0.5 justify-end cursor-pointer"
              >
                Kaji Topik <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* CROSS-SECTOR CHALLENGES SECTION */}
          <div className="glass w-full border-white/10 p-5 bg-gradient-to-br from-[#0f1f3d]/60 to-[#fbbf24]/5 relative overflow-hidden">
            <span className="text-[10px] font-mono font-bold text-[#fbbf24] uppercase tracking-widest block">🔥 Tantangan Lintas Sektor</span>
            
            {activeChallenge ? (
              <div className="mt-3 text-xs text-left">
                <h4 className="font-semibold text-white mb-1">{activeChallenge.title}</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">{activeChallenge.description}</p>
                <div className="mt-3 p-3 bg-black/30 border border-white/5 rounded-xl">
                  <p className="font-medium text-white mb-2">{activeChallenge.question}</p>
                  
                  {challengeSubmitted ? (
                    <div>
                      <div className="text-center py-2 text-xs">
                        {challengeAnswer === activeChallenge.correctIndex ? (
                          <span className="text-emerald-400 font-bold">🎉 Jawabanmu Benar! +500 XP!</span>
                        ) : (
                          <span className="text-rose-400 font-bold">❌ Jawabanmu Kurang Tepat</span>
                        )}
                        <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
                          {activeChallenge.explanation}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setActiveChallenge(null);
                          setChallengeSubmitted(false);
                          setChallengeAnswer(null);
                        }}
                        className="w-full mt-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-bold font-mono transition-all cursor-pointer"
                      >
                        Tutup Tantangan
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      {activeChallenge.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => setChallengeAnswer(i)}
                          className={`w-full text-left p-2 rounded-lg text-[10px] border transition-all cursor-pointer ${
                            challengeAnswer === i 
                              ? "bg-[#fbbf24]/10 border-[#fbbf24] text-white" 
                              : "bg-black/20 border-white/5 text-gray-400 hover:border-white/10"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                      <button
                        onClick={() => submitChallengeAnswer(activeChallenge)}
                        disabled={challengeAnswer === null}
                        className={`w-full mt-3 py-2 rounded-xl text-[10px] font-bold font-mono uppercase tracking-wider transition-all cursor-pointer ${
                          challengeAnswer !== null
                            ? "bg-[#fbbf24] text-black hover:scale-105"
                            : "bg-white/5 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Submit Jawaban
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="mt-3">
                <p className="text-[11px] text-gray-400 leading-relaxed">Pecahkan teka-teki integratif cerdas yang menggabungkan beberapa cabang keilmuan sekaligus untuk memenangkan XP melimpah dan lencana prestisius.</p>
                <button
                  onClick={() => {
                    const randomChallenge = CROSS_SECTOR_CHALLENGES[Math.floor(Math.random() * CROSS_SECTOR_CHALLENGES.length)];
                    setActiveChallenge(randomChallenge);
                    setChallengeSubmitted(false);
                    setChallengeAnswer(null);
                  }}
                  className="w-full mt-4 py-2 bg-[#fbbf24]/20 border border-[#fbbf24]/40 hover:bg-[#fbbf24]/40 text-[#fbbf24] hover:text-white rounded-xl text-[10px] font-bold font-mono uppercase tracking-widest transition-all cursor-pointer text-center"
                >
                  Mulai Tantangan Harian
                </button>
              </div>
            )}
          </div>

          {/* SMART RECOMMENDED FEED FOR YOU */}
          <div className="glass w-full border-white/10 p-5 text-left">
            <span className="text-[10px] font-mono font-bold text-[#00d4ff] uppercase tracking-widest block">💡 Rekomendasi Untukmu</span>
            <div className="mt-3 space-y-3">
              {getSmartRecommendations().map((rec, i) => (
                <div 
                  key={i}
                  onClick={() => handleTeleport(rec.sectorId, rec.id)}
                  className="p-3 bg-black/30 border border-white/5 hover:border-[#00d4ff]/30 rounded-xl cursor-pointer transition-all flex items-start gap-2 text-xs"
                >
                  <BookOpen className="w-4 h-4 text-[#00d4ff] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white leading-tight">{rec.title}</h4>
                    <span className="text-[9px] text-gray-500 font-mono uppercase tracking-wider">Berdasarkan riwayat belajarmu</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>

      {/* FOOTER CODES */}
      <footer className="relative z-10 h-auto lg:h-14 glass mx-4 md:mx-8 mb-8 p-4 lg:px-6 flex flex-col lg:flex-row items-center justify-between text-[10px] font-bold font-mono uppercase tracking-widest gap-4 border border-white/10 shadow-xl shadow-[#000000]/40">
        <div className="flex flex-wrap gap-4 md:gap-8 text-slate-500 justify-center">
          <span className="text-cyan-400">Dashboard</span>
          <span className="text-slate-400">Archivarium</span>
          <span className="text-slate-400">Quest Board</span>
          <span className="text-slate-400">Nexus AI</span>
        </div>
        <div className="text-slate-400 text-center lg:text-right">
          NEXUS Ecosystem © 2026 | System: <span className="text-emerald-400">Online</span>
        </div>
      </footer>

      {/* FLOAT INTERACTIVE VOCABULARY OVERLAY TOOLTIP */}
      <AnimatePresence>
        {hoveredVocab && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute z-50 w-72 glass p-4 text-left border-[#00d4ff] bg-[#0f1f3d]/95 shadow-2xl rounded-2xl"
            style={{
              left: `${vocabPopoverPos.x}px`,
              top: `${vocabPopoverPos.y}px`
            }}
          >
            {/* Header tooltip */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex items-center gap-1.5 text-[#00d4ff] font-bold">
                <Bookmark className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-wider">Kamus Interaktif</span>
              </div>
              <button 
                onClick={() => setHoveredVocab(null)}
                className="text-gray-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content word definition */}
            <div className="mt-2.5">
              <div className="text-base font-bold text-white flex items-center gap-1.5">
                {hoveredVocab.word}
                {hoveredVocab.pronunciation && (
                  <span className="text-xs text-gray-500 font-mono font-light">{hoveredVocab.pronunciation}</span>
                )}
              </div>
              <p className="text-xs text-gray-300 mt-1.5 leading-relaxed font-light">
                {hoveredVocab.definition}
              </p>
              <div className="text-[9px] text-gray-500 font-mono tracking-wider uppercase mt-2">
                Context: {hoveredVocab.context}
              </div>
            </div>

            {/* Bottom Deck Actions */}
            <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/5 pt-3">
              {savedVocab.includes(hoveredVocab.id) ? (
                <button
                  onClick={() => removeVocabWord(hoveredVocab.id)}
                  className="flex-1 py-1.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400 text-[10px] font-bold transition-all hover:bg-rose-500/30 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Hapus dari Deck</span>
                </button>
              ) : (
                <button
                  onClick={() => saveVocabWord(hoveredVocab.id)}
                  className="flex-1 py-1.5 rounded-lg bg-[#00d4ff]/25 border border-[#00d4ff]/40 text-white text-[10px] font-bold transition-all hover:bg-[#00d4ff]/40 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Simpan ke Deck</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VOCABULARY DECK DRAWER/MODAL DIALOG */}
      <AnimatePresence>
        {showVocabDeck && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="glass max-w-md w-full border-white/10 p-6 text-left relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                <div className="flex items-center gap-2">
                  <BookMarked className="w-5 h-5 text-[#00d4ff]" />
                  <h3 className="font-display font-black text-white text-lg">Deck Kosakata Pribadi</h3>
                </div>
                <button 
                  onClick={() => setShowVocabDeck(false)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Saved Words List */}
              <div className="max-h-80 overflow-y-auto space-y-3 pr-1">
                {savedVocab.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 text-xs">
                    💡 Belum ada kosakata yang disimpan. Klik kata-kata yang di-dotted underline saat membaca artikel untuk menambahkannya ke sini.
                  </div>
                ) : (
                  savedVocab.map(id => {
                    const vocab = VOCABULARY_LIST[id];
                    if (!vocab) return null;
                    return (
                      <div key={id} className="p-3 bg-white/5 border border-white/5 rounded-xl text-xs relative group">
                        <div className="flex justify-between items-start gap-2">
                          <div className="font-bold text-[#00d4ff] flex items-center gap-1.5">
                            {vocab.word}
                            {vocab.pronunciation && <span className="text-[10px] font-normal text-gray-500 font-mono">{vocab.pronunciation}</span>}
                          </div>
                          <button
                            onClick={() => removeVocabWord(id)}
                            className="text-gray-500 hover:text-rose-400 p-1 rounded hover:bg-white/5 transition-all opacity-0 group-hover:opacity-100"
                            title="Hapus dari Dek"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-gray-300 font-light mt-1.5 leading-relaxed">{vocab.definition}</p>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Bottom gamified deck test card */}
              {savedVocab.length >= 3 && (
                <div className="mt-4 p-4 rounded-xl border border-[#fbbf24]/30 bg-[#fbbf24]/5 text-xs">
                  <div className="font-bold text-[#fbbf24] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>Tes Ingat Kosakata Dek Kamu</span>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">Uji pemahamanmu secara berkala berdasarkan teori Spaced Repetition untuk retensi memori 90%!</p>
                  <button 
                    onClick={() => {
                      setShowVocabDeck(false);
                      setActiveTab("ai_chat");
                      setChatInput("Tolong buatkan saya kuis interaktif berdasarkan kosakata pribadi saya di deck: " + savedVocab.map(id => VOCABULARY_LIST[id]?.word).join(", "));
                    }}
                    className="mt-3 w-full py-1.5 rounded-lg bg-[#fbbf24] text-black font-bold text-[10px] font-mono uppercase tracking-widest text-center block hover:scale-105 transition-all cursor-pointer"
                  >
                    Mulai Tes Dek lewat AI
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { text: "Hey! I'm Francis's AI. Ask me about his IoT projects!", isBot: true }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const BACKEND_URL = "https://my-ai-backend-vdxv.onrender.com";

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  // Wake up the Render server immediately
  useEffect(() => { fetch(BACKEND_URL); }, []);

  const askAI = async () => {
    if (!input.trim() || loading) return;
    
    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { text: userText, isBot: false }]);
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/chat?message=${encodeURIComponent(userText)}`);
      const data = await res.json();
      setMessages(prev => [...prev, { text: data.reply, isBot: true }]);
    } catch (err) {
      setMessages(prev => [...prev, { text: "Connection lost. Is the backend awake?", isBot: true }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} style={chatWindow}>
            <div style={chatHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Bot size={20} color="#0ea5e9" /><b>FRANCIS_AI</b></div>
              <X size={18} onClick={() => setIsOpen(false)} style={{ cursor: 'pointer' }} />
            </div>
            <div ref={scrollRef} style={messageArea}>
              {messages.map((m, i) => (
                <div key={i} style={{ 
                  ...msgBubble, 
                  alignSelf: m.isBot ? 'flex-start' : 'flex-end', 
                  backgroundColor: m.isBot ? 'rgba(255,255,255,0.1)' : '#0ea5e9',
                  borderBottomLeftRadius: m.isBot ? '4px' : '16px',
                  borderBottomRightRadius: m.isBot ? '16px' : '4px'
                }}>{m.text}</div>
              ))}
              {loading && <div style={{...msgBubble, opacity: 0.5}}>Typing...</div>}
            </div>
            <div style={inputArea}>
              <input style={chatInput} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && askAI()} placeholder="Message AI..." />
              <button onClick={askAI} style={sendBtn}><Send size={16} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setIsOpen(!isOpen)} style={toggleBtn}>
        {isOpen ? <X /> : <MessageSquare />}
      </button>
    </div>
  );
};

const chatWindow = { width: '320px', height: '450px', background: '#0f172a', borderRadius: '20px', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)' };
const chatHeader = { padding: '15px', background: 'rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'space-between', color: 'white' };
const messageArea = { flex: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px' };
const msgBubble = { padding: '10px 14px', borderRadius: '16px', fontSize: '13px', color: 'white', maxWidth: '80%' };
const inputArea = { padding: '10px', display: 'flex', gap: '8px' };
const chatInput = { flex: 1, background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '10px', padding: '8px', color: 'white', outline: 'none' };
const sendBtn = { background: '#0ea5e9', border: 'none', borderRadius: '10px', width: '35px', cursor: 'pointer' };
const toggleBtn = { width: '60px', height: '60px', borderRadius: '30px', background: '#0ea5e9', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px rgba(14,165,233,0.4)' };

export default FloatingAI;
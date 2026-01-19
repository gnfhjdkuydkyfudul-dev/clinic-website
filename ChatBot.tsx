
import React, { useState, useRef, useEffect } from 'react';
import { MedicalAI } from '../services/geminiService';
import { ChatMessage } from '../types';

interface ChatBotProps {
  onImageUpdate?: (target: string, url: string) => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ onImageUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'مرحباً بك في عيادة د. عبدربه مشهور. كيف يمكنني مساعدتك اليوم؟ يمكنك سؤالي عن الدكتور أو حتى طلبي لتغيير صور الموقع!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<MedicalAI | null>(null);

  useEffect(() => {
    aiRef.current = new MedicalAI();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    const history = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));
    history.push({ role: 'user', parts: [{ text: userMessage }] });

    const result = await aiRef.current?.getResponse(history);

    if (result?.functionCalls) {
      for (const call of result.functionCalls) {
        if (call.name === 'updateSiteImage') {
          const { target, prompt } = call.args;
          setMessages(prev => [...prev, { role: 'model', text: `جاري توليد صورة جديدة لـ ${target}... يرجى الانتظار.` }]);
          
          const imageUrl = await aiRef.current?.generateImage(prompt);
          if (imageUrl && onImageUpdate) {
            onImageUpdate(target, imageUrl);
            setMessages(prev => [...prev, { role: 'model', text: `تم تحديث الصورة بنجاح! كيف تبدو؟` }]);
          } else {
            setMessages(prev => [...prev, { role: 'model', text: `عذراً، فشلت عملية توليد الصورة.` }]);
          }
        }
      }
    } else {
      setMessages(prev => [...prev, { role: 'model', text: result?.text || "عذراً، حدث خطأ." }]);
    }
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-[350px] md:w-[400px] h-[500px] flex flex-col border border-slate-200 overflow-hidden animate-fadeIn">
          <div className="bg-medical-blue p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12c0 5.53 4.47 10 10 10s10-4.47 10-10c0-5.53-4.47-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
              </div>
              <div>
                <p className="font-bold text-sm">المساعد الذكي</p>
                <p className="text-[10px] text-sky-100">بإمكاني تعديل الموقع!</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                  ? 'bg-sky-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 shadow-sm border border-slate-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-end">
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اطلب تعديل صورة أو اسأل سؤالاً..."
              className="flex-grow bg-slate-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
            />
            <button
              type="submit"
              disabled={isTyping}
              className="bg-medical-blue text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-sky-600 transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5 rotate-180" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-medical-blue text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group"
        >
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-semibold">تعديل الصور بالذكاء الاصطناعي</span>
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/></svg>
        </button>
      )}
    </div>
  );
};

export default ChatBot;

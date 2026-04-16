import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WHATSAPP_NUMBER = "919392561785";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi 👋 How can we help you?' }
  ]);

  const quickReplies = [
    { label: "💰 Pricing", reply: "Our pricing depends on event type. Please contact us for details." },
    { label: "🎉 Services", reply: "We offer weddings, birthdays, corporate events, and more." },
    { label: "📅 Booking", reply: "You can book a consultation using our booking page." },
    { label: "📍 Location", reply: "We serve Hyderabad, Telangana, and Pune." },
  ];

  // Handle quick reply
  const handleQuickReply = (q) => {
    setMessages(prev => [
      ...prev,
      { type: 'user', text: q.label },
      { type: 'bot', text: q.reply }
    ]);
  };

  // Handle custom input → redirect to WhatsApp
  const handleCustomQuestion = () => {
    if (!input.trim()) return;

    const message = encodeURIComponent(input);

    setMessages(prev => [
      ...prev,
      { type: 'user', text: input },
      { type: 'bot', text: 'Redirecting you to WhatsApp...' }
    ]);

    setInput('');

    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    }, 800);
  };

  return (
    <div className="fixed bottom-24 right-5 z-50">

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-maroon-700 hover:bg-maroon-800 text-white p-3 rounded-full shadow-lg"
      >
        {open ? <X /> : <MessageCircle />}
      </button>

      {/* Chat Box */}
      {open && (
        <div className="mt-3 w-80 bg-white rounded-xl shadow-xl border border-gray-200 flex flex-col">

          {/* Header */}
          <div className="bg-maroon-700 text-white p-3 rounded-t-xl text-sm font-semibold">
            Agarwal Events Assistant
          </div>

          {/* Messages */}
          <div className="p-3 h-64 overflow-y-auto flex flex-col gap-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-3 py-2 rounded-lg ${
                  msg.type === 'user'
                    ? 'bg-maroon-700 text-white self-end'
                    : 'bg-beige-100 text-gray-800 self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className="px-3 pb-2 flex flex-wrap gap-2">
            {quickReplies.map((q, i) => (
              <button
                key={i}
                onClick={() => handleQuickReply(q)}
                className="text-xs bg-beige-100 hover:bg-beige-200 px-2 py-1 rounded"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex border-t">
            <input
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 text-sm outline-none"
            />
            <button
              onClick={handleCustomQuestion}
              className="bg-green-500 hover:bg-green-600 text-white px-3 text-sm"
            >
              Send
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
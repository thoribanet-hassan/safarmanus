import { useState } from 'react';
import { Send, Bot } from 'lucide-react';
import { sendChatMessage } from '../services/backendAPI';
import { useLanguage } from '../contexts/LanguageContext';
import './ChatInterface.css';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export const ChatInterface = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useLanguage();

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            role: 'user',
            content: input.trim(),
        };

        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        // const currentInput = input.trim();
        setInput('');
        setIsLoading(true);

        try {
            const response = await sendChatMessage({
                messages: newMessages, // Send the whole history
            });

            if (response === null) {
                const errorMessage: Message = {
                    role: 'assistant',
                    content: '❌ حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.',
                };
                setMessages((prev) => [...prev, errorMessage]);
                return;
            }

            const assistantMessage: Message = {
                role: 'assistant',
                content: response.response,
            };

            setMessages((prev) => [...prev, assistantMessage]);

        } catch (error) {
            console.error('Unexpected error in chat:', error);
            const errorMessage: Message = {
                role: 'assistant',
                content: '❌ حدث خطأ غير متوقع',
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-interface">
            <div className="chat-header">
                <div className="chat-header-content">
                    <Bot size={28} className="chat-icon" />
                    <div>
                        <h2>{t('brand')} - {t('slogan')}</h2>
                        <p>{t('welcome_desc')}</p>
                    </div>
                </div>
            </div>

            <div className="chat-messages">
                {messages.length === 0 && (
                    <div className="chat-welcome">
                        <Bot size={64} className="welcome-icon" />
                        <h3>{t('welcome')} 👋</h3>
                        <p>{t('welcome_desc')}</p>
                        <div className="chat-suggestions">
                            <button
                                className="suggestion-btn"
                                onClick={() => setInput(t('suggestion_tips_text'))}
                            >
                                🌍 {t('suggestion_tips')}
                            </button>
                            <button
                                className="suggestion-btn"
                                onClick={() => setInput(t('suggestion_plan_text'))}
                            >
                                📅 {t('suggestion_plan')}
                            </button>
                        </div>
                    </div>
                )}

                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`chat-message ${message.role === 'user' ? 'user-message' : 'assistant-message'} animate-fade-in`}
                    >
                        <div className="message-content">
                            {message.role === 'assistant' && <Bot size={20} className="message-icon" />}
                            <div className="message-text">{message.content}</div>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="chat-message assistant-message animate-pulse">
                        <div className="message-content">
                            <Bot size={20} className="message-icon" />
                            <div className="message-text">جاري الكتابة...</div>
                        </div>
                    </div>
                )}
            </div>

            <div className="chat-input-container">
                <input
                    type="text"
                    className="chat-input"
                    placeholder={t('search_placeholder')}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                />
                <button
                    className="send-btn"
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
};

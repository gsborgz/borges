'use client'

import { useState, useRef, useEffect } from 'react';
import { Button } from '@components/ui/Button';
import Card from '@components/ui/Card';
import { MessageCircle, Send, X } from 'lucide-react';
import { ScrollArea } from '@components/ui/Scroll';
import Input from '@components/ui/Input';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

interface Message {
  content: string;
  role: 'user' | 'assistant' | 'system';
}

export default function ChatWidget() {
  const { t, i18n } = useTranslation();
  const [abortController, setAbortController] = useState<AbortController>(new AbortController());
  const [allowChat, setAllowChat] = useState(false);
  const [session, setSession] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [pendingMessage, setPendingMessage] = useState<Message[] | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const sendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const newMessageList: Message[] = [...messages, { content: inputValue, role: 'user' }];

    setMessages(newMessageList);
    setInputValue('');
    setIsTyping(true);
    setPendingMessage(newMessageList);
  };
  const handleAbort = () => {
    abortController.abort();
    setIsTyping(false);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (!pendingMessage) return;

    const controller = new AbortController();
    const { signal } = controller;

    setAbortController(controller);

    async function getBotResponse() {
      try {
        const message = { ...pendingMessage[pendingMessage.length - 1] };

        message.content += `\n *Nota: O usuário está com o idioma "${i18n.language.toUpperCase()}" selecionado, responda de acordo com o idioma.`;

        console.log(message.content);

        const response = session.promptStreaming(pendingMessage, { signal });
        const botResponse: Message = { content: '...', role: 'assistant' };

        setMessages(prev => [...prev, botResponse]);

        for await (const chunk of response) {
          if (!chunk) continue;
          if (botResponse.content === '...') botResponse.content = '';

          botResponse.content += chunk;

          setMessages(prev => {
            const updatedMessages = prev.slice();
            const latestBotMessage = updatedMessages.reverse().find(msg => msg.role === 'assistant');

            if (latestBotMessage) latestBotMessage.content = botResponse.content;

            return updatedMessages.reverse();
          });
        }
        setIsTyping(false);
      } catch {
        const newMessages = messages.filter((msg, index) => {
          const isLastAssistantMessage = msg.role === 'assistant' && index === messages.length - 1;

          return !isLastAssistantMessage;
        });

        setMessages(newMessages);
        setIsTyping(false);
      }

      setPendingMessage(null);
    }

    getBotResponse();
  }, [pendingMessage]);

  useEffect(() => {
    const init = async () => {
      if (session) return;

      if (!allowChat) return;

      const llmsRules = await fetch('/llms-rules.txt');
      const llmsText = await fetch('/llms.txt');

      if (!llmsRules.ok || !llmsText.ok) return;

      const rules = await llmsRules.text();
      const text = await llmsText.text();

      if (!rules || !text) return;

      const initialMessages: Message[] = [
        {
          content: rules.concat('\n', text),
          role: 'system',
        },
        {
          content: t('chat.welcomeMessage'),
          role: 'assistant',
        }
      ];

      if (!messages.length) {
        setMessages(prev => [...prev, ...initialMessages]);
      }

      // @ts-ignore
      const modelSession = await LanguageModel.create({
        initialPrompts: messages,
        expectedInputLanguages: ['pt', 'en', 'fr']
      });

      setSession(modelSession);
    };
    const setAvailability = async () => {
      // @ts-ignore
      const availability = await LanguageModel.availability();

      setAllowChat(availability === 'available');
    };

    setAvailability();
    scrollToBottom();
    init();
    
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }    
  }, [isOpen, messages, isTyping]);

  if (!allowChat) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 dark:bg-white/10 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {isOpen && (
        <Card className={`
          fixed bottom-20 right-4 w-80 h-96 z-50 flex flex-col
          md:w-96 md:h-[32rem] md:bottom-24
          ${isOpen ? 'animate-in slide-in-from-bottom-4 fade-in-0' : 'animate-out slide-out-to-bottom-4 fade-out-0'}
        `}>
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center pb-2 gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h3 className="font-medium text-primary">{t('chat.title')}</h3>
            </div>
            <Button 
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4 pb-2">
              {messages.filter(msg => msg.role !== 'system').map((message, index) => (
                <div
                  key={index}
                  role="listitem"
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} items-start`}
                >
                  {message.role === 'assistant' && (
                    <Image
                      src='/borgez.png'
                      alt='Gabriel da Silva Borges'
                      width={100}
                      height={100}
                      className='rounded-full w-10 h-10 mr-2 mt-1'
                    />
                  )}

                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm break-words
                      ${message.role === 'user' 
                        ? 'bg-primary text-primary shadow-sm border border-slate-200 dark:border-slate-700' 
                        : 'bg-slate-100 dark:bg-slate-900 text-primary border border-slate-200 dark:border-slate-700'
                      }
                    `}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline" />,
                        code: ({node, className, children, ...props}) =>
                          (node && (node as any).inline) ?
                            <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded text-sm" {...props}>{children}</code> :
                            <pre className="bg-slate-100 dark:bg-slate-900 rounded p-2 overflow-auto"><code className={className} {...props}>{children}</code></pre>
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('chat.typeMessage')}
              className="flex-1 text-primary"
            />
            {isTyping ? (
              <Button variant="default" danger onClick={handleAbort}>
                {t('chat.cancel')}
              </Button>
            ) : (
              <Button variant="default" primary onClick={sendMessage} disabled={!inputValue.trim() || isTyping}>
                {t('chat.send')}
              </Button>
            )}
          </div>
        </Card>
      )}

      <Button onClick={() => setIsOpen(!isOpen)} className='fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full p-0 hover:scale-110'>
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </Button>
    </>
  );
};

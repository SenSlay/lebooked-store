import { useState } from "react";
import { Link } from "react-router-dom";
import { useBooksContext } from "../../context/BooksContext";
import MessageBubble from "./MessageBubble";

function ChatWidget() {
  const [rawMessages, setRawMessages] = useState([]);
  const [displayMessages, setDisplayMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { books } = useBooksContext();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  async function handleSend() {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMessage = { role: 'user', content: trimmedInput };

    const newRawMessages = [...rawMessages, userMessage];
    const newDisplayMessages = [...displayMessages, userMessage];

    setInput('');
    setRawMessages(newRawMessages);
    setDisplayMessages(newDisplayMessages);
    setIsTyping(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/assistant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newRawMessages }),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      
      const { response } = await res.json();
      const parsedContent = safeExtractJSON(response.content);

      const assistantMessage = {
        role: 'assistant',
        content: parsedContent.message,
        books: getBookObjectsByTitle(parsedContent.books || [], books)
      };

      setRawMessages([...newRawMessages, { role: 'assistant', content: parsedContent.message }]);
      setDisplayMessages([...newDisplayMessages, assistantMessage]);
      setIsTyping(false);
    } catch (error) {
      console.error('Failed to send message:', error);

      // Basic token exhaustion message
      if (error.message.includes('500')) {
        setErrorMessage("You've reached the daily AI usage limit. Please try again tomorrow.");
      } 

      // Show the assistant error as a message too (optional)
      const assistantErrorMessage = {
        role: 'assistant',
        content: errorMessage || "Something went wrong. Please try again later.",
      };

      setDisplayMessages([...newDisplayMessages, assistantErrorMessage]);
      setIsTyping(false);
    }
  }

  return (
    <div className="fixed bottom-8 sm:right-8 right-2 z-[999]">
      {isOpen ? (
        <div className="bg-gray-300 shadow-lg rounded-xl sm:w-[26rem] w-96 ">
          {/* Header with close button */}
          <div className="flex items-center mb-2 p-4 rounded-t-xl bg-white">
            <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center mr-2 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-6 h-6 bg-white"
                fill="currentColor"
              >
                <path d="M0 96C0 43 43 0 96 0l96 0 0 190.7c0 13.4 15.5 20.9 26 12.5L272 160l54 43.2c10.5 8.4 26 .9 26-12.5L352 0l32 0 32 0c17.7 0 32 14.3 32 32l0 320c0 17.7-14.3 32-32 32l0 64c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0L96 512c-53 0-96-43-96-96L0 96zM64 416c0 17.7 14.3 32 32 32l256 0 0-64L96 384c-17.7 0-32 14.3-32 32z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold">LeBooked AI</h2>
            <button onClick={() => setIsOpen(false)} className="ml-auto text-gray-500 hover:text-white hover:bg-gray-100 rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6 "><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
            </button>
          </div>

          {/* Messages */}
          <div className="messages overflow-y-auto h-96 mb-2 p-4 flex flex-col">
           <MessageBubble role="assistant" content="Hello, welcome to LeBooked! How can I help you?" />
            {displayMessages.map((msg, i) => (
              <MessageBubble
                key={i}
                role={msg.role}
                content={msg.content}
                books={msg.books} 
              />
            ))}
            {isTyping && (
              <MessageBubble
                role="assistant"
                content="Typing..."
                books={[]} 
                isTyping={true} 
              />
            )}
          </div>

          <div className="flex p-2 bg-white rounded-b-xl">
            <form
              onSubmit={e => {
                e.preventDefault(); 
                handleSend();      
              }}
              className="flex gap-2 w-full"
            >
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                className="p-2 rounded flex-1 outline-none"
                placeholder="Ask for a book..."
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Send
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white text-center w-45 text-xl px-5 py-2 rounded-full shadow hover:scale-110 transition"
        >
          💬 AI Chat
        </button>
      )}
    </div>
  );
}

function getBookObjectsByTitle(titles, allBooks) {
  return titles
    .map(title =>
      allBooks.find(book =>
        book.title.toLowerCase().trim() === title.toLowerCase().trim()
      )
    )
    .filter(Boolean); // remove nulls (if no match found)
}

function safeExtractJSON(responseText) {
  const firstBrace = responseText.indexOf('{');
  const lastBrace = responseText.lastIndexOf('}');

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error('No valid JSON object found in the response');
  }

  const jsonSubstring = responseText.slice(firstBrace, lastBrace + 1);

  try {
    return JSON.parse(jsonSubstring);
  } catch (err) {
    console.error('Failed to parse extracted JSON:', err);
    throw new Error('Response format is invalid');
  }
}

export default ChatWidget;
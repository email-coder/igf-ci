import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2, FileText, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  documents?: { title: string; href: string }[];
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Bonjour ! Je suis l'assistant virtuel de l'Inspection Générale des Finances de Côte d'Ivoire. Comment puis-je vous aider aujourd'hui ?",
    timestamp: new Date(),
  },
];

const suggestedQuestions = [
  "Qu'est-ce que l'IGF ?",
  "Comment déposer une plainte ?",
  "Quels documents sont disponibles ?",
  "Comment contacter l'IGF ?",
];

// Base de connaissances simple
const knowledgeBase: Record<string, { response: string; documents?: { title: string; href: string }[] }> = {
  "igf": {
    response: "L'Inspection Générale des Finances (IGF) est un organe de contrôle rattaché au Ministère des Finances et du Budget. Ses missions principales sont : le contrôle des finances publiques, l'audit, le conseil, et la lutte contre la corruption via la Brigade de Lutte contre la Corruption (BLC).",
    documents: [
      { title: "Présentation de l'IGF", href: "/presentation" },
      { title: "Décret n°99-599", href: "/documents" },
    ],
  },
  "plainte": {
    response: "Pour déposer une plainte ou une dénonciation, vous pouvez utiliser notre formulaire en ligne sur la page 'Plaintes et dénonciations'. Votre identité sera protégée et traitée de manière confidentielle. Vous pouvez également nous contacter directement par téléphone ou vous rendre à nos bureaux.",
    documents: [
      { title: "Déposer une plainte", href: "/plaintes" },
    ],
  },
  "document": {
    response: "Nous mettons à disposition de nombreux documents : rapports d'activités, programmes annuels, textes officiels (décrets, arrêtés), et guides pratiques. Tous ces documents sont téléchargeables gratuitement depuis nos sections Publications et Documents.",
    documents: [
      { title: "Publications", href: "/publications" },
      { title: "Centre de documents", href: "/documents" },
    ],
  },
  "contact": {
    response: "Vous pouvez nous contacter de plusieurs façons :\n\n📍 Adresse : Immeuble SCIAM, 6ème étage, Plateau, Abidjan\n📞 Téléphone : +225 27 22 22 22\n📧 Email : contact@igf.finances.gouv.ci\n⏰ Horaires : Lun-Ven, 7h30-16h30",
    documents: [
      { title: "Page contact", href: "/contact" },
    ],
  },
  "mission": {
    response: "L'IGF exerce quatre missions essentielles :\n\n1. **Contrôle** : Vérification de la régularité des opérations financières\n2. **Audit** : Évaluation de la gestion des organismes publics\n3. **Conseil** : Accompagnement des administrations\n4. **Lutte anti-corruption** : Via la Brigade de Lutte contre la Corruption",
    documents: [
      { title: "Nos missions", href: "/missions" },
    ],
  },
  "corruption": {
    response: "La Brigade de Lutte contre la Corruption (BLC) est l'unité spécialisée de l'IGF dédiée à la prévention et à la détection des actes de corruption. Elle reçoit les dénonciations, mène des enquêtes et transmet les dossiers aux autorités compétentes.",
    documents: [
      { title: "Lutte contre la corruption", href: "/missions/lutte-corruption" },
      { title: "Déposer une plainte", href: "/plaintes" },
    ],
  },
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findResponse = (query: string): { response: string; documents?: { title: string; href: string }[] } => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("igf") || lowerQuery.includes("inspection") || lowerQuery.includes("qu'est-ce")) {
      return knowledgeBase["igf"];
    }
    if (lowerQuery.includes("plainte") || lowerQuery.includes("dénonc") || lowerQuery.includes("signaler")) {
      return knowledgeBase["plainte"];
    }
    if (lowerQuery.includes("document") || lowerQuery.includes("rapport") || lowerQuery.includes("publication") || lowerQuery.includes("télécharger")) {
      return knowledgeBase["document"];
    }
    if (lowerQuery.includes("contact") || lowerQuery.includes("adresse") || lowerQuery.includes("téléphone") || lowerQuery.includes("email") || lowerQuery.includes("horaire")) {
      return knowledgeBase["contact"];
    }
    if (lowerQuery.includes("mission") || lowerQuery.includes("rôle") || lowerQuery.includes("activité")) {
      return knowledgeBase["mission"];
    }
    if (lowerQuery.includes("corruption") || lowerQuery.includes("brigade") || lowerQuery.includes("blc")) {
      return knowledgeBase["corruption"];
    }

    return {
      response: "Je vous remercie pour votre question. Pour une réponse plus précise, je vous invite à consulter notre FAQ ou à nous contacter directement. Puis-je vous aider avec autre chose ?",
      documents: [
        { title: "FAQ", href: "/faq" },
        { title: "Contact", href: "/contact" },
      ],
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const { response, documents } = findResponse(input);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
      documents,
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, assistantMessage]);
  };

  const handleSuggestion = (question: string) => {
    setInput(question);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        aria-label="Ouvrir l'assistant IA"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full animate-pulse" />
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-card border border-border rounded-2xl shadow-2xl transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-foreground/20 rounded-full">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading font-semibold">Assistant IGF</h3>
              <p className="text-xs text-primary-foreground/70">En ligne</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-primary-foreground/20 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-[350px] overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === "user" ? "bg-primary" : "bg-muted"
                }`}
              >
                {message.role === "user" ? (
                  <User className="h-4 w-4 text-primary-foreground" />
                ) : (
                  <Bot className="h-4 w-4 text-foreground" />
                )}
              </div>
              <div
                className={`max-w-[75%] ${
                  message.role === "user" ? "text-right" : ""
                }`}
              >
                <div
                  className={`p-3 rounded-2xl text-sm ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-muted text-foreground rounded-tl-sm"
                  }`}
                >
                  <p className="whitespace-pre-line">{message.content}</p>
                </div>
                
                {/* Document links */}
                {message.documents && message.documents.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {message.documents.map((doc, i) => (
                      <a
                        key={i}
                        href={doc.href}
                        className="flex items-center gap-2 text-xs text-primary hover:underline"
                      >
                        <FileText className="h-3 w-3" />
                        {doc.title}
                      </a>
                    ))}
                  </div>
                )}
                
                <p className="text-xs text-muted-foreground mt-1">
                  {message.timestamp.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-muted p-3 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 2 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-muted-foreground mb-2">Questions suggérées :</p>
            <div className="flex flex-wrap gap-1">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestion(q)}
                  className="text-xs px-3 py-1.5 bg-accent hover:bg-primary hover:text-primary-foreground rounded-full transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-border">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question..."
              className="flex-1 px-4 py-2 border border-border rounded-full bg-background focus:border-primary outline-none text-sm"
            />
            <Button
              type="submit"
              size="icon"
              className="rounded-full"
              disabled={!input.trim() || isTyping}
            >
              {isTyping ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AIAssistant;
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Calendar, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  author?: string;
}

interface ArticleDetailProps {
  article: Article;
  prevArticle?: Article | null;
  nextArticle?: Article | null;
}

const ArticleDetail = ({ article, prevArticle, nextArticle }: ArticleDetailProps) => {
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = article.title;

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, "_blank");
        break;
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
        break;
    }
  };

  return (
    <article className="py-12">
      <div className="container max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center gap-2 text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/actualites" className="hover:text-primary transition-colors">
                Actualités
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground truncate max-w-xs">{article.title}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded">
              <Tag className="h-3.5 w-3.5" />
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {article.date}
            </span>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed">
            {article.excerpt}
          </p>
        </header>

        {/* Featured image */}
        <div className="aspect-video mb-8 overflow-hidden rounded-lg">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        {/* Share */}
        <div className="flex items-center gap-4 py-6 border-t border-b border-border mb-12">
          <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Share2 className="h-4 w-4" />
            Partager
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleShare("facebook")}
              className="p-2 hover:bg-accent rounded-full transition-colors"
              aria-label="Partager sur Facebook"
            >
              <Facebook className="h-5 w-5 text-[#1877F2]" />
            </button>
            <button
              onClick={() => handleShare("twitter")}
              className="p-2 hover:bg-accent rounded-full transition-colors"
              aria-label="Partager sur Twitter"
            >
              <Twitter className="h-5 w-5 text-[#1DA1F2]" />
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className="p-2 hover:bg-accent rounded-full transition-colors"
              aria-label="Partager sur LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-[#0A66C2]" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prevArticle ? (
            <Link
              to={`/actualites/${prevArticle.slug}`}
              className="group flex items-center gap-4 p-4 border border-border rounded-lg hover:border-primary hover:bg-accent/50 transition-all"
            >
              <ChevronLeft className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              <div className="text-left">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Article précédent
                </span>
                <p className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                  {prevArticle.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextArticle && (
            <Link
              to={`/actualites/${nextArticle.slug}`}
              className="group flex items-center justify-end gap-4 p-4 border border-border rounded-lg hover:border-primary hover:bg-accent/50 transition-all"
            >
              <div className="text-right">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Article suivant
                </span>
                <p className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                  {nextArticle.title}
                </p>
              </div>
              <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
};

export default ArticleDetail;

import Layout from "@/components/layout/Layout";
import DocumentCenter from "@/components/documents/DocumentCenter";

const Documents = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-section-dark text-hero-foreground py-12">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">Documents</h1>
          <p className="text-lg text-white/80">
            Centre de documentation officiel de l'IGF
          </p>
        </div>
      </section>

      {/* Document Center */}
      <DocumentCenter />
    </Layout>
  );
};

export default Documents;

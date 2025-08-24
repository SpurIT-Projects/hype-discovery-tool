import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How accurate are the contact details?",
    answer: "All email addresses are verified and updated daily. We maintain a 95%+ accuracy rate and remove any invalid contacts immediately."
  },
  {
    question: "What platforms do you cover?",
    answer: "We cover Instagram, YouTube, TikTok, Twitter, and Twitch. Our database includes influencers from micro to mega level across all major platforms."
  },
  {
    question: "How often is the database updated?",
    answer: "We update follower counts, engagement rates, and contact information daily. Our automated systems ensure you always get the most current data."
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer: "Yes! We offer a 30-day money-back guarantee. If you're not satisfied with the quality of contacts, we'll provide a full refund."
  },
  {
    question: "Do you provide analytics and insights?",
    answer: "Absolutely! Each influencer profile includes detailed analytics: engagement rates, average views, follower growth, and audience demographics."
  },
  {
    question: "Is there a limit on how many contacts I can download?",
    answer: "It depends on your package. Our plans range from 100 contacts to unlimited access. Check our pricing options above for details."
  },
  {
    question: "How do you ensure influencer authenticity?",
    answer: "We use advanced algorithms to detect fake followers and engagement. Only authentic influencers with real audiences make it into our database."
  },
  {
    question: "Can I filter by specific niches or categories?",
    answer: "Yes! Our advanced filters let you search by over 50 categories including beauty, tech, fitness, fashion, gaming, food, and many more."
  }
];

export const FAQ = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Everything you need to know about our influencer database
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-gradient-card rounded-2xl px-6 shadow-card"
            >
              <AccordionTrigger className="text-left text-foreground hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "At what age can I start giving Uggu to my baby?",
    answer:
      "Mother Uggu is suitable for babies 6 months and above. We recommend consulting with your pediatrician before introducing any new food to your baby's diet. Start with thin consistency and gradually thicken as your baby adapts.",
  },
  {
    question: "Is Mother Uggu safe for babies with allergies?",
    answer:
      "Mother Uggu contains multiple grains, pulses, and nuts. Please check the ingredients list carefully if your baby has any known allergies. We recommend consulting with your healthcare provider before introducing Uggu if your baby has food allergies.",
  },
  {
    question: "How should I store Mother Uggu?",
    answer:
      "Store Mother Uggu in a cool, dry place away from direct sunlight. Once opened, keep the pack tightly sealed or transfer to an airtight container. Use within 3 months of opening for best freshness.",
  },
  {
    question: "Can I mix Uggu with breast milk or formula?",
    answer:
      "Yes, you can mix Mother Uggu with breast milk, formula, or regular water/cow's milk (for babies above 1 year). Mixing with milk adds extra nutrition and makes it creamier.",
  },
  {
    question: "How many times a day can I feed Uggu to my baby?",
    answer:
      "For babies 6-8 months, start with one serving per day. As your baby grows and accepts more solid foods, you can increase to 2-3 servings. Always follow your pediatrician's feeding recommendations.",
  },
  {
    question: "Is Mother Uggu truly homemade?",
    answer:
      "Yes! Every batch of Mother Uggu is prepared in small quantities using traditional methods. We roast each ingredient separately to perfection, grind them fresh, and pack immediately to preserve nutrition and taste.",
  },
]

export function ProductFAQ() {
  return (
    <section className="py-16 bg-[#FDF8F3]">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#8B7355] mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-2xl px-6 border-none">
              <AccordionTrigger className="text-left text-[#8B7355] hover:text-[#E8A87C] hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#A89076] pb-4">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

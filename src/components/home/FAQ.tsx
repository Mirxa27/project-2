import React from 'react';

const FAQ = () => {
  const faqs = [
    {
      category: 'For Property Owners',
      questions: [
        {
          q: 'How does the profit-sharing model work?',
          a: 'We manage your property and split the profits based on a pre-agreed percentage, ensuring a win-win situation.'
        },
        {
          q: 'Can I choose how to rent out my property?',
          a: 'Yes, you can select from daily, monthly, or yearly rental options depending on your preferences.'
        }
      ]
    },
    {
      category: 'For Investors',
      questions: [
        {
          q: 'Do you assist with the legal aspects of purchasing property in Saudi Arabia?',
          a: 'Absolutely. We guide you through the entire process, ensuring compliance with all legal requirements.'
        },
        {
          q: 'How do you ensure my property is well-maintained?',
          a: 'Our management team conducts regular inspections and handles all maintenance issues promptly.'
        }
      ]
    },
    {
      category: 'For Guests',
      questions: [
        {
          q: 'What types of properties are available?',
          a: 'We offer a wide range of properties, from cozy apartments to luxurious villas, to suit all preferences and budgets.'
        },
        {
          q: 'Is customer support available during my stay?',
          a: 'Yes, our support team is available 24/7 to assist you with any needs during your stay.'
        }
      ]
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        
        <div className="max-w-4xl mx-auto space-y-12">
          {faqs.map((category, index) => (
            <div key={index}>
              <h3 className="text-2xl font-bold mb-6">{category.category}</h3>
              <div className="space-y-6">
                {category.questions.map((faq, faqIndex) => (
                  <div key={faqIndex} className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-lg font-semibold mb-2">{faq.q}</h4>
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
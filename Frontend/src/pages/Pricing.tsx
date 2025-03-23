import { PriceCard } from '@/components/PriceCards'

const Pricing = () => {

    const pricingPlans = [
        {
            title: "Starter",
            price: "$30",
            description: "One time payment for 500 credits",
            features: [
                "500 Credits",
                "Approximately 480 images with 1 model training",
                "Standart Processing",
                "24/7 Email Support",
            ],
            ctaText: "Upgrade to Pro"
        },
        {
            title: "Value Pack",
            price: "$50",
            description: "One time payment for 1000 credits",
            features: [
                "1000 Credits",
                "Approximately 900 images with 5 model training",
                "Standart Processing",
                "24/7 Email Support",
            ],
            isPopular: true,
            ctaText: "Contact Sales"
        }
    ];

    return (
        <section id="pricing" className="py-20 bg-muted/30 flex justify-center mt-40">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="mt-4 text-muted-foreground md:text-xl max-w-3xl mx-auto">
                        Choose the plan that fits your needs
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {pricingPlans.map((plan, index) => (
                        <PriceCard
                            key={index}
                            title={plan.title}
                            price={plan.price}
                            description={plan.description}
                            features={plan.features}
                            isPopular={plan.isPopular}
                            ctaText={plan.ctaText}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Pricing
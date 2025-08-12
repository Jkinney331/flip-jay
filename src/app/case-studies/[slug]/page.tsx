import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LiquidButton } from '@/components/ui/Liquid-button';
import { ArrowLeft, CheckCircle, TrendingUp, Users, Clock } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  image: string;
  description: string;
  slug: string;
  fullContent: {
    challenge: string;
    solution: string;
    results: string[];
    metrics: {
      label: string;
      value: string;
      description: string;
    }[];
    testimonial?: {
      quote: string;
      author: string;
      role: string;
      company: string;
    };
  };
}

const caseStudiesData: CaseStudy[] = [
  {
    id: "f-bot-fascia-health",
    title: "F-Bot - Fascia Health AI Assistant",
    image: "/robot.webp",
    description: "Revolutionary fascia-focused chatbot trained on extensive medical and wellness data.",
    slug: "f-bot-fascia-health-ai-assistant",
    fullContent: {
      challenge: "The fascia health industry lacked accessible, accurate guidance for patients seeking relief from chronic pain and movement dysfunction. Traditional consultations were expensive and time-consuming, leaving many without proper support.",
      solution: "We developed F-Bot, an AI-powered health assistant trained on extensive medical literature, movement science research, and fascia health protocols. The chatbot provides personalized guidance while maintaining medical accuracy and an empathetic tone.",
      results: [
        "Handles 5,000+ daily user interactions with 95% accuracy",
        "Reduced patient wait times from weeks to seconds",
        "Integrated with 12 healthcare platforms",
        "24/7 availability in multiple languages"
      ],
      metrics: [
        {
          label: "User Satisfaction",
          value: "94%",
          description: "Positive feedback from users"
        },
        {
          label: "Response Accuracy", 
          value: "95%",
          description: "Medical-grade precision"
        },
        {
          label: "Daily Interactions",
          value: "5,000+",
          description: "User queries handled"
        }
      ],
      testimonial: {
        quote: "F-Bot has revolutionized how we provide fascia health guidance. Our patients get instant, accurate support 24/7.",
        author: "Dr. Sarah Mitchell",
        role: "Lead Physiotherapist",
        company: "Wellness Health Center"
      }
    }
  },
  {
    id: "cryptoedge-trading-agent",
    title: "CryptoEdge - Trading Intelligence Agent",
    image: "/screen.webp",
    description: "Sophisticated crypto trading agent analyzing market patterns 24/7.",
    slug: "cryptoedge-trading-intelligence-agent",
    fullContent: {
      challenge: "Cryptocurrency markets operate 24/7 with extreme volatility, making it impossible for human traders to monitor all opportunities and execute optimal trades across multiple exchanges simultaneously.",
      solution: "We built CryptoEdge, an AI trading agent that analyzes millions of data points per second across multiple exchanges, identifies patterns, and executes trades based on sophisticated predictive models with risk management protocols.",
      results: [
        "73% win rate on executed trades",
        "24/7 market monitoring and execution",
        "Processes millions of data points per second",
        "Integrated with 8 major cryptocurrency exchanges"
      ],
      metrics: [
        {
          label: "Win Rate",
          value: "73%",
          description: "Successful trades executed"
        },
        {
          label: "Data Processing",
          value: "2M+",
          description: "Data points per second"
        },
        {
          label: "Market Coverage",
          value: "8",
          description: "Major exchanges integrated"
        }
      ],
      testimonial: {
        quote: "CryptoEdge has completely transformed our trading operations. The AI never sleeps and consistently outperforms our human traders.",
        author: "Michael Chen",
        role: "Head of Trading",
        company: "Quantum Capital"
      }
    }
  },
  {
    id: "viralvoice-social-media",
    title: "ViralVoice - Social Media AI Manager",
    image: "/socialmedia.webp",
    description: "Smart social media management AI that creates, schedules, and optimizes content across platforms.",
    slug: "viralvoice-social-media-ai-manager",
    fullContent: {
      challenge: "Managing multiple social media platforms while maintaining consistent brand voice, optimal posting times, and engaging content was overwhelming for marketing teams, leading to decreased engagement and inconsistent messaging.",
      solution: "ViralVoice AI was developed to manage content across 6 major platforms simultaneously. It generates brand-consistent posts, responds to comments, identifies trending topics, and optimizes posting schedules based on audience behavior analytics.",
      results: [
        "340% increase in engagement rates",
        "Manages 6 platforms simultaneously", 
        "95% reduction in manual posting time",
        "Real-time trend identification and response"
      ],
      metrics: [
        {
          label: "Engagement Increase",
          value: "340%",
          description: "Average across all platforms"
        },
        {
          label: "Time Saved",
          value: "95%",
          description: "Reduction in manual work"
        },
        {
          label: "Platform Coverage",
          value: "6",
          description: "Social media platforms"
        }
      ],
      testimonial: {
        quote: "ViralVoice has made our social media presence incredibly efficient. Our engagement has skyrocketed while our workload has decreased dramatically.",
        author: "Amanda Rodriguez",
        role: "Marketing Director", 
        company: "TrendWave Media"
      }
    }
  }
];

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = caseStudiesData.find(study => study.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="container mx-auto px-6 py-8">
        <Link 
          href="/#case-studies" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Case Studies
        </Link>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {caseStudy.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {caseStudy.description}
            </p>
            <div className="flex gap-4">
              <LiquidButton onClick={() => window.location.href = '#contact'}>
                Start Your Project
              </LiquidButton>
            </div>
          </div>
          <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden">
            <Image
              src={caseStudy.image}
              alt={caseStudy.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Key Results</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {caseStudy.fullContent.metrics.map((metric, index) => (
              <div key={index} className="text-center p-6 bg-background rounded-lg shadow-sm">
                <div className="text-4xl font-bold text-primary mb-2">{metric.value}</div>
                <div className="text-lg font-semibold mb-2">{metric.label}</div>
                <div className="text-muted-foreground">{metric.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Content */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-1 gap-12">
            {/* Challenge */}
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                The Challenge
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {caseStudy.fullContent.challenge}
              </p>
            </div>

            {/* Solution */}
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                Our Solution
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {caseStudy.fullContent.solution}
              </p>
            </div>

            {/* Results */}
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                Results Delivered
              </h2>
              <ul className="space-y-4">
                {caseStudy.fullContent.results.map((result, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-lg text-muted-foreground">{result}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Testimonial */}
            {caseStudy.fullContent.testimonial && (
              <div className="bg-muted/50 p-8 rounded-xl">
                <blockquote className="text-xl italic text-foreground mb-6">
                  "{caseStudy.fullContent.testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-semibold">{caseStudy.fullContent.testimonial.author}</div>
                    <div className="text-muted-foreground">
                      {caseStudy.fullContent.testimonial.role}, {caseStudy.fullContent.testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            See how we can create a custom AI solution for your specific needs, just like we did for {caseStudy.title.split(' - ')[0]}.
          </p>
          <LiquidButton 
            className="px-8 py-4 text-lg"
            onClick={() => window.location.href = '#contact'}
          >
            Start Your AI Project
          </LiquidButton>
        </div>
      </section>
    </main>
  );
}

// Generate static params for all case studies
export function generateStaticParams() {
  return caseStudiesData.map((study) => ({
    slug: study.slug,
  }));
}

// Generate metadata for each case study
export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = caseStudiesData.find(study => study.slug === slug);
  
  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    };
  }

  return {
    title: `${caseStudy.title} - FlipTech Pro Case Study`,
    description: caseStudy.description,
  };
}

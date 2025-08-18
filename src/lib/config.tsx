import { FirstBentoAnimation } from "@/components/first-bento-animation";
import { FourthBentoAnimation } from "@/components/fourth-bento-animation";
import { SecondBentoAnimation } from "@/components/second-bento-animation";
import { ThirdBentoAnimation } from "@/components/third-bento-animation";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Globe } from "@/components/ui/globe";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { companyLogos } from "./config-logos";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "p-1 py-0.5 font-medium dark:font-semibold text-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
};

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "FlipTech AI",
  description: "Your On-Call Dev, On-Demand. Quality development at affordable rates.",
  cta: "Start Your Project",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: [
    "FlipTech AI",
    "Development Services",
    "Web Development",
    "Mobile Development",
    "Hourly Developer",
  ],
  // links: {
  //   email: "support@calai.app",
  //   twitter: "https://twitter.com/calaiapp",
  //   discord: "https://discord.gg/calaiapp",
  //   github: "https://github.com/calaiapp",
  //   instagram: "https://instagram.com/calaiapp",
  // },
  nav: {
    links: [
      { id: 1, name: "Work", href: "#services" },
      { id: 2, name: "Process", href: "#process" },
      { id: 3, name: "Pricing", href: "#pricing" },
      { id: 4, name: "Contact", href: "#contact" },
    ],
  },
  hero: {
    // badgeIcon: (
    //   <svg
    //     width="16"
    //     height="16"
    //     viewBox="0 0 16 16"
    //     fill="none"
    //     xmlns="http://www.w3.org/2000/svg"
    //     className="dark:fill-white fill-[#364153]"
    //   >
    //     <path d="M7.62758 1.09876C7.74088 1.03404 7.8691 1 7.99958 1C8.13006 1 8.25828 1.03404 8.37158 1.09876L13.6216 4.09876C13.7363 4.16438 13.8316 4.25915 13.8979 4.37347C13.9642 4.48779 13.9992 4.6176 13.9992 4.74976C13.9992 4.88191 13.9642 5.01172 13.8979 5.12604C13.8316 5.24036 13.7363 5.33513 13.6216 5.40076L8.37158 8.40076C8.25828 8.46548 8.13006 8.49952 7.99958 8.49952C7.8691 8.49952 7.74088 8.46548 7.62758 8.40076L2.37758 5.40076C2.26287 5.33513 2.16753 5.24036 2.10123 5.12604C2.03492 5.01172 2 4.88191 2 4.74976C2 4.6176 2.03492 4.48779 2.10123 4.37347C2.16753 4.25915 2.26287 4.16438 2.37758 4.09876L7.62758 1.09876Z" />
    //     <path d="M2.56958 7.23928L2.37758 7.34928C2.26287 7.41491 2.16753 7.50968 2.10123 7.624C2.03492 7.73831 2 7.86813 2 8.00028C2 8.13244 2.03492 8.26225 2.10123 8.37657C2.16753 8.49089 2.26287 8.58566 2.37758 8.65128L7.62758 11.6513C7.74088 11.716 7.8691 11.75 7.99958 11.75C8.13006 11.75 8.25828 11.716 8.37158 11.6513L13.6216 8.65128C13.7365 8.58573 13.8321 8.49093 13.8986 8.3765C13.965 8.26208 14 8.13211 14 7.99978C14 7.86745 13.965 7.73748 13.8986 7.62306C13.8321 7.50864 13.7365 7.41384 13.6216 7.34828L13.4296 7.23828L9.11558 9.70328C8.77568 9.89744 8.39102 9.99956 7.99958 9.99956C7.60814 9.99956 7.22347 9.89744 6.88358 9.70328L2.56958 7.23928Z" />
    //     <path d="M2.37845 10.5993L2.57045 10.4893L6.88445 12.9533C7.22435 13.1474 7.60901 13.2496 8.00045 13.2496C8.39189 13.2496 8.77656 13.1474 9.11645 12.9533L13.4305 10.4883L13.6225 10.5983C13.7374 10.6638 13.833 10.7586 13.8994 10.8731C13.9659 10.9875 14.0009 11.1175 14.0009 11.2498C14.0009 11.3821 13.9659 11.5121 13.8994 11.6265C13.833 11.7409 13.7374 11.8357 13.6225 11.9013L8.37245 14.9013C8.25915 14.966 8.13093 15 8.00045 15C7.86997 15 7.74175 14.966 7.62845 14.9013L2.37845 11.9013C2.2635 11.8357 2.16795 11.7409 2.10148 11.6265C2.03501 11.5121 2 11.3821 2 11.2498C2 11.1175 2.03501 10.9875 2.10148 10.8731C2.16795 10.7586 2.2635 10.6638 2.37845 10.5983V10.5993Z" />
    //   </svg>
    // ),
    // badge: "Introducing custom automations", 
    title: "Your On-Call Dev, On-Demand",
    description:
      "From quick fixes to complete builds, I deliver. Whether you need a bug squashed or an MVP launched, I'm your guy. Hourly or fixed-fee—your project, your choice.",
    support_text: "",  
    cta: {
      primary: {
        text: "Start Your Project",
        href: "#contact",
      },
      secondary: {
        text: "Book a Call",
        href: "https://calendly.com/jay-flip-tech/flip-tech-pro-introduction-call",
      },
      // secondary: {
      //   text: "Log in",
      //   href: "#",
      // },
    },
  },
  companyShowcase: {
    companyLogos: companyLogos,
  },
  featureSection: {
    title: "Meet Your Specialized AI Agents",
    // description:
    //   "Meet Your Specialized AI Teams - dedicated departments, infinite possibilities. Deploy specialized AI teams across marketing, operations, product, research, and support.",
    items: [
      {
        id: 1,
        title: "Nancy",
        content:
          "Natural Language Processing Specialist Transforms communication into actionable insights",
        // image:
        //   "https://images.unsplash.com/photo-1720371300677-ba4838fa0678?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 2,
        title: "Ellis",
        content:
          "Predictive Analytics Expert Forecasts trends before they happen",
        // image:
        //   "https://images.unsplash.com/photo-1686170287433-c95faf6d3608?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8fA%3D%3D",
      },
      {
        id: 3,
        title: "Justin",
        content:
          "Intelligent Automation Architect Streamlines workflows with surgical precision",
        // image:
        //   "https://images.unsplash.com/photo-1720378042271-60aff1e1c538?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 4,
        title: "Dan",
        content:
          "Social Media Strategist Amplifies your brand voice across all channels",
        // image:
        //   "https://images.unsplash.com/photo-1666882990322-e7f3b8df4f75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
      },
      {
        id: 5,
        title: "Chloe",
        content:
          "Project Operations Manager Keeps everything running like clockwork",
        // image:
        //   "https://images.unsplash.com/photo-1666882990322-e7f3b8df4f75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
      },
      {
        id: 6,
        title: "Your Custom Agent",
        content:
          "Built Just for You We'll create the exact AI agent your business needs",
        // image:
        //   "https://images.unsplash.com/photo-1666882990322-e7f3b8df4f75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
      },
    ],
  },
  AIDashboardSection: {
    // title: "Simple. Seamless. Smart.",
    // description:
    //   "Discover how SkyAgent transforms your commands into action in four easy steps",
    items: [
      {
        id: 1,
        title: "AI-Powered Analytics",
        content:
          "Get instant insights into your business performance with our advanced AI analytics dashboard. Monitor key metrics, track trends, and make data-driven decisions in real-time.",
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop' 
      },
      {
        id: 2,
        title: 'Smart Automation',
    content: 'Automate repetitive tasks and workflows with intelligent AI agents. From customer service to data processing, our dashboard handles it all while you focus on growth.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
      },
      {
        id: 3,
       title: 'Real-Time Monitoring',
    content: 'Stay ahead of the curve with real-time monitoring and alerts. Our dashboard provides instant notifications and predictive insights to keep your business running smoothly.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'
  },
      {
        id: 4,
       title: 'Custom Integrations',
    content: 'Seamlessly integrate with your existing tools and platforms. Our dashboard connects with CRM systems, marketing tools, and more to create a unified business ecosystem.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop'
  },
  { 
        id: 5,
    title: 'Advanced Reporting',
    content: 'Generate comprehensive reports and visualizations that tell your business story. From executive summaries to detailed analytics, get the insights you need to succeed.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
  },
    ],
  },
  bentoSection: {
    title: "Everything you need, nothing you don't",
    description:
      "Transparent pricing, rapid delivery, and expert execution across every aspect of digital development.",
    items: [
      {
        id: 1,
        content: <FirstBentoAnimation />,
        title: "Flexible Engagement",
        description:
          "Choose what works for you—$75/hour for ongoing needs or fixed pricing for defined projects. No hidden fees, no surprises.",
      },
      {
        id: 2,
        content: <SecondBentoAnimation />,
        title: "Full-Stack Capabilities",
        description:
          "From React to WordPress, Shopify to custom backends—I speak the languages your project needs.",
      },
      {
        id: 3,
        content: (
          <ThirdBentoAnimation
            data={[20, 30, 25, 45, 40, 55, 75]}
            toolTipValues={[
              1234, 1678, 2101, 2534, 2967, 3400, 3833, 4266, 4700, 5133,
            ]}
          />
        ),
        title: "Rapid Turnaround",
        description:
          "Quick fixes in hours, landing pages in days, MVPs in weeks. I move at your speed, not agency pace.",
      },
      {
        id: 4,
        content: <FourthBentoAnimation once={false} />,
        title: "Human + AI Powered",
        description:
          "I use AI to accelerate the boring parts while keeping the human touch where quality matters.",
      },
    ],
  },
  benefits: [
    {
      id: 1,
      text: "Save hours each week with AI-optimized scheduling.",
      image: "/Device-6.png",
    },
    {
      id: 2,
      text: "Reduce scheduling conflicts and double-bookings.",
      image: "/Device-7.png",
    },
    {
      id: 3,
      text: "Improve work-life balance with smart time allocation.",
      image: "/Device-8.png",
    },
    {
      id: 4,
      text: "Increase productivity with AI-driven time management insights.",
      image: "/Device-1.png",
    },
  ],
  growthSection: {
    title: "Built for your success",
    description:
      "Transparent process, predictable outcomes, and a partner who actually picks up the phone.",
    items: [
      {
        id: 1,
        content: (
          <div
            className="relative flex size-full items-center justify-center overflow-hidden transition-all duration-300 hover:[mask-image:none] hover:[webkit-mask-image:none]"
            style={{
              WebkitMaskImage: `url("data:image/svg+xml,%3Csvg width='265' height='268' viewBox='0 0 265 268' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M121.384 4.5393C124.406 1.99342 128.319 0.585938 132.374 0.585938C136.429 0.585938 140.342 1.99342 143.365 4.5393C173.074 29.6304 210.174 45.6338 249.754 50.4314C253.64 50.9018 257.221 52.6601 259.855 55.3912C262.489 58.1223 264.005 61.6477 264.13 65.3354C265.616 106.338 254.748 146.9 232.782 182.329C210.816 217.759 178.649 246.61 140.002 265.547C137.645 266.701 135.028 267.301 132.371 267.298C129.715 267.294 127.1 266.686 124.747 265.526C86.0991 246.59 53.9325 217.739 31.9665 182.309C10.0005 146.879 -0.867679 106.317 0.618784 65.3147C0.748654 61.6306 2.26627 58.1102 4.9001 55.3833C7.53394 52.6565 11.1121 50.9012 14.9945 50.4314C54.572 45.6396 91.6716 29.6435 121.384 4.56V4.5393Z' fill='black'/%3E%3C/svg%3E")`,
              maskImage: `url("data:image/svg+xml,%3Csvg width='265' height='268' viewBox='0 0 265 268' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M121.384 4.5393C124.406 1.99342 128.319 0.585938 132.374 0.585938C136.429 0.585938 140.342 1.99342 143.365 4.5393C173.074 29.6304 210.174 45.6338 249.754 50.4314C253.64 50.9018 257.221 52.6601 259.855 55.3912C262.489 58.1223 264.005 61.6477 264.13 65.3354C265.616 106.338 254.748 146.9 232.782 182.329C210.816 217.759 178.649 246.61 140.002 265.547C137.645 266.701 135.028 267.301 132.371 267.298C129.715 267.294 127.1 266.686 124.747 265.526C86.0991 246.59 53.9325 217.739 31.9665 182.309C10.0005 146.879 -0.867679 106.317 0.618784 65.3147C0.748654 61.6306 2.26627 58.1102 4.9001 55.3833C7.53394 52.6565 11.1121 50.9012 14.9945 50.4314C54.572 45.6396 91.6716 29.6435 121.384 4.56V4.5393Z' fill='black'/%3E%3C/svg%3E")`,
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
            }}
          >
            <div className="absolute top-[55%] md:top-[58%] left-[55%] md:left-[57%] -translate-x-1/2 -translate-y-1/2  size-full z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="227"
                height="244"
                viewBox="0 0 227 244"
                fill="none"
                className="size-[90%] md:size-[85%] object-contain fill-background"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M104.06 3.61671C106.656 1.28763 110.017 0 113.5 0C116.983 0 120.344 1.28763 122.94 3.61671C148.459 26.5711 180.325 41.2118 214.322 45.6008C217.66 46.0312 220.736 47.6398 222.999 50.1383C225.262 52.6369 226.563 55.862 226.67 59.2357C227.947 96.7468 218.612 133.854 199.744 166.267C180.877 198.68 153.248 225.074 120.052 242.398C118.028 243.454 115.779 244.003 113.498 244C111.216 243.997 108.969 243.441 106.948 242.379C73.7524 225.055 46.1231 198.661 27.2556 166.248C8.38807 133.835 -0.947042 96.7279 0.329744 59.2168C0.441295 55.8464 1.74484 52.6258 4.00715 50.1311C6.26946 47.6365 9.34293 46.0306 12.6777 45.6008C46.6725 41.2171 78.5389 26.5832 104.06 3.63565V3.61671Z"
                />
              </svg>
            </div>
            <div className="absolute top-[58%] md:top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2  size-full z-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="245"
                height="282"
                viewBox="0 0 245 282"
                className="size-full object-contain fill-accent"
              >
                <g filter="url(#filter0_dddd_2_33)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M113.664 7.33065C116.025 5.21236 119.082 4.04126 122.25 4.04126C125.418 4.04126 128.475 5.21236 130.836 7.33065C154.045 28.2076 183.028 41.5233 213.948 45.5151C216.984 45.9065 219.781 47.3695 221.839 49.6419C223.897 51.9144 225.081 54.8476 225.178 57.916C226.339 92.0322 217.849 125.781 200.689 155.261C183.529 184.74 158.4 208.746 128.209 224.501C126.368 225.462 124.323 225.962 122.248 225.959C120.173 225.956 118.13 225.45 116.291 224.484C86.0997 208.728 60.971 184.723 43.811 155.244C26.6511 125.764 18.1608 92.015 19.322 57.8988C19.4235 54.8334 20.6091 51.9043 22.6666 49.6354C24.7242 47.3665 27.5195 45.906 30.5524 45.5151C61.4706 41.5281 90.4531 28.2186 113.664 7.34787V7.33065Z"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_dddd_2_33"
                    x="0.217041"
                    y="0.0412598"
                    width="244.066"
                    height="292.917"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="3" />
                    <feGaussianBlur stdDeviation="3.5" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_2_33"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="12" />
                    <feGaussianBlur stdDeviation="6" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="effect1_dropShadow_2_33"
                      result="effect2_dropShadow_2_33"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="27" />
                    <feGaussianBlur stdDeviation="8" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="effect2_dropShadow_2_33"
                      result="effect3_dropShadow_2_33"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="48" />
                    <feGaussianBlur stdDeviation="9.5" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.01 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="effect3_dropShadow_2_33"
                      result="effect4_dropShadow_2_33"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect4_dropShadow_2_33"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="81"
                height="80"
                viewBox="0 0 81 80"
                className="fill-background"
              >
                <g filter="url(#filter0_iiii_2_34)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.5 36V28C20.5 22.6957 22.6071 17.6086 26.3579 13.8579C30.1086 10.1071 35.1957 8 40.5 8C45.8043 8 50.8914 10.1071 54.6421 13.8579C58.3929 17.6086 60.5 22.6957 60.5 28V36C62.6217 36 64.6566 36.8429 66.1569 38.3431C67.6571 39.8434 68.5 41.8783 68.5 44V64C68.5 66.1217 67.6571 68.1566 66.1569 69.6569C64.6566 71.1571 62.6217 72 60.5 72H20.5C18.3783 72 16.3434 71.1571 14.8431 69.6569C13.3429 68.1566 12.5 66.1217 12.5 64V44C12.5 41.8783 13.3429 39.8434 14.8431 38.3431C16.3434 36.8429 18.3783 36 20.5 36ZM52.5 28V36H28.5V28C28.5 24.8174 29.7643 21.7652 32.0147 19.5147C34.2652 17.2643 37.3174 16 40.5 16C43.6826 16 46.7348 17.2643 48.9853 19.5147C51.2357 21.7652 52.5 24.8174 52.5 28Z"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_iiii_2_34"
                    x="12.5"
                    y="8"
                    width="56"
                    height="70"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="1" />
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="shape"
                      result="effect1_innerShadow_2_34"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="3" />
                    <feGaussianBlur stdDeviation="1.5" />
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="effect1_innerShadow_2_34"
                      result="effect2_innerShadow_2_34"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="8" />
                    <feGaussianBlur stdDeviation="2.5" />
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="effect2_innerShadow_2_34"
                      result="effect3_innerShadow_2_34"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="14" />
                    <feGaussianBlur stdDeviation="3" />
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.01 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="effect3_innerShadow_2_34"
                      result="effect4_innerShadow_2_34"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
            <div className="size-full">
              <FlickeringGrid
                className="size-full"
                gridGap={4}
                squareSize={2}
                maxOpacity={0.5}
              />
            </div>
          </div>
        ),

        title: "Transparent Pricing",
        description:
          "You'll know exactly what you're paying for: detailed estimates, time tracking, and regular progress updates.",
      },
      {
        id: 2,
        content: (
          <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden [mask-image:linear-gradient(to_top,transparent,black_50%)] -translate-y-20">
            <Globe className="top-28" />
          </div>
        ),

        title: "Scale As Needed",
        description:
          "Start with a quick fix; scale to a full squad. I add specialists as your project grows.",
      },
    ],
  },
  // quoteSection: {
  //   quote:
  //     "SkyAgent has transformed our daily operations. Tasks that once consumed hours now complete in moments, freeing our team to focus on creativity and strategic growth.",
  //   author: {
  //     name: "Alex Johnson",
  //     role: "CTO, Innovatech",
  //     image: "https://randomuser.me/api/portraits/men/91.jpg",
  //   },
  // },
  pricing: {
    title: "One Investment, Infinite Returns",
    description:
      "Simple, transparent pricing. No hidden fees, no surprises.",
    pricingItems: [
      // {
      //   name: "Single price focus",
      //   // href: "#",
      //   price: "$9,500",
      //   // period: "month",
      //   // yearlyPrice: "$0",
      //   features: [
      //     "1 AI Team",
      //     "Core integrations",
      //     "Standard support",
      //   ],
      //   description: " Your complete AI solution in 14 days",
      //   buttonText: "Get Started",
      //   buttonColor: "bg-accent text-primary",
      //   isPopular: false,
      // },
      {
        name: "",
        // href: "#",
        price: "75",
        // period: "hour",
        // yearlyPrice: "$120",
        features: [
          "Pay only for time used",
          "Detailed time tracking",
          "Weekly invoicing",
          "No minimum hours",
          "Pause anytime",
          "Flexible scheduling",
        ],
        description: "Best for: ongoing support, bug fixes, small features",
        // buttonText: "Go Professional",
        // buttonColor: "bg-secondary text-white",
        // isPopular: true,
      },
      // {
      //   name: "Enterprise",
      //   // href: "#",
      //   price: "Contact Us",
      //   period: "month",
      //   // yearlyPrice: "$240",
      //   features: [
      //     "Unlimited teams",
      //     "Custom configurations",
      //     "Dedicated success manager",
          
      //   ],
      //   description: "Best for large organizations",
      //   buttonText: "Contact Sales",
      //   buttonColor: "bg-primary text-primary-foreground",
      //   isPopular: false,
      // },
    ],
  },
  testimonials: [
    {
      id: "1",
      name: "Sarah M.",
      role: "Startup Founder",
      img: "https://randomuser.me/api/portraits/women/12.jpg",
      description: (
        <p>
          "Needed our MVP built fast. FlipTech delivered in 4 weeks what agencies quoted 3 months for. Half the price too."
        </p>
      ),
    },
    {
      id: "2",
      name: "James R.",
      role: "E-commerce Owner",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      description: (
        <p>
          "My Shopify store was a mess. They fixed everything in 2 days. Now it actually converts. Best $75/hour I've spent."
        </p>
      ),
    },
    {
      id: "3",
      name: "Lisa K.",
      role: "Marketing Director",
      img: "https://randomuser.me/api/portraits/women/45.jpg",
      description: (
        <p>
          "We use them for all our landing pages. Fast, responsive, and they actually understand conversion. Our go-to team."
        </p>
      ),
    },
    {
      id: "4",
      name: "Mark D.",
      role: "SaaS CEO",
      img: "https://randomuser.me/api/portraits/men/67.jpg",
      description: (
        <p>
          "From React frontend to Node backend, they handle it all. Like having a CTO on demand without the equity."
        </p>
      ),
    },
    {
      id: "5",
      name: "Jennifer H.",
      role: "Agency Owner",
      img: "https://randomuser.me/api/portraits/women/23.jpg",
      description: (
        <p>
          "We white-label through FlipTech. They handle the dev, we handle the client. Perfect partnership."
        </p>
      ),
    },
    {
      id: "6",
      name: "Tom S.",
      role: "Product Manager",
      img: "https://randomuser.me/api/portraits/men/33.jpg",
      description: (
        <p>
          "Emergency bug fix at 9 PM? They were on it. Site back up by midnight. Life savers."
        </p>
      ),
    },
    {
      id: "7",
      name: "Rachel L.",
      role: "Tech Lead",
      img: "https://randomuser.me/api/portraits/women/36.jpg",
      description: (
        <p>
          "They integrate seamlessly with our existing team. No ego, just great code and communication."
        </p>
      ),
    },
    {
      id: "8",
      name: "David M.",
      role: "CTO",
      img: "https://randomuser.me/api/portraits/men/28.jpg",
      description: (
        <p>
          "Scaled our development capacity without the hiring headache. Consistent quality and predictable delivery."
        </p>
      ),
    },
    {
      id: "9",
      name: "Amanda K.",
      role: "VP Engineering",
      img: "https://randomuser.me/api/portraits/women/9.jpg",
      description: (
        <p>
          "They speak our language and understand our stack. No learning curve, just immediate productivity."
        </p>
      ),
    },
  ],
  faqSection: {
    title: "Frequently Asked Questions",
    description:
      "Answers to common questions about our development services. If you have any other questions, please don't hesitate to contact us.",
    faQitems: [
      {
        id: 1,
        question: "How quickly can you start?",
        answer:
          "Urgent fixes: often same day. Larger projects: typically within 48 hours of approval.",
      },
      {
        id: 2,
        question: "What's included in the $75/hr rate?",
        answer:
          "Development, testing, deployment, and communication. No hidden PM fees.",
      },
      {
        id: 3,
        question: "Do you offer ongoing support?",
        answer:
          "Yes—retainers or ad-hoc hours both work.",
      },
      {
        id: 4,
        question: "Can you work with our team?",
        answer:
          "Absolutely. I integrate with your developers, designers, or agency.",
      },
      {
        id: 5,
        question: "What if I don't know exactly what I need?",
        answer:
          "Book a 15-min call; I'll help you scope options.",
      },
      {
        id: 6,
        question: "How do you handle changes?",
        answer:
          "Hourly: adjust as we go. Fixed: change orders with clear costs.",
      },
    ],
  },
  ctaSection: {
    id: "cta",
    title: "Automate. Simplify. Thrive",
    backgroundImage: "/agent-cta-background.webp",
    button: {
      text: "Book Demo",
      href: "https://calendly.com/jay-flip-tech/flip-tech-pro-introduction-call",
    },
    subtext: "No obligations, no questions asked",
    companyName: "FlipTech AI"
  },
  footerLinks: [
    // {
    //   title: "Company",
    //   links: [
    //     { id: 1, title: "About", url: "#" },
    //     { id: 2, title: "Contact", url: "#" },
    //     { id: 3, title: "Blog", url: "#" },
    //     { id: 4, title: "Story", url: "#" },
    //   ],
    // },
    // {
    //   title: "Products",
    //   links: [
    //     { id: 5, title: "Company", url: "#" },
    //     { id: 6, title: "Product", url: "#" },
    //     { id: 7, title: "Press", url: "#" },
    //     { id: 8, title: "More", url: "#" },
    //   ],
    // },
    // {
    //   title: "Resources",
    //   links: [
    //     { id: 9, title: "Press", url: "#" },
    //     { id: 10, title: "Careers", url: "#" },
    //     { id: 11, title: "Newsletters", url: "#" },
    //     { id: 12, title: "More", url: "#" },
    //   ],
    // },
  ],
};

export type SiteConfig = typeof siteConfig;

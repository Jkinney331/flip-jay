import Image from "next/image";

export const companyLogos = [
  {
    id: 1,
    name: "Unreal Engine",
    logo: (
      <Image
        src="/unrealengine.png"
        alt="Unreal Engine logo - gaming and 3D development platform"
        width={80}
        height={20}
        className="logo-auto logo-brighten-dark"
      />
    )
  },
  {
    id: 2,
    name: "AWS",
    logo: (
      <Image
        src="/aws.svg"
        alt="Amazon Web Services logo - cloud computing platform"
        width={80}
        height={20}
        className="logo-auto logo-invert-dark"
      />
    )
  },
  {
    id: 3,
    name: "Loom",
    logo: (
      <Image
        src="/loom.svg"
        alt="Loom logo - video messaging and screen recording platform"
        width={80}
        height={20}
        className=""
      />
    )
  },
  {
    id: 4,
    name: "Anthropic",
    logo: (
      <Image
        src="/anthropoid.svg"
        alt="Anthropic logo - AI safety and research company"
        width={80}
        height={20}
        className="logo-auto logo-invert-dark"
      />
    )
  },
  {
    id: 5,
    name: "Google",
    logo: (
      <Image
        src="/google.svg"
        alt="Google logo - technology and search company"
        width={80}
        height={20}
        className=""
      />
    )
  },
  {
    id: 6,
    name: "Unity",
    logo: (
      <Image
        src="/unity.svg"
        alt="Unity logo - game development platform"
        width={80}
        height={20}
        className="logo-auto logo-invert-dark"
      />
    )
  },
  {
    id: 7,
    name: "Microsoft",
    logo: (
      <Image
        src="/microsoft.svg"
        alt="Microsoft logo - technology and software company"
        width={100}
        height={24}
        className="logo-auto logo-invert-dark"
      />
    )
  },
  {
    id: 8,
    name: "Adobe",
    logo: (
      <>
        {/* Light mode: original; Dark mode: white wordmark with red logo */}
        <Image
          src="/adobe.svg"
          alt="Adobe logo - creative software and digital media company"
          width={90}
          height={24}
          className="logo-auto block dark:hidden"
        />
        <Image
          src="/adobe-dark.svg"
          alt="Adobe logo - creative software and digital media company"
          width={90}
          height={24}
          className="logo-auto hidden dark:block"
        />
      </>
    )
  },
  {
    id: 9,
    name: "OpenAI",
    logo: (
      <Image
        src="/openai.svg"
        alt="OpenAI logo - artificial intelligence research company"
        width={80}
        height={20}
        className="logo-auto logo-invert-dark"
      />
    )
  },
  {
    id: 10,
    name: "Coinbase",
    logo: (
      <Image
        src="/coinbase.svg"
        alt="Coinbase logo - cryptocurrency exchange platform"
        width={80}
        height={20}
        className="logo-auto logo-invert-dark"
      />
    )
  },
  {
    id: 11,
    name: "Shopify",
    logo: (
      <Image
        src="/shopify.svg"
        alt="Shopify logo - e-commerce platform"
        width={80}
        height={20}
        className="logo-auto"
      />
    )
  },
];
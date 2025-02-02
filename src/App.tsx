import React, { useState } from 'react';
import {
  Rocket,
  Coins,
  Github,
  Twitter,
  Instagram as Telegram,
  Copy,
  Check,
  AlertCircle,
  X,
} from 'lucide-react';

interface FormData {
  coinName: string;
  tokenSymbol: string;
  description: string;
  telegramUrl: string;
  twitterUrl: string;
  contractAddress: string;
  sections: {
    tokenomics: boolean;
    roadmap: boolean;
    howToBuy: boolean;
    priceTicker: boolean;
    community: boolean;
    faq: boolean;
  };
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    coinName: '',
    tokenSymbol: '',
    description: '',
    telegramUrl: '',
    twitterUrl: '',
    contractAddress: '',
    sections: {
      tokenomics: true,
      roadmap: true,
      howToBuy: true,
      priceTicker: true,
      community: true,
      faq: true,
    },
  });

  const [copied, setCopied] = useState(false);
  const [showTwitterModal, setShowTwitterModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSectionToggle = (sectionName: keyof FormData['sections']) => {
    setFormData((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionName]: !prev.sections[sectionName],
      },
    }));
  };

  const generateBoltUrl = () => {
    const sections = [];
    if (formData.sections.tokenomics)
      sections.push('- Tokenomics section with animated charts');
    if (formData.sections.roadmap) sections.push('- Roadmap with timeline');
    if (formData.sections.howToBuy)
      sections.push('- How to buy guide with step-by-step instructions');
    if (formData.sections.priceTicker)
      sections.push('- Real-time price ticker');
    if (formData.sections.community)
      sections.push('- Community showcase section');
    if (formData.sections.faq) sections.push('- FAQ section');

    const prompt = `Create a professional and creative website for ${
      formData.coinName
    } (${formData.tokenSymbol}) memecoin with the following features:

1. A modern, eye-catching hero section with animated gradient background
2. Token information section displaying:
   - Contract address: ${formData.contractAddress}
   - Token symbol: ${formData.tokenSymbol}
3. About section with this description:
   ${formData.description}
4. Social media links:
   - Telegram: ${formData.telegramUrl}
   - Twitter: ${formData.twitterUrl}
5. Features to include:
${sections.join('\n')}
6. Design requirements:
   - Use modern glassmorphism effects
   - Implement smooth scroll animations
   - Make it mobile responsive
   - Use a color scheme that matches the memecoin's branding
   - Include call-to-action buttons for buying and joining the community

Make it production-ready with all necessary meta tags and SEO optimizations.`;

    const params = new URLSearchParams({
      prompt,
    });
    return `https://bolt.new/?${params.toString()}`;
  };

  const handleGenerateClick = () => {
    setShowTwitterModal(true);
  };

  const handleTwitterFollow = () => {
    window.open('https://x.com/intent/user?screen_name=Nawsanders', '_blank');
    setTimeout(() => {
      setShowTwitterModal(false);
      copyToClipboard();
    }, 1000);
  };

  const copyToClipboard = async () => {
    const url = generateBoltUrl();
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center mb-8 space-x-3">
          <div className="logo-rocket">
            <Rocket className="w-10 h-10 text-yellow-400" />
          </div>
          <h1 className="text-4xl font-bold title-animation">
            Memecoin Website Generator
          </h1>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-yellow-400 mb-2">
                  How it works
                </h2>
                <ol className="list-decimal list-inside space-y-2 text-white/90">
                  <li>Fill in your memecoin details below</li>
                  <li>Select which sections you want to include</li>
                  <li>Click the "Generate Website" button</li>
                  <li>The URL will be copied and opened in a new tab</li>
                  <li>
                    In the new tab, click "Create" to generate your website
                  </li>
                  <li>Customize the generated code if needed</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Coin Name
                </label>
                <input
                  type="text"
                  name="coinName"
                  value={formData.coinName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                  placeholder="e.g. Doge Coin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Token Symbol
                </label>
                <input
                  type="text"
                  name="tokenSymbol"
                  value={formData.tokenSymbol}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                  placeholder="e.g. DOGE"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 h-24"
                  placeholder="Describe your memecoin project..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Contract Address
                </label>
                <input
                  type="text"
                  name="contractAddress"
                  value={formData.contractAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                  placeholder="0x..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Telegram className="w-4 h-4 inline mr-2" />
                    Telegram URL
                  </label>
                  <input
                    type="text"
                    name="telegramUrl"
                    value={formData.telegramUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    placeholder="https://t.me/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Twitter className="w-4 h-4 inline mr-2" />
                    Twitter URL
                  </label>
                  <input
                    type="text"
                    name="twitterUrl"
                    value={formData.twitterUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    placeholder="https://twitter.com/..."
                  />
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Customize Sections
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.sections.tokenomics}
                      onChange={() => handleSectionToggle('tokenomics')}
                      className="w-5 h-5 rounded border-white/20 bg-white/5 checked:bg-yellow-400 focus:ring-yellow-400 focus:ring-offset-0"
                    />
                    <span className="group-hover:text-yellow-400">
                      Tokenomics Section
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.sections.roadmap}
                      onChange={() => handleSectionToggle('roadmap')}
                      className="w-5 h-5 rounded border-white/20 bg-white/5 checked:bg-yellow-400 focus:ring-yellow-400 focus:ring-offset-0"
                    />
                    <span className="group-hover:text-yellow-400">Roadmap</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.sections.howToBuy}
                      onChange={() => handleSectionToggle('howToBuy')}
                      className="w-5 h-5 rounded border-white/20 bg-white/5 checked:bg-yellow-400 focus:ring-yellow-400 focus:ring-offset-0"
                    />
                    <span className="group-hover:text-yellow-400">
                      How to Buy Guide
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.sections.priceTicker}
                      onChange={() => handleSectionToggle('priceTicker')}
                      className="w-5 h-5 rounded border-white/20 bg-white/5 checked:bg-yellow-400 focus:ring-yellow-400 focus:ring-offset-0"
                    />
                    <span className="group-hover:text-yellow-400">
                      Price Ticker
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.sections.community}
                      onChange={() => handleSectionToggle('community')}
                      className="w-5 h-5 rounded border-white/20 bg-white/5 checked:bg-yellow-400 focus:ring-yellow-400 focus:ring-offset-0"
                    />
                    <span className="group-hover:text-yellow-400">
                      Community Showcase
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.sections.faq}
                      onChange={() => handleSectionToggle('faq')}
                      className="w-5 h-5 rounded border-white/20 bg-white/5 checked:bg-yellow-400 focus:ring-yellow-400 focus:ring-offset-0"
                    />
                    <span className="group-hover:text-yellow-400">
                      FAQ Section
                    </span>
                  </label>
                </div>
              </div>

              <button
                onClick={handleGenerateClick}
                className="w-full mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-3 px-6 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>URL Copied & Opened!</span>
                  </>
                ) : (
                  <>
                    <Rocket className="w-5 h-5" />
                    <span>Generate Website</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Twitter Follow Modal */}
        {showTwitterModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="modal-backdrop absolute inset-0"
              onClick={() => setShowTwitterModal(false)}
            ></div>
            <div className="modal-content bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl relative z-10 max-w-md w-full mx-4">
              <button
                onClick={() => setShowTwitterModal(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="text-center">
                <Twitter className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Follow @Nawsanders</h2>
                <p className="text-white/80 mb-6">
                  Follow @Nawsanders on Twitter to generate your memecoin
                  website!
                </p>
                <button
                  onClick={handleTwitterFollow}
                  className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 w-full"
                >
                  <Twitter className="w-5 h-5" />
                  <span>Follow @Nawsanders</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-12 text-center text-white/60">
          <p>Built by nawsanders ❤️ powered by Bolt.new</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href="https://x.com/Nawsanders"
              className="hover:text-white transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;

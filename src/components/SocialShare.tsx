import { Share2, Facebook, Twitter, Linkedin, Link } from 'lucide-react';
import { useState } from 'react';
import { trackShareClicked } from '../utils/analytics';

interface SocialShareProps {
  title: string;
  text: string;
  url?: string;
}

export default function SocialShare({ title, text, url = window.location.href }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  const handleNativeShare = async () => {
    trackShareClicked(title, 'native_share');

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      window.open(shareLinks.twitter, '_blank', 'width=600,height=400');
    }
  };

  const handleSocialShare = (platform: string) => {
    trackShareClicked(title, platform);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleNativeShare}
        className="flex-1 min-w-[140px] bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        <Share2 className="w-4 h-4" />
        Partager
      </button>

      <button
        onClick={() => { handleSocialShare('facebook'); window.open(shareLinks.facebook, '_blank', 'width=600,height=400'); }}
        className="bg-[#1877F2] text-white px-4 py-3 rounded-lg font-medium hover:bg-[#166FE5] transition-colors flex items-center justify-center gap-2"
      >
        <Facebook className="w-4 h-4" />
        <span className="hidden sm:inline">Facebook</span>
      </button>

      <button
        onClick={() => { handleSocialShare('twitter'); window.open(shareLinks.twitter, '_blank', 'width=600,height=400'); }}
        className="bg-black text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
      >
        <Twitter className="w-4 h-4" />
        <span className="hidden sm:inline">Twitter</span>
      </button>

      <button
        onClick={() => { handleSocialShare('linkedin'); window.open(shareLinks.linkedin, '_blank', 'width=600,height=400'); }}
        className="bg-[#0A66C2] text-white px-4 py-3 rounded-lg font-medium hover:bg-[#095196] transition-colors flex items-center justify-center gap-2"
      >
        <Linkedin className="w-4 h-4" />
        <span className="hidden sm:inline">LinkedIn</span>
      </button>

      <button
        onClick={copyToClipboard}
        className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
      >
        <Link className="w-4 h-4" />
        {copied ? '✓ Copié' : 'Copier'}
      </button>
    </div>
  );
}

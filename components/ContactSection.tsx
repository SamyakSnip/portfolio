"use client";

import { motion } from "framer-motion";
import { 
  containerVariants, 
  fadeInUpVariants,
  scaleInVariants,
  buttonVariants 
} from "@/lib/animation-utils";
import { socialLinks, userData } from "@/lib/user-data";
import { Mail, Send, Copy, Check } from "lucide-react";
import { useState } from "react";

/**
 * ContactSection Component
 * Social links and contact information
 */
export default function ContactSection() {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(userData.contact.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy email:", error);
    }
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="space-y-8 py-8"
      id="contact"
    >
      {/* Section header */}
      <motion.div variants={fadeInUpVariants} className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-sm text-cyan/60">
          <span className="text-purple">&gt;</span>
          <span>contact.connect()</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold gradient-text">
          Let's Connect
        </h2>
        <p className="text-white/70 text-base md:text-lg max-w-2xl">
          I'm always open to discussing new projects, creative ideas, or 
          opportunities to be part of your visions. Feel free to reach out!
        </p>
      </motion.div>

      {/* Email contact card */}
      <motion.div variants={fadeInUpVariants}>
        <EmailContactCard 
          email={userData.contact.email}
          onCopyEmail={handleCopyEmail}
          emailCopied={emailCopied}
        />
      </motion.div>

      {/* Social links */}
      <motion.div variants={fadeInUpVariants} className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-cyan rounded-full animate-pulse" />
          <h3 className="text-xl md:text-2xl font-bold text-white font-mono">
            Find Me Online
          </h3>
        </div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {socialLinks.map((social, index) => (
            <SocialLinkCard 
              key={social.platform} 
              social={social} 
              index={index} 
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Footer message */}
      <motion.div 
        variants={fadeInUpVariants}
        className="text-center pt-8"
      >
        <FooterMessage />
      </motion.div>
    </motion.section>
  );
}

/**
 * EmailContactCard Component
 * Primary email contact with copy functionality
 */
function EmailContactCard({ 
  email, 
  onCopyEmail, 
  emailCopied 
}: { 
  email: string; 
  onCopyEmail: () => void;
  emailCopied: boolean;
}) {
  return (
    <div className="glass rounded-lg p-6 md:p-8 border border-cyan/30 space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-cyan/10 rounded-lg">
          <Mail className="w-6 h-6 text-cyan" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white font-mono">
            Email Me
          </h3>
          <p className="text-sm text-white/60">
            Direct line of communication
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Email display */}
        <div className="flex-1 px-4 py-3 bg-bg-dark/50 rounded border border-cyan/20 font-mono text-sm md:text-base text-cyan">
          {email}
        </div>

        {/* Copy button */}
        <motion.button
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          onClick={onCopyEmail}
          className="px-4 py-3 bg-cyan text-bg-dark font-mono font-semibold rounded hover:bg-cyan/90 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-offset-2 focus:ring-offset-bg-dark"
          aria-label={emailCopied ? "Email copied" : "Copy email address"}
        >
          {emailCopied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </motion.button>

        {/* Send button */}
        <motion.a
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          href={`mailto:${email}`}
          className="px-4 py-3 border-2 border-cyan text-cyan font-mono font-semibold rounded hover:bg-cyan/10 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-offset-2 focus:ring-offset-bg-dark"
          aria-label="Send email"
        >
          <Send className="w-4 h-4" />
          Send
        </motion.a>
      </div>
    </div>
  );
}

/**
 * SocialLinkCard Component
 * Individual social media link card
 */
function SocialLinkCard({ 
  social, 
  index 
}: { 
  social: typeof socialLinks[0]; 
  index: number;
}) {
  // Dynamically import Lucide icon
  const getIcon = () => {
    const icons = require("lucide-react");
    const IconComponent = icons[social.icon];
    return IconComponent || icons.ExternalLink;
  };

  const Icon = getIcon();

  return (
    <motion.a
      variants={scaleInVariants}
      custom={index}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05, y: -5 }}
      className="group glass rounded-lg p-6 border border-cyan/20 hover:border-cyan/50 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-offset-2 focus:ring-offset-bg-dark"
      aria-label={social.label}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="p-3 bg-cyan/10 rounded-lg group-hover:bg-cyan/20 transition-colors"
          >
            <Icon className="w-6 h-6 text-cyan" />
          </motion.div>
          <div>
            <h4 className="text-lg font-semibold text-white group-hover:text-cyan transition-colors">
              {social.platform}
            </h4>
            <p className="text-sm text-white/60 font-mono">
              @{social.url.split('/').pop()}
            </p>
          </div>
        </div>

        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-cyan/50 group-hover:text-cyan transition-colors"
        >
          →
        </motion.div>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-lg bg-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.a>
  );
}

/**
 * FooterMessage Component
 * Closing message with terminal styling
 */
function FooterMessage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 }}
      className="space-y-2"
    >
      <p className="font-mono text-white/70 text-sm md:text-base">
        Thanks for stopping by! 🚀
      </p>
      <p className="font-mono text-cyan/60 text-xs md:text-sm">
        <span className="text-purple">&gt;</span> portfolio.exit()
      </p>
      <motion.div
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-2 h-4 bg-cyan ml-1"
      />
    </motion.div>
  );
}

/**
 * QuickContact Component
 * Simplified contact section without social links
 */
export function QuickContact() {
  return (
    <div className="text-center space-y-4">
      <h3 className="text-2xl font-bold gradient-text">
        Ready to work together?
      </h3>
      <p className="text-white/70">
        Let's create something amazing!
      </p>
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href={`mailto:${userData.contact.email}`}
        className="inline-flex items-center gap-2 px-6 py-3 bg-cyan text-bg-dark font-mono font-semibold rounded hover:bg-cyan/90 transition-colors"
      >
        <Mail className="w-5 h-5" />
        Get in Touch
      </motion.a>
    </div>
  );
}
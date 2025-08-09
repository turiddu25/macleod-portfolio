import { Settings } from 'lib/sanity.queries'
import {
  Instagram,
  Twitter,
  Music,
  Youtube,
  Linkedin,
  Globe,
  ExternalLink
} from 'lucide-react'

interface ContactSectionProps {
  settings: Settings
}

// Automated icon mapping - just add new platforms here
const SOCIAL_ICON_MAP = {
  instagram: Instagram,
  twitter: Twitter,
  soundcloud: Music, // SoundCloud uses music note
  spotify: Music, // Spotify uses music note (you could also use a custom Spotify icon)
  youtube: Youtube,
  linkedin: Linkedin,
  website: Globe,
} as const

// Function to automatically detect platform from URL
function detectPlatformFromUrl(url: string): keyof typeof SOCIAL_ICON_MAP | null {
  if (!url) return null
  
  const domain = url.toLowerCase()
  
  if (domain.includes('instagram.com')) return 'instagram'
  if (domain.includes('twitter.com') || domain.includes('x.com')) return 'twitter'
  if (domain.includes('soundcloud.com')) return 'soundcloud'
  if (domain.includes('spotify.com')) return 'spotify'
  if (domain.includes('youtube.com') || domain.includes('youtu.be')) return 'youtube'
  if (domain.includes('linkedin.com')) return 'linkedin'
  
  return 'website' // Default for any other website
}

// Function to get platform name from URL
function getPlatformNameFromUrl(url: string): string {
  if (!url) return 'Website'
  
  const domain = url.toLowerCase()
  
  if (domain.includes('instagram.com')) return 'Instagram'
  if (domain.includes('twitter.com') || domain.includes('x.com')) return 'Twitter'
  if (domain.includes('soundcloud.com')) return 'SoundCloud'
  if (domain.includes('spotify.com')) return 'Spotify'
  if (domain.includes('youtube.com') || domain.includes('youtu.be')) return 'YouTube'
  if (domain.includes('linkedin.com')) return 'LinkedIn'
  
  return 'Website'
}

export default function ContactSection({ settings }: ContactSectionProps) {
  const { contact, socialMedia } = settings

  // Automatically create social links with detected icons and names
  const socialLinks = [
    socialMedia?.instagram,
    socialMedia?.twitter,
    socialMedia?.soundcloud,
    socialMedia?.spotify,
    socialMedia?.youtube,
    socialMedia?.linkedin,
    socialMedia?.website,
  ]
    .filter((url): url is string => Boolean(url))
    .map((url) => ({
      name: getPlatformNameFromUrl(url),
      url,
      icon: detectPlatformFromUrl(url) || 'website',
    }))

  return (
    <section
      id="contact"
      className="bg-background text-foreground py-16 sm:py-20"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <div className="text-center mx-auto mb-12">
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-light tracking-tight mb-4 text-foreground">
            Get In Touch
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 text-center sm:grid-cols-2 sm:text-left">
          {/* Contact Information */}
          <div>
            <h3 className="text-base sm:text-lg font-medium mb-4 text-foreground">Contact</h3>
            {contact?.email && (
              <a
                href={`mailto:${contact.email}`}
                className="inline-block text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors duration-200 mb-2 break-all"
              >
                {contact.email}
              </a>
            )}
          </div>

          {/* Social Media Links */}
          {socialLinks.length > 0 && (
            <div className="sm:text-right">
              <h3 className="text-base sm:text-lg font-medium mb-4 text-foreground">Follow</h3>
              <div className="flex justify-center sm:justify-end space-x-4">
                {socialLinks.map((link, index) => {
                  const IconComponent = SOCIAL_ICON_MAP[link.icon]
                  
                  return (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110 transform"
                      title={link.name}
                    >
                      <span className="sr-only">{link.name}</span>
                      <IconComponent size={20} />
                    </a>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-[4px] sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} {settings.producerName || 'Davor MacLeod'}. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  )
}

import type { Metadata } from 'next';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import LazyImage from '@/components/ui/LazyImage';
import { getSelfPortrait } from '@/lib/photographs';

export const metadata: Metadata = {
  title: 'Contact - Andrey Pudov',
};

const PGP_PUBLIC_KEY = `-----BEGIN PGP PUBLIC KEY BLOCK-----

mDMEaWwDNxYJKwYBBAHaRw8BAQdA0w1Vt/R+qosuSCSeppWV9zlpLTNC5Mwlq8Rf
madSU/a0I0FuZHJleSBQdWRvdiA8bWFpbEBhbmRyZXlwdWRvdi5jb20+iJkEExYK
AEEWIQR/F4h4YxwSvYuIj2uMJnMKW34CpwUCaWwDNwIbAQUJB4TOAAULCQgHAgIi
AgYVCgkICwIEFgIDAQIeBwIXgAAKCRCMJnMKW34Cp9LIAQD0y0vjRHWt4uXNiIwi
PIXCcVjvgs+9RcAZtp7Ii09GIAEA5MORFufu2/jW6cbYSAs3UaCTuc9nyVHNxDQx
kdNszwS4MwRpbANtFgkrBgEEAdpHDwEBB0Ag8mZuiJVDi/yBcbNMjaWLcOWSpkyz
gsNgNWaJksZWrYh+BBgWCgAmFiEEfxeIeGMcEr2LiI9rjCZzClt+AqcFAmlsA20C
GyAFCQeEzgAACgkQjCZzClt+Aqcq9gEAjFhmQz1aVlDU8+H3HwXzsZX7uvgGIV+R
meIbu8oCz0oBAJxx/uxy7KZFpitGkarXD8WpGi6mF8KTeqtAChmzTysCuDgEaWwD
ihIKKwYBBAGXVQEFAQEHQOWN2ZUfT8zHzJEY12K/1oO3RafyQX4R7Aq6nXeux+Vu
AwEIB4h+BBgWCgAmFiEEfxeIeGMcEr2LiI9rjCZzClt+AqcFAmlsA4oCGwwFCQeE
zgAACgkQjCZzClt+AqegywEA7KQjaGC63lgmHfs88K3glYEtvci762dIcK8UuSTE
wG0BAMmVcGzPGYB/A3/cc3AK5Zhl7KGra1QVDth1UlmbaQ4PuDMEaWwDmBYJKwYB
BAHaRw8BAQdAnTv4b6l3y+B6RdMdw1p1ce70a3Lr8UBELaxSLqMZPyuI9QQYFgoA
JhYhBH8XiHhjHBK9i4iPa4wmcwpbfgKnBQJpbAOYAhsCBQkHhM4AAIEJEIwmcwpb
fgKndiAEGRYKAB0WIQRErz1q46XJntoW4gj9JRkPjSBKgAUCaWwDmAAKCRD9JRkP
jSBKgELMAQC6mfVFJ9oxWgAts3gus+rDTy/o4o6x3yaS1Z0gSKyXBwD/fc90Ffxa
Jkusbiyw7298jUjl+MtjLTGCOchvnO21cA0/JgD/esrVwprrFqqBgAISybsafmj7
+qGmzmoZvDZCZL7S7gYA/14r1V8kTrmtsGBa1Brqwod7JiOpYMuBMWrgRPAHwUML
=xhya
-----END PGP PUBLIC KEY BLOCK-----`;

export default function ContactPage() {
  const portrait = getSelfPortrait();

  return (
    <>
      <Header />

      <main>
        <div className="contact container">
          <div className="text">
            <h1>Let’s start a conversation</h1>

            <p>
              Whether you’re looking for a landscape photographer, have a creative project in mind, or just want to chat over a cup of tea, I’d love to hear from you. Drop me a message, and I’ll get back to you as soon as possible.
            </p>

            <form action="mailto:mail@andreypudov.com?subject=Contact Form Submission" method="POST" encType="text/plain">
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Your Email" required />
              <textarea name="message" placeholder="Your Message" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>

          <div className="image">
            <LazyImage image={portrait} priority sizes="(max-width: 1200px) 50vw, 570px" />
          </div>
        </div>

        <div className="contact container">
          <details className="secure-communication">
            <summary>Secure communication</summary>

            <div className="content">
              <p>For confidential or sensitive correspondence, I accept encrypted email via PGP.</p>

              <div className="info">
                <div className="item">
                  <span className="label">Email</span>
                  <a href="mailto:mail@andreypudov.com" className="value">mail@andreypudov.com</a>
                </div>
                <div className="item">
                  <span className="label">Fingerprint</span>
                  <span className="value fingerprint">7F17 8878 631C 12BD 8B88 8F6B 8C26 730A 5B7E 02A7</span>
                </div>
              </div>

              <p>Please use the public PGP key provided below to encrypt your message. If you require an encrypted response, please include your own public PGP key or a link to your key server in your message.</p>

              <pre>{PGP_PUBLIC_KEY}</pre>
            </div>
          </details>
        </div>
      </main>

      <Footer />
    </>
  );
}

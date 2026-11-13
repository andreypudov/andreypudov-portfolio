import type { Metadata } from 'next';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { mediaUrl } from '@/lib/media';
import { pageMetadata } from '@/lib/metadata';
import { getSelfPortrait } from '@/lib/photographs';

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description:
    'Experience, skills, projects, education and recommendations of Andrey Pudov, senior software engineer and photographer.',
  path: '/about/',
  image: getSelfPortrait(),
});

interface Logo {
  path: string;
  alt: string;
}

interface Role {
  /** Omitted while the company logo is not in the media bucket. */
  logo?: Logo;
  title: string;
  company: string;
  dates: string;
  location: string;
  summary: string;
  highlights: string[];
  stack?: string;
}

const SUPER_GROUP = { path: '/images/logos/super_group_logo.jpg', alt: 'Super Group Logo' };
const EPAM = { path: '/images/logos/epam_systems_logo.jpg', alt: 'EPAM Systems Logo' };
const INTEL = { path: '/images/logos/intel_corporation_logo.jpg', alt: 'Intel Logo' };
const MADI = { path: '/images/logos/madi_logo.jpg', alt: 'MADI Logo' };

const PROFILE =
  'Senior software engineer with 15 years at Intel, EPAM Systems and Super Group, strongest in TypeScript, React and Next.js front ends, with back-end experience in C# and a systems background in C/C++. Experienced in turning legacy code into maintainable, observable architecture, taking over established products, building new ones from scratch, and mentoring engineers.';

const SKILLS: Array<[string, string]> = [
  ['Languages', 'TypeScript, C#'],
  ['Front end', 'React, Redux, Next.js, Tailwind CSS, Storybook, Chromatic, Figma'],
  ['Back end', 'ASP.NET Core, REST APIs, microservices, BFF'],
  ['Data & cloud', 'MongoDB, Azure'],
  ['Delivery & monitoring', 'GitHub Actions, canary releases, Coralogix, Grafana'],
  ['Previously', 'C/C++, Java, OpenCL, Qt, Boost, Linux, SQL Server, Entity Framework Core, Kafka'],
  ['Practices', 'solution architecture, legacy modernisation, performance optimisation, TDD, mentoring'],
];

const EXPERIENCE: Role[] = [
  {
    logo: SUPER_GROUP,
    title: 'Senior Software Development Engineer · Betway Sports',
    company: 'Super Group',
    dates: 'Jan 2025 – present',
    location: 'Barcelona, Spain',
    summary:
      'Front-end engineer in a team of six senior engineers on the core sports betting interface of the Betway platform, at NYSE-listed sports betting and gaming group Super Group (over 6 million monthly active customers). The team assumed ownership of the product and continuously improves it with new features.',
    highlights: [
      'Refactored the betting flow into a saga-based design with clear entry, processing and finalisation stages, streamlining it and addressing edge cases to improve reliability and reduce production errors.',
      'Delivered new betting features, including bet builder and same-game parlays (SGP) with cross-match combinations, and added promotions to the betting flow.',
      "Built dashboards and alerts for continuous product monitoring on all markets, using Coralogix and clickstream data, giving the team ongoing visibility into the platform's health, so issues are detected as soon as they occur. Wrote the KPI metrics used to reject faulty canary releases.",
      'Introduced standalone football hubs for the FIFA World Cup 2026, building components and BFF endpoints with designers to combine match information with an easier betting flow. Delivered by the team between January and the start of the tournament, and drew a significant increase in traffic.',
    ],
    stack: 'TypeScript, React, Redux, Next.js, Tailwind CSS, Storybook, Azure',
  },
  {
    logo: SUPER_GROUP,
    title: 'Senior Software Development Engineer · Betway Clips',
    company: 'Super Group',
    dates: 'Mar 2021 – Jan 2025',
    location: 'Barcelona, Spain',
    summary:
      'Full-stack engineer with a focus on the front end and founding member of a new R&D team building Betway Clips, a next-generation social networking platform centred on video content. The project was exploratory, so architecture, tooling and product flows had to be established from scratch.',
    highlights: [
      'Led the solution architecture, shaped the project structure and defined the UI/UX flows. Drove rapid prototyping to validate ideas early and to ensure the platform could scale to high user engagement.',
      "Owned the video swiper, the platform's central component: autoplaying videos with liking, commenting, sharing and sport cards tying each video to a match or team. Kept it fast and smooth as it grew.",
      'Implemented the social interfaces and built responsive components, optimising UI performance for speed and cross-device responsiveness. Refined interaction flows and improved visual consistency.',
      'Worked within strict browser limits on when and how media may be played, even in in-app browsers: studied how leading platforms address these constraints and applied the most effective techniques, including a shared video element and preloading.',
      'Designed and implemented high-performance services for media handling, covering the ingestion, processing, storage and retrieval of video, with Azure Media Services and an in-house FFmpeg pipeline encoding to HLS. Optimised how media was stored to keep the platform cost-efficient at scale.',
      'Introduced automated media pre-validation, using an external AI service to detect inappropriate content, and contributed to content rating through our own statistical neural network models.',
    ],
    stack: 'TypeScript, React, Redux, C#, MongoDB, Azure',
  },
  {
    logo: EPAM,
    title: 'Senior Software Development Engineer · DEACON',
    company: 'EPAM Systems',
    dates: 'Oct 2020 – Mar 2021',
    location: 'Nizhny Novgorod, Russia',
    summary:
      'Developed a platform for data-driven facility management decision-making for the United States Golf Association, using a scalable microservice architecture on Azure.',
    highlights: [
      'Designed and maintained RESTful API services, with unit and integration tests in a test-driven environment.',
      'Led and mentored a team of interns on RandomCafe, a “random coffee” website designed to foster relationships among company members, from business requirements to meeting deadlines.',
    ],
    stack: 'C#, ASP.NET Core, Entity Framework Core, SQL Server, Kafka, Azure',
  },
  {
    logo: INTEL,
    title: 'Senior Software Engineer, Technical Lead · OpenCL SDK',
    company: 'Intel Corporation',
    dates: 'Mar 2018 – Oct 2020',
    location: 'Nizhny Novgorod, Russia',
    summary:
      "Assumed the role of Team Leader for a newly established team, taking over the Intel SDK for OpenCL Applications, Intel's tools for building and debugging OpenCL applications.",
    highlights: [
      "As the team's founding member, hired the team together with the manager, growing it to around 20 engineers before it split into two teams of about 12, and mentored the majority of new hires.",
      'Delivered support for the latest OpenCL standards across Visual Studio, VS Code, Xcode and Eclipse.',
      'Worked on the OpenCL debugger for Visual Studio, addressing frequent customer requests.',
      "Worked with the compiler teams on Intel's transition to its new SYCL-based C and C++ compilers.",
      'Led the development of new project infrastructure and contributed to the rapid setup of a continuous integration system, significantly reducing build time. Improved code management and review.',
      'Led the resolution of critical security vulnerabilities with other teams, with no impact on release schedules.',
      'Managed engagement with key business stakeholders and customers, oversaw product build and distribution, and ensured timely delivery of the final product with all reported blockers resolved.',
    ],
    stack: 'C/C++, C#, Java, OpenCL',
  },
  {
    logo: INTEL,
    title: 'Senior Software Development Engineer · Intel Registration Center',
    company: 'Intel Corporation',
    dates: 'Jun 2013 – Mar 2018',
    location: 'Nizhny Novgorod, Russia',
    summary:
      'Responsible for the design, development and maintenance of the entitlement and download website for Intel software products, with a focus on the user interface and system APIs.',
    highlights: [
      'Designed a new website architecture using modern user interface technologies.',
      'Played a key role in migrating ASP.NET web pages to MVC architecture, which improved website performance, enhanced the user experience and simplified maintenance.',
      'Implemented a modern role-based access control model, enabling dynamic management of user access to web pages through role assignments.',
      'Developed infrastructure and processes for automated project deployment, ensuring consistent, error-free and reproducible code migrations.',
    ],
    stack: 'C#, ASP.NET MVC, SQL Server, TypeScript, Bootstrap',
  },
  {
    logo: INTEL,
    title: 'Software Development Engineer · PSET Application Installer',
    company: 'Intel Corporation',
    dates: 'Aug 2011 – Jun 2013',
    location: 'Nizhny Novgorod, Russia',
    summary: 'Main developer of licensing and installation technologies for Intel software products on Linux.',
    highlights: [
      'Added key graphical functionality, including an installation wizard that streamlined the creation of product installations.',
      'Developed an automated unit test system that improved early bug detection and overall reliability.',
      'Implemented the code signing interface in the installation client to support secure software deployment.',
      'Developed the Smart Cache and Shell Executor features, reducing initialisation times and improving execution efficiency on Linux.',
    ],
    stack: 'C/C++, Qt, Perl',
  },
];

const PROJECTS = [
  {
    name: 'CoreEQ',
    url: 'https://github.com/andreypudov/core-eq',
    description: 'A system-wide audio equalizer for macOS built on Core Audio process taps, with no virtual driver.',
    stack: 'macOS · Core Audio · Digital signal processing',
  },
  {
    name: 'Spectral Lab',
    url: 'https://github.com/andreypudov/spectral-lab',
    description: 'An infrared photography toolkit: a C++23 engine converts infrared raw photos into linear DNG.',
    stack: 'C++23 · Qt · CMake · GoogleTest',
  },
];

const LANGUAGES: Array<[string, string]> = [
  ['Russian', 'native'],
  ['English', 'professional (ICAO Level 5)'],
  ['Japanese', 'beginner (Genki)'],
];

function Stack({ value }: { value?: string }) {
  return value ? <p className="stack"><strong>Stack:</strong> {value}</p> : null;
}

export default function AboutPage() {
  return (
    <>
      <Header current="/about/" />

      <main>
        <div className="curriculum-vitae container">
          <section className="profile">
            <p>{PROFILE}</p>
          </section>

          <section className="skills">
            <h1>
              Skills
            </h1>

            <ul>
              {SKILLS.map(([label, value]) => (
                <li key={label}><strong>{label}:</strong> {value}</li>
              ))}
            </ul>
          </section>

          <section className="experience">
            <h1>
              Experience
            </h1>

            {EXPERIENCE.map((role) => (
              <figure key={role.title}>
                <div className="logo">
                  {role.logo && <img src={mediaUrl(role.logo.path)} alt={role.logo.alt} />}
                </div>
                <div className="text">
                  <figcaption>
                    {role.title}
                    <small>{role.company} | {role.dates} | {role.location}</small>
                  </figcaption>

                  <p>{role.summary}</p>

                  <ul>
                    {role.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>

                  <Stack value={role.stack} />
                </div>
              </figure>
            ))}
          </section>

          <section className="projects">
            <h1>
              Projects
            </h1>

            {PROJECTS.map((project) => (
              <figure className="entry" key={project.name}>
                <figcaption>
                  <a href={project.url} target="_blank" rel="noopener noreferrer">{project.name}</a>
                </figcaption>

                <p>{project.description}</p>

                <Stack value={project.stack} />
              </figure>
            ))}
          </section>

          <section className="education">
            <h1>
              Education
            </h1>

            <figure className="entry">
              <div className="logo">
                <img src={mediaUrl(MADI.path)} alt={MADI.alt} />
              </div>
              <div className="text">
                <figcaption>
                  Moscow Automobile and Road Construction State Technical University (MADI)
                  <small>5-year Specialist degree (Engineer), Computer Science | Sep 2006 – Jun 2011</small>
                </figcaption>

                <p>
                  Thesis: <em>Neural Networks in Stock Market Forecasting</em>
                </p>

                <ul>
                  <li>Researched the application of neural networks to stock market forecasting and developed several predictive models.</li>
                  <li>Compared model results against traditional technical analysis, demonstrating the clear potential of the neural network approach.</li>
                  <li>Built an automated information system for market analysis and forecasting.</li>
                </ul>
              </div>
            </figure>
          </section>

          <section className="languages">
            <h1>
              Languages
            </h1>

            <ul>
              {LANGUAGES.map(([language, level]) => (
                <li key={language}><strong>{language}</strong> — {level}</li>
              ))}
            </ul>
          </section>

          <section className="interests">
            <h1>
              Interests
            </h1>

            <ul>
              <li><strong>Aviation (private pilot):</strong> a focus on disciplined planning, checklists and risk management in flight operations.</li>
              <li><strong>Landscape photography:</strong> see the <a href="/portfolio/">portfolio</a>.</li>
              <li><strong>Chinese calligraphy:</strong> two years of study in Kaishu (regular script) and Lishu (clerical script).</li>
            </ul>
          </section>

          <section className="recommendations">
            <h1>
              Recommendations
            </h1>

            <figure className="entry">
              <figcaption>
                Elizaveta Smirnova
              </figcaption>

              <p>
                I had the pleasure of working with Andrey, and I can confidently say he is an outstanding developer. He is highly structured, creative, and unafraid to take on new challenges or responsibilities. Andrey is always approachable and responsive, readily offering support to his colleagues.
              </p>

              <p>
                What sets Andrey apart is his ability to bring innovative ideas and smart solutions to the table, consistently improving both processes and outcomes. His collaborative approach and problem-solving mindset made it a true pleasure to work alongside him.
              </p>
            </figure>

            <figure className="entry">
              <figcaption>
                Simeon Petkov
              </figcaption>

              <p>
                Andrey is a strong software engineer with professional attitude on very high level. He asks provocative technological questions and has the potential to implement every idea. Organized and fantastic person to work with. You can definitely trust him.
              </p>
            </figure>

            <figure className="entry">
              <figcaption>
                Victor Kuznetsov
              </figcaption>

              <p>
                Andrey is very responsive and knowledgeable person. It was a pleasure to work with Andrey - Hi is very strong engineer. I think that Andrey will perform well in any team!
              </p>
            </figure>

            <figure className="entry">
              <figcaption>
                Viktorya Gvozdeva
              </figcaption>

              <p>
                Andrey was a technical leader in my team for approximate 2 years. He is a professional and very experienced engineer! Andrey really helped me on my way from intern to engineer. He gave me an understanding how to resolve technical challenges in the best way. I extend my programming and soft skills very fast with his help and advices. Andrey's background and strong problem resolving skills helped to the team to resolve technical challenges. Working with Andrey was a great opportunity for me!
              </p>
            </figure>

            <figure className="entry">
              <figcaption>
                Tanya Zaslavsky
              </figcaption>

              <p>
                Andrey and I worked in the same group for a few years in Intel. This group was responsible for the system which registered and distributed Intel software. Andrey showed himself as a UI wizard and a quick learner.
              </p>

              <p>
                He is a person with high levels of professionalism, integrity and above the expert level knowledge of DevOps tools, Bootstrap, AngularJS frameworks. This made Andrey a primary expert in those areas for our team.
              </p>

              <p>
                With people like Andrey on the team lead as well as a project manager you will not have any problems completing any task or project in schedule time with high quality.
              </p>
            </figure>

            <figure className="entry">
              <figcaption>
                Doug Helbling
              </figcaption>

              <p>
                I worked with Andrey as part of a global team for a number of years. It was a joy to work with such a talented engineer and skilled communicator. He brings his best to every effort.
              </p>
            </figure>

            <figure className="entry">
              <figcaption>
                Paul Frumkin
              </figcaption>

              <p>
                I worked with Andrey for many years, and I was his manager for three years. He is a very strong software engineer, particularly in User Interface but he also can develop middleware and backend database. He keeps up with technology which allows him to apply the latest techniques for automation problem solving. He is a quick learner and documents his implementations for other team members to learn and follow. He is team oriented and communicates well.
              </p>
            </figure>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

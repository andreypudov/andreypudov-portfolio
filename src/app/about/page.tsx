import type { Metadata } from 'next';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { pageMetadata } from '@/lib/metadata';
import { getSelfPortrait } from '@/lib/photographs';

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description: 'Experience, education and recommendations of Andrey Pudov, senior software engineer and photographer.',
  path: '/about/',
  image: getSelfPortrait(),
});

export default function AboutPage() {
  return (
    <>
      <Header current="/about/" />

      <main>
        <div className="curriculum-vitae container">
          <section className="experience">
            <h1>
              Experience
            </h1>

            <figure>
              <div className="logo">
                <img src="/media/images/logos/derivco_sports_logo.jpg" alt="Derivco Sports Logo" />
              </div>
              <div className="text">
                <figcaption>
                  Sr. Software Development Engineer
                  <small>Derivco Sports | Mar 2021 – present</small>
                </figcaption>

                <p>
                  As a founding member of a newly established R&D team at Derivco, I contributed to the design and development of a next-generation social networking platform focused on video content. The project was fully exploratory, requiring architecture and solutions to be built from the ground up. My responsibilities included <strong>leading solution architecture, rapid prototyping, and ensuring the scalability and robustness</strong> of the platform to support high-volume user engagement.
                </p>

                <p>
                  In my role as a full-stack engineer, I worked across both front-end and back-end domains. On the front-end, I implemented social media interfaces, built responsive components, and optimized <strong>UI performance for speed and cross-device responsiveness</strong>. I also improved the overall user experience by refining interaction flows, enhancing visual consistency, and <strong>prototyping key components</strong> to validate new ideas and features.
                </p>

                <p>
                  On the back-end, I was responsible for architecting and implementing <strong>high-performance services for media handling</strong>, covering ingestion, processing, storage, and retrieval of video content. This work required careful attention to performance, scalability, and cost efficiency, and laid the technical foundation for a product that seamlessly integrated social engagement with large-scale video delivery.
                </p>
              </div>
            </figure>

            <figure>
              <div className="logo">
                <img src="/media/images/logos/epam_systems_logo.jpg" alt="EPAM Logo" />
              </div>
              <div className="text">
                <figcaption>
                  Sr. Software Development Engineer
                  <small>EPAM Systems | Oct 2020 – Mar 2021</small>
                </figcaption>

                <p>
                  Developed an innovative platform for <strong>data-driven facility management decision-making</strong> for the United States Golf Association, utilizing a scalable microservice architecture on Microsoft Azure cloud infrastructure. Designed and maintained RESTful API services built on ASP.NET Core, Entity Framework Core, Microsoft SQL Server, Kafka, Autofac, and AutoMapper. Created comprehensive unit and integration <strong>tests within a test-driven development environment</strong> to ensure system reliability.
                </p>

                <p>
                  Led and <strong>mentored a team of interns</strong> working on a &quot;random coffee&quot; website designed to foster relationships among company members. Actively participated in gathering and understanding the project's business requirements. Assisted interns in setting both short-term and long-term goals, providing continuous support throughout the project lifecycle. Offered guidance to overcome complex challenges and ensured project deadlines were met.
                </p>
              </div>
            </figure>

            <figure>
              <div className="logo">
                <img src="/media/images/logos/intel_corporation_logo.jpg" alt="Intel Logo" />
              </div>
              <div className="text">
                <figcaption>
                  Senior Software Engineer Technical Lead
                  <small>Intel Corporation | Mar 2018 – Oct 2020</small>
                </figcaption>

                <p>
                  Assumed the role of Team Leader for a newly established team in Nizhny Novgorod. Played an <strong>active role in the hiring and team-building process</strong>, mentoring the majority of newly hired employees to ensure their smooth and efficient integration. Additionally, managed engagement with key business stakeholders and oversaw the organization of product build and distribution processes.
                </p>

                <p>
                  Led the development of new project infrastructure and contributed to the <strong>rapid setup of a continuous integration system</strong>, resulting in a significant reduction in project build time. Improved code management and review processes by applying industry-leading development and testing practices.
                </p>

                <p>
                  Successfully implemented several business-critical features. Led the quick and effective resolution of critical security vulnerabilities, collaborating with other teams to ensure no impact on release schedules. Coordinated closely with customers, addressing initial feedback on critical issues and ensuring timely delivery of the final product with all reported blockers resolved.
                </p>
              </div>
            </figure>

            <figure>
              <div className="logo">
                <img src="/media/images/logos/intel_corporation_logo.jpg" alt="Intel Logo" />
              </div>
              <div className="text">
                <figcaption>
                  Sr. Software Development Engineer
                  <small>Intel Corporation | Jun 2013 – Mr 2018</small>
                </figcaption>

                <p>
                  Software engineer responsible for the design, development, and maintenance of the Intel Registration Center’s entitlement and download website for Intel software products, with a focus on enhancing both the user interface and system APIs.
                </p>

                <p>
                  Designed and developed a new website architecture for the Intel Registration Center, utilizing modern user interface technologies. Played a key role in migrating ASP.NET web pages to MVC architecture, which improved website performance, enhanced the user experience, and simplified maintenance.
                </p>

                <p>
                  Implemented a modern role-based access control model, enabling dynamic management of user access to web pages through role assignments.
                </p>

                <p>
                  Developed infrastructure and processes for automated project deployment, encompassing source code compilation, configuration file transformations, and publishing to integration servers in both development and pre-production environments. This automation ensures consistent, error-free, and reproducible code migrations.
                </p>
              </div>
            </figure>

            <figure>
              <div className="logo">
                <img src="/media/images/logos/intel_corporation_logo.jpg" alt="Intel Logo" />
              </div>
              <div className="text">
                <figcaption>
                  Software Development Engineer
                  <small>Intel Corporation | Aug 2011 – Jun 2013</small>
                </figcaption>

                <p>
                  Main software developer responsible for licensing and installation technologies for Intel software products on Linux. Spearheaded the addition of critical Graphical User Interface (GUI) functionality. Designed and developed an installation wizard for the installation client, streamlining the product installation creation process. Demonstrated a strong commitment to quality by developing an Automated Unit Test System, improving early-stage bug detection and overall software reliability.
                </p>

                <p>
                  Implemented the code signing interface within the installation client, ensuring secure software deployment. Additionally, developed and integrated the Smart Cache and Shell Executor features, significantly reducing initialization times and improving execution efficiency on Linux platforms.
                </p>
              </div>
            </figure>
          </section>

          <section className="education">
            <h1>
              Education
            </h1>

            <figure className="entry">
              <div className="logo">
                <img src="/media/images/logos/madi_logo.jpg" alt="MADI Logo" />
              </div>
              <div className="text">
                <figcaption>
                  Moscow State Automobile and Road Technical Institute
                  <small>Engineer, Computer Science | Sep 2006 - Jun 2011</small>
                </figcaption>

                <p>
                  Thesis: The use of neural networks in forecasting the stock market and development automated information system for analysis and market forecasting.
                </p>
              </div>
            </figure>

            <figure className="entry">
              <div className="logo">
                <img src="/media/images/logos/eas_logo.jpg" alt="European Aviation School Logo" />
              </div>
              <div className="text">
                <figcaption>
                  European Aviation School
                  <small>Pilot | Oct 2022 - Jun 2023</small>
                </figcaption>

                <p>
                  Ratings: Private Pilot License (PPL) with Single-Engine Rating (SEL).
                </p>
              </div>
            </figure>
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

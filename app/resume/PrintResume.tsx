export default function PrintResume() {
  return (
    <div className="print-only-resume" aria-hidden="true">
      <header>
        <h1>Kevin Zheng</h1>
        <p className="print-only-resume__contact">
          <a href="mailto:contact@kevinzheng.fyi">contact@kevinzheng.fyi</a>{" "}
          <span className="print-only-resume__pipe">|</span> Brooklyn, NY
        </p>
        <p className="print-only-resume__contact">
          <a href="https://github.com/x1yl">github.com/x1yl</a>{" "}
          <span className="print-only-resume__pipe">|</span>{" "}
          <a href="https://www.linkedin.com/in/kevzheng/">
            linkedin.com/in/kevzheng
          </a>
        </p>
      </header>

      <section>
        <h2>EDUCATION</h2>
        <div className="print-only-resume__entry">
          <div className="print-only-resume__row">
            <h3>Brooklyn Technical High School</h3>
            <p className="print-only-resume__date">Expected June 2027</p>
          </div>
          <p className="print-only-resume__sub">
            Mechatronics &amp; Robotics Major | GPA: 3.7
          </p>
          <ul>
            <li>
              <strong>Relevant Coursework:</strong> Computer Science A (AP),
              Computer Science Principles (AP), Digital Electronics (PLTW),
              Drafting &amp; Design Production (PLTW), Robotics Engineering
            </li>
          </ul>
        </div>
        <div className="print-only-resume__entry">
          <div className="print-only-resume__row">
            <h3>CUNY City College of Technology (College Now)</h3>
            <p className="print-only-resume__date">May 2026</p>
          </div>
          <p>
            Completed CST 1101: Problem Solving with Computer Programming
          </p>
        </div>
      </section>

      <section>
        <h2>LEADERSHIP &amp; COMMUNITY INVOLVEMENT</h2>
        <div className="print-only-resume__entry">
          <div className="print-only-resume__row">
            <h3>BTHS Action, Brooklyn, NY</h3>
            <p className="print-only-resume__date">May 2024 – Present</p>
          </div>
          <p className="print-only-resume__sub">Vice President</p>
          <ul>
            <li>
              Worked with the President to host monthly engaging club meetings
              for over 100 members, such as running games or movie nights.
            </li>
            <li>
              Maintain the website, where members can easily sign up for
              volunteer events, leading to over 300 volunteer hours
              contributed.
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2>EXPERIENCE</h2>
        <div className="print-only-resume__entry">
          <div className="print-only-resume__row">
            <h3>Workplace Challenge with Duolingo</h3>
            <p className="print-only-resume__date">
              November – December 2025
            </p>
          </div>
          <div className="print-only-resume__row print-only-resume__sub">
            <p>Participant</p>
            <p>Brooklyn, New York</p>
          </div>
          <ul>
            <li>
              Learned about the design and prototype process of creating an app.
            </li>
            <li>Designed and presented an educational app at Duolingo.</li>
          </ul>
        </div>
        <div className="print-only-resume__entry">
          <div className="print-only-resume__row">
            <h3>Center for Family Life, Brooklyn, NY</h3>
            <p className="print-only-resume__date">July – August 2025</p>
          </div>
          <div className="print-only-resume__row print-only-resume__sub">
            <p>Office Assistant Intern</p>
            <p>Brooklyn, New York</p>
          </div>
          <ul>
            <li>
              Managed and processed documentation for 700+ program
              participants, ensured 100% accuracy and ease of access.
            </li>
            <li>
              Collaborated effectively with a team of 3 peers to support the
              administrative team and meet all deadlines.
            </li>
            <li>
              Played a key role in an office reorganization by moving supplies
              and boxes.
            </li>
            <li>
              Helped maintain seamless office operations by proactively
              assisting with filing, organization, and other administrative
              tasks.
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2>PROJECTS</h2>
        <div className="print-only-resume__entry">
          <p className="print-only-resume__project">
            <strong>FTC Robot</strong> | Java, FTC SDK, RoadRunner, Limelight,
            Pinpoint
          </p>
          <ul>
            <li>
              Programmed the control system for FTC Team 27705&rsquo;s BIOBUZZ
              robot, including RoadRunner mecanum drive, Pinpoint localization,
              Limelight vision, and PID-controlled mechanisms.
            </li>
          </ul>
        </div>
        <div className="print-only-resume__entry">
          <p className="print-only-resume__project">
            <strong>Study Room</strong> | TypeScript, Next.js, TailwindCSS,
            tRPC, Prisma, React
          </p>
          <ul>
            <li>
              Developed a collaborative study platform for peers to focus
              together in real time.
            </li>
            <li>
              Implemented user authentication and real-time updates for shared
              study sessions.
            </li>
          </ul>
        </div>
        <div className="print-only-resume__entry">
          <p className="print-only-resume__project">
            <strong>BTHS ACTION</strong> | TypeScript, Next.js, TailwindCSS,
            tRPC, Prisma, React
          </p>
          <ul>
            <li>
              Maintain the full-stack website for a 100+ member volunteer club,
              streamlining event sign-ups and announcements.
            </li>
          </ul>
        </div>
        <div className="print-only-resume__entry">
          <p className="print-only-resume__project">
            <strong>Portfolio Website</strong> | TypeScript, Next.js,
            TailwindCSS, React
          </p>
          <ul>
            <li>
              Designed and deployed a modern portfolio to showcase projects and
              professional growth.
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2>SKILLS</h2>
        <p className="print-only-resume__skills">
          <strong>Languages:</strong> TypeScript · JavaScript · Python · Java ·
          HTML · CSS
        </p>
        <p className="print-only-resume__skills">
          <strong>Frameworks:</strong> Next.js · React · Tailwind CSS ·
          Node.js · tRPC · Prisma
        </p>
        <p className="print-only-resume__skills">
          <strong>Tools:</strong> Vercel · Upstash · Git &amp; GitHub · Figma ·
          Cloudflare
        </p>
        <p className="print-only-resume__skills">
          <strong>Robotics:</strong> FTC SDK · RoadRunner · Limelight ·
          Pinpoint · PID control · AprilTag vision
        </p>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import styles from "./hackathon.module.css";

export const metadata: Metadata = {
  title: "SSETC Hackathon 2026 | Symbiosis–SolixEmpower Tech Conclave 2026",
  description:
    "From Healthcare Challenges to Real-World Solutions. Register free for Round 1 of the SSETC Hackathon 2026, 10–12 December 2026, SIU Campus, Lavale, Pune.",
};

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], display: "swap" });

const cx = (...names: string[]) => names.map((name) => styles[name]).join(" ");

export default function HackathonPage() {
  return (
    <main>
      <div className={`${styles.wrapper} ${inter.className}`}>
      <div id="top">
          <section className={cx("hero")} aria-labelledby="hero-title">
            <div className={cx("container", "hero-grid")}>
              <div className={cx("hero-copy-block")}>
                <h1 id="hero-title">SSETC <span className={cx("highlight")}>Hackathon 2026</span></h1>
                <p className={cx("hero-subtitle")}>From Healthcare Challenges to Real-World Solutions</p>
                <p className={cx("hero-copy")}>What if one idea could help solve a real healthcare challenge? The <b>SSETC Hackathon 2026</b> invites you to explore a scenario-based healthcare problem, think beyond disciplinary boundaries and propose technology-driven solutions with the potential to make a difference.</p>
                <div className={cx("hero-actions")}>
                  <Link className={cx("btn", "btn-primary")} href="/hackathon/register">Register — Round 1 <span className={cx("arrow")} aria-hidden="true">→</span></Link>
                  <a className={cx("btn", "btn-secondary")} href="#challenge">Explore the Challenge <span className={cx("arrow")} aria-hidden="true">↓</span></a>
                </div>
                <div className={cx("event-meta")} id="event-details">
                  <div className={cx("meta-item")}><span className={cx("meta-icon")} aria-hidden="true"><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M7 3v4M17 3v4M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span><span><small>Event dates</small>10–12 December 2026</span></div>
                  <div className={cx("meta-item")}><span className={cx("meta-icon")} aria-hidden="true"><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8"/></svg></span><span><small>Venue</small>SMCW &amp; SUHRC, SIU Campus, Lavale, Pune</span></div>
                </div>
              </div>
              <div className={cx("hero-visual")} aria-label="Hackathon overview">
                <div className={cx("visual-orbit")} aria-hidden="true"></div>
                <div className={cx("campus-scene")} aria-hidden="true"></div>
              </div>
            </div>
          </section>
      
          <section className={cx("content-section p-0", "challenge-section")} id="challenge">
            <div className={cx("container")}>
              <div className={cx("challenge-intro")}>
                <div className={cx("section-head")}>
                  <div className={cx("eyebrow")}>The Challenge</div>
                  <h2>A realistic healthcare scenario.<br />A problem worth solving.</h2>
                  <p>The problem statement will be announced on the real world healthcare scenario. Analyse the challenge, consider the people and systems affected, and submit a proposed solution. The most innovative & realistic entries will be shortlisted for the on-campus Grand Finale.</p>
                </div>
                <aside className={cx("challenge-callout")}>
                  <strong>Think cross boundaries.</strong>
                  <p>Healthcare problems rarely fit into one subject. Bring clinical understanding, technical expertise and a clear view of the people who may benefit.</p>
                </aside>
              </div>
              <div className={cx("challenge-pillars")}>
                <article className={cx("pillar")}><div className={cx("icon-box", "orange")} aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.8"/><path d="m16 16 5 5M8 10.5h5M10.5 8v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></div><h3>Understand the problem</h3><p>Explore the scenario, identify the underlying need and consider the people, constraints and context involved.</p></article>
                <article className={cx("pillar")}><div className={cx("icon-box")} aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="2.4" stroke="currentColor" strokeWidth="1.8"/><circle cx="5" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.8"/><circle cx="19" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.8"/><path d="m10.8 7.2-4.6 8.6M13.2 7.2l4.6 8.6M7.5 18h9" stroke="currentColor" strokeWidth="1.8"/></svg></div><h3>Think across disciplines</h3><p>Combine different perspectives to connect real healthcare needs with technology and innovation.</p></article>
                <article className={cx("pillar")}><div className={cx("icon-box", "blue")} aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 3h10l4 4v14H5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M15 3v5h4M8 12h8M8 16h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></div><h3>Propose a real-world solution</h3><p>Develop a clear, considered proposal with practical potential, and explain how your approach addresses the challenge.</p></article>
              </div>
            </div>
          </section>
      
          <section className={cx("content-section", "rounds-section")} id="rounds">
            <div className={cx("container")}>
              <div className={cx("section-head", "center")}>
                <div className={cx("eyebrow")}>Two Rounds. One Opportunity to Innovate.</div>
                <h2>Your idea starts here.</h2>
                <p>Begin with the announced challenge. If shortlisted, progress to the on-campus Grand Finale to develop, refine and present your solution.</p>
              </div>
              <div className={cx("rounds-grid")}>
                <article className={cx("round-card")}>
                  <div className={cx("round-card-top")}>
                    <div className={cx("round-header-info")}>
                      <div className={cx("round-label")}>
                        <span className={cx("round-badge", "orange")}>ROUND 1</span>
                        {/* <span className={cx("round-label-text")}>The Scenario Challenge</span> */}
                      </div>
                      <h3>The Scenario Challenge</h3>
                    </div>
                    <div className={cx("price-tag", "free-tag")}>FREE REGISTRATION</div>
                  </div>
                  <p>Explore the released problem statement, understand the healthcare challenge and submit your proposed solution. Entries will be evaluated, and 100 students will be shortlisted for the Grand Finale.</p>
                  <ul className={cx("round-list")}>
                    <li><span className={cx("check")}>✓</span><span>Review the scenario-based healthcare problem statement.</span></li>
                    <li><span className={cx("check")}>✓</span><span>Analyse the challenge and submit a solution proposal.</span></li>
                    <li><span className={cx("check")}>✓</span><span>Compete for a place among the first 100 shortlisted students.</span></li>
                  </ul>
                  <div style={{ marginTop: "1.25rem" }}>
                    <Link className={cx("btn", "btn-primary")} href="/hackathon/register" style={{ display: "block", textAlign: "center", fontSize: "0.92rem", padding: "0.75rem 1.25rem" }}>Register for Round 1 (Free) <span className={cx("arrow")} aria-hidden="true">→</span></Link>
                  </div>
                </article>
                <article className={cx("round-card", "round-two")}>
                  <div className={cx("round-card-top")}>
                    <div className={cx("round-header-info")}>
                      <div className={cx("round-label")}>
                        <span className={cx("round-badge", "blue")}>ROUND 2</span>
                        {/* <span className={cx("round-label-text")}>The Grand Finale</span> */}
                      </div>
                      <h3>The Grand Finale</h3>
                    </div>
                    <div className={cx("price-tag", "paid-tag")}>₹1,500 / STUDENT</div>
                  </div>
                  <p>The 100 shortlisted students will come to the Symbiosis campus at Lavale, Pune, to develop, refine and present their solutions during the on-campus Grand Finale.</p>
                  <ul className={cx("round-list")}>
                    <li><span className={cx("check")}>✓</span><span>Participate on campus at Symbiosis International University, Lavale.</span></li>
                    <li><span className={cx("check")}>✓</span><span>Build on your proposal and communicate the solution clearly.</span></li>
                    <li><span className={cx("check")}>✓</span><span>Present your thinking during the Grand Finale.</span></li>
                  </ul>
                </article>
              </div>
              {/* <div className={cx("round-note")}><strong>Important:</strong> Round 1 registration is free. The ₹1,500 fee applies only to each student shortlisted for the paid Grand Finale. It is not charged at the initial registration stage.</div> */}
            </div>
          </section>
      
          <section className={cx("content-section p-0", "audience-section p-0")} id="who">
            <div className={cx("container", "audience-grid")}>
              <div className={cx("audience-copy")}>
                <div className={cx("eyebrow")}>Who should participate?</div>
                <h2>Different disciplines.<br />One shared challenge.</h2>
                <p>Students interested in healthcare, medicine, engineering, artificial intelligence, data science are invited to apply their knowledge to real-world healthcare challenges.</p>
              </div>
              <div className={cx("discipline-grid")} aria-label="Relevant areas of study">
                <div className={cx("discipline")}><span className={cx("tiny-icon")} aria-hidden="true">✚</span><strong>Healthcare </strong></div>
                <div className={cx("discipline")}><span className={cx("tiny-icon")} aria-hidden="true">⌘</span><strong>Technology</strong></div>
                <div className={cx("discipline")}><span className={cx("tiny-icon")} aria-hidden="true">⌬</span><strong>Medicine</strong></div>
              </div>
            </div>
          </section>
      
          {/* <section className={cx("content-section", "benefits-section")} id="benefits">
            <div className={cx("container")}>
              <div className={cx("section-head", "center")}>
                <div className={cx("eyebrow")}>What will you gain?</div>
                <h2>More than an idea on paper.</h2>
                <p>Use the challenge to practise how you think, work with others and communicate a solution.</p>
              </div>
              <div className={cx("benefits-grid")}>
                <article className={cx("benefit")}><div className={cx("icon-box", "orange")} aria-hidden="true"><svg width="21" height="21" viewBox="0 0 24 24" fill="none"><path d="M12 3 14 9l6 1-4.5 4 1.3 6L12 17l-5 3 1.3-6L4 10l6-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg></div><h3>Think critically</h3><p>Understand healthcare problems from different perspectives and identify what matters most.</p></article>
                <article className={cx("benefit")}><div className={cx("icon-box")} aria-hidden="true"><svg width="21" height="21" viewBox="0 0 24 24" fill="none"><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.7"/><circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.7"/><path d="M2.5 20v-1.2A4.8 4.8 0 0 1 7.3 14h1.4a4.8 4.8 0 0 1 4.8 4.8V20M14 15h2.1a4 4 0 0 1 4 4v1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg></div><h3>Collaborate across disciplines</h3><p>Connect clinical needs with technology, creativity and different ways of thinking.</p></article>
                <article className={cx("benefit")}><div className={cx("icon-box", "blue")} aria-hidden="true"><svg width="21" height="21" viewBox="0 0 24 24" fill="none"><path d="M4 19V5M4 19h16M7 15l4-4 3 2 5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M15.5 6H19v3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></div><h3>Build solutions</h3><p>Develop and present ideas with a focus on their practical potential and real-world relevance.</p></article>
                <article className={cx("benefit")}><div className={cx("icon-box", "orange")} aria-hidden="true"><svg width="21" height="21" viewBox="0 0 24 24" fill="none"><path d="M4 4h16v12H8l-4 4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M8 8h8M8 12h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></div><h3>Showcase your thinking</h3><p>Bring your approach before experts and evaluators and explain the thinking behind your proposal.</p></article>
              </div>
            </div>
          </section> */}
      
          <section className={cx("final-cta")} id="registration-info">
            <div className={cx("container")}>
              <div className={cx("cta-panel")}>
                <div className={cx("cta-copy")}><div className={cx("eyebrow")}>Ready to take on the challenge?</div><h2>Your first step is free. Your idea could be the beginning of something meaningful.</h2><p>Register Now</p></div>
                <div className={cx("cta-action")}><Link className={cx("btn", "btn-primary")} href="/hackathon/register">Register — Round 1 <span className={cx("arrow")} aria-hidden="true">→</span></Link></div>
              </div>
            </div>
          </section>
      </div>
      </div>
    </main>
  );
}

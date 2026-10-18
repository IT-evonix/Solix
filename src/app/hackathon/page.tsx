import InnerpageBanner from "@/components/InnerpageBanner";
import Image from "next/image";
import Link from "next/link";
import "../hackathon_S-D_.css";

import Faq from "@/components/Faq";
// import { Faq_Speakers } from "@/data/faqData";


const ContactPage = () => {
  return (
    <main>
      <div className="aboutus_page_mainbox mb-0 position_box">
        {/* <InnerpageBanner title="Hackathon" /> */}

        <section>
          <main id="top">
            <section className="hero" aria-labelledby="hero-title">
              
            </section>

            <section className="content-section challenge-section" id="challenge">
              <div className="container">
                <div className="challenge-intro">
                  <div className="section-head">
                    <div className="eyebrow">The Challenge</div>
                    <h2>A realistic healthcare scenario.<br></br>A problem worth solving.</h2>
                    <p>Participants will receive a healthcare problem statement framed around a real-world scenario. Analyse the challenge, consider the people and systems affected, and submit a proposed solution. The strongest entries will be shortlisted for the on-campus Grand Finale.</p>
                  </div>
                  <aside className="challenge-callout">
                    <strong>Think beyond your discipline.</strong>
                    <p>Healthcare problems rarely fit into one subject. Bring clinical understanding, technical creativity and a clear view of the people who may benefit.</p>
                  </aside>
                </div>
                <div className="challenge-pillars">
                  <article className="pillar"><div className="icon-box orange" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="1.8"></circle><path d="m16 16 5 5M8 10.5h5M10.5 8v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg></div><h3>Understand the problem</h3><p>Explore the scenario, identify the underlying need and consider the people, constraints and context involved.</p></article>
                  <article className="pillar"><div className="icon-box" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="2.4" stroke="currentColor" stroke-width="1.8"></circle><circle cx="5" cy="18" r="2.4" stroke="currentColor" stroke-width="1.8"></circle><circle cx="19" cy="18" r="2.4" stroke="currentColor" stroke-width="1.8"></circle><path d="m10.8 7.2-4.6 8.6M13.2 7.2l4.6 8.6M7.5 18h9" stroke="currentColor" stroke-width="1.8"></path></svg></div><h3>Think across disciplines</h3><p>Combine different perspectives to connect real healthcare needs with technology and innovation.</p></article>
                  <article className="pillar"><div className="icon-box blue" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 3h10l4 4v14H5z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><path d="M15 3v5h4M8 12h8M8 16h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg></div><h3>Propose a real-world solution</h3><p>Develop a clear, considered proposal with practical potential, and explain how your approach addresses the challenge.</p></article>
                </div>
              </div>
            </section>

            <section className="content-section rounds-section" id="rounds">
              <div className="container">
                <div className="section-head center">
                  <div className="eyebrow">Two Rounds. One Opportunity to Innovate.</div>
                  <h2>Your idea starts here.</h2>
                  <p>Begin with the free scenario challenge. If shortlisted, progress to the on-campus Grand Finale to develop, refine and present your solution.</p>
                </div>
                <div className="rounds-grid">
                  <article className="round-card">
                    <div className="round-card-top">
                      <div className="round-header-info">
                        <div className="round-label">
                          <span className="round-badge orange">ROUND 1</span>
                          <span className="round-label-text">The Scenario Challenge</span>
                        </div>
                        <h3>Explore. Analyse. Propose.</h3>
                      </div>
                      <div className="price-tag free-tag">FREE REGISTRATION</div>
                    </div>
                    <p>Explore the released problem statement, understand the healthcare challenge and submit your proposed solution. Entries will be evaluated, and 100 students will be shortlisted for the Grand Finale.</p>
                    <ul className="round-list">
                      <li><span className="check">✓</span><span>Review the scenario-based healthcare problem statement.</span></li>
                      <li><span className="check">✓</span><span>Analyse the challenge and submit a solution proposal.</span></li>
                      <li><span className="check">✓</span><span>Compete for a place among the 100 shortlisted students.</span></li>
                    </ul>
                    <div>
                      <a className="btn btn-primary" href="https://conferance-production.up.railway.app/hackathon/register">Register for Round 1 (Free) <span className="arrow" aria-hidden="true">→</span></a>
                    </div>
                  </article>
                  <article className="round-card round-two">
                    <div className="round-card-top">
                      <div className="round-header-info">
                        <div className="round-label">
                          <span className="round-badge blue">ROUND 2</span>
                          <span className="round-label-text">The Grand Finale</span>
                        </div>
                        <h3>Develop. Refine. Present.</h3>
                      </div>
                      <div className="price-tag paid-tag">₹1,500 / STUDENT</div>
                    </div>
                    <p>The 100 shortlisted students will come to the Symbiosis campus at Lavale, Pune, to develop, refine and present their solutions during the on-campus Grand Finale.</p>
                    <ul className="round-list">
                      <li><span className="check">✓</span><span>Participate on campus at Symbiosis International University, Lavale.</span></li>
                      <li><span className="check">✓</span><span>Build on your proposal and communicate the solution clearly.</span></li>
                      <li><span className="check">✓</span><span>Present your thinking during the Grand Finale.</span></li>
                    </ul>
                  </article>
                </div>
                <div className="round-note"><strong>Important:</strong> Round 1 registration is free. The ₹1,500 fee applies only to each student shortlisted for the paid Grand Finale. It is not charged at the initial registration stage.</div>
              </div>
            </section>

            <section className="content-section audience-section" id="who">
              <div className="container audience-grid">
                <div className="audience-copy">
                  <div className="eyebrow">Who should participate?</div>
                  <h2>Different disciplines.One shared challenge.</h2>
                  <p>Students interested in healthcare, medicine, engineering, artificial intelligence, data science, design, life sciences and management are invited to apply their knowledge to real-world healthcare challenges.</p>
                </div>
                <div className="discipline-grid" aria-label="Relevant areas of study">
                  <div className="discipline"><span className="tiny-icon" aria-hidden="true">✚</span><strong>Healthcare &amp; Medicine</strong></div>
                  <div className="discipline"><span className="tiny-icon" aria-hidden="true">⌘</span><strong>Engineering</strong></div>
                  <div className="discipline"><span className="tiny-icon" aria-hidden="true">◈</span><strong>AI &amp; Data Science</strong></div>
                  <div className="discipline"><span className="tiny-icon" aria-hidden="true">✳</span><strong>Design</strong></div>
                  <div className="discipline"><span className="tiny-icon" aria-hidden="true">⌬</span><strong>Life Sciences</strong></div>
                  <div className="discipline"><span className="tiny-icon" aria-hidden="true">▤</span><strong>Management</strong></div>
                </div>
              </div>
            </section>

            <section className="content-section benefits-section" id="benefits">
              <div className="container">
                <div className="section-head center">
                  <div className="eyebrow">What will you gain?</div>
                  <h2>More than an idea on paper.</h2>
                  <p>Use the challenge to practise how you think, work with others and communicate a solution.</p>
                </div>
                <div className="benefits-grid">
                  <article className="benefit"><div className="icon-box orange" aria-hidden="true"><svg width="21" height="21" viewBox="0 0 24 24" fill="none"><path d="M12 3 14 9l6 1-4.5 4 1.3 6L12 17l-5 3 1.3-6L4 10l6-1z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"></path></svg></div><h3>Think critically</h3><p>Understand healthcare problems from different perspectives and identify what matters most.</p></article>
                  <article className="benefit"><div className="icon-box" aria-hidden="true"><svg width="21" height="21" viewBox="0 0 24 24" fill="none"><circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.7"></circle><circle cx="17" cy="9" r="2.5" stroke="currentColor" stroke-width="1.7"></circle><path d="M2.5 20v-1.2A4.8 4.8 0 0 1 7.3 14h1.4a4.8 4.8 0 0 1 4.8 4.8V20M14 15h2.1a4 4 0 0 1 4 4v1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path></svg></div><h3>Collaborate across disciplines</h3><p>Connect clinical needs with technology, creativity and different ways of thinking.</p></article>
                  <article className="benefit"><div className="icon-box blue" aria-hidden="true"><svg width="21" height="21" viewBox="0 0 24 24" fill="none"><path d="M4 19V5M4 19h16M7 15l4-4 3 2 5-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15.5 6H19v3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg></div><h3>Build solutions</h3><p>Develop and present ideas with a focus on their practical potential and real-world relevance.</p></article>
                  <article className="benefit"><div className="icon-box orange" aria-hidden="true"><svg width="21" height="21" viewBox="0 0 24 24" fill="none"><path d="M4 4h16v12H8l-4 4z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><path d="M8 8h8M8 12h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg></div><h3>Showcase your thinking</h3><p>Bring your approach before experts and evaluators and explain the thinking behind your proposal.</p></article>
                </div>
              </div>
            </section>

            <section className="final-cta" id="registration-info">
              <div className="container">
                <div className="cta-panel">
                  <div className="cta-copy"><div className="eyebrow">Ready to take on the challenge?</div><h2>Your first step is free. Your idea could be the beginning of something meaningful.</h2><p>Register for Round 1, explore the scenario and put your solution forward. Only 100 shortlisted students will be invited to the paid Grand Finale.</p></div>
                  <div className="cta-action"><a className="btn btn-primary" href="https://conferance-production.up.railway.app/hackathon/register">Register — Round 1 <span className="arrow" aria-hidden="true">→</span></a><small>Round 1 is free. The ₹1,500 fee applies only after shortlisting for the Grand Finale.</small></div>
                </div>
              </div>
            </section>
          </main>
        </section>
        <section className="mb-5 pt-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center heading19_black">Coming Soon...222</div>
              <div className="col-lg-12 text-center mt-3">
                <Link href="/hackathon/register" className="input_button_box d-inline-block text-decoration-none">
                  Register for Hackathon — Round 1
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ContactPage;
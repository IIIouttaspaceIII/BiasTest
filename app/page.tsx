"use client";

import { useState } from "react";

type Choice = {
  label: string;
  feedback: string;
  stronger: boolean;
};

type Scenario = {
  setting: string;
  title: string;
  paragraphs: string[];
  prompt: string;
  bias: string;
  insight: string;
  choices: Choice[];
};

const scenarios: Scenario[] = [
  {
    setting: "A late shift at the county hospital",
    title: "One result, two risks",
    paragraphs: [
      "A patient arrives with a positive result for a disease so uncommon that, in fifty thousand people like them, doctors would expect to see just one case. The lab catches nearly every person who has it. But among people who do not, about one in a hundred still gets a positive result.",
      "Without treatment, a person with the disease is unlikely to survive the month, and a two-day delay adds a serious risk for someone already deteriorating. The operation itself is successful for most patients, but one in fifty die during surgery. An independent follow-up test can be back in 48 hours, but the invasive test causes a serious complication in two out of every hundred patients. The patient asks what you recommend.",
    ],
    prompt: "What do you advise the care team to do?",
    bias: "Base-rate neglect",
    insight: "The test sounds highly capable, but the disease is extraordinarily rare: a positive result means roughly one true case per hundred positive results, not certainty. Usually that makes confirmation sensible. Here, however, both the operation and the invasive follow-up carry more risk than the small chance of disease suggested by the result. The less intuitive answer is to avoid both procedures for now and monitor the patient while explaining the uncertainty and alternatives.",
    choices: [
      {
        label: "Recommend the operation now because the positive result is effectively a diagnosis.",
        feedback: "A rare disease result is not certain, and the operation's 2% mortality is greater than the chance that this patient has the disease. The base rate and the patient's alternatives should be part of the recommendation.",
        stronger: false,
      },
      {
        label: "Delay all action until the follow-up test returns; two days is a small price for certainty.",
        feedback: "The follow-up is informative, but it is not free: its complication risk and the danger of losing two days must be weighed against the operation's risk.",
        stronger: false,
      },
      {
        label: "Recommend the operation now after explaining the false-positive rate, the follow-up risk, and the cost of delay.",
        feedback: "This still gives an invasive treatment priority over observation even though the positive result implies only about a 1% chance of disease. The operation's 2% mortality should be weighed against that small probability and the patient's alternatives.",
        stronger: false,
      },
      {
        label: "As the attending physician, recommend no surgery for now; monitor the patient before choosing either operation.",
        feedback: "This is the stronger choice because the disease is so rare that the positive result implies only about a 1% chance of disease, while both the immediate operation and the invasive follow-up carry roughly 2% risk or more. Observation avoids those immediate harms while the care team reassesses the patient.",
        stronger: true,
      },
    ],
  },
  {
    setting: "A review of the national screening program",
    title: "More years after diagnosis",
    paragraphs: [
      "A new screening program finds a slow-growing cancer years before people would normally notice symptoms. Patients whose cancer is found through screening now live an average of seven years after diagnosis. Before the program, the average was four.",
      "The program has been running long enough for the ministry to review early outcomes and consider whether to expand it. The health minister asks the advisory panel what evidence should guide the next decision.",
    ],
    prompt: "Which evidence should decide whether the program expands?",
    bias: "Lead-time bias",
    insight: "The evidence is inconclusive. Finding a disease sooner moves the start of the survival clock earlier, so longer survival after diagnosis may reflect earlier detection rather than longer life. Before expanding the program, the minister needs population-level mortality, overdiagnosis, treatment harms, and quality-of-life data.",
    choices: [
      {
        label: "Expand it. Screened patients live three years longer after diagnosis.",
        feedback: "That clock starts when a diagnosis is made, and screening makes that happen earlier. A longer interval after diagnosis does not necessarily mean a longer life.",
        stronger: false,
      },
      {
        label: "Keep the program at its current size while comparing overall outcomes and treatment harms.",
        feedback: "This preserves access while testing whether the program improves outcomes that matter beyond the time between diagnosis and death.",
        stronger: false,
      },
      {
        label: "Call the evidence inconclusive and collect mortality, overdiagnosis, harms, and quality-of-life data before expanding.",
        feedback: "That is the defensible conclusion from the information provided: post-diagnosis survival alone cannot tell us whether screening helps people live longer or improves their lives overall.",
        stronger: true,
      },
      {
        label: "Expand screening first among people most likely to benefit, then compare their outcomes with the current program.",
        feedback: "Targeting higher-risk people may be sensible, but expansion still needs a comparison that can separate earlier diagnosis from longer life and account for harms.",
        stronger: false,
      },
    ],
  },
  {
    setting: "A hospital quality committee",
    title: "The better number on paper",
    paragraphs: [
      "The hospital administration is auditing surgeries performed under the instruction of department heads. Staff in one department have noticed that surgeries there seem less successful, and the first report appears to support them: surgeons who stayed in their original department had a 92% success rate, while the figure after a transfer fell to 78%. The board is considering whether the department head's instructions or transfers should be restricted.",
      "The board has been asked to decide how to respond before the next reporting period. Department heads disagree about what the numbers mean, but the initial report contains no explanation for the difference.",
    ],
    prompt: "What should the administration do next?",
    bias: "Simpson's paradox",
    insight: "The drop after transfer may be real, but an observational headline cannot show that the transfer caused it. Departments may receive different patients, surgeons may select different cases, and the records may combine unlike procedures. Audit the data, compare comparable cases, adjust for starting conditions, and only then investigate the transfer process or change policy.",
    choices: [
      {
        label: "Pause non-urgent transfers while the hospital checks whether the lower rate signals an immediate safety risk.",
        feedback: "A temporary precaution may be reasonable, but the headline comparison alone does not show that transfers caused the lower rate. The pause should not become a permanent policy without a fairer comparison.",
        stronger: false,
      },
      {
        label: "Provide additional training to the departments with weaker success rates and monitor the next reporting period.",
        feedback: "Training and monitoring could help if a department-level problem is real, but the weaker headline rate may reflect which patients and procedures each department receives. The administration should avoid treating the rate as a diagnosis.",
        stronger: false,
      },
      {
        label: "Keep the current policy temporarily and commission an independent review of outcomes for comparable patients and procedures.",
        feedback: "This preserves access while testing whether the difference remains after accounting for the patients, procedures, surgeons, departments, and transfers involved. The administration can then act on a clearer signal rather than the headline rate alone.",
        stronger: true,
      },
      {
        label: "Use the 85% combined rate as a provisional benchmark while department heads investigate the difference.",
        feedback: "A provisional benchmark can support short-term reporting, but a blended number may describe neither department nor any particular patient group. It should not replace a comparison of like cases.",
        stronger: false,
      },
    ],
  },
  {
    setting: "A late meeting in the surgical oncology unit",
    title: "One more operation",
    paragraphs: [
      "A patient with recurrent abdominal cancer has already had three major surgeries. Each one briefly controlled the disease, but the latest scan shows it has returned near a vital organ. A fourth operation might buy some time, yet it carries a high risk of complications and a long recovery.",
      "The patient is tired of hospitals and asks about palliative care: pain control, support at home, and time with family. The surgical team worries that stopping after so many operations would mean the earlier risks and recovery were for nothing. The patient asks what the team recommends now.",
    ],
    prompt: "How should the team approach the next decision?",
    bias: "Sunk-cost fallacy",
    insight: "The earlier surgeries and the suffering they involved cannot be recovered by choosing another operation. The decision now should turn on the fourth surgery's likely benefit, risks, recovery burden, and the patient's goals compared with palliative care. Continuing treatment may be right, but making past treatment feel worthwhile is not a reason by itself.",
    choices: [
      {
        label: "Recommend the fourth surgery. Stopping now would make the first three operations feel wasted.",
        feedback: "The earlier operations cannot be recovered, and their burden is not a reason to expose the patient to another risky procedure. The new decision needs its own expected benefits and harms.",
        stronger: false,
      },
      {
        label: "Choose palliative care immediately because another operation would only repeat the past.",
        feedback: "Avoiding sunk costs does not mean refusing surgery automatically. The team should still consider the likely benefit of the operation and the patient's informed preferences.",
        stronger: false,
      },
      {
        label: "Compare the fourth surgery's likely benefit, risks, recovery burden, and the patient's goals with palliative care from today onward.",
        feedback: "This sets aside the irrecoverable burden of the earlier surgeries while still taking the patient's prognosis, quality of life, and preferences seriously.",
        stronger: true,
      },
      {
        label: "Continue operating as long as each surgery offers any chance of extending life.",
        feedback: "A chance of benefit is not enough by itself. The size and likelihood of that benefit must be weighed against complications, recovery time, and what the patient wants.",
        stronger: false,
      },
    ],
  },
  {
    setting: "A safety review of a new medication",
    title: "The cause that takes its place",
    paragraphs: [
      "A previously untested medication for a severe lung disease cuts deaths from respiratory failure by half. After several years, researchers notice that a larger share of deaths among treated patients comes from heart disease than it did before the medication was introduced.",
      "A headline says the medication shifts deaths from the lungs to the heart. The manufacturer says the treatment saves lives. The public health director asks what conclusion the evidence supports before deciding whether to recommend the medication more widely.",
    ],
    prompt: "How should the director interpret the change in causes of death?",
    bias: "Competing risks",
    insight: "Preventing deaths from one cause leaves more people alive and able to die later from other causes. That can increase another cause's share of deaths without increasing each person's risk of dying from it. The medication should be judged using all-cause mortality and appropriate cause-specific comparisons, not a raw change in the mix of deaths alone.",
    choices: [
      {
        label: "Reject the medication. A higher share of heart-disease deaths shows that it creates a new fatal risk.",
        feedback: "A higher share is not the same as a higher individual risk. Fewer respiratory deaths can leave heart disease as a larger fraction of the remaining deaths even if the medication does not cause it.",
        stronger: false,
      },
      {
        label: "Approve it automatically. Any reduction in respiratory deaths proves the medication improves survival overall.",
        feedback: "Reducing one cause is encouraging, but the full effect still requires all-cause mortality, adverse events, and appropriately timed comparisons.",
        stronger: false,
      },
      {
        label: "Compare all-cause mortality and cause-specific risks over the same follow-up period before judging the medication.",
        feedback: "This separates a real change in risk from a change in the mix of causes among people who survive longer, while still checking for harms from the medication.",
        stronger: true,
      },
      {
        label: "Count the heart-disease deaths and respiratory deaths together; the larger category identifies the medication's main harm.",
        feedback: "Raw counts and cause shares can be misleading when treatment changes how long people live. The comparison needs denominators, follow-up time, and overall mortality.",
        stronger: false,
      },
    ],
  },
  {
    setting: "An evaluation of an elderly nutrition program",
    title: "Who made it to the final report?",
    paragraphs: [
      "A food company studies whether its product can help extend healthy life in older patients. Participants are asked to eat a set number of calories from the company's solid-food diet each day. The report says that patients who consistently followed the diet had better health outcomes than patients who did not follow it and patients receiving usual care.",
      "At the end of the study, analysts compare patients who met the calorie target at every check-in with those who fell short at least once. Patients who did not consistently follow the diet are excluded from the final analysis. The company points to the results as evidence that its food improves health. What can the study establish?",
    ],
    prompt: "What conclusion is justified by these results?",
    bias: "Selection bias",
    insight: "The result is inconclusive about whether the food extends healthy life. Patients who were healthier and better able to eat solid food were more likely to remain in the adherent group, while illness or frailty could make adherence impossible. That selects the comparison groups based on health and can make adherence look beneficial even if the food itself has no effect. A fair test would compare groups assigned at the start and track outcomes for everyone, including those unable to continue the diet.",
    choices: [
      {
        label: "The food extends healthy life because the consistent-adherence group had better outcomes.",
        feedback: "The groups may have differed in health before or during the study. People able to keep eating solid food were more likely to appear in the adherent group, so the comparison cannot isolate an effect of the food.",
        stronger: false,
      },
      {
        label: "The results are inconclusive and cannot be established from the data given.",
        feedback: "That is the key concern: the ability to adhere is tied to health. The comparison may select healthier patients into the adherent group rather than reveal a benefit caused by the food.",
        stronger: true,
      },
      {
        label: "The food is ineffective because patients who failed to follow the diet did not do as well.",
        feedback: "Poorer outcomes among patients who could not adhere do not show the food failed or succeeded. Their health may have made adherence difficult and independently worsened their outcomes.",
        stronger: false,
      },
      {
        label: "The company should remove patients unable to eat solid food from future analyses to make the groups comparable.",
        feedback: "Excluding those patients would deepen the selection problem. Their outcomes matter, especially if their health affected whether they could follow the diet.",
        stronger: false,
      },
    ],
  },
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const finished = step === scenarios.length;
  const scenario = scenarios[step];

  function continueQuiz() {
    if (selected === null) return;
    setAnswers((current) => [...current, selected]);
    setSelected(null);
    setStep((current) => current + 1);
  }

  function restart() {
    setStep(0);
    setSelected(null);
    setAnswers([]);
  }

  const score = answers.reduce((total, answer, index) => total + Number(scenarios[index].choices[answer].stronger), 0);

  return (
    <main className="page-shell">
      <header className="topbar mx-auto flex max-w-[1220px] items-center justify-between">
        <a href="#top" className="flex items-center gap-3 no-underline" aria-label="The Bias Test, home">
          <span className="brand-mark">BT</span>
          <span className="text-[11px] font-bold uppercase tracking-[.14em]">The Bias Test</span>
        </a>
        <span className="text-[10px] font-bold uppercase tracking-[.12em] text-[#70756b]">Judgment, under pressure</span>
      </header>

      <section className="hero" id="top">
        <div>
          <div className="hero-kicker">A field guide to the mind</div>
          <h1 className="serif">The difficult call.</h1>
          <p>Six real-world dilemmas. Four imperfect choices. See what the numbers leave out.</p>
        </div>
        <div className="hero-index" aria-label="Six cases">
          <strong>FIELD NOTES&nbsp;&nbsp; / &nbsp;&nbsp;01—06</strong>
          <span>Take a breath before you decide.</span>
        </div>
      </section>

      {!finished && scenario && (
        <section className="quiz-wrap" aria-live="polite">
          <div className="progress-track" aria-label={`Case ${step + 1} of ${scenarios.length}`}>
            <div className="progress-fill" style={{ width: `${((step + (selected !== null ? 1 : 0)) / scenarios.length) * 100}%` }} />
          </div>
          <div className="case-bar">
            <span><strong>Case 0{step + 1}</strong> &nbsp;/&nbsp; 0{scenarios.length}</span>
            <span>{selected === null ? "Decision pending" : "Decision recorded"}</span>
          </div>

          <div className="case-grid" key={step}>
            <article className="case-story">
              <div className="story-tag"><span className="story-dot" />{scenario.setting}</div>
              <h2 className="serif">{scenario.title}</h2>
              <div className="story-copy">
                {scenario.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="story-foot">A fictional scenario for decision-making practice.</div>
            </article>

            <section className="decision" aria-labelledby="decision-heading">
              <div className="decision-label">The decision</div>
              <h3 id="decision-heading">{scenario.prompt}</h3>
              <div className="option-list">
                {scenario.choices.map((choice, index) => (
                  <button
                    className={`option-button${selected === index ? " selected" : ""}`}
                    key={choice.label}
                    onClick={() => setSelected(index)}
                    aria-pressed={selected === index}
                    disabled={selected !== null}
                  >
                    <span className="option-key">{String.fromCharCode(65 + index)}</span>
                    <span className="option-text">{choice.label}</span>
                  </button>
                ))}
              </div>
              {selected !== null && (
                <div className="feedback" role="status">
                  <strong>What this choice weighs: </strong>{scenario.choices[selected].feedback}
                </div>
              )}
              <div className="decision-bottom">
                <button className="continue-button" onClick={continueQuiz} disabled={selected === null}>
                  <span>{selected === null ? "Choose an option to continue" : step === scenarios.length - 1 ? "See your results" : "Continue to next case"}</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </section>
          </div>
        </section>
      )}

      {finished && (
        <section className="result-wrap">
          <div className="result-top">
            <span className="result-label">Your field notes</span>
            <span className="result-score">{score} / {scenarios.length} patterns spotted</span>
          </div>
          <h2 className="serif">The shape of a decision.</h2>
          <p className="result-intro">There is no score for being a good person here. These are common ways a difficult decision can pull attention toward one number and away from another.</p>
          <div className="result-list">
            {scenarios.map((item, index) => (
              <div className="result-row" key={item.bias}>
                <span className="result-number">0{index + 1}</span>
                <div>
                  <div className="result-bias">{item.bias}<span className="result-topic">{item.title}</span></div>
                </div>
                <span className="result-mark">{answers[index] !== undefined && item.choices[answers[index]].stronger ? "You checked the wider picture" : "Worth a second look"}</span>
              </div>
            ))}
          </div>
          <p className="result-note">These dilemmas simplify complicated decisions. In medicine, public policy, and engineering, good judgment depends on evidence, context, and the people affected.</p>
          <button className="restart-button" onClick={restart}>
            <span>Take the test again</span><span aria-hidden="true">↺</span>
          </button>
        </section>
      )}

      <footer className="footer">
        <span>Notice the frame. Question the first answer.</span>
        <span>Decision-making, made visible.</span>
      </footer>
    </main>
  );
}

import React from "react";
import Nav from "../components/Nav";
import styles from "../styles/Policy.module.css";

const TermsAndConditions = () => {
  const generalConditions = [
    "We reserve the right to refuse our service to anyone for any reason at any time whatsoever.",
    "The Website enables municipalities and other organisations that need vaccines, and are allowed to purchase them, to connect with labs and facilities that manufacture or supply vaccines across the world. The Website is merely a facilitating means that allows the collection and use of information regarding the demand and supply of vaccines with the stakeholders.",
    "Our involvement in the whole process shall be to provide a platform for others to share information on. We assume no liability, arising out of any  transaction or use of information available on the Website. The onus to ensure the safety, applicability and effectiveness of each transaction shall solely be on the parties themselves. We urge each party to carry out their own due-diligence when choosing to use this information or entering into a transaction.",
    "If you are a municipality, we shall not charge you for our services. Please note that our services shall be limited to providing contact information of various labs and facilities that may be able to fulfil your requirements of a particular vaccine.",
    "If you are a lab or facility that wants to increase its customer outreach, we may charge you a nominal retainer / subscription fee to provide you information about potential customers (such as municipalities) so that you can get in touch with them.",
    "As a general disclaimer, all information on the Website is merely illustrative in nature and should not be considered as medical advice under any circumstances. The use of data has been made in a manner that allows the users to understand complex concepts in a simple manner and the same should not be considered as medical advice under any circumstances.",
    "You agree that, from time to time, we may disable the Website, for indefinite periods of time, without notice to you.",
  ];

  const prohibitedData = [
    {
      bullet: "(a)",
      text: "for any unlawful purpose;",
    },
    {
      bullet: "(b)",
      text: "to solicit others to perform or participate in any unlawful acts;",
    },
    {
      bullet: "(c)",
      text:
        "to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances;",
    },
    {
      bullet: "(d)",
      text:
        "to infringe upon or violate our Intellectual Property Rights or the intellectual property rights of others;",
    },
    {
      bullet: "(e)",
      text:
        "to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate against any other person based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability;",
    },
    {
      bullet: "(f)",
      text: "to submit false or misleading information;",
    },
    {
      bullet: "(g)",
      text:
        "to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the service or of any related website, other websites, or the Internet;",
    },
    {
      bullet: "(h)",
      text: "to collect or track the personal information of others;",
    },
    {
      bullet: "(i)",
      text: "to spam, phish, pharm, pretext, spider, crawl, or scrape;",
    },
    {
      bullet: "(j)",
      text: "for any obscene or immoral purpose; or",
    },
    {
      bullet: "(k)",
      text:
        "to interfere with or circumvent the security features of the Website, or the Internet.",
    },
  ];

  const data = [
    {
      title: "Modifications to our services",
      content:
        "Our services are subject to change without any notice. We reserve the right to change or discontinue any service, at any time, without any prior notice. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of any service on the Website.",
    },
    {
      title: "Accuracy, Completeness and Reliability of information",
      content:
        "We and our affiliates always endeavour to provide information that is generally accurate. However, we do not warrant that the information or content on the Website is true, accurate, complete, reliable, current or error-free. ",
    },
    {
      title: "Accuracy of billing and account information",
      content:
        "You agree to promptly update your account and other information, including your email address and telephone number, so that we can complete transactions when required and contact you as needed. We reserve the right to refuse any request for service raised by you.",
    },
    {
      title: "Third-party links",
      content:
        "Certain content, products and services available on the Website may include materials from third-parties. Third-party links on the Website may direct you to third-party websites that are not affiliated with us or under our control. We do not assume any responsibility or liability for any third-party materials or websites. We shall not be liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review the third-party's policies and practices carefully.",
    },
    {
      title: "User Feedback",
      content:
        "You may provide feedback or complaints pertaining to any service on the Website by emailing to us at michal@searchvaccines.com. In case any such submission warrants a response, we typically respond within 3-5 working days.",
    },
    {
      title: "Personal information",
      content:
        "Your submission of personal information through the Website is governed by our Privacy Policy. Please read our Privacy Policy for more information in this regard.",
    },
    {
      title: "Intellectual Property Rights",
      content:
        "All content included on the Website, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and/or software, as well as its compilation is our exclusive property. All Intellectual Property Rights in the content on the Website vest, wholly and solely, with us.",
    },
    {
      title: "Limitation of Liability",
      content:
        "In no event shall we or any of our directors, officers, employees or affiliates be liable for any injury, loss, claim, or any damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of the Website, or for any other claim related in any way to your use of the Website, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content posted, transmitted, or otherwise made available via the service, even if advised of their possibility.",
    },
    {
      title: "Indemnification",
      content:
        "You agree to defend, indemnify and hold us and our affiliates harmless from and against any and all claims, damages, costs and expenses, including attorneys' fees, arising from or related to your use of the Website.",
    },
    {
      title: "Severability",
      content:
        "In the event that any provision of these Terms of Use is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Use. Such determination shall not affect the validity and enforceability of any other remaining provisions.",
    },
    {
      title: "Termination",
      content:
        "The obligations and liabilities of the parties incurred prior to the date of Termination shall survive the Termination of these Terms of Use for all purposes. These Terms of Use are effective unless and until terminated either by you or us. You may terminate these Terms of Use at any time when you cease using our Website. If, in our sole judgment, you fail or we suspect that you have failed to comply with any term or provision of these Terms of Use, we may revoke your access to the Website at any time without prior notice to you.",
    },
    {
      title: "Entire agreement",
      content:
        "Our failure to exercise or enforce any right or provision of these Terms of Use shall not constitute a waiver of such right or provision. These Terms of Use and any policies or operating rules posted by us constitutes the entire agreement and understanding between you and us and shall govern your use of the Website superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Use). Any ambiguities in the interpretation of these Terms of Use shall not be construed against us.",
    },
    {
      title: "Governing Law & Dispute Resolution",
      content:
        "These Terms of Use shall be governed by the applicable laws of Brazil. Any dispute, relating in any way to services provided by us, shall be submitted to confidential arbitration in Brazil except that, to the extent you have in any manner violated or threatened to violate our intellectual property rights, we may seek injunctive or other appropriate relief in any court in Brazil, and you consent to the exclusive jurisdiction and venue in such courts. ",
    },
    {
      title: "Contact information",
      content:
        "Any questions, queries or complaints pertaining to the Terms of Use should be emailed to us at michal@searchvaccines.com. We typically respond within 3-5 working days.",
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Nav />
      <div className={styles.container}>
        <p
          style={{ textAlign: "center", padding: "1rem 0 2rem" }}
          className={styles.title}
        >
          Terms Of Use
        </p>
        <div className={styles.content}>
          <p>
            In these Terms of Use, the terms “we”, “us”, “our” or other similar
            expressions refer to a visitor and the use of words such as “you”,
            ”yours” or similar expressions shall mean any user{" "}
            <a className={styles.link} href="https://searchvaccines.com/">
              https://searchvaccines.com/
            </a>{" "}
            along with any of its webpages / subdomains, hereinafter referred to
            as the “Website”.
          </p>
          <div style={{ height: "1.5rem" }} />
          <p>
            Please read these Terms of Use carefully before accessing or using
            the Website. By accessing or using any part of the Website, you
            agree to be bound by these Terms of Use. We reserve the right to
            update, change or replace any part of these Terms of Use by posting
            updates and/or changes to the Website. Your continued access of the
            Website, following the posting of any updates and/or changes, shall
            constitute your acceptance of such updates and/or changes.
          </p>
          <p
            style={{ textAlign: "center", padding: "2rem 0" }}
            className={styles.title}
          >
            General Conditions
          </p>
          <p>
            Your use of the Website shall be subject to following conditions,
            generally:
          </p>
          <div style={{ height: "1.5rem" }} />
          <div>
            {generalConditions.map((i, k) => (
              <div key={k}>
                <p style={{ marginBottom: "1rem" }}>
                  {k + 1}. {i}
                </p>
              </div>
            ))}
          </div>

          {data.slice(0, 5).map((i, k) => (
            <div key={k}>
              <p
                style={{ textAlign: "start", padding: "2rem 0" }}
                className={styles.title}
              >
                {i.title}
              </p>
              <p>{i.content}</p>
            </div>
          ))}
          <p
            style={{ textAlign: "center", padding: "2rem 0" }}
            className={styles.title}
          >
            Prohibited Uses
          </p>
          <p>
            You are hereby prohibited from using the Website or its content:
          </p>
          <div style={{ height: "1.5rem" }} />
          {prohibitedData.map((i, k) => (
            <p key={k} style={{ marginBottom: "1rem" }}>
              {i.bullet} {i.text}
            </p>
          ))}
          <p>We reserve the right to terminate your use of the Website for violating any provisions of the Terms of Use.</p>
          {data.slice(5, data.length).map((i, k) => (
            <div key={k}>
              <p
                style={{ textAlign: "start", padding: "2rem 0" }}
                className={styles.title}
              >
                {i.title}
              </p>
              <p>{i.content}</p>
            </div>
          ))}
          <div style={{ height: "2rem" }} />
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

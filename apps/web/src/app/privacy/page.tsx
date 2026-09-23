import type { Metadata } from "next";
import LegalPage, { OperatorDetails } from "@/Components/LegalPage";
import { company, legal, siteUrl } from "@/lib/company";

const description =
  "How GenExecutive collects, uses and protects personal data from website visitors, prospects and clients in India, the US and the UK.";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | GenExecutive" },
  description,
  alternates: { canonical: `${siteUrl}/privacy` },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy">
      <OperatorDetails />
      <p>
        This policy explains what personal data we collect when you visit{" "}
        {siteUrl.replace("https://", "")}, book a call, contact us or use our
        services, and what we do with it. We process personal data in line
        with India&apos;s Digital Personal Data Protection Act, 2023 and the
        Information Technology Act, 2000 and its rules, and, for visitors and
        clients in the United Kingdom and European Economic Area, the UK GDPR
        and EU GDPR.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Contact details you give us</strong>: your name, email
          address, company and anything you write when you email us or book a
          call.
        </li>
        <li>
          <strong>Booking details</strong>: when you book a discovery call
          through our scheduling provider, the time you choose and any notes
          you add.
        </li>
        <li>
          <strong>Website usage data</strong>: aggregated, anonymous analytics
          such as pages viewed, referring site, device type and country. Our
          analytics do not use cookies and do not identify you personally.
        </li>
        <li>
          <strong>Technical logs</strong>: our hosting provider records
          standard request data (such as IP address and browser type) to keep
          the site secure and running.
        </li>
        <li>
          <strong>Client data</strong>: if you become a client, the information
          you give us access to so we can deliver the service, such as your
          calendar, inbox, documents and business tools.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To reply to your enquiry and hold the call you booked.</li>
        <li>To provide, maintain and improve the services you sign up for.</li>
        <li>To send invoices and manage your account.</li>
        <li>To understand, in aggregate, how the website is used.</li>
        <li>To meet legal, tax and accounting obligations.</li>
      </ul>
      <p>
        Our lawful bases are your consent (for example when you book a call),
        performing a contract with you, our legitimate interest in running and
        improving the business, and legal obligations. We do not sell personal
        data, and we do not use it for advertising.
      </p>

      <h2>Client data and AI tools</h2>
      <p>
        When we deliver executive support or build automations, we process
        client data only on your instructions and only for the work you have
        asked for. Some of that work uses third-party AI and automation
        platforms. We use them only as needed for your service, and we do not
        use your data to train our own models. Anything sensitive or sent under
        your name is reviewed by a person before it goes out.
      </p>

      <h2>Who we share it with</h2>
      <p>
        We share personal data only with service providers who help us run the
        business, under their own privacy and security commitments. These
        include our website host and analytics provider (Vercel), our
        scheduling provider (Cal.com), our email provider, and the automation
        and AI platforms used to deliver a client&apos;s service. We may also
        disclose data where the law requires it.
      </p>

      <h2>International transfers</h2>
      <p>
        We are based in India and our service providers may process data in
        other countries, including the United States. Where UK or EU data is
        transferred, we rely on the safeguards those providers offer, such as
        standard contractual clauses.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiry and booking data for up to 24 months after our last
        contact, client records for as long as the engagement lasts plus any
        period required for tax and legal purposes, and delete or return client
        data at the end of an engagement on request.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you can ask to access, correct, update or
        delete your personal data, withdraw consent, object to or restrict
        processing, or receive a copy of your data. To make a request, email{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a>. We will reply
        within 30 days. UK residents can also complain to the Information
        Commissioner&apos;s Office (ico.org.uk).
      </p>

      <h2>Security</h2>
      <p>
        We use reasonable technical and organisational measures to protect
        personal data, including encrypted connections (HTTPS), access limited
        to the people who need it, and reputable providers. No system is
        perfectly secure, and we will notify you and the relevant authorities
        of a breach where the law requires it.
      </p>

      <h2>Children</h2>
      <p>
        Our services are for businesses. We do not knowingly collect personal
        data from anyone under 18.
      </p>

      <h2>Grievance officer and contact</h2>
      <p>
        For any question or complaint about this policy or your personal data,
        contact our grievance officer at{" "}
        <a href={`mailto:${legal.grievanceEmail}`}>{legal.grievanceEmail}</a>.
        We aim to acknowledge complaints within 48 hours and resolve them
        within 30 days.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The date at the top shows
        when it last changed.
      </p>
    </LegalPage>
  );
}

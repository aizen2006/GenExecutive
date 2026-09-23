import Link from "next/link";
import type { Metadata } from "next";
import LegalPage, { OperatorDetails } from "@/Components/LegalPage";
import { company, siteUrl } from "@/lib/company";

const description =
  "The terms that apply when you use the GenExecutive website or subscribe to our virtual executive assistant and AI automation services.";

export const metadata: Metadata = {
  title: { absolute: "Terms of Service | GenExecutive" },
  description,
  alternates: { canonical: `${siteUrl}/terms` },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" path="/terms">
      <OperatorDetails />
      <p>
        These terms apply to your use of this website and to any GenExecutive
        service plan you subscribe to. A signed proposal or agreement for your
        engagement takes priority over these terms where the two differ.
      </p>

      <h2>Our services</h2>
      <p>
        We provide virtual executive support, AI automation, custom AI agents
        and content support on monthly plans. The scope of each plan is
        described on our{" "}
        <Link href="/#pricing">pricing section</Link> and in any proposal we
        agree with you.
      </p>

      <h2>Plans, fees and payment</h2>
      <ul>
        <li>Plans are billed monthly in advance, in US dollars unless agreed otherwise.</li>
        <li>Enterprise pricing is agreed in writing before work starts.</li>
        <li>
          Fees are exclusive of applicable taxes, which are added where the law
          requires.
        </li>
        <li>
          If a payment is overdue, we may pause the service until it is
          settled.
        </li>
      </ul>

      <h2>Changing, pausing or cancelling</h2>
      <p>
        Plans have no fixed end date. You can upgrade, downgrade, pause or
        cancel by emailing <a href={`mailto:${company.email}`}>{company.email}</a>.
        Changes take effect from the next billing month. Fees already paid for
        the current month are not refunded, except where the law requires.
      </p>

      <h2>Your responsibilities</h2>
      <ul>
        <li>
          Give us the access, information and approvals we reasonably need to
          do the work, and make sure you are entitled to share them.
        </li>
        <li>
          Review and approve anything we prepare that will be sent or published
          under your name, where we ask you to.
        </li>
        <li>
          Use our services lawfully, and not ask us to send spam or do anything
          that breaks the law or a third party&apos;s rights.
        </li>
      </ul>

      <h2>Confidentiality</h2>
      <p>
        We keep your business information confidential and use it only to
        deliver your service. This continues after the engagement ends. How we
        handle personal data is set out in our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>Ownership of work</h2>
      <p>
        Once the relevant fees are paid, you own the deliverables we create
        specifically for you, including documents, content and the
        configuration of automations built in your accounts. We keep ownership
        of our general know-how, templates and methods. Third-party tools stay
        subject to their own terms and subscriptions.
      </p>

      <h2>AI output and third-party tools</h2>
      <p>
        Some of our work uses AI and automation platforms run by other
        companies. AI output can be inaccurate, so we use human review on
        anything sensitive, but you remain responsible for business decisions
        you make based on it. We are not responsible for outages or changes to
        third-party tools, though we will work to adapt your automations when
        they change.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        We provide our services with reasonable skill and care. To the extent
        the law allows, we are not liable for indirect or consequential loss,
        such as lost profits or lost data, and our total liability for any
        claim is limited to the fees you paid us in the three months before the
        claim arose. Nothing in these terms limits liability that cannot be
        limited by law.
      </p>

      <h2>Website content</h2>
      <p>
        The content on this website is for general information and is not
        professional, legal or financial advice. You may share links to it,
        but not copy it wholesale without permission.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India, and the courts of India
        have jurisdiction over any dispute. This does not remove any rights you
        have under the consumer laws of the country you live in.
      </p>

      <h2>Changes and contact</h2>
      <p>
        We may update these terms; the date at the top shows the latest
        version, and material changes will be emailed to active clients. For
        questions, email <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>
    </LegalPage>
  );
}

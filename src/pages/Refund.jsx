import { LegalPage } from "@/components/LegalPage";

/*
  Refund — Refund Policy page. No data files / no schemas.
  Instruction: build the Monday agency marketing site.
*/

export default function Refund() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Refund Policy"
      updated="June 2026"
      seoTitle="Refund Policy | Monday"
      seoDescription="How refunds work for Monday services and what to expect."
      path="/refund"
      intro="We want every client to feel the engagement was worth it. This policy explains how refunds work for our services."
      sections={[
        {
          heading: "Overview",
          body: [
            "Monday provides services rather than physical products. Because work begins as soon as an engagement starts, refunds are handled case by case as described below.",
          ],
        },
        {
          heading: "Service fees",
          body: [
            "Monthly retainers cover the work performed during that month. Fees for completed work are not refundable.",
            "If you cancel before a new billing cycle begins, you will not be charged for that upcoming cycle.",
          ],
        },
        {
          heading: "Ad spend",
          body: [
            "Money paid directly to advertising platforms for your campaigns is controlled by those platforms and is not part of our fees. Any platform refunds follow the platform rules.",
          ],
        },
        {
          heading: "How to request a refund",
          body: [
            "If you believe a refund is warranted, email us within fourteen days of the charge with the details. We will review your request fairly and respond promptly.",
          ],
        },
        {
          heading: "Resolution",
          body: [
            "Where a refund is appropriate we will process it to the original payment method. Our goal is always a fair outcome, not a fight.",
          ],
        },
        {
          heading: "Contact",
          body: [
            "Refund questions can be sent to help@scalewithmonday.com.",
          ],
        },
      ]}
    />
  );
}

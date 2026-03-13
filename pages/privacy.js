import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Privacy() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Privacy Policy - Wordplay</title>
      </Head>
      <main style={{ maxWidth: 700, padding: "40px 20px", lineHeight: 1.8 }}>
        <h1>Privacy Policy</h1>
        <p>
          <strong>Last updated:</strong> March 2026
        </p>

        <h2>Overview</h2>
        <p>
          Wordplay ("we", "our", "us") is a creative writing exercise generator.
          We respect your privacy and are committed to protecting your personal
          data.
        </p>

        <h2>Information We Collect</h2>
        <p>
          <strong>Account information:</strong> If you create an account, we
          collect your email address and a hashed password (we never store
          plaintext passwords).
        </p>
        <p>
          <strong>Usage data:</strong> We collect the story parameters you select
          (length, POV, setting, tone, pacing) to generate writing prompts. We
          do not store the generated prompts unless you explicitly save them to
          your account.
        </p>
        <p>
          <strong>Technical data:</strong> We may collect standard technical
          information such as device type, operating system, and IP address for
          rate limiting and service reliability.
        </p>

        <h2>How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Generate personalized writing exercise prompts</li>
          <li>Maintain and improve our service</li>
          <li>Prevent abuse through rate limiting</li>
          <li>Communicate with you about your account (if applicable)</li>
        </ul>

        <h2>Third-Party Services</h2>
        <p>
          We use OpenAI's API to generate writing prompts. The story parameters
          you select are sent to OpenAI for prompt generation. Please refer to{" "}
          <a
            href="https://openai.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenAI's Privacy Policy
          </a>{" "}
          for information about how they handle data.
        </p>
        <p>
          We use Supabase for authentication and data storage. Please refer to{" "}
          <a
            href="https://supabase.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Supabase's Privacy Policy
          </a>{" "}
          for their data handling practices.
        </p>

        <h2>Data Retention</h2>
        <p>
          We retain your account information for as long as your account is
          active. You may request deletion of your account and associated data at
          any time by contacting us.
        </p>

        <h2>Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal data.
          To exercise these rights, contact us at ebonyhargro@gmail.com.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          Wordplay is not directed at children under 13. We do not knowingly
          collect personal information from children under 13.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new policy on this page.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, contact us at{" "}
          <a href="mailto:ebonyhargro@gmail.com">ebonyhargro@gmail.com</a>.
        </p>

        <p style={{ marginTop: 40 }}>
          <a href="/">Back to Wordplay</a>
        </p>
      </main>
    </div>
  );
}

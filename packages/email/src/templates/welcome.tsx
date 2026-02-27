import { Button, Heading, Text, Section } from "@react-email/components";
import { APP_NAME } from "@repo/utils/constants";
import { BaseLayout } from "./base-layout";

export interface WelcomeEmailProps {
  name: string;
  loginUrl: string;
}

export function WelcomeEmail({ name, loginUrl }: WelcomeEmailProps) {
  return (
    <BaseLayout preview={`Welcome to ${APP_NAME}!`}>
      <Heading style={heading}>Welcome to {APP_NAME}!</Heading>
      <Text style={paragraph}>Hi {name},</Text>
      <Text style={paragraph}>
        Thanks for signing up. We&apos;re excited to have you on board.
      </Text>
      <Section style={buttonContainer}>
        <Button style={button} href={loginUrl}>
          Get Started
        </Button>
      </Section>
      <Text style={paragraph}>
        If you have any questions, just reply to this email.
      </Text>
    </BaseLayout>
  );
}

const heading = {
  fontSize: "24px",
  fontWeight: "bold" as const,
  color: "#1a1a1a",
  marginBottom: "24px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#484848",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#171717",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold" as const,
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

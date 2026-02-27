import { Button, Heading, Text, Section } from "@react-email/components";
import { APP_NAME } from "@repo/utils/constants";
import { BaseLayout } from "./base-layout";

export interface VerifyEmailProps {
  name: string;
  verificationUrl: string;
}

export function VerifyEmail({ name, verificationUrl }: VerifyEmailProps) {
  return (
    <BaseLayout preview={`Verify your ${APP_NAME} email address`}>
      <Heading style={heading}>Verify your email</Heading>
      <Text style={paragraph}>Hi {name},</Text>
      <Text style={paragraph}>
        Please verify your email address by clicking the button below.
      </Text>
      <Section style={buttonContainer}>
        <Button style={button} href={verificationUrl}>
          Verify Email
        </Button>
      </Section>
      <Text style={paragraph}>
        If you didn&apos;t create an account, you can safely ignore this email.
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

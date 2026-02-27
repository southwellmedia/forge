import { Button, Heading, Text, Section } from "@react-email/components";
import { APP_NAME } from "@repo/utils/constants";
import { BaseLayout } from "./base-layout";
import { heading, paragraph, buttonContainer, button } from "./styles";

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


import { Button, Heading, Text, Section } from "@react-email/components";
import { APP_NAME } from "@repo/utils/constants";
import { BaseLayout } from "./base-layout";
import { heading, paragraph, buttonContainer, button } from "./styles";

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


import { Button, Heading, Text, Section } from "@react-email/components";
import { APP_NAME } from "@repo/utils/constants";
import { BaseLayout } from "./base-layout";
import { heading, paragraph, buttonContainer, button } from "./styles";

export interface ResetPasswordEmailProps {
  name: string;
  resetUrl: string;
}

export function ResetPasswordEmail({ name, resetUrl }: ResetPasswordEmailProps) {
  return (
    <BaseLayout preview={`Reset your ${APP_NAME} password`}>
      <Heading style={heading}>Reset your password</Heading>
      <Text style={paragraph}>Hi {name},</Text>
      <Text style={paragraph}>
        We received a request to reset your password. Click the button below to
        choose a new password.
      </Text>
      <Section style={buttonContainer}>
        <Button style={button} href={resetUrl}>
          Reset Password
        </Button>
      </Section>
      <Text style={paragraph}>
        If you didn&apos;t request a password reset, you can safely ignore this
        email. Your password will not be changed.
      </Text>
    </BaseLayout>
  );
}


import { createElement } from "react";
import { render } from "@react-email/components";
import { getResendClient } from "./client";
import { WelcomeEmail, type WelcomeEmailProps } from "./templates/welcome";
import { VerifyEmail, type VerifyEmailProps } from "./templates/verify-email";
import {
  ResetPasswordEmail,
  type ResetPasswordEmailProps,
} from "./templates/reset-password";
import { APP_NAME } from "@repo/utils/constants";

type EmailPayload =
  | { template: "welcome"; props: WelcomeEmailProps }
  | { template: "verify-email"; props: VerifyEmailProps }
  | { template: "reset-password"; props: ResetPasswordEmailProps };

type SendEmailParams = {
  to: string;
} & EmailPayload;

const SUBJECT_MAP: Record<EmailPayload["template"], string> = {
  welcome: `Welcome to ${APP_NAME}!`,
  "verify-email": `Verify your ${APP_NAME} email`,
  "reset-password": `Reset your ${APP_NAME} password`,
};

function getEmailComponent(payload: EmailPayload): React.ReactElement {
  switch (payload.template) {
    case "welcome":
      return createElement(WelcomeEmail, payload.props);
    case "verify-email":
      return createElement(VerifyEmail, payload.props);
    case "reset-password":
      return createElement(ResetPasswordEmail, payload.props);
  }
}

const FROM_ADDRESS =
  process.env.EMAIL_FROM ?? `${APP_NAME} <noreply@example.com>`;

export async function sendEmail(params: SendEmailParams): Promise<void> {
  const { to, template, ...rest } = params;
  const subject = SUBJECT_MAP[template];
  const component = getEmailComponent({ template, ...rest } as EmailPayload);

  const resend = getResendClient();

  if (!resend) {
    const html = await render(component);
    console.log(`[DEV EMAIL] to=${to} template=${template} subject="${subject}"`);
    console.log(html);
    return;
  }

  const html = await render(component);

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error(`[EMAIL ERROR] to=${to} template=${template} subject="${subject}"`, error);
    throw error;
  }
}

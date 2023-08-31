import { default as aws, SESClient } from '@aws-sdk/client-ses';
import nodemailer from 'nodemailer';
import { type default as Mail } from 'nodemailer/lib/mailer/index.js';

import { type IConfig } from '~/libs/packages/config/config.js';

import { EmailFailedToSendError } from '../exceptions/exceptions.js';
import { getResetPasswordEmailTemplate } from './libs/templates/templates.js';
import { type SendEmailResponse } from './libs/types/types.js';

class Mailer {
  private sesClient: SESClient;
  private config: IConfig;
  private transporter: nodemailer.Transporter;

  public constructor(config: IConfig) {
    this.config = config;

    const { AWS } = this.config.ENV;

    this.sesClient = new SESClient({
      region: AWS.AWS_REGION,
      credentials: {
        secretAccessKey: AWS.AWS_SECRET_ACCESS_KEY,
        accessKeyId: AWS.AWS_ACCESS_KEY,
      },
    });
    this.transporter = nodemailer.createTransport({
      SES: { ses: this.sesClient, aws },
    });
  }

  public async sendResetPasswordEmail(
    recipient: string,
    resetLink: string,
  ): Promise<SendEmailResponse> {
    const mail = getResetPasswordEmailTemplate(recipient, resetLink);
    return await this.sendMail(mail);
  }

  public async sendMail(mail: Mail.Options): Promise<SendEmailResponse> {
    try {
      return (await this.transporter.sendMail(mail)) as SendEmailResponse;
    } catch {
      throw new EmailFailedToSendError();
    }
  }
}

export { Mailer };
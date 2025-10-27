import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export interface SendEmailParams {
  to: string;
  subject: string;
  content: string;
}

export async function sendEmail({ to, subject, content }: SendEmailParams): Promise<boolean> {
  try {
    const input = JSON.stringify({
      messages: [
        {
          to: [to],
          subject,
          content,
        },
      ],
    });

    const command = `manus-mcp-cli tool call gmail_send_messages --server gmail --input '${input.replace(/'/g, "'\\''")}'`;
    
    const { stdout, stderr } = await execAsync(command);
    
    if (stderr && !stderr.includes("Tool call saved")) {
      console.error("[Gmail] Error sending email:", stderr);
      return false;
    }

    console.log("[Gmail] Email sent successfully:", stdout);
    return true;
  } catch (error) {
    console.error("[Gmail] Failed to send email:", error);
    return false;
  }
}


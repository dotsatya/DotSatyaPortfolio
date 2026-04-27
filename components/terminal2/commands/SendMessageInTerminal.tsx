import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

interface SendMessageInTerminalProps {
  name: string;
  email: string;
  message: string;
  onComplete: () => void;
}

export const SendMessageInTerminal: React.FC<SendMessageInTerminalProps> = ({
  name,
  email,
  message,
  onComplete,
}) => {
  const [status, setStatus] = useState<"sending" | "success" | "error">("sending");

  useEffect(() => {
    const sendEmail = async () => {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            name: name,
            email: email,
            idea: "Terminal Ping",
            details: message,
            project: `Message from ${name} via Terminal\n\n${message}`,
          },
          publicKey,
        );
        setStatus("success");
      } catch {
        setStatus("error");
      }
      onComplete();
    };

    sendEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "sending") {
    return <div className="text-terminal-text mt-2">Sending message...</div>;
  }

  if (status === "success") {
    return (
      <div className="text-terminal-green mt-2">
        ✔ Message sent successfully. Thank you, {name}!
      </div>
    );
  }

  return (
    <div className="text-red-500 mt-2">
      ❌ Failed to send message. Please try again later.
    </div>
  );
};

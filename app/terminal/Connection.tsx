"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

type Step = "name" | "email" | "idea" | "sending";

export default function Connection() {
  const [step, setStep] = useState<Step>("name");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    idea: "",
  });

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

  const promptMap: Record<Step, string> = {
    name: "Enter your name",
    email: "Enter your email",
    idea: "Enter your project idea of feedback",
    sending: "",
  };

  const handleEnter = async () => {
    if (!input.trim()) return;

    const prompt = promptMap[step];

    // push combined terminal-style line
    setOutput((prev) => [...prev, `~/ ${prompt} $ ${input}`]);

    if (step === "name") {
      setForm((f) => ({ ...f, name: input }));
      setStep("email");
    }

    if (step === "email") {
      setForm((f) => ({ ...f, email: input }));
      setStep("idea");
    }

  if (step === "idea") {
  const finalData = {
    ...form,
    idea: input,
  };

  setStep("sending");
  setOutput((prev) => [
    ...prev,
    "$ Sending message...",
  ]);

  try {
    await emailjs.send(
      serviceId,
      templateId,
      finalData,
      publicKey
    );

    setOutput((prev) => [
      ...prev,
      "$ ✔ Message sent successfully",
      "",
    ]);

    // RESET STATE
    setForm({ name: "", email: "", idea: "" });
    setStep("name");
  } catch {
    setOutput((prev) => [
      ...prev,
      "$ ❌ Failed to send message",
      "",
      "~/ Enter your name $",
    ]);

    setForm({ name: "", email: "", idea: "" });
    setStep("name");
  }
}

    setInput("");
  };

return (
  <div
    className="  rounded-lg p-4 font-mono text-sm bg-white dark:bg-[#0d1117] shadow-md border border-slate-300 dark:border-[#30363d]  text-slate-800 dark:text-[#c9d1d9]"
  >
    <div className="space-y-1 mb-3">
      {output.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>

    {step !== "sending" && (
      <div className="flex items-center gap-2">
        <span className="text-emerald-600 dark:text-[#4ade80]">
          ~/
        </span>

        <span className="text-slate-600 dark:text-[#8b949e]">
          {promptMap[step]}
        </span>

        <span className="text-emerald-600 dark:text-[#4ade80]">
          $
        </span>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleEnter()}
          placeholder="..."
          className=" flex-1 bg-transparent outline-none  text-slate-800 dark:text-[#c9d1d9]  placeholder:text-slate-400 dark:placeholder:text-[#8b949e] "
          autoFocus
        />
      </div>
    )}
  </div>
);

}

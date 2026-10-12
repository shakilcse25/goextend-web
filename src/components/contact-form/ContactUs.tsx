"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import toast from "react-hot-toast";

/**
 * Web3Forms — delivers each submission to the inbox the access key was
 * issued for. No service or template to configure: the key is the whole
 * setup.
 *
 * `||` rather than `??` on purpose: the Dockerfile declares the key as
 * a build arg defaulting to "", and an empty string must fall through
 * to the default instead of breaking the form.
 *
 * Having the key in the bundle is not a leak: Web3Forms access keys are
 * designed to be sent from the browser, and can only deliver mail to
 * their own inbox.
 */
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
  "009b9080-81a9-4b01-a4c7-9c1a8fe8728a";

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New enquiry from ${formData.name} — goextendtech.com`,
          from_name: "GoExtend website",
          ...formData,
        }),
      });
      const result = await response.json();
      // Web3Forms reports some failures in the body, not the status.
      if (!response.ok || !result.success) {
        throw new Error(result.message || `HTTP ${response.status}`);
      }
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      toast.success("Message sent. We'll get back to you shortly.");
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Message failed to send, please try again.");
    }
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const validateForm = (data: typeof formData) => {
    const errors: Record<string, string> = {};
    if (!data.name.trim()) errors.name = "Name is required.";
    if (!data.email.trim()) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(data.email))
      errors.email = "Invalid email address.";
    if (!data.message.trim()) errors.message = "Message cannot be empty.";
    return errors;
  };

  return (
    <div className="border-border/60 bg-muted/10 mx-auto w-full max-w-md rounded-2xl border p-6 shadow-[0_20px_60px_-30px_hsl(var(--accent)/0.5)] md:rounded-3xl md:p-8">
      <h2 className="text-foreground text-xl font-bold sm:text-2xl">
        Tell us about{" "}
        <span className="text-accent font-extrabold">your project</span>
      </h2>
      <p className="text-muted-foreground mt-2 text-sm">
        A few lines about what you need is enough to start. We reply to every
        message.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Doe"
            type="text"
            disabled={isSubmitting}
          />
          {errors.name && (
            <span className="text-sm text-red-600">{errors.name}</span>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@example.com"
            type="email"
            disabled={isSubmitting}
          />
          {errors.email && (
            <span className="text-sm text-red-600">{errors.email}</span>
          )}
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="message">Message</Label>
          <Input
            id="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message..."
            className="rounded-md border p-2"
            type="textarea"
            disabled={isSubmitting}
          />
          {errors.message && (
            <span className="text-sm text-red-600">{errors.message}</span>
          )}
        </LabelInputContainer>

        <div className="via-border my-8 h-[1px] w-full bg-gradient-to-r from-transparent to-transparent" />

        <button
          className="group/btn from-primary to-secondary relative block h-11 w-full rounded-full bg-gradient-to-r text-sm font-semibold text-white shadow-[0_10px_30px_-10px_hsl(var(--accent)/0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-10px_hsl(var(--accent)/0.85)] disabled:pointer-events-none disabled:opacity-50"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Submit"}
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="via-secondary-300 absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="via-accent absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

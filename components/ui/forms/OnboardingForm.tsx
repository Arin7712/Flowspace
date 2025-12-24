"use client";

import { useState } from "react";
import { GalleryVerticalEnd } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createWorkspace } from "@/lib/actions";

// Import your server action

type Props = {
  clerkId: string;
};

export function OnboardingForm({ clerkId }: Props) {
  const [workspaceName, setWorkspaceName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call your server action
      await createWorkspace({ name: workspaceName, clerkId: clerkId });

      // Redirect to dashboard after workspace creation
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error creating workspace:", error);
      alert("Failed to create workspace. Try again.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Flowspace</h1>
            <FieldDescription>
              Don&apos;t have an account? <a href="#">Sign up</a>
            </FieldDescription>
          </div>

          <Field>
            <FieldLabel htmlFor="workspaceName">Workspace Name</FieldLabel>
            <Input
              id="workspaceName"
              type="text"
              placeholder="Enter a workspace name"
              required
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
            />
          </Field>

          <Field>
            <Button type="submit">Continue</Button>
          </Field>

          <FieldSeparator>Or</FieldSeparator>

          <Field className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" type="button">
              {/* Apple SVG */}
              Continue with Apple
            </Button>
            <Button variant="outline" type="button">
              {/* Google SVG */}
              Continue with Google
            </Button>
          </Field>
        </FieldGroup>
      </form>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}

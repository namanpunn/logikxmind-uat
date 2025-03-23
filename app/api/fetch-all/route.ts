import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Adjust these table names to match your actual schema
    const [educationRes, experiencesRes, profilesRes, certificationsRes] =
      await Promise.all([
        supabase?.from("education").select("*"),
        supabase?.from("experiences").select("*"),
        supabase?.from("profiles").select("*"),
        supabase?.from("certifications").select("*"),
      ]);

    // Check for any errors
    if (
      educationRes?.error ||
      experiencesRes?.error ||
      profilesRes?.error ||
      certificationsRes?.error
    ) {
      return NextResponse.json(
        {
          error:
            educationRes?.error?.message ||
            experiencesRes?.error?.message ||
            profilesRes?.error?.message ||
            certificationsRes?.error?.message,
        },
        { status: 500 }
      );
    }

    // Combine data into a single JSON object
    const responseData = {
      education: educationRes?.data,
      experiences: experiencesRes?.data,
      profiles: profilesRes?.data,
      certifications: certificationsRes?.data,
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

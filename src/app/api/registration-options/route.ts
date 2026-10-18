import { NextResponse } from "next/server";
import { lookupRows } from "@/app/lib/registration-input";

const lists = {
  categories: "category",
  areasOfInterest: "area_of_interest",
  exploreOptions: "explore_option",
  declarations: "declaration",
  hearAbout: "hear_about",
} as const;

export async function GET() {
  try {
    const entries = await Promise.all(
      Object.entries(lists).map(async ([key, table]) => [key, await lookupRows(table)] as const),
    );
    return NextResponse.json(Object.fromEntries(entries));
  } catch {
    return NextResponse.json(
      { message: "Unable to load registration options." },
      { status: 500 },
    );
  }
}

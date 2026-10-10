import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

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
      Object.entries(lists).map(async ([key, table]) => {
        const result = await pool.query<{ id: number; name: string }>(
          `SELECT id, name FROM ${table} WHERE status = 1 ORDER BY id`,
        );
        return [key, result.rows] as const;
      }),
    );
    return NextResponse.json(Object.fromEntries(entries));
  } catch {
    return NextResponse.json(
      { message: "Unable to load registration options." },
      { status: 500 },
    );
  }
}

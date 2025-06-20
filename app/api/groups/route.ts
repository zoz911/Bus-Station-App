import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const result = await query("SELECT * FROM groups ORDER BY created_at DESC");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching groups:", error);
    return NextResponse.json(
      { error: "Failed to fetch groups" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, created_by } = body;
    if (!name || !created_by) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const result = await query(
      `INSERT INTO groups (name, description, created_by) VALUES ($1, $2, $3) RETURNING *`,
      [name, description, created_by]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating group:", error);
    return NextResponse.json(
      { error: "Failed to create group" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request: NextRequest) {
  const groupId = request.nextUrl.searchParams.get("group_id");
  try {
    let result;
    if (groupId) {
      result = await query(
        "SELECT * FROM messages WHERE group_id = $1 ORDER BY sent_at ASC",
        [groupId]
      );
    } else {
      result = await query("SELECT * FROM messages ORDER BY sent_at ASC");
    }
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { group_id, sender_id, content } = body;
    if (!group_id || !sender_id || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const result = await query(
      `INSERT INTO messages (group_id, sender_id, content) VALUES ($1, $2, $3) RETURNING *`,
      [group_id, sender_id, content]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

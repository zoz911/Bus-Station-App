import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import fs from "fs";
import path from "path";

export async function POST() {
  try {
    // Read the SQL update script
    const sqlPath = path.join(process.cwd(), "scripts", "update-database.sql");
    const sqlScript = fs.readFileSync(sqlPath, "utf8");

    // Split the script into individual statements
    const statements = sqlScript
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0 && !stmt.startsWith("--"));

    // Execute each statement
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await query(statement);
          console.log("Executed:", statement.substring(0, 50) + "...");
        } catch (error) {
          console.error("Error executing statement:", statement, error);
          // Continue with other statements even if one fails
        }
      }
    }

    // Verify the update by fetching users
    const result = await query(`
      SELECT 
        id,
        username,
        email,
        role,
        full_name,
        phone,
        status,
        created_at,
        updated_at
      FROM users
      ORDER BY created_at DESC
    `);

    return NextResponse.json({
      success: true,
      message: "Database updated successfully",
      users: result.rows,
      userCount: result.rows.length,
    });
  } catch (error) {
    console.error("Error updating database:", error);
    return NextResponse.json(
      {
        error: "Failed to update database",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Check current database structure
    const result = await query(`
      SELECT column_name, data_type, is_nullable, column_default 
      FROM information_schema.columns 
      WHERE table_name = 'users' 
      ORDER BY ordinal_position
    `);

    return NextResponse.json({
      success: true,
      tableStructure: result.rows,
    });
  } catch (error) {
    console.error("Error checking database structure:", error);
    return NextResponse.json(
      { error: "Failed to check database structure" },
      { status: 500 }
    );
  }
}

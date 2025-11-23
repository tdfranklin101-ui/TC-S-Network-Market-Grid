import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { pgTable, text, numeric, timestamp, serial, varchar, jsonb } from "drizzle-orm/pg-core";
import { desc } from "drizzle-orm";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const marketListings = pgTable("market_listings", {
  id: serial("id").primaryKey(),
  listingId: varchar("listing_id").notNull().unique(),
  objectId: text("object_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  ownerWalletId: text("owner_wallet_id"),
  raysValue: numeric("rays_value", { precision: 20, scale: 2 }).notNull(),
  solarValue: numeric("solar_value", { precision: 20, scale: 4 }),
  powerProfile: numeric("power_profile", { precision: 10, scale: 4 }),
  assetType: text("asset_type"),
  status: text("status"),
  marketType: text("market_type"),
  priceHistory: jsonb("price_history"),
  createdAt: timestamp("created_at").notNull(),
  listedAt: timestamp("listed_at").notNull(),
});

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return new Response(JSON.stringify({ error: "Database not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle({ client: pool });

  try {
    const listings = await db.select().from(marketListings).orderBy(desc(marketListings.createdAt));

    return new Response(JSON.stringify({ listings }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    await pool.end();
  }
}
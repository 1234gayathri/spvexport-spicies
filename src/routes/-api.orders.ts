import { json } from "@tanstack/react-start";

/**
 * POST /api/orders - Save a new order to database
 */
export async function POST(req: Request) {
  try {
    const { saveOrderToDb, clearCartFromDb } = await import("@/lib/db");
    const body = await req.json();
    const { customer, items, total } = body;

    if (!customer || !items || !total) {
      return json({ error: "Missing required fields" }, { status: 400 });
    }

    const order = await saveOrderToDb(customer, items, total, "pending");

    // Clear cart after order
    if (customer.id) {
      await clearCartFromDb(customer.id);
    }

    return json({ success: true, orderId: order.id });
  } catch (error) {
    console.error("Error saving order:", error);
    return json({ error: "Failed to save order" }, { status: 500 });
  }
}

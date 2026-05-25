import { json } from "@tanstack/react-start";

/**
 * POST /api/cart - Add or update item in cart
 * Body: { customerId, productId, quantity }
 */
export async function POST(req: Request) {
  try {
    const { saveCartItemToDb } = await import("@/lib/db");
    const body = await req.json();
    const { customerId, productId, quantity } = body;

    if (!customerId || !productId || quantity === undefined) {
      return json({ error: "Missing required fields" }, { status: 400 });
    }

    const cartItem = await saveCartItemToDb(customerId, productId, quantity);
    return json({ success: true, cartItemId: cartItem.id });
  } catch (error) {
    console.error("Error saving cart item:", error);
    return json({ error: "Failed to save cart item" }, { status: 500 });
  }
}

/**
 * GET /api/cart?customerId=xxx - Get customer's cart items
 */
export async function GET(req: Request) {
  try {
    const { getCartItemsFromDb } = await import("@/lib/db");
    const url = new URL(req.url);
    const customerId = url.searchParams.get("customerId");

    if (!customerId) {
      return json({ error: "Missing customerId" }, { status: 400 });
    }

    const items = await getCartItemsFromDb(customerId);
    return json({ items });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return json({ error: "Failed to fetch cart items" }, { status: 500 });
  }
}

/**
 * DELETE /api/cart?customerId=xxx - Clear customer's cart
 */
export async function DELETE(req: Request) {
  try {
    const { clearCartFromDb } = await import("@/lib/db");
    const url = new URL(req.url);
    const customerId = url.searchParams.get("customerId");

    if (!customerId) {
      return json({ error: "Missing customerId" }, { status: 400 });
    }

    await clearCartFromDb(customerId);
    return json({ success: true });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return json({ error: "Failed to clear cart" }, { status: 500 });
  }
}

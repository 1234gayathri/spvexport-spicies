let _prisma: any = null;

export async function getPrisma() {
  if (typeof window !== "undefined")
    throw new Error("Prisma must run on the server");
  if (_prisma) return _prisma;
  try {
    const prismaModule = (await import("@prisma/client")) as any;
    const PrismaClient =
      prismaModule.PrismaClient || prismaModule.default?.PrismaClient;
    _prisma = new PrismaClient();
  } catch (e) {
    console.error("Prisma initialization failed:", e);
    _prisma = getMockPrisma();
  }
  return _prisma;
}

function getMockPrisma(): any {
  return {
    order: { create: async () => ({ id: "mock" }), findMany: async () => [] },
    product: {
      create: async () => ({ id: "mock" }),
      findMany: async () => [],
      update: async () => ({ id: "mock" }),
      findUnique: async () => null,
    },
    customer: { findUnique: async () => null },
    cart: {
      findUnique: async () => null,
      create: async () => ({ id: "mock" }),
    },
    cartItem: {
      upsert: async () => ({ id: "mock" }),
      deleteMany: async () => ({}),
    },
  };
}

const prismaInstance = getPrisma();

export default {
  order: {
    create: async (...args: any[]): Promise<any> => {
      const instance = await prismaInstance;
      return instance.order.create(...args);
    },
    findMany: async (...args: any[]): Promise<any[]> => {
      const instance = await prismaInstance;
      return instance.order.findMany(...args);
    },
  },
  product: {
    create: async (...args: any[]): Promise<any> => {
      const instance = await prismaInstance;
      return instance.product.create(...args);
    },
    findMany: async (...args: any[]): Promise<any[]> => {
      const instance = await prismaInstance;
      return instance.product.findMany(...args);
    },
    update: async (...args: any[]): Promise<any> => {
      const instance = await prismaInstance;
      return instance.product.update(...args);
    },
    findUnique: async (...args: any[]): Promise<any> => {
      const instance = await prismaInstance;
      return instance.product.findUnique(...args);
    },
  },
  customer: {
    findUnique: async (...args: any[]): Promise<any> => {
      const instance = await prismaInstance;
      return instance.customer.findUnique(...args);
    },
  },
  cart: {
    findUnique: async (...args: any[]): Promise<any> => {
      const instance = await prismaInstance;
      return instance.cart.findUnique(...args);
    },
    create: async (...args: any[]): Promise<any> => {
      const instance = await prismaInstance;
      return instance.cart.create(...args);
    },
  },
  cartItem: {
    upsert: async (...args: any[]): Promise<any> => {
      const instance = await prismaInstance;
      return instance.cartItem.upsert(...args);
    },
    deleteMany: async (...args: any[]): Promise<any> => {
      const instance = await prismaInstance;
      return instance.cartItem.deleteMany(...args);
    },
  },
};

let _prisma: any = null;

export async function getPrisma() {
  if (typeof window !== "undefined")
    throw new Error("Prisma must run on the server");
  if (_prisma) return _prisma;
  try {
    // Import from the GENERATED path (matches schema.prisma output)
    const prismaModule = (await import("@/generated/prisma/client")) as any;
    const PrismaClient =
      prismaModule.PrismaClient || prismaModule.default?.PrismaClient;
    _prisma = new PrismaClient();
  } catch (e) {
    console.error("Prisma initialization failed:", e);
    try {
      // Fallback: try the standard @prisma/client path
      const fallbackModule = (await import("@prisma/client")) as any;
      const PrismaClient =
        fallbackModule.PrismaClient || fallbackModule.default?.PrismaClient;
      _prisma = new PrismaClient();
    } catch (e2) {
      console.error("Prisma fallback initialization also failed:", e2);
      _prisma = getMockPrisma();
    }
  }
  return _prisma;
}

function getMockPrisma(): any {
  const noopFindMany = async () => [];
  const noopCreate = async () => ({ id: "mock" });
  const noopUpdate = async () => ({ id: "mock" });
  const noopFindUnique = async () => null;
  const noopUpsert = async () => ({ id: "mock" });
  const noopDeleteMany = async () => ({});
  const noopUpdateMany = async () => ({});

  return {
    order: {
      create: noopCreate,
      findMany: noopFindMany,
      update: noopUpdate,
      findUnique: noopFindUnique,
    },
    product: {
      create: noopCreate,
      findMany: noopFindMany,
      update: noopUpdate,
      findUnique: noopFindUnique,
    },
    customer: {
      create: noopCreate,
      findMany: noopFindMany,
      findUnique: noopFindUnique,
      update: noopUpdate,
    },
    cart: {
      findUnique: noopFindUnique,
      create: noopCreate,
    },
    cartItem: {
      upsert: noopUpsert,
      deleteMany: noopDeleteMany,
    },
    coupon: {
      create: noopCreate,
      findMany: noopFindMany,
      findUnique: noopFindUnique,
      update: noopUpdate,
      delete: async () => ({}),
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
    update: async (...args: any[]): Promise<any> => {
      const instance = await prismaInstance;
      return instance.order.update(...args);
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
    findMany: async (...args: any[]): Promise<any[]> => {
      const instance = await prismaInstance;
      return instance.customer.findMany(...args);
    },
    create: async (...args: any[]): Promise<any> => {
      const instance = await prismaInstance;
      return instance.customer.create(...args);
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

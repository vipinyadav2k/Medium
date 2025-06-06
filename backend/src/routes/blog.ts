import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, jwt, sign, verify } from "hono/jwt";
import { blogSchema, blogUpdateSchema } from "@vipinyadav2k/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const header = c.req.header("Authorization") || "";

  const token = header.split(" ")[1];
  try {
    const response = await verify(token, c.env.JWT_SECRET);
    if (response) {
      c.set("userId", String(response.id));
      await next();
    } else {
      c.status(401);
      return c.json({ error: "Unauthorized" });
    }
  } catch (error) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = blogSchema.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ error: "Invalid Credentials" });
  }
  const authorId = c.get("userId");
  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      mainImage: body.mainImage,
      authorId: Number(authorId),
    },
  });
  return c.json({
    id: blog.id,
    authorId: blog.authorId,
  });
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = blogUpdateSchema.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ error: "Invalid Credentials" });
  }
  const blog = await prisma.blog.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({
    id: blog.id,
  });
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findMany({
      select: {
        content: true,
        title: true,
        publishedAt: true,
        mainImage: true,
        id: true,
        author: {
          select: {
            id: true,
            name: true, // 👈 Add this
          },
        },
      },
    });

    return c.json({
      blog,
    });
  } catch (error) {
    c.status(404);
    return c.json({ error: "Blog not found", message: error });
  }
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        publishedAt: true,
        mainImage: true,
        author: {
          select: {
            id: true,
            name: true, // 👈 Add this
          },
        },
      },
    });

    return c.json({
      blog,
    });
  } catch (e) {
    c.status(411); // 4
    return c.json({
      message: "Error while fetching blog post",
    });
  }
});
